import {
  existsSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  CheckpointDamagedError,
  checkpointFileName,
  listCheckpoints,
  readCheckpoint,
  removeTemporaryCheckpoints,
  writeCheckpoint,
  type CheckpointCollection,
} from "./checkpoint.js";

let directory: string;

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-snap-"));
});

afterEach(() => {
  rmSync(directory, { recursive: true, force: true });
});

const key = (seed: number): string =>
  Buffer.from(
    Uint8Array.from({ length: 16 }, (_, index) => (seed + index) % 256),
  ).toString("hex");

function collection(
  database: string,
  name: string,
  documents: [string, Uint8Array][],
): CheckpointCollection {
  return {
    database,
    collection: name,
    documents,
    documentCount: documents.length,
  };
}

function write(lsn: bigint, collections: CheckpointCollection[]): string {
  const file = writeCheckpoint(directory, lsn, collections, () => undefined);

  return join(directory, file);
}

describe("checkpoint files", () => {
  it("round-trips collections, empty collections, and unicode names", () => {
    const path = write(42n, [
      collection("app", "users", [
        [key(1), Uint8Array.from([1, 2, 3])],
        [key(2), new Uint8Array()],
      ]),
      collection("app", "empty", []),
      collection("datenbank-ü", "コレクション", [[key(9), Uint8Array.of(7)]]),
    ]);

    const read = readCheckpoint(path);

    expect(read.lsn).toBe(42n);
    expect(read.collections).toHaveLength(3);
    expect(read.collections[0]).toMatchObject({
      database: "app",
      collection: "users",
    });
    expect([...(read.collections[0]?.documents.entries() ?? [])]).toEqual([
      [key(1), Uint8Array.from([1, 2, 3])],
      [key(2), new Uint8Array()],
    ]);
    expect(read.collections[1]?.documents.size).toBe(0);
    expect(read.collections[2]).toMatchObject({
      database: "datenbank-ü",
      collection: "コレクション",
    });
  });

  it("round-trips an empty snapshot and large documents", () => {
    expect(readCheckpoint(write(1n, [])).collections).toEqual([]);

    const big = new Uint8Array(3 * 1024 * 1024).fill(9);
    const read = readCheckpoint(
      write(2n, [collection("a", "b", [[key(1), big]])]),
    );

    expect(read.collections[0]?.documents.get(key(1))?.byteLength).toBe(
      big.byteLength,
    );
  });

  it("names files by sequence number so they sort", () => {
    expect(checkpointFileName(7n)).toBe("00000000000000000007.snap");

    write(5n, []);
    write(30n, []);
    write(12n, []);

    expect(listCheckpoints(directory).map((entry) => entry.lsn)).toEqual([
      30n,
      12n,
      5n,
    ]);
  });

  it("writes through a temporary file that is gone afterwards", () => {
    write(3n, [collection("a", "b", [[key(1), Uint8Array.of(1)]])]);

    expect(readdirSync(directory)).toEqual([checkpointFileName(3n)]);
  });

  it("reports each stage in order", () => {
    const stages: string[] = [];

    writeCheckpoint(directory, 1n, [], (stage) => stages.push(stage));

    expect(stages).toEqual(["snapshot-written", "snapshot-renamed"]);
  });

  it("leaves no visible snapshot when it is aborted before the rename", () => {
    expect(() =>
      writeCheckpoint(directory, 1n, [], (stage) => {
        if (stage === "snapshot-written") {
          throw new Error("crash");
        }
      }),
    ).toThrow("crash");

    expect(listCheckpoints(directory)).toEqual([]);
  });

  it("removes leftover temporary files", () => {
    writeFileSync(join(directory, "00000000000000000009.snap.tmp"), "partial");
    write(1n, []);

    expect(removeTemporaryCheckpoints(directory)).toBe(1);
    expect(readdirSync(directory)).toEqual([checkpointFileName(1n)]);
  });

  it("rejects every truncation of a snapshot", () => {
    const path = write(5n, [
      collection("app", "users", [[key(1), Uint8Array.from([1, 2, 3, 4])]]),
    ]);
    const original = readFileSync(path);

    for (let length = 0; length < original.byteLength; length += 1) {
      writeFileSync(path, original.subarray(0, length));

      expect(() => readCheckpoint(path), `length ${length}`).toThrow(
        CheckpointDamagedError,
      );
    }
  });

  it("rejects every single-byte change to a snapshot", () => {
    const path = write(5n, [
      collection("app", "users", [[key(1), Uint8Array.from([1, 2, 3, 4])]]),
    ]);
    const original = readFileSync(path);

    for (let index = 0; index < original.byteLength; index += 1) {
      const damaged = Buffer.from(original);

      damaged[index] = (damaged[index] as number) ^ 0x01;
      writeFileSync(path, damaged);

      expect(() => readCheckpoint(path), `byte ${index}`).toThrow(
        CheckpointDamagedError,
      );
    }
  });

  it("rejects a file that is not a snapshot even with a valid footer", () => {
    const path = write(1n, []);

    writeFileSync(path, Buffer.alloc(64));

    expect(() => readCheckpoint(path)).toThrow(CheckpointDamagedError);
    expect(existsSync(path)).toBe(true);
  });
});
