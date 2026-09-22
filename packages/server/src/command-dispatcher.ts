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
  StorageError,
  StorageErrorCode,
  StorageInsertManyError,
} from "@sinterdb-internal/storage";

import {
  CatalogError,
  CatalogErrorCode,
  type InMemoryCatalog,
} from "./catalog.js";

export const ServerCommand = {
  ServerInfo: "serverInfo",
  ListDatabases: "listDatabases",
  CreateCollection: "createCollection",
  ListCollections: "listCollections",
  InsertOne: "insertOne",
  InsertMany: "insertMany",
  FindOne: "findOne",
} as const;

export type ServerCommand = (typeof ServerCommand)[keyof typeof ServerCommand];

export const SERVER_PRODUCT = "sinterdb-server";
export const SERVER_PRODUCT_VERSION = "0.0.4";

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

  public dispatch(command: CommandEnvelope): DocumentValue {
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

      case ServerCommand.FindOne:
        return this.findOne(command);

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
      )
      const result = collection.insertMany(documents);

      return {
        acknowledged: true,
        insertedCount: result.insertedIds.length,
        insertedIds: [...result.insertedIds],
      }
    } catch (error: unkown) {
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

function requireDocumentArrayParameters(
  parameters: Document,
  name: string,
): Document[] {
  const value = parameters[name]

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
        }
      }
    )
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

function translateStorageError(
  error: unknown,
): CommandExecutionError {
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
