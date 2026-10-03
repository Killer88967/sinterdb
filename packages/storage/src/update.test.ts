import { CustomId, type Document } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { StorageError, StorageErrorCode } from "./errors.js";
import { compileUpdate, seedDocumentFromFilter } from "./update.js";

function applyUpdate(update: Document, document: Document): Document {
  compileUpdate(update)(document);

  return document;
}

function expectCode(action: () => unknown, code: StorageErrorCode): void {
  try {
    action();
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(StorageError);
    expect((error as StorageError).code).toBe(code);

    return;
  }

  throw new Error(`Expected ${code} to be thrown.`);
}

describe("$set", () => {
  it("sets and overwrites fields", () => {
    expect(applyUpdate({ $set: { a: 2, b: "x" } }, { a: 1 })).toEqual({
      a: 2,
      b: "x",
    });
  });

  it("creates intermediate documents for dotted paths", () => {
    expect(applyUpdate({ $set: { "a.b.c": 1 } }, {})).toEqual({
      a: { b: { c: 1 } },
    });
  });

  it("sets inside existing nested documents", () => {
    expect(applyUpdate({ $set: { "a.b": 2 } }, { a: { b: 1, c: 3 } })).toEqual({
      a: { b: 2, c: 3 },
    });
  });

  it("rejects traversing a non-document", () => {
    expectCode(
      () => applyUpdate({ $set: { "a.b": 1 } }, { a: 5 }),
      StorageErrorCode.InvalidUpdate,
    );

    expectCode(
      () => applyUpdate({ $set: { "a.b": 1 } }, { a: [1] }),
      StorageErrorCode.InvalidUpdate,
    );
  });
});

describe("$unset", () => {
  it("removes fields and nested fields", () => {
    expect(
      applyUpdate({ $unset: { a: "", "b.c": 1 } }, { a: 1, b: { c: 2, d: 3 } }),
    ).toEqual({ b: { d: 3 } });
  });

  it("ignores missing fields and non-document parents", () => {
    expect(applyUpdate({ $unset: { x: 1, "a.b": 1 } }, { a: 5 })).toEqual({
      a: 5,
    });
  });
});

describe("$inc", () => {
  it("increments numbers and creates missing fields", () => {
    expect(
      applyUpdate({ $inc: { a: 2, b: -1, c: 5 } }, { a: 1, b: 1 }),
    ).toEqual({ a: 3, b: 0, c: 5 });
  });

  it("increments bigints", () => {
    expect(applyUpdate({ $inc: { a: 2n } }, { a: 1n })).toEqual({ a: 3n });
  });

  it("rejects mixed or non-numeric values", () => {
    expectCode(
      () => applyUpdate({ $inc: { a: 1 } }, { a: "x" }),
      StorageErrorCode.InvalidUpdate,
    );

    expectCode(
      () => applyUpdate({ $inc: { a: 1n } }, { a: 1 }),
      StorageErrorCode.InvalidUpdate,
    );
  });

  it("rejects invalid operands and overflow", () => {
    for (const operand of ["1", null, Number.NaN, Number.POSITIVE_INFINITY]) {
      expectCode(
        () => compileUpdate({ $inc: { a: operand } }),
        StorageErrorCode.InvalidUpdate,
      );
    }

    expectCode(
      () =>
        applyUpdate({ $inc: { a: Number.MAX_VALUE } }, { a: Number.MAX_VALUE }),
      StorageErrorCode.InvalidUpdate,
    );
  });
});

describe("$min and $max", () => {
  it("only lowers with $min and only raises with $max", () => {
    expect(applyUpdate({ $min: { a: 3, b: 3 } }, { a: 5, b: 1 })).toEqual({
      a: 3,
      b: 1,
    });

    expect(applyUpdate({ $max: { a: 3, b: 3 } }, { a: 5, b: 1 })).toEqual({
      a: 5,
      b: 3,
    });
  });

  it("sets missing fields", () => {
    expect(applyUpdate({ $min: { a: 1 }, $max: { b: 2 } }, {})).toEqual({
      a: 1,
      b: 2,
    });
  });

  it("compares dates and strings", () => {
    const early = new Date(0);
    const late = new Date(1000);

    expect(applyUpdate({ $max: { when: late } }, { when: early })).toEqual({
      when: late,
    });

    expect(applyUpdate({ $min: { name: "a" } }, { name: "b" })).toEqual({
      name: "a",
    });
  });

  it("orders mixed types by type rank", () => {
    expect(applyUpdate({ $min: { a: 5 } }, { a: "x" })).toEqual({ a: 5 });
    expect(applyUpdate({ $max: { a: 5 } }, { a: "x" })).toEqual({ a: "x" });
  });

  it("rejects array and document operands", () => {
    expectCode(
      () => compileUpdate({ $min: { a: [1] } }),
      StorageErrorCode.InvalidUpdate,
    );

    expectCode(
      () => compileUpdate({ $max: { a: { b: 1 } } }),
      StorageErrorCode.InvalidUpdate,
    );
  });
});

describe("$push", () => {
  it("appends to arrays and creates missing ones", () => {
    expect(applyUpdate({ $push: { a: 3, b: "x" } }, { a: [1, 2] })).toEqual({
      a: [1, 2, 3],
      b: ["x"],
    });
  });

  it("appends duplicates and array operands as single elements", () => {
    expect(applyUpdate({ $push: { a: [1] } }, { a: [[1]] })).toEqual({
      a: [[1], [1]],
    });
  });

  it("rejects non-array targets", () => {
    expectCode(
      () => applyUpdate({ $push: { a: 1 } }, { a: 1 }),
      StorageErrorCode.InvalidUpdate,
    );
  });
});

describe("$addToSet", () => {
  it("adds only missing values", () => {
    expect(applyUpdate({ $addToSet: { a: 2, b: 1 } }, { a: [1, 2] })).toEqual({
      a: [1, 2],
      b: [1],
    });
  });

  it("compares documents and ids structurally", () => {
    const id = CustomId.generate();
    const document = applyUpdate(
      {
        $addToSet: {
          ids: CustomId.fromHexString(id.toHexString()),
          docs: { k: 1 },
        },
      },
      { ids: [id], docs: [{ k: 1 }] },
    );

    expect(document["ids"]).toHaveLength(1);
    expect(document["docs"]).toHaveLength(1);
  });

  it("rejects non-array targets", () => {
    expectCode(
      () => applyUpdate({ $addToSet: { a: 1 } }, { a: "x" }),
      StorageErrorCode.InvalidUpdate,
    );
  });
});

describe("$pull", () => {
  it("removes every equal element", () => {
    expect(applyUpdate({ $pull: { a: 2 } }, { a: [1, 2, 3, 2] })).toEqual({
      a: [1, 3],
    });
  });

  it("ignores missing fields", () => {
    expect(applyUpdate({ $pull: { a: 1, "b.c": 1 } }, { b: 5 })).toEqual({
      b: 5,
    });
  });

  it("rejects non-array targets", () => {
    expectCode(
      () => applyUpdate({ $pull: { a: 1 } }, { a: 1 }),
      StorageErrorCode.InvalidUpdate,
    );
  });
});

describe("update validation", () => {
  it("applies several operators in one update", () => {
    expect(
      applyUpdate(
        { $set: { a: 1 }, $inc: { b: 1 }, $unset: { c: 1 }, $push: { d: 1 } },
        { b: 1, c: 1 },
      ),
    ).toEqual({ a: 1, b: 2, d: [1] });
  });

  it("rejects empty, non-operator, and unknown updates", () => {
    for (const update of [
      {},
      { a: 1 },
      { $set: { a: 1 }, b: 2 },
      { $rename: { a: "b" } },
      { $set: {} },
      { $set: 5 },
    ]) {
      expectCode(
        () => compileUpdate(update as Document),
        StorageErrorCode.InvalidUpdate,
      );
    }
  });

  it("rejects invalid paths", () => {
    for (const path of [
      "",
      "a..b",
      ".a",
      "a.",
      "$a",
      "a.$b",
      "__proto__",
      "a.__proto__",
    ]) {
      expectCode(
        () => compileUpdate({ $set: { [path]: 1 } }),
        StorageErrorCode.InvalidUpdate,
      );
    }
  });

  it("rejects changes to _id", () => {
    for (const path of ["_id", "_id.x"]) {
      expectCode(
        () => compileUpdate({ $set: { [path]: 1 } }),
        StorageErrorCode.ImmutableId,
      );
    }

    expectCode(
      () => compileUpdate({ $unset: { _id: 1 } }),
      StorageErrorCode.ImmutableId,
    );
  });

  it("rejects conflicting paths", () => {
    expectCode(
      () => compileUpdate({ $set: { a: 1 }, $inc: { a: 1 } }),
      StorageErrorCode.InvalidUpdate,
    );

    expectCode(
      () => compileUpdate({ $set: { a: 1, "a.b": 2 } }),
      StorageErrorCode.InvalidUpdate,
    );

    expectCode(
      () => compileUpdate({ $set: { "a.b": 1 }, $unset: { a: 1 } }),
      StorageErrorCode.InvalidUpdate,
    );

    expect(() =>
      compileUpdate({ $set: { "a.b": 1 }, $inc: { "a.c": 1 } }),
    ).not.toThrow();
  });
});

describe("seedDocumentFromFilter", () => {
  it("copies top-level equality fields", () => {
    expect(seedDocumentFromFilter({ a: 1, b: "x" })).toEqual({ a: 1, b: "x" });
  });

  it("expands dotted paths", () => {
    expect(seedDocumentFromFilter({ "a.b": 1, "a.c": 2 })).toEqual({
      a: { b: 1, c: 2 },
    });
  });

  it("uses $eq and skips other operators", () => {
    expect(
      seedDocumentFromFilter({
        a: { $eq: 1 },
        b: { $gt: 5 },
        c: { $in: [1] },
        $or: [{ d: 1 }],
      }),
    ).toEqual({ a: 1 });
  });

  it("keeps a CustomId equality as _id", () => {
    const id = CustomId.generate();

    expect(seedDocumentFromFilter({ _id: id })["_id"]).toBe(id);
  });

  it("rejects overlapping equality paths", () => {
    expectCode(
      () => seedDocumentFromFilter({ a: 1, "a.b": 2 }),
      StorageErrorCode.InvalidUpdate,
    );
  });
});
