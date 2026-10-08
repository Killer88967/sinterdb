import { InMemoryCollection, StorageEngine } from "@sinterdb-internal/storage";

export const CatalogErrorCode = {
  InvalidDatabaseName: "INVALID_DATABASE_NAME",
  InvalidCollectionName: "INVALID_COLLECTION_NAME",
  NamespaceConflict: "NAMESPACE_CONFLICT",
} as const;

export type CatalogErrorCode =
  (typeof CatalogErrorCode)[keyof typeof CatalogErrorCode];

export class CatalogError extends Error {
  public readonly code: CatalogErrorCode;

  public constructor(code: CatalogErrorCode, message: string) {
    super(message);

    this.name = "CatalogError";
    this.code = code;
  }
}

export const MAX_NAME_BYTES = 255;

export interface CreatedCollection {
  database: string;
  collection: string;
}

interface DatabaseEntry {
  readonly name: string;
  readonly collections: Map<string, InMemoryCollection>;
}

export class InMemoryCatalog {
  private readonly databases = new Map<string, DatabaseEntry>();

  /**
   * Without an engine every collection lives only in memory. With one, the
   * engine owns the collection and every change is made durable first.
   */
  public constructor(private readonly engine?: StorageEngine) {}

  public get databaseCount(): number {
    return this.engine === undefined
      ? this.databases.size
      : this.engine.listDatabases().length;
  }

  public get collectionCount(): number {
    if (this.engine !== undefined) {
      let total = 0;

      for (const database of this.engine.listDatabases()) {
        total += this.engine.listCollections(database).length;
      }

      return total;
    }

    let count = 0;

    for (const database of this.databases.values()) {
      count += database.collections.size;
    }

    return count;
  }

  public listDatabases(): string[] {
    if (this.engine !== undefined) {
      return sortNames(this.engine.listDatabases());
    }
    return sortNames(this.databases.keys());
  }

  public hasDatabase(name: string): boolean {
    validateDatabaseName(name);

    if (this.engine !== undefined) {
      return this.engine.listCollections(name).length > 0;
    }

    return this.databases.has(name);
  }

  public listCollections(databaseName: string): string[] {
    validateDatabaseName(databaseName);

    if (this.engine !== undefined) {
      return sortNames(this.engine.listCollections(databaseName));
    }

    const database = this.databases.get(databaseName);

    if (database === undefined) {
      return [];
    }

    return sortNames(database.collections.keys());
  }

  public hasCollection(databaseName: string, collectionName: string): boolean {
    validateDatabaseName(databaseName);
    validateCollectionName(collectionName);

    if (this.engine !== undefined) {
      return (
        this.engine.getCollection(databaseName, collectionName) !== undefined
      );
    }

    return (
      this.databases.get(databaseName)?.collections.has(collectionName) ?? false
    );
  }

  public getCollection(
    databaseName: string,
    collectionName: string,
  ): InMemoryCollection | undefined {
    validateDatabaseName(databaseName);
    validateCollectionName(collectionName);

    if (this.engine !== undefined) {
      return this.engine.getCollection(databaseName, collectionName);
    }

    return this.databases.get(databaseName)?.collections.get(collectionName);
  }

  public getOrCreateCollection(
    databaseName: string,
    collectionName: string,
  ): InMemoryCollection {
    validateDatabaseName(databaseName);
    validateCollectionName(collectionName);

    if (this.engine !== undefined) {
      return this.engine.openCollection(databaseName, collectionName);
    }

    const database = this.getOrCreateDatabase(databaseName);
    const existing = database.collections.get(collectionName);

    if (existing !== undefined) {
      return existing;
    }

    const collection = new InMemoryCollection();

    database.collections.set(collectionName, collection);

    return collection;
  }

  public createCollection(
    databaseName: string,
    collectionName: string,
  ): CreatedCollection {
    validateDatabaseName(databaseName);
    validateCollectionName(collectionName);

    if (this.engine !== undefined) {
      if (
        this.engine.getCollection(databaseName, collectionName) !== undefined
      ) {
        throw new CatalogError(
          CatalogErrorCode.NamespaceConflict,
          `Collection ${JSON.stringify(
            `${databaseName}.${collectionName}`,
          )} already exists.`,
        );
      }

      this.engine.openCollection(databaseName, collectionName);

      return { database: databaseName, collection: collectionName };
    }

    const database = this.getOrCreateDatabase(databaseName);

    if (database.collections.has(collectionName)) {
      throw new CatalogError(
        CatalogErrorCode.NamespaceConflict,
        `Collection ${JSON.stringify(
          `${databaseName}.${collectionName}`,
        )} already exists.`,
      );
    }

    database.collections.set(collectionName, new InMemoryCollection());

    return {
      database: database.name,
      collection: collectionName,
    };
  }

  public clear(): void {
    if (this.engine !== undefined) {
      throw new Error("A durable catalog cannot be cleared.");
    }

    for (const database of this.databases.values()) {
      for (const collection of database.collections.values()) {
        collection.clear();
      }
    }

    this.databases.clear();
  }

  private getOrCreateDatabase(name: string): DatabaseEntry {
    const existing = this.databases.get(name);

    if (existing !== undefined) {
      return existing;
    }

    const database: DatabaseEntry = {
      name,
      collections: new Map(),
    };

    this.databases.set(name, database);

    return database;
  }
}

function validateDatabaseName(name: string): void {
  validateName(name, "database", CatalogErrorCode.InvalidDatabaseName);
}

function validateCollectionName(name: string): void {
  validateName(name, "collection", CatalogErrorCode.InvalidCollectionName);
}

function validateName(
  name: string,
  kind: "database" | "collection",
  errorCode: CatalogErrorCode,
): void {
  if (typeof name !== "string" || name.trim().length === 0) {
    throw new CatalogError(
      errorCode,
      `${capitalize(kind)} name must be a non-empty string.`,
    );
  }

  if (name.includes("\0")) {
    throw new CatalogError(
      errorCode,
      `${capitalize(kind)} name cannot contain a null character.`,
    );
  }

  if (Buffer.byteLength(name, "utf8") > MAX_NAME_BYTES) {
    throw new CatalogError(
      errorCode,
      `${capitalize(kind)} name cannot be longer than ${MAX_NAME_BYTES} bytes.`,
    );
  }
}

function sortNames(names: Iterable<string>): string[] {
  return [...names].sort((left, right) => {
    if (left < right) {
      return -1;
    }

    if (left > right) {
      return 1;
    }

    return 0;
  });
}

function capitalize(value: string): string {
  return value[0]!.toUpperCase() + value.slice(1);
}
