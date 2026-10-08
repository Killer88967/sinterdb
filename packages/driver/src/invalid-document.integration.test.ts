import { withTestServer } from "@sinterdb-internal/test-utils";
import { describe, expect, it } from "vitest";

import { SinterClient } from "./client.js";
import {
  SinterConnectionError,
  SinterDocumentError,
  SinterErrorCode,
  SinterInsertManyError,
} from "./errors.js";

// A document the driver cannot encode is the caller's mistake. It must not be
// reported as a connection failure, nothing may reach the server, and the
// connection must stay usable.

function nested(levels: number): Record<string, unknown> {
  const root: Record<string, unknown> = {};
  let current = root;

  for (let level = 0; level < levels; level += 1) {
    const next: Record<string, unknown> = {};

    current["n"] = next;
    current = next;
  }

  return root;
}

const invalid: readonly (readonly [string, () => Record<string, unknown>])[] = [
  ["an undefined field", () => ({ name: "Ada", nickname: undefined })],
  ["a function", () => ({ callback: () => 1 })],
  ["a Map", () => ({ lookup: new Map() })],
  ["a document nested too deeply", () => nested(150)],
  ["a document larger than 16 MiB", () => ({ text: "x".repeat(17 << 20) })],
];

describe("documents the driver cannot encode", () => {
  it.each(invalid)(
    "reject %s with INVALID_DOCUMENT and leave the connection usable",
    async (_name, build) => {
      await withTestServer(async ({ uri }) => {
        const client = new SinterClient(`${uri}/application`);

        try {
          await client.connect();

          const people = client.db().collection("people");
          const failure = await people
            .insertOne(build() as never)
            .catch((e: unknown) => e);

          expect(failure).toBeInstanceOf(SinterDocumentError);
          expect(failure).not.toBeInstanceOf(SinterConnectionError);
          expect((failure as SinterDocumentError).code).toBe(
            SinterErrorCode.InvalidDocument,
          );
          expect((failure as SinterDocumentError).cause).toBeInstanceOf(Error);

          // The same client carries on, and nothing was stored.
          expect(client.connected).toBe(true);
          expect(await people.insertOne({ name: "Grace" })).toMatchObject({
            acknowledged: true,
          });
          expect(await people.find().toArray()).toHaveLength(1);
        } finally {
          await client.close();
        }
      });
    },
  );

  it("fails insertMany as a whole, before any document is sent", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const people = client.db().collection("people");
        const failure = await people
          .insertMany([
            { name: "Ada" },
            { name: "Grace", nickname: undefined } as never,
          ])
          .catch((e: unknown) => e);

        expect(failure).toBeInstanceOf(SinterDocumentError);
        expect(failure).not.toBeInstanceOf(SinterInsertManyError);
        expect(await people.find().toArray()).toHaveLength(0);
      } finally {
        await client.close();
      }
    });
  });

  it("accepts the deepest document the protocol allows", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        // 100 levels in total, counting the request that wraps the document.
        const people = client.db().collection("people");

        await expect(
          people.insertOne(nested(98) as never),
        ).resolves.toMatchObject({
          acknowledged: true,
        });
        await expect(
          people.insertOne(nested(99) as never),
        ).rejects.toBeInstanceOf(SinterDocumentError);
      } finally {
        await client.close();
      }
    });
  });
});
