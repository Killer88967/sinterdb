import { withTestServer } from "@sinterdb-internal/test-utils";
import {
  CustomId,
  WireErrorCode,
  type Document,
  type DocumentValue,
} from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { SinterClient } from "./client.js";
import { FindCursor } from "./cursor.js";
import { SinterServerError } from "./errors.js";

interface NumberDocument {
  _id: CustomId;
  n: number;
  even: boolean;
}

function createDocuments(count: number): Omit<NumberDocument, "_id">[] {
  return Array.from({ length: count }, (_, index) => ({
    n: index,
    even: index % 2 === 0,
  }));
}

describe("FindCursor integration", () => {
  it("iterates across multiple server batches", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const items = client.db().collection<NumberDocument>("items");
        await items.insertMany(createDocuments(7));

        const seen: number[] = [];

        for await (const item of items.find({}, { batchSize: 2 })) {
          seen.push(item.n);
        }

        expect(seen).toEqual([0, 1, 2, 3, 4, 5, 6]);
      } finally {
        await client.close();
      }
    });
  });

  it("applies filters", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const items = client.db().collection<NumberDocument>("items");
        await items.insertMany(createDocuments(6));

        const evens = await items
          .find({ even: true }, { batchSize: 2 })
          .toArray();

        expect(evens.map((item) => item.n)).toEqual([0, 2, 4]);
      } finally {
        await client.close();
      }
    });
  });

  it("returns an empty result for a missing collection", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const missing = client.db().collection<NumberDocument>("missing");

        expect(await missing.find().toArray()).toEqual([]);
      } finally {
        await client.close();
      }
    });
  });

  it("supports next and hasNext", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const items = client.db().collection<NumberDocument>("items");
        await items.insertMany(createDocuments(3));

        const cursor = items.find({}, { batchSize: 1 });

        expect(await cursor.hasNext()).toBe(true);
        expect((await cursor.next())?.n).toBe(0);
        expect((await cursor.next())?.n).toBe(1);
        expect((await cursor.next())?.n).toBe(2);
        expect(await cursor.hasNext()).toBe(false);
        expect(await cursor.next()).toBeNull();
      } finally {
        await client.close();
      }
    });
  });

  it("stops returning documents after close", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const items = client.db().collection<NumberDocument>("items");
        await items.insertMany(createDocuments(5));

        const cursor = items.find({}, { batchSize: 2 });

        expect((await cursor.next())?.n).toBe(0);

        await cursor.close();
        await cursor.close();

        expect(await cursor.hasNext()).toBe(false);
        expect(await cursor.next()).toBeNull();
      } finally {
        await client.close();
      }
    });
  });

  it("rejects getMore for a cursor that was closed", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const items = client.db().collection<NumberDocument>("items");
        await items.insertMany(createDocuments(5));

        const opened = (await client.executeCommand("application", "find", {
          collection: "items",
          filter: {},
          batchSize: 2,
        })) as { cursorId: number };

        expect(opened.cursorId).toBeGreaterThan(0);

        const closed = await client.executeCommand(
          "application",
          "closeCursor",
          { cursorId: opened.cursorId },
        );

        expect(closed).toEqual({ closed: true });

        const failure: unknown = await client
          .executeCommand("application", "getMore", {
            cursorId: opened.cursorId,
          })
          .catch((error: unknown) => error);

        expect(failure).toBeInstanceOf(SinterServerError);
        expect((failure as SinterServerError).wireCode).toBe(
          WireErrorCode.CursorNotFound,
        );
      } finally {
        await client.close();
      }
    });
  });

  it("does not let one connection read another connection's cursor", async () => {
    await withTestServer(async ({ uri }) => {
      const owner = new SinterClient(`${uri}/application`);
      const intruder = new SinterClient(`${uri}/application`);

      try {
        await owner.connect();
        await intruder.connect();

        const items = owner.db().collection<NumberDocument>("items");
        await items.insertMany(createDocuments(5));

        const opened = (await owner.executeCommand("application", "find", {
          collection: "items",
          filter: {},
          batchSize: 2,
        })) as { cursorId: number };

        const failure: unknown = await intruder
          .executeCommand("application", "getMore", {
            cursorId: opened.cursorId,
          })
          .catch((error: unknown) => error);

        expect(failure).toBeInstanceOf(SinterServerError);
        expect((failure as SinterServerError).wireCode).toBe(
          WireErrorCode.CursorNotFound,
        );
      } finally {
        await owner.close();
        await intruder.close();
      }
    });
  });

  it("rejects an invalid batch size", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const items = client.db().collection<NumberDocument>("items");

        await expect(
          items.find({}, { batchSize: 0 }).toArray(),
        ).rejects.toThrow(SinterServerError);
      } finally {
        await client.close();
      }
    });
  });
});

describe("FindCursor request behavior", () => {
  function createRecordingExecutor(batches: DocumentValue[]): {
    calls: { command: string; parameters: Document }[];
    execute: (command: string, parameters: Document) => Promise<DocumentValue>;
  } {
    const calls: { command: string; parameters: Document }[] = [];
    let index = 0;

    return {
      calls,
      execute: (command, parameters) => {
        calls.push({ command, parameters });

        if (command === "closeCursor") {
          return Promise.resolve({ closed: true });
        }

        const batch = batches[index];
        index += 1;

        return Promise.resolve(batch ?? { cursorId: null, documents: [] });
      },
    };
  }

  it("closes the server cursor when iteration stops early", async () => {
    const first = { _id: CustomId.generate(), n: 0 };
    const second = { _id: CustomId.generate(), n: 1 };

    const { calls, execute } = createRecordingExecutor([
      { cursorId: 7, documents: [first, second] },
    ]);

    const cursor = new FindCursor<{ n: number }>(execute, "items", {}, 2);

    for await (const item of cursor) {
      expect(item.n).toBe(0);
      break;
    }

    expect(calls.map((call) => call.command)).toEqual(["find", "closeCursor"]);
    expect(calls[1]?.parameters).toEqual({ cursorId: 7 });
  });

  it("does not send closeCursor after the server exhausts the cursor", async () => {
    const only = { _id: CustomId.generate(), n: 0 };

    const { calls, execute } = createRecordingExecutor([
      { cursorId: null, documents: [only] },
    ]);

    const cursor = new FindCursor<{ n: number }>(
      execute,
      "items",
      {},
      undefined,
    );

    expect(await cursor.toArray()).toHaveLength(1);
    expect(calls.map((call) => call.command)).toEqual(["find"]);
  });

  it("rejects a malformed batch", async () => {
    const { execute } = createRecordingExecutor([
      { cursorId: "nope", documents: [] },
    ]);

    const cursor = new FindCursor<{ n: number }>(
      execute,
      "items",
      {},
      undefined,
    );

    await expect(cursor.next()).rejects.toThrow(
      "The server returned an invalid cursor batch.",
    );
  });
});
