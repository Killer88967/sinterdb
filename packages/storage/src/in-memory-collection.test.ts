import { CustomId, type Document } from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import {
  InMemoryCollection,
  StorageError,
  StorageErrorCode,
} from "./in-memory-collection.js";

describe("InMemoryCollection", () => {
  it("starts empty", () => {
    const collection = new InMemoryCollection();

    expect(collection.documentCount).toBe(0);
  });

  it("generates an identifier when one is not provided", () => {
    const collection = new InMemoryCollection();

    const result = collection.insertOne({
      name: "Ada",
    });

    expect(result.insertedId).toBeInstanceOf(CustomId);
    expect(collection.documentCount).toBe(1);
    expect(collection.has(result.insertedId)).toBe(true);

    const stored = collection.findById(result.insertedId);

    expect(stored?.["name"]).toBe("Ada");

    const storedId = stored?.["_id"];

    expect(storedId).toBeInstanceOf(CustomId);

    if (storedId instanceof CustomId) {
      expect(storedId.equals(result.insertedId)).toBe(true);
    }
  });

  it("preserves a provided identifier", () => {
    const collection = new InMemoryCollection();
    const id = CustomId.fromHexString("00112233445566778899aabbccddeeff");

    const result = collection.insertOne({
      _id: id,
      name: "Ada",
    });

    expect(result.insertedId.equals(id)).toBe(true);

    const stored = collection.findById(id);
    const storedId = stored?.["_id"];

    expect(storedId).toBeInstanceOf(CustomId);

    if (storedId instanceof CustomId) {
      expect(storedId.equals(id)).toBe(true);
    }
  });

  it("rejects duplicate identifiers", () => {
    const collection = new InMemoryCollection();
    const id = CustomId.fromHexString("00112233445566778899aabbccddeeff");

    collection.insertOne({
      _id: id,
      name: "first",
    });

    expect(() =>
      collection.insertOne({
        _id: id,
        name: "second",
      }),
    ).toThrow(StorageError);

    try {
      collection.insertOne({
        _id: id,
        name: "second",
      });
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(StorageError);

      if (error instanceof StorageError) {
        expect(error.code).toBe(StorageErrorCode.DuplicateId);
      }
    }

    expect(collection.documentCount).toBe(1);
  });

  it("rejects non-CustomId identifier values", () => {
    const collection = new InMemoryCollection();

    expect(() =>
      collection.insertOne({
        _id: "not-an-id",
      }),
    ).toThrow(StorageError);

    try {
      collection.insertOne({
        _id: "not-an-id",
      });
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(StorageError);

      if (error instanceof StorageError) {
        expect(error.code).toBe(StorageErrorCode.InvalidDocumentId);
      }
    }
  });

  it("does not retain mutable document references", () => {
    const collection = new InMemoryCollection();
    const input: Document = {
      name: "Ada",
    };

    const result = collection.insertOne(input);

    input["name"] = "Grace";

    const firstRead = collection.findById(result.insertedId);

    if (firstRead === undefined) {
      throw new Error("Expected the inserted document to exist.");
    }

    expect(firstRead["name"]).toBe("Ada");

    firstRead["name"] = "Katherine";

    const secondRead = collection.findById(result.insertedId);

    expect(secondRead?.["name"]).toBe("Ada");
  });

  it("rejects values that cannot be encoded", () => {
    const collection = new InMemoryCollection();
    const invalid = {
      value: undefined,
    } as unknown as Document;

    expect(() => collection.insertOne(invalid)).toThrow(StorageError);

    try {
      collection.insertOne(invalid);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(StorageError);

      if (error instanceof StorageError) {
        expect(error.code).toBe(StorageErrorCode.InvalidDocument);
      }
    }
  });

  it("finds no document for an unknown identifier", () => {
    const collection = new InMemoryCollection();

    expect(collection.findById(CustomId.generate())).toBeUndefined();
  });

  it("clears all documents", () => {
    const collection = new InMemoryCollection();

    collection.insertOne({
      name: "Ada",
    });

    collection.insertOne({
      name: "Grace",
    });

    collection.clear();

    expect(collection.documentCount).toBe(0);
  });

  it("finds the first document matching an equality filter", () => {
    const collection = new InMemoryCollection();

    collection.insertOne({
      name: "Ada",
      active: true,
    });

    collection.insertOne({
      name: "Grace",
      active: false,
    });

    const found = collection.findOne({
      active: false,
    });

    expect(found?.["name"]).toBe("Grace");
  });

  it("finds a document by CustomId", () => {
    const collection = new InMemoryCollection();
    const id = CustomId.fromHexString("00112233445566778899aabbccddeeff");

    collection.insertOne({
      _id: id,
      name: "Ada",
    });

    const found = collection.findOne({
      _id: id,
    });

    expect(found?.["name"]).toBe("Ada");

    const foundId = found?.["_id"];

    expect(foundId).toBeInstanceOf(CustomId);

    if (foundId instanceof CustomId) {
      expect(foundId.equals(id)).toBe(true);
    }
  });

  it("applies additional filters when finding by CustomId", () => {
    const collection = new InMemoryCollection();
    const id = CustomId.fromHexString("00112233445566778899aabbccddeeff");

    collection.insertOne({
      _id: id,
      name: "Ada",
    });

    expect(
      collection.findOne({
        _id: id,
        name: "Grace",
      }),
    ).toBeUndefined();
  });

  it("compares nested values using canonical equality", () => {
    const collection = new InMemoryCollection();

    collection.insertOne({
      name: "Ada",
      profile: {
        active: true,
        level: 5,
      },
      createdAt: new Date("2026-09-21T00:00:00.000Z"),
      data: new Uint8Array([1, 2, 3]),
    });

    const found = collection.findOne({
      profile: {
        level: 5,
        active: true,
      },
      createdAt: new Date("2026-09-21T00:00:00.000Z"),
      data: new Uint8Array([1, 2, 3]),
    });

    expect(found?.["name"]).toBe("Ada");
  });

  it("returns the first document for an empty filter", () => {
    const collection = new InMemoryCollection();

    collection.insertOne({
      name: "first",
    });

    collection.insertOne({
      name: "second",
    });

    expect(collection.findOne({})?.["name"]).toBe("first");
  });

  it("returns undefined when no document matches", () => {
    const collection = new InMemoryCollection();

    collection.insertOne({
      name: "Ada",
    });

    expect(
      collection.findOne({
        name: "Grace",
      }),
    ).toBeUndefined();
  });

  it("rejects filters that cannot be encoded", () => {
    const collection = new InMemoryCollection();
    const invalid = {
      value: undefined,
    } as unknown as Document;

    expect(() => collection.findOne(invalid)).toThrow(StorageError);

    try {
      collection.findOne(invalid);
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(StorageError);

      if (error instanceof StorageError) {
        expect(error.code).toBe(StorageErrorCode.InvalidFilter);
      }
    }
  });
});
