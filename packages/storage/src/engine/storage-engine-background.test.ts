import { mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { StorageEngine, type StorageEngineOptions } from "./storage-engine.js";

let directory: string;
const opened: StorageEngine[] = [];

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-background-"));
});

afterEach(() => {
  for (const engine of opened.splice(0)) {
    try {
      engine.close();
    } catch {
      // Some tests damage the directory on purpose.
    }
  }

  rmSync(directory, { recursive: true, force: true });
});

function open(options: Partial<StorageEngineOptions> = {}): StorageEngine {
  const engine = StorageEngine.open({ directory, ...options });

  opened.push(engine);

  return engine;
}

const padding = "x".repeat(2048);

function fill(engine: StorageEngine, count: number, start = 0): void {
  const things = engine.openCollection("app", "things");

  for (let n = start; n < start + count; n += 1) {
    things.insertOne({ n, padding });
  }
}

function count(engine: StorageEngine): number {
  return engine.getCollection("app", "things")?.documentCount ?? 0;
}

function files(sub: string, suffix: string): string[] {
  return readdirSync(join(directory, sub)).filter((name) =>
    name.endsWith(suffix),
  );
}

const tick = (): Promise<void> => new Promise((r) => setImmediate(r));

// About 1500 documents of 2 KiB is a little over 3 MiB, so the snapshot takes
// several steps.
const MANY = 1500;

describe("background checkpoints", () => {
  it("saves the state at the moment it started while writes continue", async () => {
    const engine = open({ checkpointOnClose: false });

    fill(engine, MANY);

    const running = engine.checkpointAsync();

    expect(engine.isCheckpointing).toBe(true);

    let during = 0;

    while (engine.isCheckpointing) {
      fill(engine, 1, MANY + during);
      during += 1;
      await tick();
    }

    const result = await running;

    expect(during).toBeGreaterThan(0);
    expect(result?.documents).toBe(MANY);
    expect(count(engine)).toBe(MANY + during);
    expect(files("checkpoints", ".snap")).toHaveLength(1);
    expect(files("checkpoints", ".tmp")).toEqual([]);
    engine.close();

    const reopened = open();

    expect(count(reopened)).toBe(MANY + during);
    expect(reopened.recovery.checkpointLsn).toBe(result?.lsn);
    expect(reopened.recovery.replayedRecords).toBe(during);
  });

  it("returns the running checkpoint instead of starting another", async () => {
    const engine = open();

    fill(engine, MANY);

    const first = engine.checkpointAsync();
    const second = engine.checkpointAsync();

    expect(second).toBe(first);
    await first;
    expect(files("checkpoints", ".snap")).toHaveLength(1);
  });

  it("does nothing when nothing changed", async () => {
    const engine = open();

    expect(await engine.checkpointAsync()).toBeUndefined();
    fill(engine, 3);
    await engine.checkpointAsync();
    expect(await engine.checkpointAsync()).toBeUndefined();
  });

  it("is cancelled by close, which then checkpoints in one go", async () => {
    const engine = open();

    fill(engine, MANY);

    const running = engine.checkpointAsync();

    engine.close();

    expect(await running).toBeUndefined();
    expect(files("checkpoints", ".tmp")).toEqual([]);

    const reopened = open();

    expect(count(reopened)).toBe(MANY);
    expect(reopened.recovery.replayedRecords).toBe(0);
  });

  it("leaves no partial file when close does not checkpoint", async () => {
    const engine = open({ checkpointOnClose: false });

    fill(engine, MANY);

    const running = engine.checkpointAsync();

    engine.close();

    expect(await running).toBeUndefined();
    expect(files("checkpoints", ".tmp")).toEqual([]);
    expect(files("checkpoints", ".snap")).toEqual([]);

    const reopened = open();

    expect(count(reopened)).toBe(MANY);
    // One record creates the collection, one per document.
    expect(reopened.recovery.replayedRecords).toBe(MANY + 1);
  });

  it("is replaced by a blocking checkpoint", async () => {
    const engine = open();

    fill(engine, MANY);

    const running = engine.checkpointAsync();
    const blocking = engine.checkpoint();

    expect(blocking?.documents).toBe(MANY);
    expect(await running).toBeUndefined();
    expect(engine.isCheckpointing).toBe(false);
    expect(files("checkpoints", ".snap")).toHaveLength(1);
    expect(files("checkpoints", ".tmp")).toEqual([]);
  });

  it("reports a failure, cleans up and works again", async () => {
    let fail = true;
    const engine = open({
      onCheckpointStage: (stage) => {
        if (fail && stage === "snapshot-written") {
          throw new Error("injected");
        }
      },
    });

    fill(engine, MANY);

    await expect(engine.checkpointAsync()).rejects.toThrow("injected");
    expect(engine.isCheckpointing).toBe(false);
    expect(files("checkpoints", ".tmp")).toEqual([]);
    expect(files("checkpoints", ".snap")).toEqual([]);

    fail = false;

    expect((await engine.checkpointAsync())?.documents).toBe(MANY);
  });

  it("prunes old snapshots and truncates the log like a blocking one", async () => {
    const engine = open({ segmentSizeBytes: 64 * 1024 });

    for (let round = 0; round < 3; round += 1) {
      fill(engine, 200, round * 200);
      await engine.checkpointAsync();
    }

    expect(files("checkpoints", ".snap")).toHaveLength(2);
    expect(engine.lastCheckpointLsn).toBe(601n);
  });

  it("starts automatic checkpoints in the background", async () => {
    const engine = open({
      checkpointThresholdBytes: 256 * 1024,
      backgroundCheckpoints: true,
    });

    fill(engine, 300);

    await vi.waitFor(() => {
      expect(engine.lastCheckpointLsn).toBeGreaterThan(0n);
    });
    expect(engine.lastCheckpointError).toBeUndefined();
    expect(count(engine)).toBe(300);
    engine.close();

    expect(count(open())).toBe(300);
  });

  it("checkpoints on a timer in the background", async () => {
    const engine = open({
      checkpointIntervalMs: 20,
      backgroundCheckpoints: true,
    });

    fill(engine, 10);

    await vi.waitFor(() => {
      expect(engine.lastCheckpointLsn).toBe(11n);
    });
  });
});
