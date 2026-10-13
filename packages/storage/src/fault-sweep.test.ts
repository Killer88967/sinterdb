import { cpSync, mkdtempSync, readdirSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Fails one file system call and checks what is left on disk. The call to fail
// is chosen by its position in a fixed workload, so the tests try every point
// where the storage engine touches the disk.

interface Plan {
  /** Position (from 1) of the call to fail, or 0 for none. */
  failAt: number;
  code: string;
  counting: boolean;
  calls: number;
  failed: boolean;
}

const plan = vi.hoisted<Plan>(() => ({
  failAt: 0,
  code: "EIO",
  counting: false,
  calls: 0,
  failed: false,
}));

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();

  const hit = (): void => {
    if (!plan.counting) {
      return;
    }

    plan.calls += 1;

    if (plan.calls === plan.failAt) {
      plan.failed = true;

      throw Object.assign(new Error(`${plan.code}: injected`), {
        code: plan.code,
      });
    }
  };

  return {
    ...actual,
    writeSync: (...args: Parameters<typeof actual.writeSync>) => {
      hit();

      return actual.writeSync(...args);
    },
    fsyncSync: (fd: number) => {
      hit();
      actual.fsyncSync(fd);
    },
    openSync: (...args: Parameters<typeof actual.openSync>) => {
      hit();

      return actual.openSync(...args);
    },
    renameSync: (from: string, to: string) => {
      hit();
      actual.renameSync(from, to);
    },
    unlinkSync: (path: string) => {
      hit();
      actual.unlinkSync(path);
    },
    ftruncateSync: (fd: number, length?: number) => {
      hit();
      actual.ftruncateSync(fd, length);
    },
    mkdirSync: (...args: Parameters<typeof actual.mkdirSync>) => {
      hit();

      return actual.mkdirSync(...args);
    },
  };
});

import { StorageEngine } from "./engine/storage-engine.js";
import { StorageError, StorageErrorCode } from "./errors.js";

let root: string;
let counter = 0;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "sinterdb-sweep-"));
  plan.failAt = 0;
  plan.counting = false;
  plan.calls = 0;
  plan.failed = false;
});

afterEach(() => {
  plan.counting = false;
  rmSync(root, { recursive: true, force: true });
});

function freshDirectory(): string {
  counter += 1;

  return join(root, `run-${counter}`);
}

type Step = (engine: StorageEngine) => void;

const things = (engine: StorageEngine) =>
  engine.openCollection("app", "things");

/**
 * A workload that touches the log, rotation, indexes, snapshots and pruning.
 * Each step is one operation the engine either completes or reports as failed.
 */
const STEPS: Step[] = [
  (e) => {
    // Creating a collection is its own log record, so it is its own step.
    things(e);
  },
  (e) => {
    things(e).insertOne({ k: "a", n: 1, tag: "x" });
  },
  (e) => {
    things(e).insertMany([
      { k: "b", n: 2, tag: "y" },
      { k: "c", n: 3, tag: "x" },
    ]);
  },
  (e) => {
    things(e).createIndex({ field: "tag" });
  },
  (e) => {
    things(e).createIndex({ field: "n", unique: true });
  },
  (e) => {
    things(e).updateOne({ k: "a" }, { $set: { n: 10 } });
  },
  (e) => {
    things(e).deleteOne({ k: "b" });
  },
  (e) => {
    e.checkpoint();
  },
  (e) => {
    things(e).insertOne({ k: "d", n: 4, tag: "z", pad: "p".repeat(300) });
  },
  (e) => {
    things(e).updateMany({ tag: "x" }, { $inc: { n: 100 } });
  },
  (e) => {
    e.checkpoint();
  },
  (e) => {
    things(e).dropIndex("tag_1");
  },
  (e) => {
    things(e).insertOne({ k: "e", n: 5, tag: "w", pad: "q".repeat(300) });
  },
  (e) => {
    e.checkpoint();
  },
  (e) => {
    things(e).deleteMany({ n: { $gt: 100 } });
  },
];

const OPTIONS = {
  segmentSizeBytes: 600,
  checkpointOnClose: false,
} as const;

function stateOf(engine: StorageEngine): string {
  const out: Record<string, unknown> = {};

  for (const database of engine.listDatabases().sort()) {
    for (const name of engine.listCollections(database).sort()) {
      const collection = engine.getCollection(database, name);

      if (collection === undefined) {
        continue;
      }

      // Generated ids differ between runs, so compare documents without them.
      const documents = [...collection.find({})]
        .map(({ _id, ...rest }) => rest)
        .sort((a, b) => String(a["k"]).localeCompare(String(b["k"])));

      out[`${database}.${name}`] = {
        documents,
        indexes: collection
          .listIndexes()
          .map((index) => index.name)
          .sort(),
      };
    }
  }

  return JSON.stringify(out);
}

/** The state after 0, 1, 2, ... steps, taken from a run with no faults. */
function referenceStates(): string[] {
  const directory = freshDirectory();
  const engine = StorageEngine.open({ directory, ...OPTIONS });
  const states = [stateOf(engine)];

  for (const step of STEPS) {
    step(engine);
    states.push(stateOf(engine));
  }

  engine.close();

  return states;
}

interface Outcome {
  /** How many steps completed. */
  completed: number;
  /** The step that failed, if any, and the error it threw. */
  error?: unknown;
  /** The data directory as it was at the moment of the failure. */
  snapshot: string;
  /** Steps that failed with DISK_FULL and were skipped (continue mode). */
  skipped: number[];
}

function runWithFault(
  failAt: number,
  code: string,
  continueAfterDiskFull: boolean,
): Outcome {
  const directory = freshDirectory();
  const snapshot = `${directory}-at-failure`;
  const skipped: number[] = [];
  let completed = 0;
  let error: unknown;
  let engine: StorageEngine | undefined;

  plan.failAt = failAt;
  plan.code = code;
  plan.calls = 0;
  plan.failed = false;
  plan.counting = true;

  try {
    engine = StorageEngine.open({ directory, ...OPTIONS });

    for (let index = 0; index < STEPS.length; index += 1) {
      try {
        (STEPS[index] as Step)(engine);
        completed += 1;
      } catch (thrown: unknown) {
        if (
          continueAfterDiskFull &&
          thrown instanceof StorageError &&
          thrown.code === StorageErrorCode.DiskFull
        ) {
          // The call that failed was the only one; later calls succeed.
          skipped.push(index);
          plan.counting = false;
          continue;
        }

        error = thrown;
        break;
      }
    }
  } catch (thrown: unknown) {
    error = thrown;
  } finally {
    plan.counting = false;
  }

  if (error !== undefined || skipped.length > 0) {
    // What a process killed at this instant would leave behind.
  }

  if (existsSync(directory)) {
    cpSync(directory, snapshot, {
      recursive: true,
      filter: (source) => !source.endsWith("LOCK"),
    });
  }

  try {
    engine?.close();
  } catch {
    // The engine may be broken on purpose.
  }

  return { completed, error, snapshot, skipped };
}

function countCalls(): number {
  const directory = freshDirectory();

  plan.failAt = 0;
  plan.calls = 0;
  plan.counting = true;

  const engine = StorageEngine.open({ directory, ...OPTIONS });

  for (const step of STEPS) {
    step(engine);
  }

  engine.close();
  plan.counting = false;

  return plan.calls;
}

function reopen(directory: string): StorageEngine {
  return StorageEngine.open({ directory, checkpointOnClose: false });
}

function assertConsistent(engine: StorageEngine): void {
  for (const entry of engine.validateIndexes()) {
    expect(entry.report.issues).toEqual([]);
  }
}

describe("failing every file system call in turn", () => {
  it("has a workload that makes enough calls to be worth sweeping", () => {
    expect(countCalls()).toBeGreaterThan(100);
  });

  it.each(["EIO", "ENOSPC"])(
    "recovers to an acknowledged state whichever call fails with %s",
    (code) => {
      const states = referenceStates();
      const total = countCalls();
      const failures: string[] = [];

      for (let failAt = 1; failAt <= total; failAt += 1) {
        const outcome = runWithFault(failAt, code, false);

        if (!plan.failed && outcome.error === undefined) {
          continue;
        }

        let recovered: string;

        try {
          const engine = reopen(outcome.snapshot);

          assertConsistent(engine);
          recovered = stateOf(engine);
          engine.close();
        } catch (error: unknown) {
          failures.push(
            `call ${failAt}: the directory could not be reopened: ${String(error)}`,
          );
          continue;
        }

        // Every completed step must survive. The step that failed may or may
        // not have reached the disk, but nothing else may appear.
        const allowed = new Set([
          states[outcome.completed],
          states[outcome.completed + 1],
        ]);

        if (!allowed.has(recovered)) {
          failures.push(
            `call ${failAt}: ${outcome.completed} steps completed but the recovered state matches ${states.indexOf(recovered)}`,
          );
        }
      }

      expect(failures).toEqual([]);
    },
    120_000,
  );

  it("applies nothing when a step reports a full disk, and keeps working", () => {
    const states = referenceStates();
    const total = countCalls();
    const failures: string[] = [];
    let sawDiskFull = 0;

    for (let failAt = 1; failAt <= total; failAt += 1) {
      const outcome = runWithFault(failAt, "ENOSPC", true);

      if (outcome.skipped.length === 0) {
        continue;
      }

      sawDiskFull += 1;

      let recovered: string;

      try {
        const engine = reopen(outcome.snapshot);

        assertConsistent(engine);
        recovered = stateOf(engine);
        engine.close();
      } catch (error: unknown) {
        failures.push(`call ${failAt}: not reopenable: ${String(error)}`);
        continue;
      }

      // Replay the steps that were not skipped on a clean engine. The
      // recovered data must be exactly what they produce: a step that reported
      // DISK_FULL left no trace.
      const directory = freshDirectory();
      const engine = StorageEngine.open({ directory, ...OPTIONS });

      STEPS.forEach((step, index) => {
        if (!outcome.skipped.includes(index)) {
          try {
            step(engine);
          } catch {
            // A later step can depend on a skipped one.
          }
        }
      });

      const expected = stateOf(engine);

      engine.close();

      if (recovered !== expected && !states.includes(recovered)) {
        failures.push(`call ${failAt}: skipped ${outcome.skipped.join(",")}`);
      }
    }

    expect(sawDiskFull).toBeGreaterThan(0);
    expect(failures).toEqual([]);
  }, 120_000);

  it("never leaves temporary files that block the next start", () => {
    const total = countCalls();

    for (let failAt = 1; failAt <= total; failAt += 1) {
      const outcome = runWithFault(failAt, "EIO", false);

      if (!existsSync(join(outcome.snapshot, "manifest.json"))) {
        continue;
      }

      const engine = reopen(outcome.snapshot);

      engine.close();

      const leftovers = [
        ...readdirSync(join(outcome.snapshot, "checkpoints")),
        ...readdirSync(outcome.snapshot),
      ].filter((name) => name.endsWith(".tmp"));

      expect(leftovers).toEqual([]);
    }
  }, 120_000);

  it("lets the next start succeed after a failed start, with no lock left over", () => {
    const probe = freshDirectory();

    plan.failAt = 0;
    plan.calls = 0;
    plan.counting = true;
    StorageEngine.open({ directory: probe, ...OPTIONS }).close();
    plan.counting = false;

    const total = plan.calls;

    expect(total).toBeGreaterThan(10);

    for (const code of ["EIO", "ENOSPC", "EACCES"]) {
      for (let failAt = 1; failAt <= total; failAt += 1) {
        const directory = freshDirectory();

        plan.failAt = failAt;
        plan.code = code;
        plan.calls = 0;
        plan.counting = true;

        try {
          StorageEngine.open({ directory, ...OPTIONS }).close();
        } catch {
          // Expected for the call that was failed.
        } finally {
          plan.counting = false;
        }

        // No cleanup between the two starts: a leftover lock would show here.
        const engine = StorageEngine.open({ directory, ...OPTIONS });

        engine.close();
      }
    }
  }, 120_000);
});
