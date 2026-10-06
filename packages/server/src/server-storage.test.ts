import {
  existsSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { StorageErrorCode } from "@sinterdb-internal/storage";
import { WireErrorCode } from "sinterdb-protocol";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { InMemoryCatalog } from "./catalog.js";
import {
  CommandDispatcher,
  CommandExecutionError,
} from "./command-dispatcher.js";
import {
  ServerLifecycleError,
  SinterServer,
  SinterServerState,
} from "./server.js";

let directory: string;
const servers: SinterServer[] = [];

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-server-"));
});

afterEach(async () => {
  for (const server of servers.splice(0)) {
    await server.stop({ timeoutMS: 100 });
  }

  rmSync(directory, { recursive: true, force: true });
});

function create(options: { durability?: string } = {}): SinterServer {
  const server = new SinterServer(
    { port: 0, dataDirectory: directory, ...options },
    {},
  );

  servers.push(server);

  return server;
}

describe("SinterServer with a data directory", () => {
  it("has no catalog until it starts", async () => {
    const server = create();

    expect(() => server.catalog).toThrow(ServerLifecycleError);

    await server.start();

    expect(server.catalog.databaseCount).toBe(0);

    await server.stop();

    expect(() => server.catalog).toThrow(ServerLifecycleError);
  });

  it("keeps in-memory servers working without a data directory", () => {
    const server = new SinterServer({ port: 0 }, {});

    expect(server.catalog.databaseCount).toBe(0);
  });

  it("recovers data after a restart", async () => {
    let server = create();

    await server.start();

    const users = server.catalog.getOrCreateCollection("app", "users");

    users.insertMany([{ name: "Ada" }, { name: "Grace" }]);
    server.catalog.createCollection("app", "empty");
    await server.stop();

    server = create();
    await server.start();

    expect(server.catalog.listDatabases()).toEqual(["app"]);
    expect(server.catalog.listCollections("app")).toEqual(["empty", "users"]);
    expect(server.catalog.collectionCount).toBe(2);
    expect(
      [...(server.catalog.getCollection("app", "users")?.find({}) ?? [])].map(
        (document) => document["name"],
      ),
    ).toEqual(["Ada", "Grace"]);
  });

  it("can be started again after it was stopped", async () => {
    const server = create();

    await server.start();
    server.catalog.getOrCreateCollection("app", "users").insertOne({ n: 1 });
    await server.stop();
    await server.start();

    expect(server.catalog.getCollection("app", "users")?.documentCount).toBe(1);
  });

  it("releases the data directory when it stops", async () => {
    const server = create();

    await server.start();

    expect(existsSync(join(directory, "LOCK"))).toBe(true);

    await server.stop();

    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("refuses to start while another server uses the directory", async () => {
    const first = create();

    await first.start();

    const second = create();

    await expect(second.start()).rejects.toMatchObject({
      code: StorageErrorCode.Locked,
    });
    expect(second.state).toBe(SinterServerState.Stopped);

    await first.stop();
    await second.start();

    expect(second.state).toBe(SinterServerState.Running);
  });

  it("releases the directory when the port is already taken", async () => {
    const blocker = createServer();

    await new Promise<void>((resolve) =>
      blocker.listen(0, "127.0.0.1", resolve),
    );

    const port = (blocker.address() as { port: number }).port;
    const server = new SinterServer(
      { host: "127.0.0.1", port, dataDirectory: directory },
      {},
    );

    servers.push(server);

    await expect(server.start()).rejects.toThrow();
    expect(server.state).toBe(SinterServerState.Stopped);
    expect(existsSync(join(directory, "LOCK"))).toBe(false);

    await new Promise<void>((resolve) => blocker.close(() => resolve()));
  });

  it("refuses to start on a corrupt log and stays stopped", async () => {
    const first = create();

    await first.start();
    first.catalog
      .getOrCreateCollection("app", "users")
      .insertMany([{ a: 1 }, { a: 2 }]);
    await first.stop();

    const wal = join(directory, "wal");
    const segment = join(
      wal,
      readdirSync(wal).filter((name) => name.endsWith(".wal"))[0] as string,
    );

    writeFileSync(segment, Buffer.alloc(200, 7));

    const second = create();

    await expect(second.start()).rejects.toMatchObject({
      code: StorageErrorCode.Corruption,
    });
    expect(second.state).toBe(SinterServerState.Stopped);
    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("accepts a buffered durability mode", async () => {
    const server = create({ durability: "buffered" });

    await server.start();

    expect(server.config.durability).toBe("buffered");
    expect(server.catalog.getOrCreateCollection("a", "b")).toBeDefined();
  });
});

describe("checkpoints and recovery reports", () => {
  it("reports what recovery did", async () => {
    const first = create();

    expect(first.recovery).toBeUndefined();

    await first.start();

    expect(first.recovery).toMatchObject({
      checkpointLsn: 0n,
      replayedRecords: 0,
      skippedCheckpoints: [],
    });

    first.catalog.getOrCreateCollection("app", "users").insertOne({ n: 1 });
    await first.stop();

    expect(first.recovery).toBeUndefined();

    const second = create();

    await second.start();

    expect(second.recovery?.checkpointLsn).toBeGreaterThan(0n);
    expect(second.recovery?.replayedRecords).toBe(0);
  });

  it("checkpoints automatically and recovers from the snapshot", async () => {
    const first = new SinterServer(
      { port: 0, dataDirectory: directory, checkpointThresholdBytes: 1500 },
      {},
    );

    servers.push(first);
    await first.start();

    const items = first.catalog.getOrCreateCollection("app", "items");

    for (let index = 0; index < 120; index += 1) {
      items.insertOne({ index, padding: "x".repeat(30) });
    }

    expect(readdirSync(join(directory, "checkpoints")).length).toBeGreaterThan(
      0,
    );

    await first.stop();

    const second = create();

    await second.start();

    expect(second.recovery?.checkpointLsn).toBeGreaterThan(0n);
    expect(second.catalog.getCollection("app", "items")?.documentCount).toBe(
      120,
    );
  });
});

describe("durable catalog", () => {
  it("rejects names that cannot be recorded", async () => {
    const server = create();

    await server.start();

    expect(() =>
      server.catalog.createCollection("app", "x".repeat(300)),
    ).toThrow(/255 bytes/);
    expect(() =>
      server.catalog.getOrCreateCollection("y".repeat(300), "c"),
    ).toThrow(/255 bytes/);
  });

  it("reports a name conflict for an existing durable collection", async () => {
    const server = create();

    await server.start();
    server.catalog.createCollection("app", "users");

    expect(() => server.catalog.createCollection("app", "users")).toThrow(
      /already exists/,
    );
  });

  it("cannot be cleared", async () => {
    const server = create();

    await server.start();

    expect(() => server.catalog.clear()).toThrow();
  });
});

describe("storage failures on the wire", () => {
  it("reports an internal error when the log cannot take a write", async () => {
    const server = create();

    await server.start();

    const catalog = server.catalog as InMemoryCatalog;
    const dispatcher = new CommandDispatcher(catalog);

    dispatcher.dispatch({
      command: "insertOne",
      database: "app",
      parameters: { collection: "users", document: { name: "Ada" } },
    });

    await server.stop();

    let caught: unknown;

    try {
      dispatcher.dispatch({
        command: "insertOne",
        database: "app",
        parameters: { collection: "users", document: { name: "Grace" } },
      });
    } catch (error: unknown) {
      caught = error;
    }

    expect(caught).toBeInstanceOf(CommandExecutionError);
    expect((caught as CommandExecutionError).code).toBe(
      WireErrorCode.InternalError,
    );
    expect((caught as CommandExecutionError).name).toBe("InternalError");
    expect((caught as CommandExecutionError).message).not.toContain(directory);
  });

  it("keeps validation failures as document errors", () => {
    const dispatcher = new CommandDispatcher(new InMemoryCatalog());

    let caught: unknown;

    try {
      dispatcher.dispatch({
        command: "insertOne",
        database: "app",
        parameters: {
          collection: "users",
          document: { bad: undefined } as never,
        },
      });
    } catch (error: unknown) {
      caught = error;
    }

    expect((caught as CommandExecutionError).code).not.toBe(
      WireErrorCode.InternalError,
    );
  });
});
