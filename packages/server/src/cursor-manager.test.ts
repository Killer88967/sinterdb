import type { Document } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { CursorManager, CursorNotFoundError } from "./cursor-manager.js";

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
