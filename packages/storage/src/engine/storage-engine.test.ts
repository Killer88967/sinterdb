import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  truncateSync,
  utimesSync,
  writeFileSync,
} from "node:fs";
import { hostname, tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

import { CustomId, type Document } from "sinterdb-protocol";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  StorageCorruptionError,
  StorageError,
  StorageErrorCode,
  StorageInsertManyError,
} from "../errors.js";
import { WriteAheadLog } from "../wal/index.js";
import { encodeOperations } from "./operations.js";
import {
  STORAGE_FORMAT,
  STORAGE_FORMAT_VERSION,
  StorageEngine,
} from "./storage-engine.js";

let directory: string;
const opened: StorageEngine[] = [];

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-engine-"));
});

afterEach(() => {
  for (const engine of opened.splice(0)) {
    engine.close();
  }

  rmSync(directory, { recursive: true, force: true });
});

function open(
  options: Partial<Parameters<typeof StorageEngine.open>[0]> = {},
): StorageEngine {
  const engine = StorageEngine.open({ directory, ...options });

  opened.push(engine);

  return engine;
}

function reopen(
  engine: StorageEngine,
  options: Partial<Parameters<typeof StorageEngine.open>[0]> = {},
): StorageEngine {
  engine.close();

  return open(options);
}

function documents(
  engine: StorageEngine,
  db: string,
  name: string,
): Document[] {
  return [...(engine.getCollection(db, name)?.find({}) ?? [])];
}

function walFiles(): string[] {
  return readdirSync(join(directory, "wal"))
    .filter((name) => name.endsWith(".wal"))
    .sort();
}

function expectCode(action: () => unknown, code: StorageErrorCode): void {
  try {
    action();
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(StorageError);
    expect((error as StorageError).code).toBe(code);

    return;
  }

  throw new Error(`Expected ${code} to be thrown.`);
}

describe("data directory layout", () => {
  it("creates the documented layout and a manifest", () => {
    const engine = open();

    for (const name of [
      "LOCK",
      "manifest.json",
      "wal",
      "segments",
      "indexes",
      "checkpoints",
    ]) {
      expect(existsSync(join(directory, name)), name).toBe(true);
    }

    const manifest = JSON.parse(
      readFileSync(join(directory, "manifest.json"), "utf8"),
    ) as Record<string, unknown>;

    expect(manifest["format"]).toBe(STORAGE_FORMAT);
    expect(manifest["formatVersion"]).toBe(STORAGE_FORMAT_VERSION);
    expect(typeof manifest["createdAt"]).toBe("string");
    expect(walFiles()).toHaveLength(1);
    expect(engine.durability).toBe("fsync");
  });

  it("removes the lock when closed", () => {
    const engine = open();

    engine.close();
    engine.close();

    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("starts empty", () => {
    const engine = open();

    expect(engine.listDatabases()).toEqual([]);
    expect(engine.lastLsn).toBe(0n);
  });
});

describe("persistence across restarts", () => {
  it("restores documents from every kind of write", () => {
    let engine = open();
    const users = engine.openCollection("app", "users");
    const logs = engine.openCollection("app", "logs");
    const other = engine.openCollection("other", "things");

    const inserted = users.insertMany([
      { name: "Ada", age: 36, tags: ["a"] },
      { name: "Grace", age: 85, born: new Date(0), big: 5n },
      { name: "Linus", age: 36 },
      { name: "Margaret" },
    ]).insertedIds;

    logs.insertOne({ message: "hello", bytes: new Uint8Array([1, 2]) });
    other.insertOne({ n: 1 });

    users.updateOne(
      { name: "Ada" },
      { $inc: { age: 1 }, $push: { tags: "b" } },
    );
    users.updateMany({ age: 36 }, { $set: { vip: true } });
    users.replaceOne({ name: "Margaret" }, { name: "Hamilton", rank: 1 });
    users.deleteOne({ name: "Grace" });
    users.updateOne({ name: "Zed" }, { $set: { age: 1 } }, { upsert: true });
    logs.deleteMany({});

    const before = {
      users: documents(engine, "app", "users"),
      logs: documents(engine, "app", "logs"),
      other: documents(engine, "other", "things"),
    };

    engine = reopen(engine);

    expect(engine.listDatabases()).toEqual(["app", "other"]);
    expect(engine.listCollections("app")).toEqual(["logs", "users"]);
    expect(documents(engine, "app", "users")).toEqual(before.users);
    expect(documents(engine, "app", "logs")).toEqual(before.logs);
    expect(documents(engine, "other", "things")).toEqual(before.other);
    expect(
      engine.getCollection("app", "users")?.has(inserted[0] as CustomId),
    ).toBe(true);
    expect(
      engine.getCollection("app", "users")?.has(inserted[1] as CustomId),
    ).toBe(false);
  });

  it("keeps empty collections", () => {
    let engine = open();

    engine.openCollection("app", "empty");
    engine = reopen(engine);

    expect(engine.listCollections("app")).toEqual(["empty"]);
    expect(documents(engine, "app", "empty")).toEqual([]);
  });

  it("keeps working after a restart", () => {
    let engine = open();

    engine.openCollection("app", "users").insertOne({ name: "Ada" });
    engine = reopen(engine);
    engine.openCollection("app", "users").insertOne({ name: "Grace" });
    engine = reopen(engine);

    expect(documents(engine, "app", "users").map((d) => d["name"])).toEqual([
      "Ada",
      "Grace",
    ]);
  });

  for (const durability of ["buffered", "fsync"] as const) {
    it(`restores data in ${durability} mode`, () => {
      let engine = open({ durability });

      engine.openCollection("app", "users").insertOne({ name: "Ada" });
      engine = reopen(engine, { durability });

      expect(engine.durability).toBe(durability);
      expect(documents(engine, "app", "users")).toHaveLength(1);
    });
  }

  it("restores data written across many log segments", () => {
    let engine = open({ segmentSizeBytes: 4096 });
    const items = engine.openCollection("app", "items");

    for (let index = 0; index < 200; index += 1) {
      items.insertOne({ index, padding: "x".repeat(40) });
    }

    expect(walFiles().length).toBeGreaterThan(2);

    engine = reopen(engine, { segmentSizeBytes: 4096 });

    expect(documents(engine, "app", "items")).toHaveLength(200);
  });

  it("reuses the same collection object", () => {
    const engine = open();
    const first = engine.openCollection("app", "users");

    expect(engine.openCollection("app", "users")).toBe(first);
    expect(engine.getCollection("app", "users")).toBe(first);
    expect(engine.getCollection("app", "nope")).toBeUndefined();
  });
});

describe("log records", () => {
  it("writes one record per atomic operation", () => {
    const engine = open();
    const users = engine.openCollection("app", "users");
    const base = engine.lastLsn;

    users.insertMany([{ n: 1 }, { n: 2 }, { n: 3 }, { n: 4 }, { n: 5 }]);
    expect(engine.lastLsn).toBe(base + 1n);

    users.updateMany({}, { $inc: { n: 1 } });
    expect(engine.lastLsn).toBe(base + 2n);

    users.deleteMany({ n: { $gt: 3 } });
    expect(engine.lastLsn).toBe(base + 3n);
  });

  it("writes nothing for reads, no-op writes, or creating an existing collection", () => {
    const engine = open();
    const users = engine.openCollection("app", "users");

    users.insertOne({ name: "Ada", age: 1 });

    const before = engine.lastLsn;

    engine.openCollection("app", "users");
    [...users.find({})];
    users.findOne({});
    users.updateOne({ name: "Ada" }, { $set: { age: 1 } });
    users.updateMany({ name: "Nobody" }, { $set: { age: 2 } });
    users.deleteOne({ name: "Nobody" });
    users.deleteMany({ name: "Nobody" });
    users.replaceOne({ name: "Ada" }, { name: "Ada", age: 1 });

    expect(engine.lastLsn).toBe(before);
  });

  it("persists the accepted prefix of a partially failed insertMany", () => {
    let engine = open();
    const users = engine.openCollection("app", "users");
    const id = CustomId.generate();

    try {
      users.insertMany([
        { _id: id, name: "a" },
        { name: "b" },
        { _id: id, name: "duplicate" },
        { name: "never inserted" },
      ]);
      throw new Error("Expected a failure.");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(StorageInsertManyError);
      expect((error as StorageInsertManyError).insertedIds).toHaveLength(2);
    }

    engine = reopen(engine);

    expect(documents(engine, "app", "users").map((d) => d["name"])).toEqual([
      "a",
      "b",
    ]);
  });

  it("keeps updateMany all-or-nothing across a restart", () => {
    let engine = open();
    const users = engine.openCollection("app", "users");

    users.insertMany([{ v: 1 }, { v: 2 }, { v: "text" }]);
    expectCode(
      () => users.updateMany({}, { $inc: { v: 1 } }),
      StorageErrorCode.InvalidUpdate,
    );

    engine = reopen(engine);

    expect(documents(engine, "app", "users").map((d) => d["v"])).toEqual([
      1,
      2,
      "text",
    ]);
  });

  it("leaves memory unchanged when the log rejects a write", () => {
    const engine = open();
    const users = engine.openCollection("app", "users");

    users.insertOne({ name: "Ada" });
    engine.close();

    expectCode(
      () => users.insertOne({ name: "Grace" }),
      StorageErrorCode.Closed,
    );
    expectCode(() => users.deleteMany({}), StorageErrorCode.Closed);
    expectCode(
      () => users.updateMany({}, { $set: { a: 1 } }),
      StorageErrorCode.Closed,
    );
    expect(users.documentCount).toBe(1);
    expect([...users.find({})][0]).not.toHaveProperty("a");
  });

  it("does not allow clearing a durable collection", () => {
    const engine = open();

    expect(() => engine.openCollection("app", "users").clear()).toThrow();
  });
});

describe("crash recovery", () => {
  it("drops an incomplete trailing transaction", () => {
    let engine = open({ checkpointOnClose: false });
    const users = engine.openCollection("app", "users");

    users.insertOne({ name: "one" });
    users.insertOne({ name: "two" });
    users.insertOne({ name: "three" });
    engine.close();

    const segment = join(directory, "wal", walFiles()[0] as string);

    truncateSync(segment, statSync(segment).size - 5);

    engine = open();

    expect(documents(engine, "app", "users").map((d) => d["name"])).toEqual([
      "one",
      "two",
    ]);

    engine.openCollection("app", "users").insertOne({ name: "four" });
    engine = reopen(engine);

    expect(documents(engine, "app", "users").map((d) => d["name"])).toEqual([
      "one",
      "two",
      "four",
    ]);
  });

  it("refuses to start on a corrupt log and releases the lock", () => {
    const engine = open();

    engine.openCollection("app", "users").insertMany([{ a: 1 }, { a: 2 }]);
    engine.close();

    const segment = join(directory, "wal", walFiles()[0] as string);
    const bytes = readFileSync(segment);
    const original = Buffer.from(bytes);

    bytes[30] = (bytes[30] as number) ^ 0xff;
    writeFileSync(segment, bytes);

    expect(() => StorageEngine.open({ directory })).toThrow(
      StorageCorruptionError,
    );
    expect(existsSync(join(directory, "LOCK"))).toBe(false);

    writeFileSync(segment, original);

    expect(documents(open(), "app", "users")).toHaveLength(2);
  });

  it("rejects records from a newer version", () => {
    const engine = open();

    engine.close();

    const log = WriteAheadLog.open({ directory: join(directory, "wal") });

    log.append(99, new Uint8Array([1]));
    log.close();

    try {
      StorageEngine.open({ directory });
      throw new Error("Expected corruption.");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(StorageCorruptionError);
      expect((error as Error).message).toContain("newer version");
    }

    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("rejects writes to collections that were never created", () => {
    const engine = open();

    engine.close();

    const log = WriteAheadLog.open({ directory: join(directory, "wal") });

    log.append(
      1,
      encodeOperations([
        {
          kind: "delete",
          database: "ghost",
          collection: "town",
          id: new Uint8Array(16),
        },
      ]),
    );
    log.close();

    expect(() => StorageEngine.open({ directory })).toThrow(
      StorageCorruptionError,
    );
  });

  it("rejects malformed transaction payloads", () => {
    const engine = open();

    engine.close();

    const log = WriteAheadLog.open({ directory: join(directory, "wal") });

    log.append(1, new Uint8Array([0, 0, 0, 2, 9]));
    log.close();

    expect(() => StorageEngine.open({ directory })).toThrow(
      StorageCorruptionError,
    );
  });
});

describe("directory locking", () => {
  it("refuses a second engine on the same directory", () => {
    const first = open();

    expectCode(
      () => StorageEngine.open({ directory }),
      StorageErrorCode.Locked,
    );

    first.close();

    expect(open()).toBeDefined();
  });

  it("explains who holds the lock", () => {
    open();

    try {
      StorageEngine.open({ directory });
      throw new Error("Expected a lock error.");
    } catch (error: unknown) {
      expect((error as Error).message).toContain(`process ${process.pid}`);
      expect((error as Error).message).toContain("LOCK");
    }
  });

  it("takes over a lock left by a process that died", () => {
    const child = spawnSync(process.execPath, ["-e", "0"]);
    const deadPid = (child as unknown as { pid: number }).pid;

    writeFileSync(
      join(directory, "LOCK"),
      JSON.stringify({
        pid: deadPid,
        hostname: hostname(),
        startedAt: new Date().toISOString(),
        nonce: "stale",
      }),
    );

    const engine = open();

    expect(engine.listDatabases()).toEqual([]);

    engine.close();

    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("does not take over a lock from another host", () => {
    writeFileSync(
      join(directory, "LOCK"),
      JSON.stringify({
        pid: 1,
        hostname: "some-other-machine",
        startedAt: new Date().toISOString(),
        nonce: "remote",
      }),
    );

    expectCode(
      () => StorageEngine.open({ directory }),
      StorageErrorCode.Locked,
    );
  });

  it("takes over a lock from another host only when asked to", () => {
    writeFileSync(
      join(directory, "LOCK"),
      JSON.stringify({
        pid: 1,
        hostname: "a-stopped-container",
        startedAt: new Date().toISOString(),
        nonce: "remote",
      }),
    );

    expectCode(
      () => StorageEngine.open({ directory }),
      StorageErrorCode.Locked,
    );

    const engine = StorageEngine.open({ directory, reclaimLock: true });

    engine.close();

    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("takes over a lock written by an earlier process with the same id", () => {
    // In a container the server is always process 1, so a lock left by a
    // killed container names the id this process now has.
    writeFileSync(
      join(directory, "LOCK"),
      JSON.stringify({
        pid: process.pid,
        hostname: hostname(),
        startedAt: new Date().toISOString(),
        nonce: "previous-life",
      }),
    );

    const engine = open();

    expect(engine.listDatabases()).toEqual([]);

    engine.close();

    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("still refuses a second open by the same process", () => {
    const first = open();

    expectCode(
      () => StorageEngine.open({ directory, reclaimLock: true }),
      StorageErrorCode.Locked,
    );

    first.close();

    // Closing releases the lock for good, so a later open is allowed.
    open().close();
  });

  it("waits for a lock file that is still being written", () => {
    writeFileSync(join(directory, "LOCK"), "");

    expectCode(
      () => StorageEngine.open({ directory }),
      StorageErrorCode.Locked,
    );
  });

  it("takes over an old unreadable lock file", () => {
    const lock = join(directory, "LOCK");

    writeFileSync(lock, "garbage");

    const old = new Date(Date.now() - 60_000);

    utimesSync(lock, old, old);

    expect(open()).toBeDefined();
  });

  it("does not remove a lock it no longer owns", () => {
    const engine = open();

    writeFileSync(
      join(directory, "LOCK"),
      JSON.stringify({
        pid: process.pid,
        hostname: hostname(),
        startedAt: new Date().toISOString(),
        nonce: "someone-else",
      }),
    );

    engine.close();

    expect(existsSync(join(directory, "LOCK"))).toBe(true);
  });
});

describe("manifest checks", () => {
  function writeManifest(manifest: unknown): void {
    writeFileSync(
      join(directory, "manifest.json"),
      typeof manifest === "string" ? manifest : JSON.stringify(manifest),
    );
  }

  it("refuses data written by a newer storage format", () => {
    open().close();
    writeManifest({
      format: STORAGE_FORMAT,
      formatVersion: STORAGE_FORMAT_VERSION + 1,
      createdAt: "2026-01-01T00:00:00.000Z",
    });

    try {
      StorageEngine.open({ directory });
      throw new Error("Expected an error.");
    } catch (error: unknown) {
      expect((error as StorageError).code).toBe(
        StorageErrorCode.UnsupportedFormat,
      );
      expect((error as Error).message).toContain("Upgrade");
    }

    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("refuses a directory that is not a SinterDB data directory", () => {
    writeManifest({ format: "something-else", formatVersion: 1 });

    expectCode(
      () => StorageEngine.open({ directory }),
      StorageErrorCode.UnsupportedFormat,
    );
  });

  it("refuses an unreadable manifest", () => {
    open().close();
    writeManifest("{ not json");

    expect(() => StorageEngine.open({ directory })).toThrow(
      StorageCorruptionError,
    );
  });

  it("refuses a manifest without a version", () => {
    open().close();
    writeManifest({ format: STORAGE_FORMAT });

    expect(() => StorageEngine.open({ directory })).toThrow(
      StorageCorruptionError,
    );
  });

  it("refuses log files without a manifest", () => {
    const engine = open();

    engine.openCollection("app", "users").insertOne({ a: 1 });
    engine.close();
    rmSync(join(directory, "manifest.json"));

    expect(() => StorageEngine.open({ directory })).toThrow(
      StorageCorruptionError,
    );
    expect(existsSync(join(directory, "manifest.json"))).toBe(false);
  });

  it("accepts a manifest written by this version", () => {
    let engine = open();

    engine.openCollection("app", "users").insertOne({ a: 1 });
    engine = reopen(engine);

    expect(documents(engine, "app", "users")).toHaveLength(1);
  });
});
