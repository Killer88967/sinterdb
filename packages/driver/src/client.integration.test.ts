import { setTimeout as delay } from "node:timers/promises";

import { withTestServer } from "@sinterdb-internal/test-utils";
import { CustomId, PROTOCOL_VERSION, WireErrorCode } from "sinterdb-protocol";
import { describe, expect, expectTypeOf, it } from "vitest";

import {
  SinterClient,
  SinterClientState,
  type SinterPingResult,
} from "./client.js";
import type { SinterCollection, InsertOneResult } from "./collection.js";
import { SinterServerError } from "./errors.js";

describe("SinterClient integration", () => {
  it("connects, pings, selects a database, and closes cleanly", async () => {
    await withTestServer(async ({ server, uri }) => {
      const client = new SinterClient(`${uri}/application`);
      const events: string[] = [];

      client.on("connecting", () => {
        events.push("connecting");
      });

      client.on("connected", () => {
        events.push("connected");
      });

      client.on("closed", () => {
        events.push("closed");
      });

      try {
        await client.connect();

        expect(client.state).toBe(SinterClientState.Connected);
        expect(client.connected).toBe(true);
        expect(server.activeConnectionCount).toBe(1);

        expect(client.serverInfo).toBeDefined();
        expect(client.serverInfo?.protocolVersion).toBe(PROTOCOL_VERSION);
        expect(client.serverInfo?.product).toBe("sinterdb-server");

        const ping = await client.ping();

        expectTypeOf(ping).toEqualTypeOf<SinterPingResult>();
        expect(ping.ok).toBe(true);
        expect(ping.sentAt).toBeInstanceOf(Date);
        expect(ping.receivedAt).toBeInstanceOf(Date);
        expect(ping.roundTripTimeMS).toBeGreaterThanOrEqual(0);

        const database = client.db();

        expect(database.name).toBe("application");
        expect(database.client).toBe(client);

        interface UserDocument {
          name: string;
          age: number;
        }

        const users = database.collection<UserDocument>("users");

        expectTypeOf(users).toEqualTypeOf<SinterCollection<UserDocument>>();
        expect(users.name).toBe("users");
        expect(users.namespace).toBe("application.users");
      } finally {
        await client.close();
      }

      await waitForConnectionCount(server, 0);

      expect(client.state).toBe(SinterClientState.Closed);
      expect(client.connected).toBe(false);
      expect(client.serverInfo).toBeUndefined();
      expect(server.activeConnectionCount).toBe(0);
      expect(events).toEqual(["connecting", "connected", "closed"]);
    });
  });

  it("does not leak a connection when used repeatedly", async () => {
    await withTestServer(async ({ server, uri }) => {
      for (let iteration = 0; iteration < 5; iteration += 1) {
        const client = new SinterClient(`${uri}/database-${iteration}`);

        await client.connect();
        await client.ping();
        client.db();
        await client.close();

        await waitForConnectionCount(server, 0);

        expect(server.activeConnectionCount).toBe(0);
      }
    });
  });

  it("inserts a typed document through the server", async () => {
    await withTestServer(async ({ server, uri }) => {
      const client = new SinterClient(`${uri}/application`);

      interface UserDocument {
        _id: CustomId;
        name: string;
        age: number;
      }

      try {
        await client.connect();

        const users = client.db().collection<UserDocument>("users");

        const result = await users.insertOne({
          name: "Ada",
          age: 36,
        });

        expectTypeOf(result).toEqualTypeOf<InsertOneResult>();
        expect(result.acknowledged).toBe(true);
        expect(result.insertedId).toBeInstanceOf(CustomId);

        const storage = server.catalog.getCollection("application", "users");

        expect(storage).toBeDefined();

        const stored = storage?.findById(result.insertedId);

        expect(stored?.["name"]).toBe("Ada");
        expect(stored?.["age"]).toBe(36);

        const storedId = stored?.["_id"];

        expect(storedId).toBeInstanceOf(CustomId);

        if (storedId instanceof CustomId) {
          expect(storedId.equals(result.insertedId)).toBe(true);
        }
      } finally {
        await client.close();
      }

      await waitForConnectionCount(server, 0);

      expect(server.activeConnectionCount).toBe(0);
    });
  });

  it("reports duplicate identifiers through the driver", async () => {
    await withTestServer(async ({ uri }) => {
      const client = new SinterClient(`${uri}/application`);
      const id = CustomId.fromHexString("00112233445566778899aabbccddeeff");

      interface UserDocument {
        _id: CustomId;
        name: string;
      }

      try {
        await client.connect();

        const users = client.db().collection<UserDocument>("users");

        await users.insertOne({
          _id: id,
          name: "first",
        });

        const error = await users
          .insertOne({
            _id: id,
            name: "second",
          })
          .catch((reason: unknown) => reason);

        expect(error).toBeInstanceOf(SinterServerError);

        if (error instanceof SinterServerError) {
          expect(error.wireCode).toBe(WireErrorCode.DuplicateKey);
          expect(error.serverErrorName).toBe("DuplicateKey");
          expect(error.retryable).toBe(false);
          expect(error.details).toEqual({
            field: "_id",
            storageErrorCode: "DUPLICATE_ID",
          });
        }
      } finally {
        await client.close();
      }
    });
  });
});

interface ConnectionCounter {
  readonly activeConnectionCount: number;
}

async function waitForConnectionCount(
  server: ConnectionCounter,
  expected: number,
  timeoutMS = 1_000,
): Promise<void> {
  const deadline = Date.now() + timeoutMS;

  while (server.activeConnectionCount !== expected) {
    if (Date.now() >= deadline) {
      throw new Error(
        `Expected ${expected} active connections, but found ${server.activeConnectionCount}.`,
      );
    }

    await delay(5);
  }
}
