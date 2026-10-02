import { withTestServer } from "@sinterdb-internal/test-utils";
import { describe, expect, it, vi } from "vitest";

import { SinterClient } from "./client.js";
import { SinterProtocolError } from "./errors.js";

describe("listing namespaces", () => {
  it("lists databases in sorted order", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        expect(await client.listDatabases()).toEqual([]);

        await client.db("beta").collection("items").insertOne({ n: 1 });
        await client.db("alpha").collection("items").insertOne({ n: 1 });

        expect(await client.listDatabases()).toEqual(["alpha", "beta"]);
      } finally {
        await client.close();
      }
    });
  });

  it("lists collections in sorted order", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);

      try {
        await client.connect();

        const database = client.db();

        expect(await database.listCollections()).toEqual([]);

        await database.collection("users").insertOne({ n: 1 });
        await database.collection("accounts").insertOne({ n: 1 });

        expect(await database.listCollections()).toEqual(["accounts", "users"]);

        expect(await client.db("other").listCollections()).toEqual([]);
      } finally {
        await client.close();
      }
    });
  });

  it("rejects malformed list results", async () => {
    const client = new SinterClient("sinterdb://localhost/application");

    vi.spyOn(client, "executeCommand").mockResolvedValue({ databases: [1] });

    await expect(client.listDatabases()).rejects.toThrow(SinterProtocolError);

    vi.spyOn(client, "executeCommand").mockResolvedValue(null);

    await expect(client.db().listCollections()).rejects.toThrow(
      SinterProtocolError,
    );
  });
});
