import {
  StorageError,
  StorageErrorCode,
  StorageInsertManyError,
} from "@sinterdb-internal/storage";
import {
  PROTOCOL_VERSION,
  ProtocolCapability,
  WireErrorCode,
  type CommandEnvelope,
  type Document,
  type DocumentValue,
  type WireErrorCodeValue,
} from "sinterdb-protocol";

import {
  CatalogError,
  CatalogErrorCode,
  type InMemoryCatalog,
} from "./catalog.js";
import {
  CursorManager,
  CursorNotFoundError,
  type CursorBatch,
} from "./cursor-manager.js";

export const ServerCommand = {
  ServerInfo: "serverInfo",
  ListDatabases: "listDatabases",
  CreateCollection: "createCollection",
  ListCollections: "listCollections",
  InsertOne: "insertOne",
  InsertMany: "insertMany",
  FindOne: "findOne",
  Find: "find",
  GetMore: "getMore",
  CloseCursor: "closeCursor",
} as const;

export type ServerCommand = (typeof ServerCommand)[keyof typeof ServerCommand];

export const SERVER_PRODUCT = "sinterdb-server";
export const SERVER_PRODUCT_VERSION = "0.0.5";

export class CommandExecutionError extends Error {
  public readonly code: WireErrorCodeValue;
  public readonly retryable: boolean;
  public readonly details: Document | undefined;

  public constructor(
    code: WireErrorCodeValue,
    name: string,
    message: string,
    options: {
      retryable?: boolean;
      details?: Document;
    } = {},
  ) {
    super(message);

    this.name = name;
    this.code = code;
    this.retryable = options.retryable ?? false;
    this.details = options.details;
  }
}

export class CommandDispatcher {
  public constructor(private readonly catalog: InMemoryCatalog) {}

  public dispatch(
    command: CommandEnvelope,
    cursors: CursorManager = new CursorManager(),
  ): DocumentValue {
    switch (command.command) {
      case ServerCommand.ServerInfo:
        return this.serverInfo();

      case ServerCommand.ListDatabases:
        return this.listDatabases();

      case ServerCommand.CreateCollection:
        return this.createCollection(command);

      case ServerCommand.ListCollections:
        return this.listCollections(command);

      case ServerCommand.InsertOne:
        return this.insertOne(command);

      case ServerCommand.InsertMany:
        return this.insertMany(command);

      case ServerCommand.FindOne:
        return this.findOne(command);

      case ServerCommand.Find:
        return this.find(command, cursors);

      case ServerCommand.GetMore:
        return this.getMore(command, cursors);

      case ServerCommand.CloseCursor:
        return this.closeCursor(command, cursors);

      default:
        throw new CommandExecutionError(
          WireErrorCode.UnknownCommand,
          "UnknownCommand",
          `Unknown command ${JSON.stringify(command.command)}.`,
          {
            details: {
              command: command.command,
            },
          },
        );
    }
  }

  private serverInfo(): Document {
    return {
      product: SERVER_PRODUCT,
      productVersion: SERVER_PRODUCT_VERSION,
      protocolVersion: PROTOCOL_VERSION,
      capabilities: [
        ProtocolCapability.TypedDocuments,
        ProtocolCapability.Streaming,
      ],
    };
  }

  private listDatabases(): Document {
    return {
      databases: this.catalog.listDatabases(),
    };
  }

  private createCollection(command: CommandEnvelope): Document {
    const databaseName = requireDatabase(command);
    const collectionName = requireStringParameter(command.parameters, "name");

    try {
      const created = this.catalog.createCollection(
        databaseName,
        collectionName,
      );

      return {
        ...created,
        created: true,
      };
    } catch (error: unknown) {
      throw translateCatalogError(error);
    }
  }

  private listCollections(command: CommandEnvelope): Document {
    const databaseName = requireDatabase(command);

    try {
      return {
        database: databaseName,
        collections: this.catalog.listCollections(databaseName),
      };
    } catch (error: unknown) {
      throw translateCatalogError(error);
    }
  }

  private insertOne(command: CommandEnvelope): Document {
    const databaseName = requireDatabase(command);
    const collectionName = requireStringParameter(
      command.parameters,
      "collection",
    );
    const document = requireDocumentParameter(command.parameters, "document");

    try {
      const collection = this.catalog.getOrCreateCollection(
        databaseName,
        collectionName,
      );
      const result = collection.insertOne(document);

      return {
        acknowledged: true,
        insertedId: result.insertedId,
      };
    } catch (error: unknown) {
      if (error instanceof CatalogError) {
        throw translateCatalogError(error);
      }

      throw translateStorageError(error);
    }
  }

  private insertMany(command: CommandEnvelope): Document {
    const databaseName = requireDatabase(command);
    const collectionName = requireStringParameter(
      command.parameters,
      "collection",
    );
    const documents = requireDocumentArrayParameter(
      command.parameters,
      "documents",
    );

    try {
      const collection = this.catalog.getOrCreateCollection(
        databaseName,
        collectionName,
      );
      const result = collection.insertMany(documents);

      return {
        acknowledged: true,
        insertedCount: result.insertedIds.length,
        insertedIds: [...result.insertedIds],
      };
    } catch (error: unknown) {
      if (error instanceof CatalogError) {
        throw translateCatalogError(error);
      }

      throw translateStorageError(error);
    }
  }

  private findOne(command: CommandEnvelope): Document {
    const databaseName = requireDatabase(command);
    const collectionName = requireStringParameter(
      command.parameters,
      "collection",
    );
    const filter = requireDocumentParameter(command.parameters, "filter");

    try {
      const collection = this.catalog.getCollection(
        databaseName,
        collectionName,
      );

      if (collection === undefined) {
        return {
          document: null,
        };
      }

      return {
        document: collection.findOne(filter) ?? null,
      };
    } catch (error: unknown) {
      if (error instanceof CatalogError) {
        throw translateCatalogError(error);
      }

      throw translateStorageError(error);
    }
  }

  private find(command: CommandEnvelope, cursors: CursorManager): Document {
    const databaseName = requireDatabase(command);
    const collectionName = requireStringParameter(
      command.parameters,
      "collection",
    );
    const filter = requireDocumentParameter(command.parameters, "filter");
    const batchSize = optionalBatchSize(command.parameters);

    try {
      const collection = this.catalog.getCollection(
        databaseName,
        collectionName,
      );

      if (collection === undefined) {
        return { cursorId: null, documents: [] };
      }

      return toBatchDocument(cursors.open(collection.find(filter), batchSize));
    } catch (error: unknown) {
      if (error instanceof CatalogError) {
        throw translateCatalogError(error);
      }

      throw translateStorageError(error);
    }
  }

  private getMore(command: CommandEnvelope, cursors: CursorManager): Document {
    const cursorId = requireCursorId(command.parameters);
    const batchSize = optionalBatchSize(command.parameters);

    try {
      return toBatchDocument(cursors.getMore(cursorId, batchSize));
    } catch (error: unknown) {
      if (error instanceof CursorNotFoundError) {
        throw new CommandExecutionError(
          WireErrorCode.CursorNotFound,
          "CursorNotFound",
          error.message,
          { details: { cursorId: error.cursorId } },
        );
      }

      throw translateStorageError(error);
    }
  }

  private closeCursor(
    command: CommandEnvelope,
    cursors: CursorManager,
  ): Document {
    const cursorId = requireCursorId(command.parameters);

    return { closed: cursors.close(cursorId) };
  }
}

const MAX_CURSOR_BATCH_SIZE = 10_000;

function toBatchDocument(batch: CursorBatch): Document {
  return {
    cursorId: batch.cursorId,
    documents: [...batch.documents],
  };
}

function requireCursorId(parameters: Document): number {
  const value = parameters["cursorId"];

  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) {
    throw new CommandExecutionError(
      WireErrorCode.InvalidRequest,
      "InvalidRequest",
      'Command parameter "cursorId" must be a positive integer.',
      { details: { field: "cursorId" } },
    );
  }

  return value;
}

function requireDatabase(command: CommandEnvelope): string {
  if (command.database === undefined) {
    throw new CommandExecutionError(
      WireErrorCode.InvalidRequest,
      "InvalidRequest",
      `Command ${JSON.stringify(command.command)} requires a database.`,
      {
        details: {
          command: command.command,
          field: "database",
        },
      },
    );
  }

  return command.database;
}

function requireStringParameter(parameters: Document, name: string): string {
  const value = parameters[name];

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new CommandExecutionError(
      WireErrorCode.InvalidRequest,
      "InvalidRequest",
      `Command parameter ${JSON.stringify(name)} must be a non-empty string.`,
      {
        details: {
          field: name,
        },
      },
    );
  }

  return value;
}

function requireDocumentParameter(
  parameters: Document,
  name: string,
): Document {
  const value = parameters[name];

  if (!isPlainDocument(value)) {
    throw new CommandExecutionError(
      WireErrorCode.InvalidRequest,
      "InvalidRequest",
      `Command parameter ${JSON.stringify(name)} must be a document.`,
      {
        details: {
          field: name,
        },
      },
    );
  }

  return value;
}

function requireDocumentArrayParameter(
  parameters: Document,
  name: string,
): Document[] {
  const value = parameters[name];

  if (
    !Array.isArray(value) ||
    value.length === 0 ||
    !value.every(isPlainDocument)
  ) {
    throw new CommandExecutionError(
      WireErrorCode.InvalidRequest,
      "InvalidRequest",
      `Command parameter ${JSON.stringify(name)} must be a non-empty array of documents.`,
      {
        details: {
          field: name,
        },
      },
    );
  }

  return value;
}

function isPlainDocument(value: unknown): value is Document {
  if (typeof value !== "object" || value == null || Array.isArray(value)) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

function translateCatalogError(error: unknown): CommandExecutionError {
  if (!(error instanceof CatalogError)) {
    throw error;
  }

  if (error.code === CatalogErrorCode.NamespaceConflict) {
    return new CommandExecutionError(
      WireErrorCode.NamespaceConflict,
      "NamespaceConflict",
      error.message,
    );
  }

  return new CommandExecutionError(
    WireErrorCode.InvalidRequest,
    "InvalidRequest",
    error.message,
    {
      details: {
        catalogErrorCode: error.code,
      },
    },
  );
}

function translateStorageError(error: unknown): CommandExecutionError {
  if (!(error instanceof StorageError)) {
    throw error;
  }

  const batchDetails: Document =
    error instanceof StorageInsertManyError
      ? {
          failedIndex: error.failedIndex,
          insertedCount: error.insertedIds.length,
          insertedIds: [...error.insertedIds],
        }
      : {};

  if (error.code === StorageErrorCode.DuplicateId) {
    return new CommandExecutionError(
      WireErrorCode.DuplicateKey,
      "DuplicateKey",
      error.message,
      {
        details: {
          field: "_id",
          storageErrorCode: error.code,
          ...batchDetails,
        },
      },
    );
  }

  return new CommandExecutionError(
    WireErrorCode.DocumentValidationFailed,
    "DocumentValidationFailed",
    error.message,
    {
      details: {
        storageErrorCode: error.code,
        ...batchDetails,
      },
    },
  );
}

function optionalBatchSize(parameters: Document): number | undefined {
  const value = parameters["batchSize"];

  if (value === undefined) {
    return undefined;
  }

  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value <= 0 ||
    value > MAX_CURSOR_BATCH_SIZE
  ) {
    throw new CommandExecutionError(
      WireErrorCode.InvalidRequest,
      "InvalidRequest",
      `Command parameter "batchSize" must be an integer between 1 and ${MAX_CURSOR_BATCH_SIZE}.`,
      { details: { field: "batchSize" } },
    );
  }

  return value;
}
