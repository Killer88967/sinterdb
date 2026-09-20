import {
  CustomId,
  decodeDocument,
  encodeDocument,
  type Document,
} from "sinterdb-protocol";

export const StorageErrorCode = {
  InvalidDocument: "INVALID_DOCUMENT",
  InvalidDocumentId: "INVALID_DOCUMENT_ID",
  DuplicateId: "DUPLICATE_ID",
} as const;

export type StorageErrorCode =
  (typeof StorageErrorCode)[keyof typeof StorageErrorCode];

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

export interface StorageInsertOneResult {
  readonly insertedId: CustomId;
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
