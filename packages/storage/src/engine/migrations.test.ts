import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { StorageError, StorageErrorCode } from "../errors.js";

import {
  MIGRATIONS,
  planMigrations,
  validateMigrations,
  type Migration,
  type MigrationEvent,
  type MigrationPlan,
} from "./migrations.js";
import { STORAGE_FORMAT_VERSION, StorageEngine } from "./storage-engine.js";

let directory: string;

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-migrations-"));
});

afterEach(() => {
  rmSync(directory, { recursive: true, force: true });
});

const step = (
  from: number,
  run?: Migration["run"],
  description = `step ${from}`,
): Migration => ({
  from,
  to: from + 1,
  description,
  ...(run === undefined ? {} : { run }),
});

describe("the built-in steps", () => {
  it("lead from version 1 to the current version without a gap", () => {
    expect(
      validateMigrations({
        targetVersion: STORAGE_FORMAT_VERSION,
        migrations: MIGRATIONS,
      }),
    ).toEqual([]);
  });
});

describe("validateMigrations", () => {
  it("accepts a complete chain", () => {
    expect(
      validateMigrations({
        targetVersion: 4,
        migrations: [step(1), step(2), step(3)],
      }),
    ).toEqual([]);
  });

  it("reports missing, repeated and oversized steps", () => {
    const problems = validateMigrations({
      targetVersion: 5,
      migrations: [
        step(1),
        step(1),
        { from: 3, to: 5, description: "jump", run: () => undefined },
        step(4, undefined, " "),
      ],
    });

    expect(problems).toEqual(
      expect.arrayContaining([
        "There is more than one step from version 1.",
        "The step from 3 to 5 must move up by exactly one version.",
        "The step from 4 has no description.",
        "There is no step from version 2.",
      ]),
    );
  });
});

describe("planMigrations", () => {
  const plan: MigrationPlan = {
    targetVersion: 4,
    migrations: [step(3), step(1), step(2)],
  };

  it("returns the steps in order whatever order they were listed in", () => {
    expect(planMigrations(1, plan).map((s) => s.from)).toEqual([1, 2, 3]);
    expect(planMigrations(3, plan).map((s) => s.from)).toEqual([3]);
  });

  it("returns nothing when the directory is current", () => {
    expect(planMigrations(4, plan)).toEqual([]);
  });

  it("names the missing step", () => {
    try {
      planMigrations(1, { targetVersion: 4, migrations: [step(1), step(3)] });
      expect.unreachable();
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(StorageError);
      expect((error as StorageError).code).toBe(
        StorageErrorCode.UnsupportedFormat,
      );
      expect((error as Error).message).toContain("from version 2 to 3");
    }
  });
});

function manifest(): Record<string, unknown> {
  return JSON.parse(
    readFileSync(join(directory, "manifest.json"), "utf8"),
  ) as Record<string, unknown>;
}

/** Creates a directory that looks like it was written by format version 1. */
function createVersionOne(): void {
  const engine = StorageEngine.open({
    directory,
    migrationPlan: { targetVersion: 1, migrations: [] },
  });

  engine.openCollection("app", "things").insertOne({ n: 1 });
  engine.openCollection("app", "things").insertOne({ n: 2 });
  engine.close();

  expect(manifest()["formatVersion"]).toBe(1);
}

function openWith(
  plan: MigrationPlan,
  events: MigrationEvent[] = [],
): StorageEngine {
  return StorageEngine.open({
    directory,
    migrationPlan: plan,
    onMigration: (event) => events.push(event),
  });
}

const marker = (name: string) => join(directory, name);

describe("opening an older data directory", () => {
  it("runs every step in order, keeps the data and records the upgrade", () => {
    createVersionOne();

    const order: number[] = [];
    const events: MigrationEvent[] = [];
    const engine = openWith(
      {
        targetVersion: 4,
        migrations: [
          step(1, () => {
            order.push(1);
          }),
          step(2, () => {
            order.push(2);
            writeFileSync(marker("two.txt"), "2");
          }),
          step(3, () => {
            order.push(3);
            writeFileSync(marker("three.txt"), "3");
          }),
        ],
      },
      events,
    );

    expect(order).toEqual([1, 2, 3]);
    expect(events.map((e) => [e.from, e.to])).toEqual([
      [1, 2],
      [2, 3],
      [3, 4],
    ]);
    expect(events[0]?.description).toBe("step 1");
    expect(engine.getCollection("app", "things")?.documentCount).toBe(2);
    engine.close();

    expect(manifest()).toMatchObject({ formatVersion: 4, upgradedFrom: 1 });
    expect(manifest()).not.toHaveProperty("migratingFrom");
    expect(existsSync(marker("two.txt"))).toBe(true);
    expect(existsSync(marker("three.txt"))).toBe(true);
  });

  it("marks the directory as newer before any step rewrites a file", () => {
    createVersionOne();

    let seen: Record<string, unknown> = {};

    openWith({
      targetVersion: 2,
      migrations: [
        step(1, () => {
          seen = manifest();
        }),
      ],
    }).close();

    expect(seen).toMatchObject({ formatVersion: 2, migratingFrom: 1 });
  });

  it("does not mark the directory when no step rewrites anything", () => {
    createVersionOne();

    let during: Record<string, unknown> = {};

    StorageEngine.open({
      directory,
      migrationPlan: { targetVersion: 2, migrations: [step(1)] },
      onMigration: () => {
        during = manifest();
      },
    }).close();

    expect(during).toMatchObject({ formatVersion: 1 });
    expect(during).not.toHaveProperty("migratingFrom");
    expect(manifest()).toMatchObject({ formatVersion: 2, upgradedFrom: 1 });
  });

  it("does nothing to a directory that is already current", () => {
    createVersionOne();
    openWith({ targetVersion: 2, migrations: [step(1)] }).close();

    const before = readFileSync(join(directory, "manifest.json"), "utf8");
    const events: MigrationEvent[] = [];

    openWith({ targetVersion: 2, migrations: [step(1)] }, events).close();

    expect(events).toEqual([]);
    expect(readFileSync(join(directory, "manifest.json"), "utf8")).toBe(before);
  });

  it("changes nothing when the chain has a gap", () => {
    createVersionOne();

    const before = readFileSync(join(directory, "manifest.json"), "utf8");
    let created = false;

    expect(() =>
      openWith({
        targetVersion: 3,
        migrations: [
          step(2, () => {
            created = true;
          }),
        ],
      }),
    ).toThrow(/no step from version 1 to 2/);

    expect(created).toBe(false);
    expect(readFileSync(join(directory, "manifest.json"), "utf8")).toBe(before);
    // The lock was released, so the directory can still be opened.
    openWith({ targetVersion: 1, migrations: [] }).close();
  });
});

describe("a step that fails", () => {
  const failing = (state: { failures: number }): MigrationPlan => ({
    targetVersion: 4,
    migrations: [
      step(1, () => {
        writeFileSync(marker("one.txt"), "1");
      }),
      step(2, () => {
        writeFileSync(marker("two.txt"), "2");
      }),
      step(3, () => {
        if (state.failures > 0) {
          state.failures -= 1;

          throw new Error("disk went away");
        }

        writeFileSync(marker("three.txt"), "3");
      }),
    ],
  });

  it("leaves the directory marked, refuses older versions, and finishes next time", () => {
    createVersionOne();

    const state = { failures: 1 };

    expect(() => openWith(failing(state))).toThrow("disk went away");
    expect(manifest()).toMatchObject({ formatVersion: 4, migratingFrom: 1 });

    // A build that only knows version 2 must not touch the half-upgraded files.
    expect(() => openWith({ targetVersion: 2, migrations: [step(1)] })).toThrow(
      /only supports up to version 2/,
    );

    const events: MigrationEvent[] = [];
    const engine = openWith(failing(state), events);

    // The whole chain runs again from where the upgrade began.
    expect(events.map((e) => e.from)).toEqual([1, 2, 3]);
    expect(engine.getCollection("app", "things")?.documentCount).toBe(2);
    engine.close();

    expect(existsSync(marker("three.txt"))).toBe(true);
    expect(manifest()).toMatchObject({ formatVersion: 4, upgradedFrom: 1 });
    expect(manifest()).not.toHaveProperty("migratingFrom");
  });

  it("is finished by a newer build that has more steps", () => {
    createVersionOne();

    expect(() => openWith(failing({ failures: 1 }))).toThrow();

    const events: MigrationEvent[] = [];
    const longer: MigrationPlan = {
      targetVersion: 5,
      migrations: [...failing({ failures: 0 }).migrations, step(4)],
    };

    openWith(longer, events).close();

    expect(events.map((e) => e.from)).toEqual([1, 2, 3, 4]);
    expect(manifest()).toMatchObject({ formatVersion: 5, upgradedFrom: 1 });
  });

  it("rejects a manifest that records an impossible starting version", () => {
    createVersionOne();

    for (const migratingFrom of [0, 4, 7, 1.5, "1"]) {
      const current = manifest();

      writeFileSync(
        join(directory, "manifest.json"),
        JSON.stringify({ ...current, formatVersion: 4, migratingFrom }),
      );

      try {
        openWith(failing({ failures: 0 }));
        expect.unreachable(String(migratingFrom));
      } catch (error: unknown) {
        expect((error as StorageError).code).toBe(StorageErrorCode.Corruption);
      }
    }
  });
});
