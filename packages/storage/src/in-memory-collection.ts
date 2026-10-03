import {
  CustomId,
  decodeDocument,
  encodeDocument,
  type Document,
} from "sinterdb-protocol";

import {
  StorageError,
  StorageErrorCode,
  StorageInsertManyError,
} from "./errors.js";
import { compileFilter } from "./filter.js";
import { compileSort, type SortSpecification } from "./sort.js";
import {
  compileUpdate,
  seedDocumentFromFilter,
  type CompiledUpdate,
} from "./update.js";

export interface StorageInsertOneResult {
  readonly insertedId: CustomId;
}

export interface StorageInsertManyResult {
  readonly insertedIds: readonly CustomId[];
}

export interface StorageFindOptions {
  readonly sort?: SortSpecification;
  readonly skip?: number;
  readonly limit?: number;
}

export interface StorageUpdateOptions {
  readonly upsert?: boolean;
}

export interface StorageUpdateResult {
  readonly matchedCount: number;
  readonly modifiedCount: number;
  readonly upsertedId?: CustomId;
}

export interface StorageDeleteResult {
  readonly deletedCount: number;
}

interface LocatedDocument {
  readonly key: string;
  readonly encoded: Uint8Array;
  readonly document: Document;
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

  public insertMany(documents: readonly Document[]): StorageInsertManyResult {
    if (!Array.isArray(documents) || documents.length === 0) {
      throw new StorageError(
        StorageErrorCode.InvalidBatch,
        "insertMany requires at least one document.",
      );
    }

    const insertedIds: CustomId[] = [];

    for (let index = 0; index < documents.length; index += 1) {
      const document = documents[index];

      try {
        const result = this.insertOne(document as Document);
        insertedIds.push(result.insertedId);
      } catch (error: unknown) {
        if (error instanceof StorageError) {
          throw new StorageInsertManyError(index, insertedIds, error);
        }

        throw error;
      }
    }

    return {
      insertedIds: Object.freeze([...insertedIds]),
    };
  }

  public findOne(filter: Document): Document | undefined {
    const matches = compileFilter(filter);
    const id = filter["_id"];

    if (id instanceof CustomId) {
      const document = this.findById(id);

      if (document === undefined) {
        return undefined;
      }

      return matches(document) ? document : undefined;
    }

    for (const encoded of this.documents.values()) {
      const document = decodeDocument(encoded);

      if (matches(document)) {
        return document;
      }
    }

    return undefined;
  }

  public find(
    filter: Document,
    options: StorageFindOptions = {},
  ): IterableIterator<Document> {
    const matches = compileFilter(filter);
    const sorter =
      options.sort === undefined ? undefined : compileSort(options.sort);
    const skip = validateSkip(options.skip);
    const limit = validateLimit(options.limit);

    return this.scan(matches, sorter, skip, limit);
  }

  public deleteOne(filter: Document): StorageDeleteResult {
    const located = this.locate(filter, compileFilter(filter));

    if (located === undefined) {
      return { deletedCount: 0 };
    }

    this.documents.delete(located.key);

    return { deletedCount: 1 };
  }

  public deleteMany(filter: Document): StorageDeleteResult {
    const matches = compileFilter(filter);
    const keys: string[] = [];

    for (const [key, encoded] of this.documents) {
      if (matches(decodeDocument(encoded))) {
        keys.push(key);
      }
    }

    for (const key of keys) {
      this.documents.delete(key);
    }

    return { deletedCount: keys.length };
  }

  public replaceOne(
    filter: Document,
    replacement: Document,
    options: StorageUpdateOptions = {},
  ): StorageUpdateResult {
    const matches = compileFilter(filter);
    const upsert = validateUpsert(options.upsert);

    validateReplacement(replacement);

    const located = this.locate(filter, matches);

    if (located === undefined) {
      if (!upsert) {
        return { matchedCount: 0, modifiedCount: 0 };
      }

      const filterId = filter["_id"];
      const requested = replacement["_id"];

      if (
        Object.hasOwn(replacement, "_id") &&
        filterId instanceof CustomId &&
        !(requested instanceof CustomId && requested.equals(filterId))
      ) {
        throw immutableId();
      }

      const document: Document = Object.hasOwn(replacement, "_id")
        ? replacement
        : filterId instanceof CustomId
          ? { ...replacement, _id: filterId }
          : replacement;

      return {
        matchedCount: 0,
        modifiedCount: 0,
        upsertedId: this.insertOne(document).insertedId,
      };
    }

    const existingId = located.document["_id"] as CustomId;

    if (
      Object.hasOwn(replacement, "_id") &&
      !(
        replacement["_id"] instanceof CustomId &&
        replacement["_id"].equals(existingId)
      )
    ) {
      throw immutableId();
    }

    const encoded = encodeStoredDocument({ ...replacement, _id: existingId });
    const modified = !bytesEqual(encoded, located.encoded);

    if (modified) {
      this.documents.set(located.key, encoded);
    }

    return { matchedCount: 1, modifiedCount: modified ? 1 : 0 };
  }

  public updateOne(
    filter: Document,
    update: Document,
    options: StorageUpdateOptions = {},
  ): StorageUpdateResult {
    const matches = compileFilter(filter);
    const apply = compileUpdate(update);
    const upsert = validateUpsert(options.upsert);
    const located = this.locate(filter, matches);

    if (located === undefined) {
      return this.upsertFromUpdate(filter, apply, upsert);
    }

    const pending = prepareUpdate(located, apply);

    if (pending !== undefined) {
      this.documents.set(pending.key, pending.encoded);
    }

    return {
      matchedCount: 1,
      modifiedCount: pending === undefined ? 0 : 1,
    };
  }

  public updateMany(
    filter: Document,
    update: Document,
    options: StorageUpdateOptions = {},
  ): StorageUpdateResult {
    const matches = compileFilter(filter);
    const apply = compileUpdate(update);
    const upsert = validateUpsert(options.upsert);
    const pending: { key: string; encoded: Uint8Array }[] = [];
    let matched = 0;

    for (const [key, encoded] of this.documents) {
      const document = decodeDocument(encoded);

      if (!matches(document)) {
        continue;
      }

      matched += 1;

      const prepared = prepareUpdate({ key, encoded, document }, apply);

      if (prepared !== undefined) {
        pending.push(prepared);
      }
    }

    if (matched === 0) {
      return this.upsertFromUpdate(filter, apply, upsert);
    }

    for (const entry of pending) {
      this.documents.set(entry.key, entry.encoded);
    }

    return { matchedCount: matched, modifiedCount: pending.length };
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

  private upsertFromUpdate(
    filter: Document,
    apply: CompiledUpdate,
    upsert: boolean,
  ): StorageUpdateResult {
    if (!upsert) {
      return { matchedCount: 0, modifiedCount: 0 };
    }

    const seed = seedDocumentFromFilter(filter);

    apply(seed);

    return {
      matchedCount: 0,
      modifiedCount: 0,
      upsertedId: this.insertOne(seed).insertedId,
    };
  }

  private locate(
    filter: Document,
    matches: (document: Document) => boolean,
  ): LocatedDocument | undefined {
    const id = filter["_id"];

    if (id instanceof CustomId) {
      const key = id.toHexString();
      const encoded = this.documents.get(key);

      if (encoded === undefined) {
        return undefined;
      }

      const document = decodeDocument(encoded);

      return matches(document) ? { key, encoded, document } : undefined;
    }

    for (const [key, encoded] of this.documents) {
      const document = decodeDocument(encoded);

      if (matches(document)) {
        return { key, encoded, document };
      }
    }

    return undefined;
  }

  private *scan(
    matches: (document: Document) => boolean,
    sorter: ((document: readonly Document[]) => Document[]) | undefined,
    skip: number,
    limit: number | undefined,
  ): IterableIterator<Document> {
    if (sorter === undefined) {
      let skipped = 0;
      let yielded = 0;

      for (const encoded of this.documents.values()) {
        if (limit !== undefined && yielded >= limit) {
          return;
        }

        const document = decodeDocument(encoded);

        if (!matches(document)) {
          continue;
        }

        if (skipped < skip) {
          skipped += 1;
          continue;
        }

        yielded += 1;
        yield document;
      }

      return;
    }

    const matched: Document[] = [];

    for (const encoded of this.documents.values()) {
      const document = decodeDocument(encoded);

      if (matches(document)) {
        matched.push(document);
      }
    }

    const ordered = sorter(matched);

    yield* ordered.slice(skip, limit === undefined ? undefined : skip + limit);
  }
}

function prepareUpdate(
  located: LocatedDocument,
  apply: CompiledUpdate,
): { key: string; encoded: Uint8Array } | undefined {
  apply(located.document);

  const encoded = encodeStoredDocument(located.document);

  return bytesEqual(encoded, located.encoded)
    ? undefined
    : { key: located.key, encoded };
}

function encodeStoredDocument(document: Document): Uint8Array {
  try {
    return encodeDocument(document);
  } catch (error: unknown) {
    throw new StorageError(
      StorageErrorCode.InvalidDocument,
      "Document could not be encoded.",
      { cause: error },
    );
  }
}

function validateReplacement(replacement: Document): void {
  if (!isPlainDocument(replacement)) {
    throw new StorageError(
      StorageErrorCode.InvalidDocument,
      "Replacement must be a document.",
    );
  }

  if (Object.keys(replacement).some((key) => key.startsWith("$"))) {
    throw new StorageError(
      StorageErrorCode.InvalidDocument,
      "Replacement documents cannot contain update operators.",
    );
  }
}

function validateUpsert(upsert: boolean | undefined): boolean {
  if (upsert === undefined) {
    return false;
  }

  if (typeof upsert !== "boolean") {
    throw new StorageError(
      StorageErrorCode.InvalidUpdate,
      "The upsert option must be a boolean.",
    );
  }

  return upsert;
}

function immutableId(): StorageError {
  return new StorageError(
    StorageErrorCode.ImmutableId,
    "The _id field cannot be modified.",
  );
}

function bytesEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) {
    return false;
  }

  return left.every((byte, index) => byte === right[index]);
}

function validateSkip(skip: number | undefined): number {
  if (skip === undefined) {
    return 0;
  }

  if (!Number.isSafeInteger(skip) || skip < 0) {
    throw new StorageError(
      StorageErrorCode.InvalidFindOptions,
      "Skip must be a non-negative safe integer.",
    );
  }

  return skip;
}

function validateLimit(limit: number | undefined): number | undefined {
  if (limit === undefined) {
    return undefined;
  }

  if (!Number.isSafeInteger(limit) || limit < 1) {
    throw new StorageError(
      StorageErrorCode.InvalidFindOptions,
      "Limit must be a positive safe integer.",
    );
  }

  return limit;
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
