import {
  CustomId,
  decodeDocument,
  encodeDocument,
  encodeDocumentValue,
  type Document,
  type DocumentValue,
} from "sinterdb-protocol";

export const StorageErrorCode = {
  InvalidDocument: "INVALID_DOCUMENT",
  InvalidDocumentId: "INVALID_DOCUMENT_ID",
  InvalidFilter: "INVALID_FILTER",
  InvalidBatch: "INVALID_BATCH",
  DuplicateId: "DUPLICATE_ID",
} as const;

export type StorageErrorCode =
  (typeof StorageErrorCode)[keyof typeof StorageErrorCode];

export interface StorageInsertOneResult {
  readonly insertedId: CustomId;
}

export interface StorageInsertManyResult {
  readonly insertedIds: readonly CustomId[];
}

interface CompiledFilterField {
  readonly name: string;
  readonly encodedValue: Uint8Array;
}

export class StorageError extends Error {
  public readonly code: StorageErrorCode;

  public constructor(
    code: StorageErrorCode,
    message: string,
    options: ErrorOptions = {},
  ) {
    super(message, options);

    this.name = "StorageError";
    this.code = code;
  }
}

export class StorageInsertManyError extends StorageError {
  public readonly failedIndex: number;
  public readonly insertedIds: readonly CustomId[]

  public constructor(
    failedIndex: number,
    insertedIds: readonly CustomId[],
    cause: StorageError,
  ) {
    super(
      cause.code,
      `Insert failed at batch index ${failedIndex}: ${cause.message}`,
      {
        cause,
      }
    );

    this.name = "StorageInsertManyError";
    this.failedIndex = failedIndex;
    this.insertedIds = Object.freeze([...insertedIds]);
  }
}

export class InMemoryCollection {
  private readonly documents = new Map<string, Uint8Array>();

  public get documentCount(): number {
    return this.documents.size;
  }

  public insertOne(document: Document): StorageInsertOneResult {
    if (!isPlainDocument(document)) {
      throw new StorageError(
        StorageErrorCode.InvalidDocument,
        "Inserted value must be a document.",
      );
    }

    const insertedId = resolveDocumentId(document);
    const key = insertedId.toHexString();

    if (this.documents.has(key)) {
      throw new StorageError(
        StorageErrorCode.DuplicateId,
        `A document with _id ${JSON.stringify(key)} already exists.`,
      );
    }

    let encoded: Uint8Array;

    try {
      encoded = encodeDocument({
        ...document,
        _id: insertedId,
      });
    } catch (error: unknown) {
      throw new StorageError(
        StorageErrorCode.InvalidDocument,
        "Document could not be encoded.",
        {
          cause: error,
        },
      );
    }

    this.documents.set(key, encoded);

    return {
      insertedId,
    };
  }

  public insertMany(
    documents: readonly Document[],
  ): StorageInsertManyResult {
    if (!Array.isArray(documents) || documents.length === 0) {
      throw new StorageError(
        StorageErrorCode.InvalidBatch,
        "insertMany requires at least one document."
      );
    }

    const insertedIds : CustomId[] = [];

    for (let index = 0; index < documents.length; index += 1) {
      const document = documents[index];

      try {
        const result = this.insertOne(document as Document);
        insertedIds.push(result.insertedId);
      } catch (error: unknown) {
        if (error instanceof StorageError) {
          throw new StorageInsertManyError(
            index,
            insertedIds,
            error,
          );
        }

        throw error;
      }
    }

    return {
      insertedIds: Object.freeze([...insertedIds]),
    }
  }

  public findOne(filter: Document): Document | undefined {
    const fields = compileFilter(filter);
    const id = filter["_id"];

    if (id instanceof CustomId) {
      const document = this.findById(id);

      if (document === undefined) {
        return undefined;
      }

      return matchesFilter(document, fields) ? document : undefined;
    }

    for (const encoded of this.documents.values()) {
      const document = decodeDocument(encoded);

      if (matchesFilter(document, fields)) {
        return document;
      }
    }

    return undefined;
  }

  public findById(id: CustomId): Document | undefined {
    if (!(id instanceof CustomId)) {
      throw new TypeError("Document ID must be a CustomId.");
    }

    const encoded = this.documents.get(id.toHexString());

    if (encoded === undefined) {
      return undefined;
    }

    return decodeDocument(encoded);
  }

  public has(id: CustomId): boolean {
    if (!(id instanceof CustomId)) {
      throw new TypeError("Document ID must be a CustomId.");
    }

    return this.documents.has(id.toHexString());
  }

  public clear(): void {
    this.documents.clear();
  }
}

function resolveDocumentId(document: Document): CustomId {
  if (!Object.hasOwn(document, "_id")) {
    return CustomId.generate();
  }

  const id = document["_id"];

  if (!(id instanceof CustomId)) {
    throw new StorageError(
      StorageErrorCode.InvalidDocumentId,
      "Document _id must be a CustomId when provided.",
    );
  }

  return id;
}

function isPlainDocument(value: unknown): value is Document {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

function compileFilter(filter: Document): CompiledFilterField[] {
  if (!isPlainDocument(filter)) {
    throw new StorageError(
      StorageErrorCode.InvalidFilter,
      "Find filter must be a document.",
    );
  }

  try {
    encodeDocument(filter);

    return Object.keys(filter).map((name) => ({
      name,
      encodedValue: encodeDocumentValue(filter[name] as DocumentValue),
    }));
  } catch (error: unknown) {
    throw new StorageError(
      StorageErrorCode.InvalidFilter,
      "Find filter could not be encoded.",
      {
        cause: error,
      },
    );
  }
}

function matchesFilter(
  document: Document,
  fields: readonly CompiledFilterField[],
): boolean {
  for (const field of fields) {
    if (!Object.hasOwn(document, field.name)) {
      return false;
    }

    const value = document[field.name] as DocumentValue;
    const encodedValue = encodeDocumentValue(value);

    if (!bytesEqual(encodedValue, field.encodedValue)) {
      return false;
    }
  }

  return true;
}

function bytesEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) {
    return false;
  }

  return left.every((byte, index) => byte === right[index]);
}
