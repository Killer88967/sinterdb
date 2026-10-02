import { CustomId, type Document } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { StorageError, StorageErrorCode } from "./errors.js";
import { InMemoryCollection } from "./in-memory-collection.js";
import { compileSort } from "./sort.js";

function createCollection(documents: Document[]): InMemoryCollection {
  const collection = new InMemoryCollection();

  collection.insertMany(documents);

  return collection;
}

function names(documents: Iterable<Document>): unknown[] {
  return [...documents].map((document) => document["name"]);
}

function expectInvalidFindOptions(action: () => unknown): void {
  try {
    action();
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(StorageError);
    expect((error as StorageError).code).toBe(
      StorageErrorCode.InvalidFindOptions,
    );

    return;
  }

  throw new Error("Expected INVALID_FIND_OPTIONS to be thrown.");
}

describe("find options", () => {
  const people = (): InMemoryCollection =>
    createCollection([
      { name: "Ada", age: 36, team: "b" },
      { name: "Grace", age: 85, team: "a" },
      { name: "Katherine", age: 101, team: "b" },
      { name: "Linus", age: 36, team: "a" },
      { name: "Margaret", team: "a" },
    ]);

  it("sorts ascending and descending", () => {
    expect(names(people().find({}, { sort: [["name", 1]] }))).toEqual([
      "Ada",
      "Grace",
      "Katherine",
      "Linus",
      "Margaret",
    ]);

    expect(names(people().find({}, { sort: [["name", -1]] }))).toEqual([
      "Margaret",
      "Linus",
      "Katherine",
      "Grace",
      "Ada",
    ]);
  });

  it("sorts by multiple keys in priority order", () => {
    const sorted = people().find(
      {},
      {
        sort: [
          ["age", -1],
          ["name", -1],
        ],
      },
    );

    expect(names(sorted)).toEqual([
      "Katherine",
      "Grace",
      "Linus",
      "Ada",
      "Margaret",
    ]);
  });

  it("places missing values first ascending and last descending", () => {
    expect(names(people().find({}, { sort: [["age", 1]] }))[0]).toBe(
      "Margaret",
    );

    expect(names(people().find({}, { sort: [["age", -1]] })).at(-1)).toBe(
      "Margaret",
    );
  });

  it("keeps insertion order for equal sort keys", () => {
    expect(names(people().find({ age: 36 }, { sort: [["age", 1]] }))).toEqual([
      "Ada",
      "Linus",
    ]);
  });

  it("sorts nested paths", () => {
    const collection = createCollection([
      { name: "a", profile: { level: 3 } },
      { name: "b", profile: { level: 1 } },
      { name: "c", profile: { level: 2 } },
      { name: "d" },
    ]);

    expect(
      names(collection.find({}, { sort: [["profile.level", -1]] })),
    ).toEqual(["a", "c", "b", "d"]);
  });

  it("orders values of different types by type rank", () => {
    const collection = createCollection([
      { name: "string", v: "x" },
      { name: "number", v: 1 },
      { name: "null", v: null },
      { name: "bool", v: true },
      { name: "date", v: new Date(0) },
      { name: "id", v: CustomId.generate() },
      { name: "bytes", v: new Uint8Array([1]) },
      { name: "missing" },
    ]);

    expect(names(collection.find({}, { sort: [["v", 1]] }))).toEqual([
      "missing",
      "null",
      "number",
      "string",
      "bytes",
      "id",
      "bool",
      "date",
    ]);
  });

  it("compares numbers and bigints together", () => {
    const collection = createCollection([
      { name: "big", v: 10n },
      { name: "small", v: 2 },
      { name: "mid", v: 5n },
    ]);

    expect(names(collection.find({}, { sort: [["v", 1]] }))).toEqual([
      "small",
      "mid",
      "big",
    ]);
  });

  it("applies skip and limit without a sort", () => {
    expect(names(people().find({}, { skip: 1, limit: 2 }))).toEqual([
      "Grace",
      "Katherine",
    ]);

    expect(names(people().find({}, { skip: 10 }))).toEqual([]);
    expect(names(people().find({}, { limit: 100 }))).toHaveLength(5);
  });

  it("applies skip and limit after filtering", () => {
    expect(names(people().find({ team: "a" }, { skip: 1, limit: 1 }))).toEqual([
      "Linus",
    ]);
  });

  it("applies skip and limit after sorting", () => {
    expect(
      names(people().find({}, { sort: [["name", -1]], skip: 1, limit: 2 })),
    ).toEqual(["Linus", "Katherine"]);
  });

  it("treats empty options like no options", () => {
    expect(names(people().find({}, {}))).toEqual(names(people().find({})));
  });

  it("rejects invalid skip and limit values eagerly", () => {
    const collection = people();

    for (const skip of [-1, 1.5, Number.NaN, Number.MAX_SAFE_INTEGER + 1]) {
      expectInvalidFindOptions(() => collection.find({}, { skip }));
    }

    for (const limit of [0, -1, 1.5, Number.NaN]) {
      expectInvalidFindOptions(() => collection.find({}, { limit }));
    }
  });

  it("rejects invalid sort specifications eagerly", () => {
    const collection = people();
    const invalid: unknown[] = [
      [],
      "name",
      { name: 1 },
      [["name"]],
      [["name", 2]],
      [["name", "asc"]],
      [["", 1]],
      [["a..b", 1]],
      [["$bad", 1]],
      [["a.$bad", 1]],
      [[5, 1]],
      [
        ["name", 1],
        ["name", -1],
      ],
    ];

    for (const sort of invalid) {
      expectInvalidFindOptions(() =>
        collection.find({}, { sort: sort as never }),
      );
    }
  });
});

describe("compileSort", () => {
  it("returns a new array and leaves the input untouched", () => {
    const input: Document[] = [{ n: 2 }, { n: 1 }];
    const sorted = compileSort([["n", 1]])(input);

    expect(sorted).toEqual([{ n: 1 }, { n: 2 }]);
    expect(input).toEqual([{ n: 2 }, { n: 1 }]);
    expect(sorted).not.toBe(input);
  });
});
