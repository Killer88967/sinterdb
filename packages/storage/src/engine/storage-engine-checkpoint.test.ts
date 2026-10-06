import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  truncateSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { type Document } from "sinterdb-protocol";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { StorageCorruptionError } from "../errors.js";
import type { CheckpointStage } from "./checkpoint.js";
import { StorageEngine, type StorageEngineOptions } from "./storage-engine.js";

let directory: string;
const opened: StorageEngine[] = [];

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-checkpoint-"));
});

afterEach(() => {
  for (const engine of opened.splice(0)) {
    try {
      engine.close();
    } catch {
      // Tests that damage the directory on purpose may fail to close cleanly.
    }
  }

  rmSync(directory, { recursive: true, force: true });
});

function open(options: Partial<StorageEngineOptions> = {}): StorageEngine {
  const engine = StorageEngine.open({ directory, ...options });

  opened.push(engine);

  return engine;
}

function crash(engine: StorageEngine): void {
  // Closing without a final checkpoint leaves the files as a killed process
  // would, apart from releasing the lock.
  const index = opened.indexOf(engine);

  if (index >= 0) {
    opened.splice(index, 1);
  }

  engine.close();
}

function snapshots(): string[] {
  return readdirSync(join(directory, "checkpoints"))
    .filter((name) => name.endsWith(".snap"))
    .sort();
}

function temporaryFiles(): string[] {
  return readdirSync(join(directory, "checkpoints")).filter((name) =>
    name.endsWith(".tmp"),
  );
}

function segments(): string[] {
  return readdirSync(join(directory, "wal"))
    .filter((name) => name.endsWith(".wal"))
    .sort();
}

function state(engine: StorageEngine): Record<string, Document[]> {
  const result: Record<string, Document[]> = {};

  for (const database of engine.listDatabases()) {
    for (const collection of engine.listCollections(database)) {
      result[`${database}.${collection}`] = [
        ...(engine.getCollection(database, collection)?.find({}) ?? []),
      ];
    }
  }

  return result;
}

function fill(engine: StorageEngine, count: number, offset = 0): void {
  const items = engine.openCollection("app", "items");

  for (let index = 0; index < count; index += 1) {
    items.insertOne({ n: offset + index, padding: "x".repeat(30) });
  }
}

function damage(path: string): void {
  const bytes = readFileSync(path);

  bytes[Math.floor(bytes.byteLength / 2)] =
    (bytes[Math.floor(bytes.byteLength / 2)] as number) ^ 0xff;
  writeFileSync(path, bytes);
}

describe("manual checkpoints", () => {
  it("writes a snapshot that recovery starts from", () => {
    let engine = open({ checkpointOnClose: false });

    fill(engine, 20);

    const result = engine.checkpoint();
    const expected = state(engine);

    expect(result).toMatchObject({
      lsn: engine.lastLsn,
      collections: 1,
      documents: 20,
    });
    expect(snapshots()).toHaveLength(1);

    crash(engine);
    engine = open();

    expect(engine.recovery.checkpointLsn).toBe(result?.lsn);
    expect(engine.recovery.checkpointFile).toBe(result?.file);
    expect(engine.recovery.replayedRecords).toBe(0);
    expect(engine.recovery.skippedCheckpoints).toEqual([]);
    expect(state(engine)).toEqual(expected);
  });

  it("replays only the log written after the snapshot", () => {
    let engine = open({ checkpointOnClose: false });

    fill(engine, 10);
    engine.checkpoint();
    fill(engine, 5, 100);
    engine.openCollection("app", "items").deleteMany({ n: { $lt: 3 } });

    const expected = state(engine);

    crash(engine);
    engine = open();

    expect(engine.recovery.replayedRecords).toBe(6);
    expect(state(engine)).toEqual(expected);
  });

  it("does nothing when nothing was written since the last checkpoint", () => {
    const engine = open({ checkpointOnClose: false });

    expect(engine.checkpoint()).toBeUndefined();

    fill(engine, 3);

    expect(engine.checkpoint()).toBeDefined();
    expect(engine.checkpoint()).toBeUndefined();
    expect(snapshots()).toHaveLength(1);
  });

  it("includes empty collections and several databases", () => {
    let engine = open({ checkpointOnClose: false });

    engine.openCollection("a", "empty");
    engine.openCollection("b", "things").insertOne({ x: 1 });
    engine.checkpoint();
    crash(engine);
    engine = open();

    expect(engine.listDatabases()).toEqual(["a", "b"]);
    expect(engine.listCollections("a")).toEqual(["empty"]);
    expect(state(engine)["b.things"]).toHaveLength(1);
  });

  it("keeps writing correctly after being recovered from a snapshot", () => {
    let engine = open({ checkpointOnClose: false });

    fill(engine, 5);
    engine.checkpoint();
    crash(engine);

    engine = open({ checkpointOnClose: false });
    fill(engine, 5, 50);
    crash(engine);

    engine = open();

    expect(state(engine)["app.items"]).toHaveLength(10);
  });
});

describe("closing", () => {
  it("takes a final checkpoint so the next start replays nothing", () => {
    let engine = open();

    fill(engine, 15);

    const expected = state(engine);

    engine.close();
    opened.pop();

    engine = open();

    expect(engine.recovery.checkpointLsn).toBe(engine.lastLsn);
    expect(engine.recovery.replayedRecords).toBe(0);
    expect(state(engine)).toEqual(expected);
  });

  it("can skip the final checkpoint", () => {
    let engine = open({ checkpointOnClose: false });

    fill(engine, 15);
    crash(engine);

    engine = open();

    expect(snapshots()).toHaveLength(0);
    expect(engine.recovery.replayedRecords).toBe(16);
  });

  it("does not write a snapshot when nothing changed", () => {
    open().close();
    opened.pop();

    expect(snapshots()).toHaveLength(0);

    const engine = open();

    fill(engine, 1);
    engine.close();
    opened.pop();
    open().close();
    opened.pop();

    expect(snapshots()).toHaveLength(1);
  });
});

describe("compaction", () => {
  it("keeps two snapshots and the log since the older one", () => {
    const engine = open({
      checkpointOnClose: false,
      segmentSizeBytes: 1024,
    });

    fill(engine, 40);
    engine.checkpoint();

    const afterFirst = segments().length;

    expect(afterFirst).toBeGreaterThan(2);

    fill(engine, 40, 100);

    const second = engine.checkpoint();

    expect(second?.removedSegments).toBeGreaterThan(0);
    expect(snapshots()).toHaveLength(2);

    fill(engine, 40, 200);

    const third = engine.checkpoint();

    expect(third?.removedSnapshots).toBe(1);
    expect(snapshots()).toHaveLength(2);
    expect(segments().length).toBeLessThan(afterFirst + 8);
  });

  it("never removes log that the older snapshot still needs", () => {
    const engine = open({
      checkpointOnClose: false,
      segmentSizeBytes: 1024,
    });

    fill(engine, 30);

    const first = engine.checkpoint();

    fill(engine, 30, 100);
    engine.checkpoint();
    fill(engine, 30, 200);
    engine.checkpoint();

    const [, older] = snapshots().slice().reverse();
    const olderLsn = BigInt((older as string).replace(".snap", ""));

    expect(olderLsn).toBeGreaterThan(first?.lsn ?? 0n);

    crash(engine);

    const reopened = open();

    expect(reopened.recovery.lastLsn).toBeGreaterThan(olderLsn);
  });

  it("checkpoints automatically after enough log has been written", () => {
    const engine = open({
      checkpointOnClose: false,
      checkpointThresholdBytes: 2000,
      segmentSizeBytes: 1024,
    });

    fill(engine, 120);

    expect(engine.lastCheckpointLsn).toBeGreaterThan(0n);
    expect(snapshots().length).toBeGreaterThan(0);
    expect(snapshots().length).toBeLessThanOrEqual(2);

    const withoutCheckpoints = 120 * 90;

    expect(segments().length * 1024).toBeLessThan(withoutCheckpoints);
  });

  it("recovers exactly after a crash following automatic checkpoints", () => {
    let engine = open({
      checkpointOnClose: false,
      checkpointThresholdBytes: 1500,
      segmentSizeBytes: 1024,
    });

    fill(engine, 150);

    const expected = state(engine);

    crash(engine);
    engine = open();

    expect(engine.recovery.checkpointLsn).toBeGreaterThan(0n);
    expect(state(engine)).toEqual(expected);
  });

  it("matches a model through many mixed writes, checkpoints, and crashes", () => {
    const model = new Map<number, number>();
    let engine = open({
      checkpointOnClose: false,
      checkpointThresholdBytes: 600,
      segmentSizeBytes: 1024,
    });
    let seed = 12345;

    const random = (limit: number): number => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;

      return seed % limit;
    };

    for (let step = 0; step < 400; step += 1) {
      const items = engine.openCollection("app", "items");
      const key = random(40);
      const action = random(4);

      if (action === 0 && !model.has(key)) {
        items.insertOne({ key, value: step });
        model.set(key, step);
      } else if (action === 1) {
        items.updateMany({ key }, { $set: { value: step } });

        if (model.has(key)) {
          model.set(key, step);
        }
      } else if (action === 2) {
        items.deleteMany({ key });
        model.delete(key);
      } else if (action === 3) {
        items.updateMany({}, { $inc: { bump: 1 } });
      }

      if (step % 97 === 0) {
        crash(engine);
        engine = open({
          checkpointOnClose: false,
          checkpointThresholdBytes: 600,
          segmentSizeBytes: 1024,
        });
      }
    }

    const found = new Map(
      [...(engine.getCollection("app", "items")?.find({}) ?? [])].map(
        (document) => [document["key"] as number, document["value"] as number],
      ),
    );

    expect(found).toEqual(model);
  });

  it("does not fail writes when an automatic checkpoint fails", () => {
    const engine = open({
      checkpointOnClose: false,
      checkpointThresholdBytes: 300,
      onCheckpointStage: (stage) => {
        if (stage === "snapshot-written") {
          throw new Error("disk full");
        }
      },
    });

    fill(engine, 30);

    expect(state(engine)["app.items"]).toHaveLength(30);
    expect((engine.lastCheckpointError as Error).message).toBe("disk full");
    expect(engine.lastCheckpointLsn).toBe(0n);
  });
});

describe("interrupted checkpoints", () => {
  const stages: CheckpointStage[] = [
    "snapshot-written",
    "snapshot-renamed",
    "snapshots-pruned",
    "log-truncated",
  ];

  for (const crashAt of stages) {
    it(`recovers when the process dies after ${crashAt}`, () => {
      let engine = open({
        checkpointOnClose: false,
        segmentSizeBytes: 1024,
        onCheckpointStage: (stage) => {
          if (armed && stage === crashAt) {
            throw new Error("simulated crash");
          }
        },
      });
      let armed = false;

      fill(engine, 30);
      engine.checkpoint();
      fill(engine, 30, 100);
      engine.checkpoint();
      fill(engine, 30, 200);

      const expected = state(engine);

      armed = true;

      expect(() => engine.checkpoint()).toThrow("simulated crash");

      crash(engine);
      engine = open();

      expect(state(engine)).toEqual(expected);
      expect(temporaryFiles()).toEqual([]);
      expect(snapshots().length).toBeGreaterThan(0);

      fill(engine, 5, 300);
      crash(engine);
      engine = open();

      expect(state(engine)["app.items"]).toHaveLength(95);
    });
  }

  it("removes temporary snapshot files at startup", () => {
    open().close();
    opened.pop();
    writeFileSync(
      join(directory, "checkpoints", "00000000000000000099.snap.tmp"),
      "half written",
    );

    open();

    expect(temporaryFiles()).toEqual([]);
  });
});

describe("damaged snapshots", () => {
  it("falls back to the older snapshot and the log since it", () => {
    let engine = open({ checkpointOnClose: false, segmentSizeBytes: 1024 });

    fill(engine, 30);
    engine.checkpoint();
    fill(engine, 30, 100);
    engine.checkpoint();
    fill(engine, 30, 200);

    const expected = state(engine);
    const newest = snapshots().at(-1) as string;

    crash(engine);
    damage(join(directory, "checkpoints", newest));
    engine = open();

    expect(engine.recovery.skippedCheckpoints).toHaveLength(1);
    expect(engine.recovery.skippedCheckpoints[0]?.file).toBe(newest);
    expect(engine.recovery.checkpointFile).not.toBe(newest);
    expect(state(engine)).toEqual(expected);
  });

  it("replays the whole log when the only snapshot is damaged", () => {
    let engine = open({ checkpointOnClose: false });

    fill(engine, 25);
    engine.checkpoint();

    const expected = state(engine);

    crash(engine);
    damage(join(directory, "checkpoints", snapshots()[0] as string));
    engine = open();

    expect(engine.recovery.checkpointLsn).toBe(0n);
    expect(engine.recovery.skippedCheckpoints).toHaveLength(1);
    expect(state(engine)).toEqual(expected);
  });

  it("explains when every snapshot is damaged and the log was compacted", () => {
    const engine = open({ checkpointOnClose: false, segmentSizeBytes: 1024 });

    fill(engine, 30);
    engine.checkpoint();
    fill(engine, 30, 100);
    engine.checkpoint();
    fill(engine, 30, 200);
    engine.checkpoint();
    crash(engine);

    for (const name of snapshots()) {
      damage(join(directory, "checkpoints", name));
    }

    try {
      StorageEngine.open({ directory });
      throw new Error("Expected recovery to fail.");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(StorageCorruptionError);
      expect((error as Error).message).toContain("cannot be recovered");
      expect((error as Error).message).toContain("backup");
    }

    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("skips a snapshot whose sequence number disagrees with its name", () => {
    let engine = open({ checkpointOnClose: false });

    fill(engine, 10);
    engine.checkpoint();
    fill(engine, 10, 100);

    const expected = state(engine);
    const original = snapshots()[0] as string;

    crash(engine);
    renameSync(
      join(directory, "checkpoints", original),
      join(directory, "checkpoints", "00000000000000000003.snap"),
    );
    engine = open();

    expect(engine.recovery.skippedCheckpoints).toHaveLength(1);
    expect(state(engine)).toEqual(expected);
  });

  it("detects a log that lost records the snapshot already covers", () => {
    const engine = open({ checkpointOnClose: false });

    fill(engine, 10);
    engine.checkpoint();
    crash(engine);

    const segment = join(directory, "wal", segments()[0] as string);

    truncateSync(segment, statSync(segment).size - 30);

    try {
      StorageEngine.open({ directory });
      throw new Error("Expected recovery to fail.");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(StorageCorruptionError);
      expect((error as Error).message).toContain("lost records");
    }
  });
});

describe("options", () => {
  it("rejects an invalid checkpoint threshold", () => {
    for (const checkpointThresholdBytes of [0, -5, 1.5, Number.NaN]) {
      expect(() =>
        StorageEngine.open({ directory, checkpointThresholdBytes }),
      ).toThrow(TypeError);
    }

    expect(existsSync(join(directory, "LOCK"))).toBe(false);
  });

  it("rejects checkpointing after close", () => {
    const engine = open();

    engine.close();
    opened.pop();

    expect(() => engine.checkpoint()).toThrow();
  });
});
