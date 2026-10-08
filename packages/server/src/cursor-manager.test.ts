import type { Document } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import {
  CursorManager,
  CursorNotFoundError,
  DEFAULT_CURSOR_BATCH_BYTES,
} from "./cursor-manager.js";

describe("CursorManager", () => {
  it("returns a completed cursor when all documents fit in the first batch", () => {
    const manager = new CursorManager();

    const batch = manager.open([{ value: 1 }, { value: 2 }], 10);

    expect(batch.cursorId).toBeNull();
    expect(batch.documents).toEqual([{ value: 1 }, { value: 2 }]);

    expect(manager.activeCursorCount).toBe(0);
  });

  it("keeps a cursor open when more documents remain", () => {
    const manager = new CursorManager();

    const batch = manager.open([{ value: 1 }, { value: 2 }, { value: 3 }], 2);

    expect(batch.cursorId).not.toBeNull();
    expect(batch.documents).toEqual([{ value: 1 }, { value: 2 }]);

    expect(manager.activeCursorCount).toBe(1);
  });

  it("returns additional batches", () => {
    const manager = new CursorManager();

    const first = manager.open(
      [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }],
      2,
    );

    if (first.cursorId === null) {
      throw new Error("Expected the cursor to remain open.");
    }

    const second = manager.getMore(first.cursorId, 2);

    expect(second.cursorId).toBe(first.cursorId);
    expect(second.documents).toEqual([{ value: 3 }, { value: 4 }]);

    const third = manager.getMore(first.cursorId, 2);

    expect(third.cursorId).toBeNull();
    expect(third.documents).toEqual([{ value: 5 }]);

    expect(manager.activeCursorCount).toBe(0);
  });

  it("closes a cursor explicitly", () => {
    const manager = new CursorManager();

    const batch = manager.open([{ value: 1 }, { value: 2 }], 1);

    if (batch.cursorId === null) {
      throw new Error("Expected the cursor to remain open.");
    }

    expect(manager.close(batch.cursorId)).toBe(true);
    expect(manager.activeCursorCount).toBe(0);
    expect(manager.close(batch.cursorId)).toBe(false);
  });

  it("rejects getMore for an unknown cursor", () => {
    const manager = new CursorManager();

    expect(() => manager.getMore(123)).toThrow(CursorNotFoundError);
  });

  it("clears every active cursor", () => {
    const manager = new CursorManager();

    manager.open(createDocuments(10), 1);
    manager.open(createDocuments(10), 1);

    expect(manager.activeCursorCount).toBe(2);

    manager.clear();

    expect(manager.activeCursorCount).toBe(0);
  });

  it("expires idle cursors", () => {
    let now = 0;
    const manager = new CursorManager({ idleTimeoutMS: 1_000, now: () => now });

    const opened = manager.open([{ a: 1 }, { a: 2 }, { a: 3 }], 1);
    const cursorId = opened.cursorId as number;

    now = 1_000;

    expect(manager.sweepExpired()).toBe(1);
    expect(manager.activeCursorCount).toBe(0);
    expect(() => manager.getMore(cursorId)).toThrow(CursorNotFoundError);
  });

  it("refreshes the idle timer when a cursor is used", () => {
    let now = 0;
    const manager = new CursorManager({ idleTimeoutMS: 1_000, now: () => now });

    const opened = manager.open([{ a: 1 }, { a: 2 }, { a: 3 }], 1);
    const cursorId = opened.cursorId as number;

    now = 600;
    manager.getMore(cursorId, 1);

    now = 1_200;
    expect(manager.sweepExpired()).toBe(0);
    expect(manager.activeCursorCount).toBe(1);
  });

  it("rejects an invalid idle timeout", () => {
    expect(() => new CursorManager({ idleTimeoutMS: 0 })).toThrow(TypeError);
  });

  it.each([0, -1, 1.5, Number.NaN])(
    "rejects invalid batch size %s",
    (batchSize) => {
      const manager = new CursorManager();

      expect(() => manager.open([], batchSize)).toThrow(TypeError);
    },
  );
});

function createDocuments(count: number): Document[] {
  return Array.from({ length: count }, (_, index) => ({
    value: index,
  }));
}

describe("CursorManager batch size in bytes", () => {
  const text = (length: number): Document => ({ text: "x".repeat(length) });

  it("ends a batch early when its documents would not fit in a message", () => {
    const manager = new CursorManager({ maxBatchBytes: 1_000 });
    const documents = [text(400), text(400), text(400), text(400), text(400)];

    const first = manager.open(documents, 100);

    // Two documents of about 410 bytes fit in 1,000 bytes; a third does not.
    expect(first.documents).toHaveLength(2);
    expect(first.cursorId).not.toBeNull();

    const second = manager.getMore(first.cursorId as number, 100);

    expect(second.documents).toHaveLength(2);
    expect(second.cursorId).not.toBeNull();

    const third = manager.getMore(second.cursorId as number, 100);

    expect(third.documents).toHaveLength(1);
    expect(third.cursorId).toBeNull();
    expect([
      ...first.documents,
      ...second.documents,
      ...third.documents,
    ]).toEqual(documents);
  });

  it("always returns at least one document, however large", () => {
    const manager = new CursorManager({ maxBatchBytes: 100 });
    const documents = [text(5_000), text(5_000)];

    const first = manager.open(documents, 100);

    expect(first.documents).toEqual([documents[0]]);
    expect(first.cursorId).not.toBeNull();

    const second = manager.getMore(first.cursorId as number, 100);

    expect(second.documents).toEqual([documents[1]]);
    expect(second.cursorId).toBeNull();
  });

  it("does not lose or repeat a document at a batch boundary", () => {
    for (const limit of [200, 450, 1_000, 5_000]) {
      const manager = new CursorManager({ maxBatchBytes: limit });
      const documents = Array.from({ length: 37 }, (_, index) => ({
        index,
        text: "y".repeat((index * 37) % 300),
      }));
      const seen: Document[] = [];

      let batch = manager.open(documents, 5);

      seen.push(...batch.documents);

      while (batch.cursorId !== null) {
        batch = manager.getMore(batch.cursorId, 5);
        seen.push(...batch.documents);
      }

      expect(seen).toEqual(documents);
    }
  });

  it("keeps the default under half of the message limit", () => {
    expect(DEFAULT_CURSOR_BATCH_BYTES * 2).toBeLessThanOrEqual(
      16 * 1024 * 1024,
    );
  });

  it("rejects a limit that is not a positive integer", () => {
    expect(() => new CursorManager({ maxBatchBytes: 0 })).toThrow(TypeError);
    expect(() => new CursorManager({ maxBatchBytes: 1.5 })).toThrow(TypeError);
  });
});
