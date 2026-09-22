import {
  CustomId,
  type Document,
  type DocumentValue,
} from "sinterdb-protocol";

import type { SinterDatabase } from "./database.js";
import {
  SinterInsertManyError,
  SinterProtocolError,
  SinterServerError,
} from "./errors.js";
import { validateCollectionName } from "./namespace.js";

export type OptionalId<TDocument extends object> = Omit<
  TDocument,
  "_id"
> & {
  readonly _id?: CustomId;
};

export type WithId<TDocument extends object> = Omit<
  TDocument,
  "_id"
> & {
  readonly _id: CustomId;
};

export type EqualityFilter<TDocument extends object> = {
  readonly [Key in keyof TDocument]?: TDocument[Key];
};

export interface InsertOneResult {
  readonly acknowledged: true;
  readonly insertedId: CustomId;
}

export interface InsertManyResult {
  readonly acknowledged: true;
  readonly insertedCount: number;
  readonly insertedIds: readonly CustomId[];
}

export class SinterCollection<
  TDocument extends object = Document,
> {
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
    filter: EqualityFilter<TDocument> = {} as EqualityFilter<TDocument>,
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
}

function parseInsertOneResult(
  value: DocumentValue,
): InsertOneResult {
  if (!isPlainDocument(value)) {
    throw invalidInsertResult();
  }

  const acknowledged = value["acknowledged"];
  const insertedId = value["insertedId"];

  if (
    acknowledged !== true ||
    !(insertedId instanceof CustomId)
  ) {
    throw invalidInsertResult();
  }

  return Object.freeze({
    acknowledged: true,
    insertedId,
  });
}

function parseInsertManyResult(
  value: DocumentValue,
): InsertManyResult {
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
      (insertedId): insertedId is CustomId =>
        insertedId instanceof CustomId,
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
  if (
    !isPlainDocument(value) ||
    !Object.hasOwn(value, "document")
  ) {
    throw invalidFindResult();
  }

  const document = value["document"];

  if (document === null) {
    return null;
  }

  if (
    !isPlainDocument(document) ||
    !(document["_id"] instanceof CustomId)
  ) {
    throw invalidFindResult();
  }

  return document as unknown as WithId<TDocument>;
}

function isPlainDocument(value: unknown): value is Document {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value)
  ) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

function translateInsertManyFailure(error: unknown): never {
  if (
    !(error instanceof SinterServerError) ||
    error.details === undefined
  ) {
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
      (insertedId): insertedId is CustomId =>
        insertedId instanceof CustomId,
    )
  ) {
    throw error;
  }

  throw new SinterInsertManyError(
    error,
    failedIndex,
    insertedIds,
  );
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
