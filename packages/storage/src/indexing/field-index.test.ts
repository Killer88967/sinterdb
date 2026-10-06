import { CustomId, type Document } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { FieldIndex } from "./field-index.js";
import { normalizeIndexSpec } from "./spec.js";

function index(
  options: { unique?: boolean; sparse?: boolean; field?: string } = {},
): FieldIndex {
  return new FieldIndex(
    normalizeIndexSpec({ field: options.field ?? "a", ...options }),
  );
}

function sorted(values: Iterable<string> | undefined): string[] {
  return [...(values ?? [])].sort();
}

describe("FieldIndex equality", () => {
  it("looks up documents by exact canonical value", () => {
    const field = index();

    field.add("d1", { a: 5 });
    field.add("d2", { a: 5 });
    field.add("d3", { a: "5" });
    field.add("d4", { a: 5n });
    field.add("d5", { b: 1 });

    expect(sorted(field.lookupEqual(5))).toEqual(["d1", "d2"]);
    expect(sorted(field.lookupEqual("5"))).toEqual(["d3"]);
    expect(sorted(field.lookupEqual(5n))).toEqual(["d4"]);
    expect(field.lookupEqual(6)).toBeUndefined();
    expect(field.estimateEqual(5)).toBe(2);
    expect(field.estimateEqual(99)).toBe(0);
  });

  it("indexes null, booleans, arrays, and documents by whole value", () => {
    const field = index();

    field.add("d1", { a: null });
    field.add("d2", { a: true });
    field.add("d3", { a: [1, 2] });
    field.add("d4", { a: { x: 1 } });

    expect(sorted(field.lookupEqual(null))).toEqual(["d1"]);
    expect(sorted(field.lookupEqual(true))).toEqual(["d2"]);
    expect(sorted(field.lookupEqual([1, 2]))).toEqual(["d3"]);
    expect(sorted(field.lookupEqual([2, 1]))).toEqual([]);
    expect(sorted(field.lookupEqual({ x: 1 }))).toEqual(["d4"]);
  });

  it("distinguishes numbers that compare equal but encode differently", () => {
    const field = index();

    field.add("zero", { a: 0 });
    field.add("negative", { a: -0 });

    expect(sorted(field.lookupEqual(0))).toEqual(["zero"]);
    expect(sorted(field.lookupEqual(-0))).toEqual(["negative"]);
    expect(
      sorted(
        field.lookupRange(
          "number",
          { value: 0, inclusive: true },
          { value: 0, inclusive: true },
        ),
      ),
    ).toEqual(["negative", "zero"]);
  });

  it("follows dotted paths through documents only", () => {
    const field = index({ field: "profile.level" });

    field.add("d1", { profile: { level: 3 } });
    field.add("d2", { profile: [{ level: 3 }] });
    field.add("d3", { profile: 5 });

    expect(sorted(field.lookupEqual(3))).toEqual(["d1"]);
    expect(field.documentCount).toBe(3);
  });

  it("removes documents and forgets empty values", () => {
    const field = index();

    field.add("d1", { a: 1 });
    field.add("d2", { a: 1 });
    field.remove("d1", { a: 1 });

    expect(sorted(field.lookupEqual(1))).toEqual(["d2"]);

    field.remove("d2", { a: 1 });

    expect(field.lookupEqual(1)).toBeUndefined();
    expect(field.distinctValues).toBe(0);
    expect(field.documentCount).toBe(0);
    expect(field.orderedKeyCount()).toBe(0);
  });

  it("ignores removal of documents it never held", () => {
    const field = index();

    field.add("d1", { a: 1 });
    field.remove("other", { a: 1 });
    field.remove("d1", { a: 2 });

    expect(field.documentCount).toBe(1);
  });
});

describe("FieldIndex ranges", () => {
  function numbers(): FieldIndex {
    const field = index();

    for (let value = 1; value <= 10; value += 1) {
      field.add(`d${value}`, { a: value });
    }

    field.add("dup", { a: 5 });

    return field;
  }

  it("honors inclusive and exclusive bounds", () => {
    const field = numbers();
    const range = (
      lower?: { value: number; inclusive: boolean },
      upper?: { value: number; inclusive: boolean },
    ): string[] => sorted(field.lookupRange("number", lower, upper));

    expect(
      range({ value: 3, inclusive: true }, { value: 5, inclusive: true }),
    ).toEqual(["d3", "d4", "d5", "dup"]);
    expect(
      range({ value: 3, inclusive: false }, { value: 5, inclusive: false }),
    ).toEqual(["d4"]);
    expect(range({ value: 9, inclusive: true })).toEqual(["d10", "d9"]);
    expect(range(undefined, { value: 2, inclusive: false })).toEqual(["d1"]);
    expect(range()).toHaveLength(11);
    expect(
      range({ value: 7, inclusive: true }, { value: 3, inclusive: true }),
    ).toEqual([]);
  });

  it("only returns values of the requested kind", () => {
    const field = index();

    field.add("number", { a: 1 });
    field.add("string", { a: "1" });
    field.add("bigint", { a: 1n });
    field.add("date", { a: new Date(1) });
    field.add("bytes", { a: new Uint8Array([1]) });
    field.add("id", { a: CustomId.generate() });

    const all = { value: 0, inclusive: true };

    expect(sorted(field.lookupRange("number", all, undefined))).toEqual([
      "number",
    ]);
    expect(
      sorted(
        field.lookupRange("string", { value: "", inclusive: true }, undefined),
      ),
    ).toEqual(["string"]);
    expect(
      sorted(
        field.lookupRange("bigint", { value: 0n, inclusive: true }, undefined),
      ),
    ).toEqual(["bigint"]);
    expect(
      sorted(
        field.lookupRange(
          "date",
          { value: new Date(0), inclusive: true },
          undefined,
        ),
      ),
    ).toEqual(["date"]);
  });

  it("does not order non-finite numbers or non-scalar values", () => {
    const field = index();

    field.add("nan", { a: Number.NaN });
    field.add("infinity", { a: Number.POSITIVE_INFINITY });
    field.add("array", { a: [1] });
    field.add("null", { a: null });
    field.add("one", { a: 1 });

    expect(
      sorted(
        field.lookupRange(
          "number",
          { value: -1e308, inclusive: true },
          undefined,
        ),
      ),
    ).toEqual(["one"]);
    expect(sorted(field.lookupEqual(Number.NaN))).toEqual(["nan"]);
    expect(field.orderedKeyCount()).toBe(1);
  });

  it("keeps entries sorted through inserts and removals in any order", () => {
    const field = index();
    const values = [5, 3, 9, 1, 7, 3, 8, 2, 6, 4, 0];

    values.forEach((value, position) =>
      field.add(`d${position}`, { a: value }),
    );
    field.remove("d1", { a: 3 });
    field.remove("d3", { a: 1 });

    expect(field.contents().orderedProblems).toEqual([]);

    const found = field.lookupRange("number", undefined, undefined);

    expect(found.size).toBe(values.length - 2);
  });

  it("estimates range sizes from the number of keys in range", () => {
    const field = numbers();

    expect(
      field.estimateRange(
        "number",
        { value: 3, inclusive: true },
        { value: 5, inclusive: true },
      ),
    ).toBeGreaterThanOrEqual(3);
    expect(
      field.estimateRange("number", { value: 100, inclusive: true }, undefined),
    ).toBe(0);
  });

  it("builds in bulk and sorts once", () => {
    const field = index();

    for (let value = 20; value >= 1; value -= 1) {
      field.add(`d${value}`, { a: value }, true);
    }

    field.finishBulk();

    expect(field.contents().orderedProblems).toEqual([]);
    expect(
      sorted(
        field.lookupRange(
          "number",
          { value: 5, inclusive: true },
          { value: 7, inclusive: true },
        ),
      ),
    ).toEqual(["d5", "d6", "d7"]);
  });
});

describe("FieldIndex missing fields and arrays", () => {
  it("tracks documents without the field unless sparse", () => {
    const dense = index();
    const sparse = index({ sparse: true });

    for (const field of [dense, sparse]) {
      field.add("d1", { b: 1 });
      field.add("d2", { a: 1 });
    }

    expect(dense.documentCount).toBe(2);
    expect(sparse.documentCount).toBe(1);

    dense.remove("d1", { b: 1 });

    expect(dense.documentCount).toBe(1);
  });

  it("remembers whether any array value is indexed", () => {
    const field = index();

    expect(field.hasArrayValues).toBe(false);

    field.add("d1", { a: [1] });

    expect(field.hasArrayValues).toBe(true);

    field.remove("d1", { a: [1] });

    expect(field.hasArrayValues).toBe(false);
  });
});

describe("FieldIndex uniqueness", () => {
  it("reports a conflict for a value another document holds", () => {
    const field = index({ unique: true });

    field.add("d1", { a: 1 });

    expect(field.conflictFor("d2", { a: 1 })?.description).toContain("1");
    expect(field.conflictFor("d1", { a: 1 })).toBeUndefined();
    expect(field.conflictFor("d2", { a: 2 })).toBeUndefined();
  });

  it("allows one document without the field unless sparse", () => {
    const dense = index({ unique: true });
    const sparse = index({ unique: true, sparse: true });

    dense.add("d1", { b: 1 });
    sparse.add("d1", { b: 1 });

    expect(dense.conflictFor("d2", { b: 2 })).toBeDefined();
    expect(dense.conflictFor("d1", { b: 1 })).toBeUndefined();
    expect(sparse.conflictFor("d2", { b: 2 })).toBeUndefined();
  });

  it("treats null and a missing field as different values", () => {
    const field = index({ unique: true });

    field.add("d1", { a: null });

    expect(field.conflictFor("d2", { b: 1 })).toBeUndefined();
    expect(field.conflictFor("d3", { a: null })).toBeDefined();
  });

  it("never conflicts when the index is not unique", () => {
    const field = index();

    field.add("d1", { a: 1 });

    expect(field.conflictFor("d2", { a: 1 } as Document)).toBeUndefined();
  });

  it("keeps long descriptions short", () => {
    const field = index({ unique: true });

    field.add("d1", { a: "x".repeat(500) });

    expect(
      (field.conflictFor("d2", { a: "x".repeat(500) })?.description ?? "")
        .length,
    ).toBeLessThan(160);
  });
});
