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

export interface CreatedCollection {
  database: string;
  collection: string;
}

interface DatabaseEntry {
  readonly name: string;
  readonly collections: Set<string>;
}

export class InMemoryCatalog {
  private readonly databases = new Map<string, DatabaseEntry>();

  public get databaseCount(): number {
    return this.databases.size;
  }

  public get collectionCount(): number {
    let count = 0;

    for (const database of this.databases.values()) {
      count += database.collections.size;
    }

    return count;
  }

  public listDatabases(): string[] {
    return sortNames(this.databases.keys());
  }

  public hasDatabase(name: string): boolean {
    validateDatabaseName(name);

    return this.databases.has(name);
  }

  public listCollections(databaseName: string): string[] {
    validateDatabaseName(databaseName);

    const database = this.databases.get(databaseName);

    if (database === undefined) {
      return [];
    }

    return sortNames(database.collections);
  }

  public hasCollection(databaseName: string, collectionName: string): boolean {
    validateDatabaseName(databaseName);
    validateCollectionName(collectionName);

    return (
      this.databases.get(databaseName)?.collections.has(collectionName) ?? false
    );
  }

  public createCollection(
    databaseName: string,
    collectionName: string,
  ): CreatedCollection {
    validateDatabaseName(databaseName);
    validateCollectionName(collectionName);

    let database = this.databases.get(databaseName);

    if (database === undefined) {
      database = {
        name: databaseName,
        collections: new Set(),
      };

      this.databases.set(databaseName, database);
    }

    if (database.collections.has(collectionName)) {
      throw new CatalogError(
        CatalogErrorCode.NamespaceConflict,
        `Collection ${JSON.stringify(`${databaseName},${collectionName}`)} already exists.`,
      );
    }

    database.collections.add(collectionName);

    return {
      database: database.name,
      collection: collectionName,
    };
  }

  public clear(): void {
    this.databases.clear();
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
}

function sortNames(names: Iterable<string>): string[] {
  return [...names].sort((left, right) => {
    if (left < right) {
      return -1;
    }

    if (left < right) {
      return 1;
    }

    return 0;
  });
}

function capitalize(value: string): string {
  return value[0]!.toUpperCase() + value.slice(1);
}
