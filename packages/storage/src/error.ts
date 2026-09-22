import { CustomId } from "sinterdb-protocol";

export const StorageErrorCode = {
  InvalidDocument: "INVALID_DOCUMENT",
  InvalidDocumentId: "INVALID_DOCUMENT_ID",
  InvalidFilter: "INVALID_FILTER",
  InvalidBatch: "INVALID_BATCH",
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

export class StorageInsertManyError extends StorageError {
  public readonly failedIndex: number;
  public readonly insertedIds: readonly CustomId[];

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
      },
    );

    this.name = "StorageInsertManyError";
    this.failedIndex = failedIndex;
    this.insertedIds = Object.freeze([...insertedIds]);
  }
}
