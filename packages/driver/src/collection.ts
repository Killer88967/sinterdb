import { CustomId, type Document, type DocumentValue } from "sinterdb-protocol";

import { FindCursor } from "./cursor.js";
import type { SinterDatabase } from "./database.js";
import {
  SinterInsertManyError,
  SinterProtocolError,
  SinterServerError,
} from "./errors.js";
import type { Filter, Sort } from "./filter.js";
import {
  parseCreateIndexResult,
  parseIndexList,
  parseIndexValidation,
  type CreateIndexResult,
  type IndexDefinition,
  type IndexInfo,
  type IndexValidationResult,
} from "./indexes.js";
import { validateCollectionName } from "./namespace.js";
import type {
  DeleteResult,
  UpdateFilter,
  UpdateOptions,
  UpdateResult,
} from "./update.js";

export type OptionalId<TDocument extends object> = Omit<TDocument, "_id"> & {
  readonly _id?: CustomId;
};

export type WithId<TDocument extends object> = Omit<TDocument, "_id"> & {
  readonly _id: CustomId;
};

export type EqualityFilter<TDocument extends object> = {
  readonly [Key in keyof TDocument]?: TDocument[Key];
};

export interface FindOptions<TDocument extends object = Document> {
  readonly batchSize?: number;
  readonly sort?: Sort<TDocument>;
  readonly skip?: number;
  readonly limit?: number;
}

export interface InsertOneResult {
  readonly acknowledged: true;
  readonly insertedId: CustomId;
}

export interface InsertManyResult {
  readonly acknowledged: true;
  readonly insertedCount: number;
  readonly insertedIds: readonly CustomId[];
}

export class SinterCollection<TDocument extends object = Document> {
  declare protected readonly documentType: TDocument;

  public readonly name: string;

  public constructor(
    public readonly database: SinterDatabase,
    name: string,
  ) {
    validateCollectionName(name);
    this.name = name;
  }

  public get namespace(): string {
    return `${this.database.name}.${this.name}`;
  }

  public async insertOne(
    document: OptionalId<TDocument>,
  ): Promise<InsertOneResult> {
    const value = await this.database.client.executeCommand(
      this.database.name,
      "insertOne",
      {
        collection: this.name,
        document: document as unknown as Document,
      },
    );

    return parseInsertOneResult(value);
  }

  public async insertMany(
    documents: readonly OptionalId<TDocument>[],
  ): Promise<InsertManyResult> {
    let value: DocumentValue;

    try {
      value = await this.database.client.executeCommand(
        this.database.name,
        "insertMany",
        {
          collection: this.name,
          documents: documents.map(
            (document) => document as unknown as Document,
          ),
        },
      );
    } catch (error: unknown) {
      translateInsertManyFailure(error);
    }

    return parseInsertManyResult(value);
  }

  public async findOne(
    filter: Filter<TDocument> = {} as Filter<TDocument>,
  ): Promise<WithId<TDocument> | null> {
    const value = await this.database.client.executeCommand(
      this.database.name,
      "findOne",
      {
        collection: this.name,
        filter: filter as unknown as Document,
      },
    );

    return parseFindOneResult<TDocument>(value);
  }

  public async deleteOne(filter: Filter<TDocument>): Promise<DeleteResult> {
    return this.runDelete("deleteOne", filter);
  }

  public async deleteMany(filter: Filter<TDocument>): Promise<DeleteResult> {
    return this.runDelete("deleteMany", filter);
  }

  public async replaceOne(
    filter: Filter<TDocument>,
    replacement: OptionalId<TDocument>,
    options: UpdateOptions = {},
  ): Promise<UpdateResult> {
    const value = await this.database.client.executeCommand(
      this.database.name,
      "replaceOne",
      {
        collection: this.name,
        filter: filter as unknown as Document,
        replacement: replacement as unknown as Document,
        ...(options.upsert === undefined ? {} : { upsert: options.upsert }),
      },
    );

    return parseUpdateResult(value, "replaceOne");
  }

  public async updateOne(
    filter: Filter<TDocument>,
    update: UpdateFilter<TDocument>,
    options: UpdateOptions = {},
  ): Promise<UpdateResult> {
    return this.runUpdate("updateOne", filter, update, options);
  }

  public async updateMany(
    filter: Filter<TDocument>,
    update: UpdateFilter<TDocument>,
    options: UpdateOptions = {},
  ): Promise<UpdateResult> {
    return this.runUpdate("updateMany", filter, update, options);
  }

  /**
   * Creates an index, or confirms that an identical one exists. The collection
   * is created if it does not exist. A unique index fails with a
   * `DuplicateKey` server error when existing documents already violate it.
   */
  public async createIndex(
    definition: IndexDefinition<TDocument>,
  ): Promise<CreateIndexResult> {
    const value = await this.database.client.executeCommand(
      this.database.name,
      "createIndex",
      {
        collection: this.name,
        index: { ...definition } as unknown as Document,
      },
    );

    return parseCreateIndexResult(value);
  }

  public async dropIndex(name: string): Promise<void> {
    await this.database.client.executeCommand(this.database.name, "dropIndex", {
      collection: this.name,
      name,
    });
  }

  /** The `_id` index first, then the others in creation order. */
  public async indexes(): Promise<IndexInfo[]> {
    const value = await this.database.client.executeCommand(
      this.database.name,
      "listIndexes",
      { collection: this.name },
    );

    return parseIndexList(value);
  }

  /** Asks the server to rebuild every index and report any difference. */
  public async validateIndexes(): Promise<IndexValidationResult> {
    const value = await this.database.client.executeCommand(
      this.database.name,
      "validateIndexes",
      { collection: this.name },
    );

    return parseIndexValidation(value);
  }

  public find(
    filter: Filter<TDocument> = {} as Filter<TDocument>,
    options: FindOptions<TDocument> = {},
  ): FindCursor<TDocument> {
    return new FindCursor<TDocument>(
      (command, parameters) =>
        this.database.client.executeCommand(
          this.database.name,
          command,
          parameters,
        ),
      this.name,
      filter as unknown as Document,
      options.batchSize,
      {
        ...(options.sort === undefined ? {} : { sort: options.sort }),
        ...(options.skip === undefined ? {} : { skip: options.skip }),
        ...(options.limit === undefined ? {} : { limit: options.limit }),
      },
    );
  }

  private async runDelete(
    command: "deleteOne" | "deleteMany",
    filter: Filter<TDocument>,
  ): Promise<DeleteResult> {
    const value = await this.database.client.executeCommand(
      this.database.name,
      command,
      {
        collection: this.name,
        filter: filter as unknown as Document,
      },
    );

    return parseDeleteResult(value, command);
  }

  private async runUpdate(
    command: "updateOne" | "updateMany",
    filter: Filter<TDocument>,
    update: UpdateFilter<TDocument>,
    options: UpdateOptions,
  ): Promise<UpdateResult> {
    const value = await this.database.client.executeCommand(
      this.database.name,
      command,
      {
        collection: this.name,
        filter: filter as unknown as Document,
        update: update as unknown as Document,
        ...(options.upsert === undefined ? {} : { upsert: options.upsert }),
      },
    );

    return parseUpdateResult(value, command);
  }
}

function parseInsertOneResult(value: DocumentValue): InsertOneResult {
  if (!isPlainDocument(value)) {
    throw invalidInsertResult();
  }

  const acknowledged = value["acknowledged"];
  const insertedId = value["insertedId"];

  if (acknowledged !== true || !(insertedId instanceof CustomId)) {
    throw invalidInsertResult();
  }

  return Object.freeze({
    acknowledged: true,
    insertedId,
  });
}

function parseInsertManyResult(value: DocumentValue): InsertManyResult {
  if (!isPlainDocument(value)) {
    throw invalidInsertManyResult();
  }

  const acknowledged = value["acknowledged"];
  const insertedCount = value["insertedCount"];
  const insertedIds = value["insertedIds"];

  if (
    acknowledged !== true ||
    typeof insertedCount !== "number" ||
    !Number.isSafeInteger(insertedCount) ||
    insertedCount < 0 ||
    !Array.isArray(insertedIds) ||
    !insertedIds.every(
      (insertedId): insertedId is CustomId => insertedId instanceof CustomId,
    ) ||
    insertedIds.length !== insertedCount
  ) {
    throw invalidInsertManyResult();
  }

  return Object.freeze({
    acknowledged: true,
    insertedCount,
    insertedIds: Object.freeze([...insertedIds]),
  });
}

function parseFindOneResult<TDocument extends object>(
  value: DocumentValue,
): WithId<TDocument> | null {
  if (!isPlainDocument(value) || !Object.hasOwn(value, "document")) {
    throw invalidFindResult();
  }

  const document = value["document"];

  if (document === null) {
    return null;
  }

  if (!isPlainDocument(document) || !(document["_id"] instanceof CustomId)) {
    throw invalidFindResult();
  }

  return document as unknown as WithId<TDocument>;
}

function parseUpdateResult(
  value: DocumentValue,
  command: string,
): UpdateResult {
  if (!isPlainDocument(value)) {
    throw invalidWriteResult(command);
  }

  const matchedCount = value["matchedCount"];
  const modifiedCount = value["modifiedCount"];
  const upsertedId = value["upsertedId"];

  if (
    value["acknowledged"] !== true ||
    !isCount(matchedCount) ||
    !isCount(modifiedCount) ||
    modifiedCount > matchedCount ||
    !(upsertedId === null || upsertedId instanceof CustomId)
  ) {
    throw invalidWriteResult(command);
  }

  return Object.freeze({
    acknowledged: true,
    matchedCount,
    modifiedCount,
    upsertedId,
  });
}

function parseDeleteResult(
  value: DocumentValue,
  command: string,
): DeleteResult {
  if (!isPlainDocument(value)) {
    throw invalidWriteResult(command);
  }

  const deletedCount = value["deletedCount"];

  if (value["acknowledged"] !== true || !isCount(deletedCount)) {
    throw invalidWriteResult(command);
  }

  return Object.freeze({ acknowledged: true, deletedCount });
}

function isCount(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function isPlainDocument(value: unknown): value is Document {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

function translateInsertManyFailure(error: unknown): never {
  if (!(error instanceof SinterServerError) || error.details === undefined) {
    throw error;
  }

  const failedIndex = error.details["failedIndex"];
  const insertedIds = error.details["insertedIds"];

  if (
    typeof failedIndex !== "number" ||
    !Number.isSafeInteger(failedIndex) ||
    failedIndex < 0 ||
    !Array.isArray(insertedIds) ||
    !insertedIds.every(
      (insertedId): insertedId is CustomId => insertedId instanceof CustomId,
    )
  ) {
    throw error;
  }

  throw new SinterInsertManyError(error, failedIndex, insertedIds);
}

function invalidInsertResult(): SinterProtocolError {
  return new SinterProtocolError(
    "The server returned an invalid insertOne result.",
  );
}

function invalidInsertManyResult(): SinterProtocolError {
  return new SinterProtocolError(
    "The server returned an invalid insertMany result.",
  );
}

function invalidFindResult(): SinterProtocolError {
  return new SinterProtocolError(
    "The server returned an invalid findOne result.",
  );
}

function invalidWriteResult(command: string): SinterProtocolError {
  return new SinterProtocolError(
    `The server returned an invalid ${command} result.`,
  );
}
