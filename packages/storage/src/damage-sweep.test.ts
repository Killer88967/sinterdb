import {
  cpSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  truncateSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { StorageEngine } from "./engine/storage-engine.js";
import { StorageError, StorageErrorCode } from "./errors.js";

// Damages a data directory one byte at a time and checks that recovery either
// returns a state the database really had, or says plainly that the data is
// damaged. It never returns anything else.

let root: string;
let counter = 0;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "sinterdb-damage-"));
});

afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

const things = (engine: StorageEngine) =>
  engine.openCollection("app", "things");

function stateOf(engine: StorageEngine): string {
  const collection = engine.getCollection("app", "things");

  if (collection === undefined) {
    return "none";
  }

  const documents = [...collection.find({})]
    .map(({ _id, ...rest }) => rest)
    .sort((a, b) => String(a["k"]).localeCompare(String(b["k"])));

  return JSON.stringify({
    documents,
    indexes: collection
      .listIndexes()
      .map((index) => index.name)
      .sort(),
  });
}

const STEPS: ((engine: StorageEngine) => void)[] = [
  (e) => {
    things(e);
  },
  (e) => {
    things(e).insertOne({ k: "a", n: 1 });
  },
  (e) => {
    things(e).insertMany([
      { k: "b", n: 2 },
      { k: "c", n: 3 },
    ]);
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
    things(e).insertOne({ k: "d", n: 4, note: "n".repeat(40) });
  },
];

interface Built {
  directory: string;
  /** The state after 0, 1, 2, ... steps. */
  states: string[];
}

/**
 * Builds a data directory. With `checkpointAfter`, a snapshot is taken after
 * each of those step counts, and the engine is then closed without a final one.
 */
function build(checkpointAfter: readonly number[] = []): Built {
  counter += 1;

  const directory = join(root, `source-${counter}`);
  const engine = StorageEngine.open({ directory, checkpointOnClose: false });
  const states = [stateOf(engine)];

  STEPS.forEach((step, index) => {
    step(engine);
    states.push(stateOf(engine));

    if (checkpointAfter.includes(index + 1)) {
      engine.checkpoint();
    }
  });

  engine.close();

  return { directory, states };
}

function copyOf(source: string): string {
  counter += 1;

  const target = join(root, `copy-${counter}`);

  cpSync(source, target, { recursive: true });

  return target;
}

function onlyFile(directory: string, suffix: string): string {
  const names = readdirSync(directory).filter((n) => n.endsWith(suffix));

  expect(names).toHaveLength(1);

  return join(directory, names[0] as string);
}

type Result =
  | { kind: "state"; state: string; skippedSnapshots: number }
  | { kind: "corrupt" }
  | { kind: "other"; error: unknown };

function recover(directory: string): Result {
  try {
    const engine = StorageEngine.open({ directory, checkpointOnClose: false });
    const state = stateOf(engine);
    const skippedSnapshots = engine.recovery.skippedCheckpoints.length;

    engine.close();

    return { kind: "state", state, skippedSnapshots };
  } catch (error: unknown) {
    if (
      error instanceof StorageError &&
      (error.code === StorageErrorCode.Corruption ||
        error.code === StorageErrorCode.UnsupportedFormat)
    ) {
      return { kind: "corrupt" };
    }

    return { kind: "other", error };
  }
}

describe("a log cut short at every byte", () => {
  it("recovers a state it really had, never going backwards as more survives", () => {
    const { directory, states } = build();
    const segment = onlyFile(join(directory, "wal"), ".wal");
    const size = statSync(segment).size;
    let furthest = 0;

    for (let length = 0; length <= size; length += 1) {
      const copy = copyOf(directory);

      truncateSync(onlyFile(join(copy, "wal"), ".wal"), length);

      const result = recover(copy);

      expect(result.kind, `length ${length}`).toBe("state");

      if (result.kind !== "state") {
        continue;
      }

      const index = states.indexOf(result.state);

      expect(
        index,
        `length ${length} gave a state it never had`,
      ).toBeGreaterThan(-1);
      expect(index, `length ${length} lost records`).toBeGreaterThanOrEqual(
        furthest,
      );
      furthest = index;
      rmSync(copy, { recursive: true, force: true });
    }

    expect(furthest).toBe(STEPS.length);
  }, 120_000);
});

describe("a flipped byte in the log", () => {
  it("is either reported as damage or leaves a state the database had", () => {
    const { directory, states } = build();
    const segment = onlyFile(join(directory, "wal"), ".wal");
    const bytes = readFileSync(segment);
    let reported = 0;
    let recovered = 0;

    for (let offset = 0; offset < bytes.length; offset += 1) {
      const copy = copyOf(directory);
      const damaged = Buffer.from(bytes);

      damaged[offset] = (damaged[offset] as number) ^ 0xff;
      writeFileSync(onlyFile(join(copy, "wal"), ".wal"), damaged);

      const result = recover(copy);

      if (result.kind === "other") {
        throw new Error(`offset ${offset}: ${String(result.error)}`);
      }

      if (result.kind === "corrupt") {
        reported += 1;
      } else {
        recovered += 1;
        expect(
          states.includes(result.state),
          `offset ${offset} recovered a state the database never had`,
        ).toBe(true);
      }

      rmSync(copy, { recursive: true, force: true });
    }

    // A flip inside the last record looks like an unfinished write and loses
    // only that record. A flip earlier must be reported.
    expect(reported).toBeGreaterThan(0);
    expect(recovered).toBeGreaterThan(0);
  }, 120_000);
});

describe("a flipped byte in the newest snapshot", () => {
  it("falls back to the older snapshot and loses nothing", () => {
    const { directory, states } = build([3, 5]);
    const checkpoints = join(directory, "checkpoints");
    const snapshots = readdirSync(checkpoints)
      .filter((name) => name.endsWith(".snap"))
      .sort();

    expect(snapshots).toHaveLength(2);

    const newest = join(checkpoints, snapshots[1] as string);
    const bytes = readFileSync(newest);

    for (let offset = 0; offset < bytes.length; offset += 1) {
      const copy = copyOf(directory);
      const damaged = Buffer.from(bytes);

      damaged[offset] = (damaged[offset] as number) ^ 0xff;
      writeFileSync(join(copy, "checkpoints", snapshots[1] as string), damaged);

      const result = recover(copy);

      expect(result, `offset ${offset}`).toMatchObject({
        kind: "state",
        skippedSnapshots: 1,
      });

      if (result.kind === "state") {
        expect(result.state, `offset ${offset}`).toBe(states[STEPS.length]);
      }

      rmSync(copy, { recursive: true, force: true });
    }
  }, 120_000);
});

describe("a flipped byte in the manifest", () => {
  it("opens the directory or reports a clear error", () => {
    const { directory, states } = build();
    const bytes = readFileSync(join(directory, "manifest.json"));

    for (let offset = 0; offset < bytes.length; offset += 1) {
      const copy = copyOf(directory);
      const damaged = Buffer.from(bytes);

      damaged[offset] = (damaged[offset] as number) ^ 0xff;
      writeFileSync(join(copy, "manifest.json"), damaged);

      const result = recover(copy);

      if (result.kind === "other") {
        throw new Error(`offset ${offset}: ${String(result.error)}`);
      }

      if (result.kind === "state") {
        expect(states.at(-1)).toBe(result.state);
      }

      rmSync(copy, { recursive: true, force: true });
    }
  }, 120_000);
});
