import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const fsyncCalls = vi.hoisted(() => ({ count: 0 }));

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();

  return {
    ...actual,
    fsyncSync: (fd: number) => {
      fsyncCalls.count += 1;
      actual.fsyncSync(fd);
    },
  };
});

import { WriteAheadLog } from "./write-ahead-log.js";

let directory: string;

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-wal-group-"));
});

afterEach(() => {
  rmSync(directory, { recursive: true, force: true });
});

const bytes = (text: string): Uint8Array => new TextEncoder().encode(text);

function texts(log: WriteAheadLog): string[] {
  return [...log.records()].map((record) =>
    new TextDecoder().decode(record.payload),
  );
}

describe("WriteAheadLog group commit", () => {
  it("flushes every append by default", () => {
    const log = WriteAheadLog.open({ directory });
    const before = fsyncCalls.count;

    log.append(1, bytes("a"));
    log.append(1, bytes("b"));

    expect(fsyncCalls.count - before).toBe(2);
    expect(log.hasUncommittedWrites).toBe(false);

    log.close();
  });

  it("flushes once for many appends", () => {
    const log = WriteAheadLog.open({ directory, groupCommit: true });
    const before = fsyncCalls.count;

    for (let index = 0; index < 10; index += 1) {
      log.append(1, bytes(`record-${index}`));
    }

    expect(fsyncCalls.count - before).toBe(0);
    expect(log.hasUncommittedWrites).toBe(true);

    log.commit();

    expect(fsyncCalls.count - before).toBe(1);
    expect(log.hasUncommittedWrites).toBe(false);

    log.commit();

    expect(fsyncCalls.count - before).toBe(1);

    log.close();
  });

  it("keeps every record readable before and after the commit", () => {
    const log = WriteAheadLog.open({ directory, groupCommit: true });

    log.append(1, bytes("a"));
    log.append(1, bytes("b"));

    expect(texts(log)).toEqual(["a", "b"]);

    log.commit();
    log.close();

    const reopened = WriteAheadLog.open({ directory });

    expect(texts(reopened)).toEqual(["a", "b"]);

    reopened.close();
  });

  it("flushes pending appends when it closes", () => {
    const log = WriteAheadLog.open({ directory, groupCommit: true });

    log.append(1, bytes("a"));

    const before = fsyncCalls.count;

    log.close();

    expect(fsyncCalls.count - before).toBeGreaterThanOrEqual(1);
  });

  it("treats a sync as a commit", () => {
    const log = WriteAheadLog.open({ directory, groupCommit: true });

    log.append(1, bytes("a"));
    log.sync();

    expect(log.hasUncommittedWrites).toBe(false);

    log.close();
  });

  it("clears the flag when a segment rotates", () => {
    const log = WriteAheadLog.open({
      directory,
      groupCommit: true,
      segmentSizeBytes: 200,
    });

    for (let index = 0; index < 6; index += 1) {
      log.append(1, bytes(`record-${index}-${"x".repeat(40)}`));
    }

    expect(log.segmentCount).toBeGreaterThan(1);
    expect(texts(log)).toHaveLength(6);

    log.commit();

    expect(log.hasUncommittedWrites).toBe(false);

    log.close();
  });

  it("only applies to the flushed write concern", () => {
    expect(() =>
      WriteAheadLog.open({
        directory,
        writeConcern: "journaled",
        groupCommit: true,
      }),
    ).toThrow(TypeError);
  });

  it("does nothing when committing a closed log", () => {
    const log = WriteAheadLog.open({ directory, groupCommit: true });

    log.close();

    expect(() => log.commit()).not.toThrow();
  });
});
