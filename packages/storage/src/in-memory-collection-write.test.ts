import { CustomId, type Document } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { StorageError, StorageErrorCode } from "./errors.js";
import { InMemoryCollection } from "./in-memory-collection.js";

function createCollection(documents: Document[]): InMemoryCollection {
  const collection = new InMemoryCollection();

  collection.insertMany(documents);

  return collection;
}

function all(collection: InMemoryCollection): Document[] {
  return [...collection.find({})];
}

function names(collection: InMemoryCollection): unknown[] {
  return all(collection).map((document) => document["name"]);
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

const people = (): InMemoryCollection =>
  createCollection([
    { name: "Ada", age: 36, team: "a" },
    { name: "Grace", age: 85, team: "b" },
    { name: "Linus", age: 36, team: "a" },
  ]);

describe("deleteOne and deleteMany", () => {
  it("deletes the first match", () => {
    const collection = people();

    expect(collection.deleteOne({ team: "a" })).toEqual({ deletedCount: 1 });
    expect(names(collection)).toEqual(["Grace", "Linus"]);
  });

  it("deletes by _id", () => {
    const collection = people();
    const target = all(collection)[1] as Document;

    expect(collection.deleteOne({ _id: target["_id"] as CustomId })).toEqual({
      deletedCount: 1,
    });
    expect(names(collection)).toEqual(["Ada", "Linus"]);

    expect(collection.deleteOne({ _id: target["_id"] as CustomId })).toEqual({
      deletedCount: 0,
    });
  });

  it("does not delete when _id matches but the filter does not", () => {
    const collection = people();
    const target = all(collection)[0] as Document;

    expect(
      collection.deleteOne({ _id: target["_id"] as CustomId, name: "Nope" }),
    ).toEqual({ deletedCount: 0 });
    expect(names(collection)).toHaveLength(3);
  });

  it("reports zero when nothing matches", () => {
    expect(people().deleteOne({ team: "z" })).toEqual({ deletedCount: 0 });
    expect(people().deleteMany({ team: "z" })).toEqual({ deletedCount: 0 });
  });

  it("deletes every match", () => {
    const collection = people();

    expect(collection.deleteMany({ age: 36 })).toEqual({ deletedCount: 2 });
    expect(names(collection)).toEqual(["Grace"]);
  });

  it("deletes everything with an empty filter", () => {
    const collection = people();

    expect(collection.deleteMany({})).toEqual({ deletedCount: 3 });
    expect(all(collection)).toEqual([]);
  });

  it("rejects invalid filters without deleting", () => {
    const collection = people();

    expectCode(
      () => collection.deleteMany({ age: { $around: 1 } }),
      StorageErrorCode.InvalidFilter,
    );
    expect(names(collection)).toHaveLength(3);
  });

  it("lets a deleted _id be inserted again", () => {
    const collection = people();
    const target = all(collection)[0] as Document;
    const id = target["_id"] as CustomId;

    collection.deleteOne({ _id: id });

    expect(collection.insertOne({ _id: id, name: "Again" }).insertedId).toBe(
      id,
    );
  });
});

describe("replaceOne", () => {
  it("replaces a document and keeps its _id and position", () => {
    const collection = people();
    const before = all(collection)[1] as Document;

    expect(
      collection.replaceOne({ name: "Grace" }, { name: "Hopper", rank: 1 }),
    ).toEqual({ matchedCount: 1, modifiedCount: 1 });

    const after = all(collection);

    expect(names(collection)).toEqual(["Ada", "Hopper", "Linus"]);
    expect(after[1]).toEqual({ _id: before["_id"], name: "Hopper", rank: 1 });
    expect(after[1]?.["age"]).toBeUndefined();
  });

  it("reports an unmodified replacement", () => {
    const collection = people();

    expect(
      collection.replaceOne(
        { name: "Ada" },
        { name: "Ada", age: 36, team: "a" },
      ),
    ).toEqual({ matchedCount: 1, modifiedCount: 0 });
  });

  it("allows the replacement to repeat the same _id", () => {
    const collection = people();
    const id = (all(collection)[0] as Document)["_id"] as CustomId;

    expect(
      collection.replaceOne({ _id: id }, { _id: id, name: "Same" }),
    ).toEqual({ matchedCount: 1, modifiedCount: 1 });
  });

  it("rejects a different _id", () => {
    const collection = people();

    expectCode(
      () =>
        collection.replaceOne(
          { name: "Ada" },
          { _id: CustomId.generate(), name: "X" },
        ),
      StorageErrorCode.ImmutableId,
    );

    expectCode(
      () => collection.replaceOne({ name: "Ada" }, { _id: "text", name: "X" }),
      StorageErrorCode.ImmutableId,
    );
  });

  it("rejects operator documents as replacements", () => {
    expectCode(
      () => people().replaceOne({ name: "Ada" }, { $set: { a: 1 } }),
      StorageErrorCode.InvalidDocument,
    );
  });

  it("rejects replacements that cannot be encoded", () => {
    const collection = people();

    expectCode(
      () => collection.replaceOne({ name: "Ada" }, { bad: undefined as never }),
      StorageErrorCode.InvalidDocument,
    );
    expect(names(collection)).toEqual(["Ada", "Grace", "Linus"]);
  });

  it("reports no match without upsert", () => {
    expect(people().replaceOne({ name: "Zed" }, { name: "Zed" })).toEqual({
      matchedCount: 0,
      modifiedCount: 0,
    });
  });

  it("upserts when nothing matches", () => {
    const collection = people();
    const result = collection.replaceOne(
      { name: "Zed" },
      { name: "Zed", age: 1 },
      { upsert: true },
    );

    expect(result.matchedCount).toBe(0);
    expect(result.upsertedId).toBeInstanceOf(CustomId);
    expect(collection.findById(result.upsertedId as CustomId)).toEqual({
      _id: result.upsertedId,
      name: "Zed",
      age: 1,
    });
  });

  it("upserts using an _id from the filter", () => {
    const collection = people();
    const id = CustomId.generate();
    const result = collection.replaceOne(
      { _id: id },
      { name: "Fixed" },
      { upsert: true },
    );

    expect(result.upsertedId).toBe(id);
    expect(collection.findById(id)?.["name"]).toBe("Fixed");
  });

  it("rejects an upsert whose filter and replacement _id differ", () => {
    expectCode(
      () =>
        people().replaceOne(
          { _id: CustomId.generate() },
          { _id: CustomId.generate(), name: "X" },
          { upsert: true },
        ),
      StorageErrorCode.ImmutableId,
    );
  });

  it("rejects a non-boolean upsert option", () => {
    expectCode(
      () =>
        people().replaceOne(
          { name: "Ada" },
          { name: "A" },
          {
            upsert: "yes" as never,
          },
        ),
      StorageErrorCode.InvalidUpdate,
    );
  });
});

describe("updateOne", () => {
  it("updates only the first match", () => {
    const collection = people();

    expect(collection.updateOne({ team: "a" }, { $inc: { age: 1 } })).toEqual({
      matchedCount: 1,
      modifiedCount: 1,
    });

    expect(all(collection).map((document) => document["age"])).toEqual([
      37, 85, 36,
    ]);
  });

  it("reports matched but unmodified updates", () => {
    expect(people().updateOne({ name: "Ada" }, { $set: { age: 36 } })).toEqual({
      matchedCount: 1,
      modifiedCount: 0,
    });
  });

  it("keeps _id and insertion order", () => {
    const collection = people();
    const before = all(collection).map((document) => document["_id"]);

    collection.updateOne({ name: "Grace" }, { $set: { rank: 1 } });

    expect(all(collection).map((document) => document["_id"])).toEqual(before);
    expect(names(collection)).toEqual(["Ada", "Grace", "Linus"]);
  });

  it("updates by _id", () => {
    const collection = people();
    const id = (all(collection)[2] as Document)["_id"] as CustomId;

    collection.updateOne({ _id: id }, { $set: { name: "Torvalds" } });

    expect(collection.findById(id)?.["name"]).toBe("Torvalds");
  });

  it("reports no match without upsert", () => {
    expect(people().updateOne({ name: "Zed" }, { $set: { a: 1 } })).toEqual({
      matchedCount: 0,
      modifiedCount: 0,
    });
  });

  it("leaves the document untouched when an operator fails", () => {
    const collection = people();

    expectCode(
      () =>
        collection.updateOne(
          { name: "Ada" },
          { $set: { extra: 1 }, $inc: { name: 1 } },
        ),
      StorageErrorCode.InvalidUpdate,
    );

    expect(all(collection)[0]).not.toHaveProperty("extra");
  });

  it("rejects an update that produces an unencodable document", () => {
    const collection = people();

    expectCode(
      () =>
        collection.updateOne(
          { name: "Ada" },
          { $set: { bad: undefined as never } },
        ),
      StorageErrorCode.InvalidDocument,
    );
    expect(all(collection)[0]).not.toHaveProperty("bad");
  });

  it("rejects _id changes", () => {
    expectCode(
      () => people().updateOne({ name: "Ada" }, { $set: { _id: 1 } }),
      StorageErrorCode.ImmutableId,
    );
  });
});

describe("updateMany", () => {
  it("updates every match", () => {
    const collection = people();

    expect(collection.updateMany({ age: 36 }, { $set: { vip: true } })).toEqual(
      {
        matchedCount: 2,
        modifiedCount: 2,
      },
    );

    expect(all(collection).map((document) => document["vip"])).toEqual([
      true,
      undefined,
      true,
    ]);
  });

  it("counts only changed documents as modified", () => {
    const collection = people();

    collection.updateOne({ name: "Ada" }, { $set: { vip: true } });

    expect(collection.updateMany({ age: 36 }, { $set: { vip: true } })).toEqual(
      {
        matchedCount: 2,
        modifiedCount: 1,
      },
    );
  });

  it("updates every document with an empty filter", () => {
    const collection = people();

    expect(collection.updateMany({}, { $inc: { age: 1 } })).toEqual({
      matchedCount: 3,
      modifiedCount: 3,
    });
  });

  it("is all-or-nothing when one document fails", () => {
    const collection = createCollection([
      { n: 1, v: 1 },
      { n: 2, v: 2 },
      { n: 3, v: "text" },
    ]);

    expectCode(
      () => collection.updateMany({}, { $inc: { v: 10 } }),
      StorageErrorCode.InvalidUpdate,
    );

    expect(all(collection).map((document) => document["v"])).toEqual([
      1,
      2,
      "text",
    ]);
  });

  it("reports no match without upsert", () => {
    expect(people().updateMany({ team: "z" }, { $set: { a: 1 } })).toEqual({
      matchedCount: 0,
      modifiedCount: 0,
    });
  });
});

describe("update upserts", () => {
  it("seeds the new document from filter equality fields", () => {
    const collection = people();
    const result = collection.updateOne(
      { name: "Zed", "profile.level": 2, age: { $gt: 5 } },
      { $set: { active: true }, $inc: { visits: 1 } },
      { upsert: true },
    );

    expect(result.matchedCount).toBe(0);
    expect(result.modifiedCount).toBe(0);
    expect(collection.findById(result.upsertedId as CustomId)).toEqual({
      _id: result.upsertedId,
      name: "Zed",
      profile: { level: 2 },
      active: true,
      visits: 1,
    });
  });

  it("uses an _id from the filter", () => {
    const collection = people();
    const id = CustomId.generate();

    const result = collection.updateOne(
      { _id: id },
      { $set: { name: "Fixed" } },
      { upsert: true },
    );

    expect(result.upsertedId).toBe(id);
  });

  it("does not upsert when a document matches", () => {
    const collection = people();
    const result = collection.updateOne(
      { name: "Ada" },
      { $set: { vip: true } },
      { upsert: true },
    );

    expect(result.upsertedId).toBeUndefined();
    expect(all(collection)).toHaveLength(3);
  });

  it("upserts once for updateMany", () => {
    const collection = people();
    const result = collection.updateMany(
      { team: "z" },
      { $set: { found: false } },
      { upsert: true },
    );

    expect(result.upsertedId).toBeInstanceOf(CustomId);
    expect(all(collection)).toHaveLength(4);
  });

  it("rejects an upsert whose _id already exists", () => {
    const collection = people();
    const id = (all(collection)[0] as Document)["_id"] as CustomId;

    expectCode(
      () =>
        collection.updateOne(
          { _id: id, name: "Nope" },
          { $set: { a: 1 } },
          { upsert: true },
        ),
      StorageErrorCode.DuplicateId,
    );
  });
});
