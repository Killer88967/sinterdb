import { CustomId, type Document, type DocumentValue } from "sinterdb-protocol";

import type { SinterDatabase } from "./database.js";
import { SinterProtocolError } from "./errors.js";
import { validateCollectionName } from "./namespace.js";

export type OptionalId<TDocument extends object> = Omit<TDocument, "_id"> & {
  readonly _id?: CustomId;
};

export interface InsertOneResult {
  readonly acknowledged: true;
  readonly insertedId: CustomId;
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

function isPlainDocument(value: unknown): value is Document {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

function invalidInsertResult(): SinterProtocolError {
  return new SinterProtocolError(
    "The server returned an invalid insertOne result.",
  );
}
