import { existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

interface Plan {
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
    readSync: (...args: Parameters<typeof actual.readSync>) => {
      hit();

      return actual.readSync(...args);
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
    mkdirSync: (...args: Parameters<typeof actual.mkdirSync>) => {
      hit();

      return actual.mkdirSync(...args);
    },
    rmdirSync: (...args: Parameters<typeof actual.rmdirSync>) => {
      hit();
      actual.rmdirSync(...args);
    },
  };
});

import { StorageEngine } from "../engine/storage-engine.js";

import { createBackup, restoreBackup, verifyBackup } from "./index.js";

let root: string;
let source: string;
let counter = 0;

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), "sinterdb-backup-faults-"));
  source = join(root, "source");
  plan.failAt = 0;
  plan.counting = false;
  plan.calls = 0;
  plan.failed = false;

  const engine = StorageEngine.open({ directory: source });
  const things = engine.openCollection("app", "things");

  for (let n = 0; n < 30; n += 1) {
    things.insertOne({ n });
  }

  engine.checkpoint();
  things.insertOne({ n: 30 });
  engine.close();
});

afterEach(() => {
  plan.counting = false;
  rmSync(root, { recursive: true, force: true });
});

function next(name: string): string {
  counter += 1;

  return join(root, `${name}-${counter}`);
}

function leftovers(): string[] {
  return readdirSync(root).filter(
    (name) => name.endsWith(".partial") || name.endsWith(".restoring"),
  );
}

function measure(action: () => void): number {
  plan.failAt = 0;
  plan.calls = 0;
  plan.counting = true;

  try {
    action();
  } finally {
    plan.counting = false;
  }

  return plan.calls;
}

function attempt(failAt: number, code: string, action: () => void): void {
  plan.failAt = failAt;
  plan.code = code;
  plan.calls = 0;
  plan.failed = false;
  plan.counting = true;

  try {
    action();
  } catch {
    // The failure is expected; the checks below look at what is left.
  } finally {
    plan.counting = false;
  }
}

function documentCount(directory: string): number {
  const engine = StorageEngine.open({ directory, checkpointOnClose: false });

  try {
    return engine.getCollection("app", "things")?.documentCount ?? 0;
  } finally {
    engine.close();
  }
}

describe.each(["EIO", "ENOSPC"])("backup when a call fails with %s", (code) => {
  it("leaves either a complete backup or nothing, and frees the source", () => {
    const total = measure(() =>
      createBackup({ dataDirectory: source, backupDirectory: next("probe") }),
    );

    expect(total).toBeGreaterThan(20);

    for (let failAt = 1; failAt <= total; failAt += 1) {
      const destination = next("backup");

      attempt(failAt, code, () =>
        createBackup({ dataDirectory: source, backupDirectory: destination }),
      );

      expect(leftovers(), `call ${failAt}`).toEqual([]);

      if (existsSync(destination)) {
        verifyBackup(destination);
      }

      // The source can be opened again, so the lock was released.
      expect(documentCount(source), `call ${failAt}`).toBe(31);
    }
  }, 120_000);

  it("restores completely or not at all", () => {
    const backup = next("good");

    createBackup({ dataDirectory: source, backupDirectory: backup });

    const total = measure(() =>
      restoreBackup({ backupDirectory: backup, dataDirectory: next("probe") }),
    );

    expect(total).toBeGreaterThan(20);

    for (let failAt = 1; failAt <= total; failAt += 1) {
      const target = next("restored");

      attempt(failAt, code, () =>
        restoreBackup({ backupDirectory: backup, dataDirectory: target }),
      );

      expect(leftovers(), `call ${failAt}`).toEqual([]);

      if (existsSync(target)) {
        expect(documentCount(target), `call ${failAt}`).toBe(31);
      }

      // The backup itself is never damaged by a failed restore.
      verifyBackup(backup);
    }
  }, 120_000);
});
