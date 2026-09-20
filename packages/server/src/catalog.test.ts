import { describe, expect, it } from "vitest";

import { InMemoryCollection } from "@sinterdb-internal/storage";

import { CatalogError, CatalogErrorCode, InMemoryCatalog } from "./catalog.js";

describe("InMemoryCatalog", () => {
  it("starts empty", () => {
    const catalog = new InMemoryCatalog();

    expect(catalog.databaseCount).toBe(0);
    expect(catalog.collectionCount).toBe(0);
    expect(catalog.listDatabases()).toEqual([]);
  });

  it("creates a collection an its logical database", () => {
    const catalog = new InMemoryCatalog();

    expect(catalog.createCollection("app", "users")).toEqual({
      database: "app",
      collection: "users",
    });

    expect(catalog.hasDatabase("app")).toBe(true);
    expect(catalog.hasCollection("app", "users")).toBe(true);
    expect(catalog.databaseCount).toBe(1);
    expect(catalog.collectionCount).toBe(1);
  });

  it("supports collections with the same name in different databases", () => {
    const catalog = new InMemoryCatalog();

    catalog.createCollection("app", "users");
    catalog.createCollection("admin", "users");

    expect(catalog.hasCollection("app", "users")).toBe(true);
    expect(catalog.hasCollection("admin", "users")).toBe(true);
  });

  it("returns database and collection names in deterministic order", () => {
    const catalog = new InMemoryCatalog();

    catalog.createCollection("middle", "middle");
    catalog.createCollection("zeta", "zeta");
    catalog.createCollection("alpha", "alpha");
    catalog.createCollection("middle", "zeta");
    catalog.createCollection("middle", "alpha");

    expect(catalog.listDatabases()).toEqual(["alpha", "middle", "zeta"]);
    expect(catalog.listCollections("middle")).toEqual([
      "alpha",
      "middle",
      "zeta",
    ]);
  });

  it("returns an empty collection list for an unknown database", () => {
    const catalog = new InMemoryCatalog();

    expect(catalog.listCollections("missing")).toEqual([]);
  });

  it("rejects duplicate collections", () => {
    const catalog = new InMemoryCatalog();

    catalog.createCollection("app", "users");

    expect(() => catalog.createCollection("app", "users")).toThrow(
      CatalogError,
    );

    try {
      catalog.createCollection("app", "users");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(CatalogError);

      if (error instanceof CatalogError) {
        expect(error.code).toBe(CatalogErrorCode.NamespaceConflict);
      }
    }
  });

  it.each(["", " ", "\0invalid"])(
    "rejects invalid database name %j",
    (databaseName) => {
      const catalog = new InMemoryCatalog();

      expect(() => catalog.createCollection(databaseName, "users")).toThrow(
        CatalogError,
      );
    },
  );

  it.each(["", " ", "invalid\0name"])(
    "rejects invalid collection name %j",
    (collectionName) => {
      const catalog = new InMemoryCatalog();

      expect(() => catalog.createCollection("app", collectionName)).toThrow(
        CatalogError,
      );
    },
  );

  it("clears all catalog entries", () => {
    const catalog = new InMemoryCatalog();

    catalog.createCollection("app", "users");
    catalog.createCollection("logs", "events");
    catalog.clear();

    expect(catalog.listDatabases()).toEqual([]);
    expect(catalog.databaseCount).toBe(0);
    expect(catalog.collectionCount).toBe(0);
  });

  it("provides storage for created collections", () => {
    const catalog = new InMemoryCatalog();

    catalog.createCollection("app", "users");

    const collection = catalog.getCollection("app", "users");

    expect(collection).toBeInstanceOf(InMemoryCollection);
    expect(catalog.getCollection("missing", "users")).toBeUndefined();
    expect(catalog.getCollection("app", "missing")).toBeUndefined();
  });

  it("gets or creates collection storage idempotently", () => {
    const catalog = new InMemoryCatalog();

    const first = catalog.getOrCreateCollection("app", "users");
    const second = catalog.getOrCreateCollection("app", "users");

    expect(first).toBe(second);
    expect(catalog.databaseCount).toBe(1);
    expect(catalog.collectionCount).toBe(1);
    expect(catalog.listCollections("app")).toEqual(["users"]);
  });

  it("clears documents held by collection storage", () => {
    const catalog = new InMemoryCatalog();
    const collection = catalog.getOrCreateCollection("app", "users");

    collection.insertOne({
      name: "Ada",
    });

    expect(collection.documentCount).toBe(1);

    catalog.clear();

    expect(collection.documentCount).toBe(0);
    expect(catalog.databaseCount).toBe(0);
    expect(catalog.collectionCount).toBe(0);
  });
});
