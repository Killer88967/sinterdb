import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

interface Fault {
  /** Which call to break. */
  readonly call: "writeSync" | "fsyncSync" | "openSync";
  readonly code: string;
  /** For writeSync: write this many bytes first, like a disk that fills up. */
  readonly partial?: number;
  /** Only break calls whose path or descriptor target matches. */
  readonly pathEndsWith?: string;
}

const control = vi.hoisted(() => ({
  fault: undefined as Fault | undefined,
  hits: 0,
}));

vi.mock("node:fs", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs")>();
  const failure = (code: string): Error =>
    Object.assign(new Error(`${code}: injected`), { code });

  return {
    ...actual,
    writeSync: (...args: Parameters<typeof actual.writeSync>) => {
      const fault = control.fault;

      if (fault?.call === "writeSync") {
        control.hits += 1;

        if (fault.partial !== undefined) {
          const [fd, buffer, offset, , position] = args as unknown as [
            number,
            Uint8Array,
            number,
            number,
            number,
          ];

          actual.writeSync(fd, buffer, offset, fault.partial, position);
        }

        throw failure(fault.code);
      }

      return actual.writeSync(...args);
    },
    fsyncSync: (fd: number) => {
      const fault = control.fault;

      if (fault?.call === "fsyncSync") {
        control.hits += 1;
        throw failure(fault.code);
      }

      actual.fsyncSync(fd);
    },
    openSync: (...args: Parameters<typeof actual.openSync>) => {
      const fault = control.fault;

      if (
        fault?.call === "openSync" &&
        String(args[0]).endsWith(fault.pathEndsWith ?? "")
      ) {
        control.hits += 1;
        throw failure(fault.code);
      }

      return actual.openSync(...args);
    },
  };
});

import { StorageEngine } from "./engine/storage-engine.js";
import { writeFileAtomic } from "./engine/files.js";
import { StorageError, StorageErrorCode } from "./errors.js";
import { WriteAheadLog } from "./wal/write-ahead-log.js";

let directory: string;

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-diskfull-"));
  control.fault = undefined;
  control.hits = 0;
});

afterEach(() => {
  control.fault = undefined;
  rmSync(directory, { recursive: true, force: true });
});

const bytes = (text: string): Uint8Array => new TextEncoder().encode(text);

function texts(log: WriteAheadLog): string[] {
  return [...log.records()].map((record) =>
    new TextDecoder().decode(record.payload),
  );
}

function codeOf(action: () => unknown): string | undefined {
  try {
    action();
  } catch (error: unknown) {
    return error instanceof StorageError ? error.code : "other";
  }

  return undefined;
}

describe("a full disk under the write-ahead log", () => {
  it("fails the append, removes the partial record and keeps working", () => {
    const log = WriteAheadLog.open({ directory });

    log.append(1, bytes("one"));

    const segment = join(
      directory,
      readdirSync(directory).find((name) => name.endsWith(".wal")) as string,
    );
    const sizeBefore = statSync(segment).size;

    control.fault = { call: "writeSync", code: "ENOSPC", partial: 9 };

    expect(codeOf(() => log.append(1, bytes("two")))).toBe(
      StorageErrorCode.DiskFull,
    );
    expect(control.hits).toBe(1);
    expect(statSync(segment).size).toBe(sizeBefore);

    control.fault = undefined;

    expect(log.append(1, bytes("three"))).toBe(2n);
    expect(texts(log)).toEqual(["one", "three"]);
    log.close();

    const reopened = WriteAheadLog.open({ directory });

    expect(texts(reopened)).toEqual(["one", "three"]);
    expect(reopened.lastLsn).toBe(2n);
    reopened.close();
  });

  it("breaks the log for errors that are not a full disk", () => {
    const log = WriteAheadLog.open({ directory });

    control.fault = { call: "writeSync", code: "EACCES" };

    expect(codeOf(() => log.append(1, bytes("x")))).toBe(
      StorageErrorCode.PermissionDenied,
    );

    control.fault = undefined;

    expect(codeOf(() => log.append(1, bytes("y")))).toBe(StorageErrorCode.Io);
    expect(() => log.close()).not.toThrow();
  });

  it("never treats a failed fsync as a recoverable full disk", () => {
    const log = WriteAheadLog.open({ directory });

    control.fault = { call: "fsyncSync", code: "ENOSPC" };

    expect(codeOf(() => log.append(1, bytes("x")))).toBe(StorageErrorCode.Io);

    control.fault = undefined;

    expect(codeOf(() => log.append(1, bytes("y")))).toBe(StorageErrorCode.Io);
  });

  it("drops the refused record but keeps earlier ones with the memory write concern", () => {
    const log = WriteAheadLog.open({ directory, writeConcern: "memory" });

    log.append(1, bytes("early"));

    control.fault = { call: "writeSync", code: "ENOSPC", partial: 5 };

    const big = "x".repeat(70 * 1024);

    expect(codeOf(() => log.append(1, bytes(big)))).toBe(
      StorageErrorCode.DiskFull,
    );

    control.fault = undefined;

    expect(log.append(1, bytes("late"))).toBe(2n);
    expect(texts(log)).toEqual(["early", "late"]);
    log.close();

    const reopened = WriteAheadLog.open({ directory });

    expect(texts(reopened)).toEqual(["early", "late"]);
    reopened.close();
  });

  it("stays on the current segment when the next one cannot be created", () => {
    const log = WriteAheadLog.open({ directory, segmentSizeBytes: 200 });
    const filler = "f".repeat(60);

    log.append(1, bytes(filler));
    log.append(1, bytes(filler));

    control.fault = {
      call: "openSync",
      code: "ENOSPC",
      pathEndsWith: ".wal",
    };

    let refused = 0;

    for (let n = 0; n < 4; n += 1) {
      if (codeOf(() => log.append(1, bytes(filler))) !== undefined) {
        refused += 1;
      }
    }

    expect(refused).toBeGreaterThan(0);

    control.fault = undefined;

    const before = readdirSync(directory).filter((n) => n.endsWith(".wal"));

    log.append(1, bytes("after"));
    expect(
      readdirSync(directory).filter((n) => n.endsWith(".wal")).length,
    ).toBeGreaterThanOrEqual(before.length);
    expect(texts(log).at(-1)).toBe("after");
    log.close();

    const reopened = WriteAheadLog.open({ directory, segmentSizeBytes: 200 });

    expect(texts(reopened).at(-1)).toBe("after");
    reopened.close();
  });

  it("reports a refused permission when creating a segment", () => {
    const log = WriteAheadLog.open({ directory, segmentSizeBytes: 200 });
    const filler = "f".repeat(60);

    log.append(1, bytes(filler));
    log.append(1, bytes(filler));

    control.fault = { call: "openSync", code: "EACCES", pathEndsWith: ".wal" };

    let code: string | undefined;

    for (let n = 0; n < 4 && code === undefined; n += 1) {
      code = codeOf(() => log.append(1, bytes(filler)));
    }

    expect(code).toBe(StorageErrorCode.PermissionDenied);
  });
});

describe("a full disk under the storage engine", () => {
  it("leaves the collection unchanged and accepts writes again", () => {
    const engine = StorageEngine.open({ directory });
    const things = engine.openCollection("app", "things");

    things.insertOne({ n: 1 });

    control.fault = { call: "writeSync", code: "ENOSPC", partial: 7 };

    expect(codeOf(() => things.insertOne({ n: 2 }))).toBe(
      StorageErrorCode.DiskFull,
    );
    expect(things.documentCount).toBe(1);

    control.fault = undefined;

    things.insertOne({ n: 3 });
    expect(things.documentCount).toBe(2);
    engine.close();

    const reopened = StorageEngine.open({ directory });

    expect(reopened.getCollection("app", "things")?.documentCount).toBe(2);
    reopened.close();
  });

  it("fails a checkpoint cleanly and can checkpoint later", () => {
    const engine = StorageEngine.open({ directory });
    const things = engine.openCollection("app", "things");

    things.insertOne({ n: 1 });

    control.fault = { call: "writeSync", code: "ENOSPC" };

    expect(codeOf(() => engine.checkpoint())).toBe(StorageErrorCode.DiskFull);

    control.fault = undefined;

    const leftovers = readdirSync(join(directory, "checkpoints")).filter((n) =>
      n.endsWith(".tmp"),
    );

    expect(leftovers).toEqual([]);
    expect(engine.checkpoint()).toBeDefined();
    engine.close();
  });

  it("reports a full disk when the manifest cannot be written", () => {
    const manifest = join(directory, "manifest.json");

    control.fault = { call: "writeSync", code: "ENOSPC" };

    expect(codeOf(() => writeFileAtomic(directory, manifest, "{}"))).toBe(
      StorageErrorCode.DiskFull,
    );

    control.fault = undefined;

    expect(existsSync(manifest)).toBe(false);
    expect(existsSync(`${manifest}.tmp`)).toBe(false);

    writeFileAtomic(directory, manifest, "{}");
    expect(readFileSync(manifest, "utf8")).toBe("{}");
  });

  it("refuses to open a directory it may not write to", () => {
    control.fault = { call: "openSync", code: "EACCES", pathEndsWith: ".tmp" };

    expect(codeOf(() => StorageEngine.open({ directory }))).toBeDefined();
  });
});
