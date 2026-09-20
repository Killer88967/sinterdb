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
});
