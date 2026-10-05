import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { startTestServer } from "@sinterdb-internal/test-utils";
import { CustomId } from "sinterdb-protocol";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { SinterClient } from "./client.js";

interface Account {
  _id: CustomId;
  name: string;
  balance: number;
  tags: string[];
}

let directory: string;

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-persist-"));
});

afterEach(() => {
  rmSync(directory, { recursive: true, force: true });
});

async function withServer<T>(
  run: (client: SinterClient) => Promise<T>,
  options: { durability?: string } = {},
): Promise<T> {
  const server = await startTestServer({
    dataDirectory: directory,
    ...options,
  });
  const client = new SinterClient(`${server.uri}/bank`);

  try {
    await client.connect();

    return await run(client);
  } finally {
    await client.close();
    await server.close();
  }
}

describe("persistence through the driver", () => {
  it("keeps documents across a server restart", async () => {
    const insertedIds = await withServer(async (client) => {
      const accounts = client.db().collection<Account>("accounts");

      const result = await accounts.insertMany([
        { name: "Ada", balance: 100, tags: ["a"] },
        { name: "Grace", balance: 200, tags: [] },
        { name: "Linus", balance: 300, tags: [] },
      ]);

      await accounts.updateOne({ name: "Ada" }, { $inc: { balance: 50 } });
      await accounts.updateMany({}, { $push: { tags: "vip" } });
      await accounts.deleteOne({ name: "Linus" });

      return result.insertedIds;
    });

    await withServer(async (client) => {
      const accounts = client.db().collection<Account>("accounts");
      const found = await accounts.find({}, { sort: [["name", 1]] }).toArray();

      expect(found.map((account) => account.name)).toEqual(["Ada", "Grace"]);
      expect(found[0]).toMatchObject({ balance: 150, tags: ["a", "vip"] });
      expect(found[1]).toMatchObject({ balance: 200, tags: ["vip"] });
      expect(found[0]?._id.equals(insertedIds[0] as CustomId)).toBe(true);
    });
  });

  it("keeps databases and collections across a restart", async () => {
    await withServer(async (client) => {
      await client.db("bank").collection("accounts").insertOne({ n: 1 });
      await client.db("bank").collection("audit").insertOne({ n: 1 });
      await client.db("archive").collection("old").insertOne({ n: 1 });
    });

    await withServer(async (client) => {
      expect(await client.listDatabases()).toEqual(["archive", "bank"]);
      expect(await client.db("bank").listCollections()).toEqual([
        "accounts",
        "audit",
      ]);
    });
  });

  it("keeps upserts, replacements, and unmodified updates correct after restarts", async () => {
    await withServer(async (client) => {
      const accounts = client.db().collection<Account>("accounts");

      await accounts.updateOne(
        { name: "Zed" },
        { $set: { balance: 1, tags: [] } },
        { upsert: true },
      );
      await accounts.replaceOne(
        { name: "Zed" },
        { name: "Zed", balance: 2, tags: ["x"] },
      );
    });

    await withServer(async (client) => {
      const accounts = client.db().collection<Account>("accounts");
      const result = await accounts.updateOne(
        { name: "Zed" },
        { $set: { balance: 2 } },
      );

      expect(result.modifiedCount).toBe(0);
      expect(await accounts.findOne({ name: "Zed" })).toMatchObject({
        balance: 2,
        tags: ["x"],
      });
    });
  });

  it("keeps a failed updateMany from changing anything after a restart", async () => {
    await withServer(async (client) => {
      const items = client
        .db()
        .collection<{ _id: CustomId; v: unknown }>("items");

      await items.insertMany([{ v: 1 }, { v: 2 }, { v: "text" }]);
      await expect(
        items.updateMany({}, { $inc: { v: 1 } } as never),
      ).rejects.toThrow();
    });

    await withServer(async (client) => {
      const items = client
        .db()
        .collection<{ _id: CustomId; v: unknown }>("items");

      expect((await items.find().toArray()).map((item) => item.v)).toEqual([
        1,
        2,
        "text",
      ]);
    });
  });

  it("works in buffered mode", async () => {
    await withServer(
      async (client) => {
        await client.db().collection("things").insertOne({ n: 1 });
      },
      { durability: "buffered" },
    );

    await withServer(
      async (client) => {
        expect(
          await client.db().collection("things").find().toArray(),
        ).toHaveLength(1);
      },
      { durability: "buffered" },
    );
  });

  it("keeps working for many documents and several restarts", async () => {
    for (let round = 0; round < 3; round += 1) {
      await withServer(async (client) => {
        const rows = client
          .db()
          .collection<{ _id: CustomId; round: number; n: number }>("rows");

        await rows.insertMany(
          Array.from({ length: 50 }, (_, n) => ({ round, n })),
        );
      });
    }

    await withServer(async (client) => {
      const rows = client
        .db()
        .collection<{ _id: CustomId; round: number; n: number }>("rows");

      expect(await rows.find().toArray()).toHaveLength(150);
      expect(await rows.find({ round: 2 }).toArray()).toHaveLength(50);
    });
  });
});
