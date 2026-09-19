import {
  PROTOCOL_VERSION,
  ProtocolCapability,
  WireErrorCode,
} from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { InMemoryCatalog } from "./catalog.js";
import {
  CommandDispatcher,
  CommandExecutionError,
  SERVER_PRODUCT,
  SERVER_PRODUCT_VERSION,
  ServerCommand,
} from "./command-dispatcher.js";

describe("CommandDispatcher", () => {
  it("returns server information", () => {
    const dispatcher = createDispatcher();

    expect(
      dispatcher.dispatch({
        command: ServerCommand.ServerInfo,
        parameters: {},
      }),
    ).toEqual({
      product: SERVER_PRODUCT,
      productVersion: SERVER_PRODUCT_VERSION,
      protocolVersion: PROTOCOL_VERSION,
      capabilities: [
        ProtocolCapability.TypedDocuments,
        ProtocolCapability.Streaming,
      ],
    });
  });

  it("lists databases", () => {
    const catalog = new InMemoryCatalog();
    const dispatcher = new CommandDispatcher(catalog);

    catalog.createCollection("zeta", "events");
    catalog.createCollection("alpha", "users");

    expect(
      dispatcher.dispatch({
        command: ServerCommand.ListDatabases,
        parameters: {},
      }),
    ).toEqual({
      databases: ["alpha", "zeta"],
    });
  });

  it("creates and lists collections", () => {
    const dispatcher = createDispatcher();

    expect(
      dispatcher.dispatch({
        command: ServerCommand.CreateCollection,
        database: "app",
        parameters: {
          name: "users",
        },
      }),
    ).toEqual({
      database: "app",
      collection: "users",
      created: true,
    });

    expect(
      dispatcher.dispatch({
        command: ServerCommand.ListCollections,
        database: "app",
        parameters: {},
      }),
    ).toEqual({
      database: "app",
      collections: ["users"],
    });
  });

  it("requires a database for database-scoped commands", () => {
    expectCommandError(
      () =>
        createDispatcher().dispatch({
          command: ServerCommand.CreateCollection,
          parameters: {
            name: "users",
          },
        }),
      WireErrorCode.InvalidRequest,
    );
  });

  it("requires a collection name", () => {
    expectCommandError(
      () =>
        createDispatcher().dispatch({
          command: ServerCommand.CreateCollection,
          database: "app",
          parameters: {},
        }),
      WireErrorCode.InvalidRequest,
    );
  });

  it("reports duplicate collections as namespace conflicts", () => {
    const dispatcher = createDispatcher();

    dispatcher.dispatch({
      command: ServerCommand.CreateCollection,
      database: "app",
      parameters: {
        name: "users",
      },
    });

    expectCommandError(
      () =>
        dispatcher.dispatch({
          command: ServerCommand.CreateCollection,
          database: "app",
          parameters: {
            name: "users",
          },
        }),
      WireErrorCode.NamespaceConflict,
    );
  });

  it("rejects unknown commands", () => {
    expectCommandError(
      () =>
        createDispatcher().dispatch({
          command: "destroyEverything",
          parameters: {},
        }),
      WireErrorCode.UnknownCommand,
    );
  });
});

function createDispatcher(): CommandDispatcher {
  return new CommandDispatcher(new InMemoryCatalog());
}

function expectCommandError(action: () => unknown, expectedCode: number): void {
  try {
    action();
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(CommandExecutionError);

    if (error instanceof CommandExecutionError) {
      expect(error.code).toBe(expectedCode);
    }

    return;
  }

  throw new Error(`Expected wire error ${expectedCode}.`);
}
