import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  rmSync,
  truncateSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { writeFileAtomic } from "./files.js";
import { StorageEngine, type StorageEngineOptions } from "./storage-engine.js";

let directory: string;
const opened: StorageEngine[] = [];

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-schedule-"));
});

afterEach(() => {
  vi.useRealTimers();

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

function snapshots(): string[] {
  return readdirSync(join(directory, "checkpoints"))
    .filter((name) => name.endsWith(".snap"))
    .sort();
}

function write(engine: StorageEngine, n: number): void {
  engine
    .openCollection("app", "things")
    .insertOne({ n, padding: "x".repeat(200) });
}

function count(engine: StorageEngine): number {
  return engine.getCollection("app", "things")?.documentCount ?? 0;
}

describe("checkpoint retention", () => {
  it("keeps two snapshots by default", () => {
    const engine = open({ checkpointOnClose: false });

    for (let n = 1; n <= 5; n += 1) {
      write(engine, n);
      engine.checkpoint();
    }

    expect(snapshots()).toHaveLength(2);
  });

  it("keeps the number of snapshots it is asked to", () => {
    const engine = open({ checkpointRetention: 4, checkpointOnClose: false });

    for (let n = 1; n <= 7; n += 1) {
      write(engine, n);
      engine.checkpoint();
    }

    expect(snapshots()).toHaveLength(4);
  });

  it("recovers from an older snapshot when the newest ones are damaged", () => {
    const engine = open({
      checkpointRetention: 3,
      checkpointOnClose: false,
      segmentSizeBytes: 300,
    });

    for (let n = 1; n <= 6; n += 1) {
      write(engine, n);
      engine.checkpoint();
    }

    engine.close();
    opened.length = 0;

    const files = snapshots();

    expect(files).toHaveLength(3);

    for (const name of files.slice(-2)) {
      truncateSync(join(directory, "checkpoints", name), 10);
    }

    const recovered = open();

    expect(count(recovered)).toBe(6);
    expect(recovered.recovery.skippedCheckpoints).toHaveLength(2);
  });

  it("rejects a retention below two or that is not an integer", () => {
    for (const checkpointRetention of [1, 0, -1, 2.5, Number.NaN]) {
      expect(() => open({ checkpointRetention })).toThrow(TypeError);
    }
  });
});

describe("checkpoint interval", () => {
  it("checkpoints on a timer only when something was written", () => {
    vi.useFakeTimers();

    const engine = open({
      checkpointIntervalMs: 1_000,
      checkpointOnClose: false,
    });

    write(engine, 1);

    expect(snapshots()).toHaveLength(0);

    vi.advanceTimersByTime(1_000);

    expect(snapshots()).toHaveLength(1);

    vi.advanceTimersByTime(5_000);

    expect(snapshots()).toHaveLength(1);

    write(engine, 2);
    vi.advanceTimersByTime(1_000);

    expect(snapshots()).toHaveLength(2);
  });

  it("does not checkpoint on a timer unless asked to", () => {
    vi.useFakeTimers();

    const engine = open({ checkpointOnClose: false });

    write(engine, 1);
    vi.advanceTimersByTime(3_600_000);

    expect(snapshots()).toHaveLength(0);
  });

  it("stops the timer when the engine closes", () => {
    vi.useFakeTimers();

    const engine = open({ checkpointIntervalMs: 1_000 });

    write(engine, 1);
    engine.close();

    const before = snapshots();

    vi.advanceTimersByTime(10_000);

    expect(snapshots()).toEqual(before);
  });

  it("rejects an interval that is not a positive integer", () => {
    for (const checkpointIntervalMs of [0, -5, 1.5, Number.NaN]) {
      expect(() => open({ checkpointIntervalMs })).toThrow(TypeError);
    }
  });
});

describe("manifest replacement", () => {
  it("removes a temporary manifest left by a crash", () => {
    open().close();
    opened.length = 0;

    const temporary = join(directory, "manifest.json.tmp");

    writeFileSync(temporary, "{ half written");

    const engine = open();

    expect(existsSync(temporary)).toBe(false);
    expect(engine.listDatabases()).toEqual([]);
  });

  it("leaves the old file and no temporary file when the rename fails", () => {
    const target = join(directory, "target");

    mkdirSync(target);

    expect(() => writeFileAtomic(directory, target, "new contents")).toThrow();
    expect(existsSync(`${target}.tmp`)).toBe(false);
    expect(existsSync(target)).toBe(true);
  });

  it("replaces a file completely", () => {
    const target = join(directory, "file.json");

    writeFileAtomic(directory, target, "one");
    writeFileAtomic(directory, target, "two");

    expect(readdirSync(directory).filter((n) => n.endsWith(".tmp"))).toEqual(
      [],
    );
    expect(existsSync(target)).toBe(true);
  });
});
