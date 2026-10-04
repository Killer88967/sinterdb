import {
  appendFileSync,
  existsSync,
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

import {
  StorageCorruptionError,
  StorageError,
  StorageErrorCode,
} from "../errors.js";
import {
  RECORD_HEADER_SIZE,
  SEGMENT_HEADER_SIZE,
  encodeRecord,
} from "./format.js";
import { WriteAheadLog, type WalRecord } from "./write-ahead-log.js";

let directory: string;

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-wal-"));
});

afterEach(() => {
  rmSync(directory, { recursive: true, force: true });
});

function payload(text: string): Uint8Array {
  return new TextEncoder().encode(text);
}

function texts(records: Iterable<WalRecord>): string[] {
  return [...records].map((record) => new TextDecoder().decode(record.payload));
}

function segmentFiles(): string[] {
  return readdirSync(directory)
    .filter((name) => name.endsWith(".wal"))
    .sort();
}

function onlySegment(): string {
  const files = segmentFiles();

  expect(files).toHaveLength(1);

  return join(directory, files[0] as string);
}

function writeLog(count: number, durability: "buffered" | "fsync" = "fsync") {
  const log = WriteAheadLog.open({ directory, durability });

  for (let index = 1; index <= count; index += 1) {
    log.append(1, payload(`record-${index}`));
  }

  log.close();
}

describe("WriteAheadLog basics", () => {
  it("starts empty and assigns increasing log sequence numbers", () => {
    const log = WriteAheadLog.open({ directory });

    expect(log.lastLsn).toBe(0n);
    expect(log.append(1, payload("a"))).toBe(1n);
    expect(log.append(2, payload("b"))).toBe(2n);
    expect(log.lastLsn).toBe(2n);
    expect(texts(log.records())).toEqual(["a", "b"]);

    log.close();
  });

  it("returns record types and payloads", () => {
    const log = WriteAheadLog.open({ directory });

    log.append(7, new Uint8Array([1, 2, 3]));
    log.append(9, new Uint8Array());

    const records = [...log.records()];

    expect(records.map((record) => record.type)).toEqual([7, 9]);
    expect([...(records[0] as WalRecord).payload]).toEqual([1, 2, 3]);
    expect((records[1] as WalRecord).payload).toHaveLength(0);

    log.close();
  });

  for (const durability of ["buffered", "fsync"] as const) {
    it(`reopens and continues numbering in ${durability} mode`, () => {
      writeLog(3, durability);

      const log = WriteAheadLog.open({ directory, durability });

      expect(log.lastLsn).toBe(3n);
      expect(log.append(1, payload("next"))).toBe(4n);
      expect(texts(log.records())).toEqual([
        "record-1",
        "record-2",
        "record-3",
        "next",
      ]);

      log.close();
    });
  }

  it("reads only records after a log sequence number", () => {
    writeLog(5);

    const log = WriteAheadLog.open({ directory });

    expect(texts(log.records(3n))).toEqual(["record-4", "record-5"]);
    expect(texts(log.records(5n))).toEqual([]);

    log.close();
  });

  it("rejects invalid options", () => {
    expect(() =>
      WriteAheadLog.open({ directory, durability: "never" as never }),
    ).toThrow(TypeError);

    expect(() =>
      WriteAheadLog.open({ directory, segmentSizeBytes: 10 }),
    ).toThrow(TypeError);
  });

  it("rejects use after close", () => {
    const log = WriteAheadLog.open({ directory });

    log.close();
    log.close();

    expect(() => log.append(1, payload("a"))).toThrow(StorageError);
    expect(() => [...log.records()]).toThrow(StorageError);
  });

  it("ignores unrelated files in the directory", () => {
    writeFileSync(join(directory, "notes.txt"), "hello");
    writeLog(2);

    const log = WriteAheadLog.open({ directory });

    expect(texts(log.records())).toEqual(["record-1", "record-2"]);

    log.close();
  });
});

describe("segment rotation and truncation", () => {
  function writeRotated(count: number): void {
    const log = WriteAheadLog.open({ directory, segmentSizeBytes: 200 });

    for (let index = 1; index <= count; index += 1) {
      log.append(1, payload(`record-${index}`));
    }

    log.close();
  }

  it("rotates segments and reads across them", () => {
    writeRotated(20);

    expect(segmentFiles().length).toBeGreaterThan(2);

    const log = WriteAheadLog.open({ directory, segmentSizeBytes: 200 });

    expect(log.lastLsn).toBe(20n);
    expect(texts(log.records())).toHaveLength(20);
    expect(texts(log.records(17n))).toEqual([
      "record-18",
      "record-19",
      "record-20",
    ]);

    expect(log.append(1, payload("after"))).toBe(21n);

    log.close();
  });

  it("removes old segments but keeps later records", () => {
    writeRotated(20);

    const log = WriteAheadLog.open({ directory, segmentSizeBytes: 200 });
    const before = log.segmentCount;
    const removed = log.truncateThrough(12n);

    expect(removed).toBeGreaterThan(0);
    expect(log.segmentCount).toBe(before - removed);
    expect(texts(log.records(12n))).toHaveLength(8);
    expect(log.lastLsn).toBe(20n);

    log.close();

    const reopened = WriteAheadLog.open({ directory, segmentSizeBytes: 200 });

    expect(reopened.lastLsn).toBe(20n);
    expect(texts(reopened.records(12n))[0]).toBe("record-13");
    expect(reopened.append(1, payload("more"))).toBe(21n);

    reopened.close();
  });

  it("never removes the active segment", () => {
    writeRotated(20);

    const log = WriteAheadLog.open({ directory, segmentSizeBytes: 200 });

    log.truncateThrough(1_000n);

    expect(log.segmentCount).toBe(1);
    expect(log.append(1, payload("still works"))).toBe(21n);

    log.close();
  });

  it("detects a missing middle segment", () => {
    writeRotated(20);

    const files = segmentFiles();

    rmSync(join(directory, files[1] as string));

    expect(() => WriteAheadLog.open({ directory })).toThrow(
      StorageCorruptionError,
    );
  });
});

describe("torn tail recovery", () => {
  it("recovers from a cut at every offset inside the last record", () => {
    writeLog(4);

    const path = onlySegment();
    const original = readFileSync(path);
    const lastRecordSize = encodeRecord(4n, 1, payload("record-4")).byteLength;
    const lastRecordStart = original.byteLength - lastRecordSize;

    for (let cut = 0; cut < lastRecordSize; cut += 1) {
      writeFileSync(path, original.subarray(0, lastRecordStart + cut));

      const log = WriteAheadLog.open({ directory });

      expect(texts(log.records())).toEqual([
        "record-1",
        "record-2",
        "record-3",
      ]);
      expect(statSync(path).size).toBe(lastRecordStart);
      expect(log.append(1, payload("replacement"))).toBe(4n);

      log.close();

      const verify = WriteAheadLog.open({ directory });

      expect(texts(verify.records())).toEqual([
        "record-1",
        "record-2",
        "record-3",
        "replacement",
      ]);

      verify.close();
    }
  });

  it("ignores a zero-filled tail", () => {
    writeLog(3);

    const path = onlySegment();
    const size = statSync(path).size;

    appendFileSync(path, Buffer.alloc(4096));

    const log = WriteAheadLog.open({ directory });

    expect(texts(log.records())).toHaveLength(3);
    expect(statSync(path).size).toBe(size);
    expect(log.append(1, payload("next"))).toBe(4n);

    log.close();
  });

  it("drops a final record whose payload checksum fails", () => {
    writeLog(3);

    const path = onlySegment();
    const bytes = readFileSync(path);

    bytes[bytes.byteLength - 1] =
      (bytes[bytes.byteLength - 1] as number) ^ 0xff;
    writeFileSync(path, bytes);

    const log = WriteAheadLog.open({ directory });

    expect(texts(log.records())).toEqual(["record-1", "record-2"]);
    expect(log.append(1, payload("next"))).toBe(3n);

    log.close();
  });

  it("removes a segment whose header was never fully written", () => {
    writeLog(2);

    writeFileSync(
      join(directory, `${"3".padStart(20, "0")}.wal`),
      Buffer.from("SINT"),
    );

    const log = WriteAheadLog.open({ directory });

    expect(log.lastLsn).toBe(2n);
    expect(segmentFiles()).toHaveLength(1);
    expect(log.append(1, payload("next"))).toBe(3n);

    log.close();
  });

  it("recovers a rotated log whose newest segment is empty", () => {
    const log = WriteAheadLog.open({ directory, segmentSizeBytes: 200 });

    for (let index = 1; index <= 20; index += 1) {
      log.append(1, payload(`record-${index}`));
    }

    log.close();

    const files = segmentFiles();
    const lastName = files[files.length - 1] as string;
    const firstLsn = BigInt(lastName.replace(".wal", ""));

    truncateSync(join(directory, lastName), SEGMENT_HEADER_SIZE);

    const reopened = WriteAheadLog.open({ directory, segmentSizeBytes: 200 });

    expect(reopened.lastLsn).toBe(firstLsn - 1n);
    expect(reopened.append(1, payload("next"))).toBe(firstLsn);
    expect(texts(reopened.records(firstLsn - 1n))).toEqual(["next"]);

    reopened.close();
  });
});

describe("corruption detection", () => {
  it("rejects every single-byte flip inside a record that is not the last", () => {
    writeLog(3);

    const path = onlySegment();
    const original = readFileSync(path);
    const firstRecordSize = encodeRecord(1n, 1, payload("record-1")).byteLength;
    const secondRecordSize = encodeRecord(
      2n,
      1,
      payload("record-2"),
    ).byteLength;
    const start = SEGMENT_HEADER_SIZE;
    const end = start + firstRecordSize + secondRecordSize;

    for (let index = start; index < end; index += 1) {
      const damaged = Buffer.from(original);

      damaged[index] = (damaged[index] as number) ^ 0x01;
      writeFileSync(path, damaged);

      let error: unknown;

      try {
        WriteAheadLog.open({ directory }).close();
      } catch (caught: unknown) {
        error = caught;
      }

      expect(error, `flip at byte ${index}`).toBeInstanceOf(
        StorageCorruptionError,
      );
    }
  });

  it("never accepts a damaged record in the last position", () => {
    writeLog(3);

    const path = onlySegment();
    const original = readFileSync(path);
    const lastRecordSize = encodeRecord(3n, 1, payload("record-3")).byteLength;
    const start = original.byteLength - lastRecordSize;

    for (let index = start; index < original.byteLength; index += 1) {
      const damaged = Buffer.from(original);

      damaged[index] = (damaged[index] as number) ^ 0x01;
      writeFileSync(path, damaged);

      try {
        const log = WriteAheadLog.open({ directory });
        const recovered = texts(log.records());

        expect(recovered).toEqual(["record-1", "record-2"]);

        log.close();
      } catch (caught: unknown) {
        expect(caught, `flip at byte ${index}`).toBeInstanceOf(
          StorageCorruptionError,
        );
      }
    }
  });

  it("rejects a damaged segment header", () => {
    writeLog(2);

    const path = onlySegment();
    const bytes = readFileSync(path);

    bytes[9] = (bytes[9] as number) ^ 0xff;
    writeFileSync(path, bytes);

    expect(() => WriteAheadLog.open({ directory })).toThrow(
      StorageCorruptionError,
    );
  });

  it("rejects a segment that is not a log file", () => {
    writeFileSync(
      join(directory, `${"1".padStart(20, "0")}.wal`),
      Buffer.alloc(64, 7),
    );

    expect(() => WriteAheadLog.open({ directory })).toThrow(
      StorageCorruptionError,
    );
  });

  it("rejects a log that was spliced out of order", () => {
    writeLog(3);

    const path = onlySegment();
    const bytes = readFileSync(path);
    const size = encodeRecord(1n, 1, payload("record-1")).byteLength;
    const first = bytes.subarray(
      SEGMENT_HEADER_SIZE,
      SEGMENT_HEADER_SIZE + size,
    );

    writeFileSync(path, Buffer.concat([bytes, first]));

    expect(() => WriteAheadLog.open({ directory })).toThrow(
      StorageCorruptionError,
    );
  });

  it("reports the file, offset, and sequence number", () => {
    writeLog(3);

    const path = onlySegment();
    const bytes = readFileSync(path);
    const offset = SEGMENT_HEADER_SIZE + RECORD_HEADER_SIZE + 2;

    bytes[offset] = (bytes[offset] as number) ^ 0xff;
    writeFileSync(path, bytes);

    try {
      WriteAheadLog.open({ directory });
      throw new Error("Expected corruption.");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(StorageCorruptionError);

      const corrupt = error as StorageCorruptionError;

      expect(corrupt.code).toBe(StorageErrorCode.Corruption);
      expect(corrupt.file).toBe(path);
      expect(corrupt.offset).toBe(SEGMENT_HEADER_SIZE);
      expect(corrupt.lsn).toBe(1n);
      expect(corrupt.message).toContain("backup");
    }
  });

  it("refuses to modify a log it cannot trust", () => {
    writeLog(3);

    const path = onlySegment();
    const bytes = readFileSync(path);

    bytes[SEGMENT_HEADER_SIZE + 5] =
      (bytes[SEGMENT_HEADER_SIZE + 5] as number) ^ 0xff;
    writeFileSync(path, bytes);

    const before = readFileSync(path);

    expect(() => WriteAheadLog.open({ directory })).toThrow(
      StorageCorruptionError,
    );
    expect(existsSync(path)).toBe(true);
    expect(readFileSync(path).equals(before)).toBe(true);
  });
});
