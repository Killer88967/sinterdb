import { EventEmitter } from "node:events";
import { performance } from "node:perf_hooks";
import { createConnection, type Socket } from "node:net";
import {
  MessageKind,
  ProtocolCapability,
  type Document,
  type DocumentValue,
} from "sinterdb-protocol";

import {
  type ParsedSinterConnectionString,
  parseSinterConnectionString,
} from "./connection-string.js";
import { SinterDatabase } from "./database.js";
import {
  SinterClientOptionsError,
  SinterClientStateError,
  SinterConnectionError,
  SinterConnectionTimeoutError,
  SinterErrorCode,
  SinterProtocolError,
  SinterSocketTimeoutError,
} from "./errors.js";
import { performClientHandshake, type ServerHandshake } from "./handshake.js";
import { SinterNamespaceError } from "./namespace.js";
import { RequestDispatcher } from "./request-dispatcher.js";

export const DEFAULT_CONNECT_TIMEOUT_MS = 10_000;
export const DEFAULT_REQUEST_TIMEOUT_MS = 10_000;
export const DEFAULT_SOCKET_TIMEOUT_MS = 0;
export const DRIVER_PRODUCT = "sinterdb-node-driver";
export const DRIVER_PRODUCT_VERSION = "0.0.5";

const MAX_TIMEOUT_MS = 2_147_483_647;

export interface SinterClientOptions {
  readonly connectTimeoutMS?: number;
  readonly requestTimeoutMS?: number;
  readonly socketTimeoutMS?: number;
}

export interface SinterServerInfo {
  readonly protocolVersion: number;
  readonly product: string;
  readonly productVersion: string;
  readonly capabilities: readonly string[];
}

export interface SinterPingResult {
  readonly ok: true;
  readonly sentAt: Date;
  readonly receivedAt: Date;
  readonly roundTripTimeMS: number;
}

export interface SinterClientEvents {
  connecting: [client: SinterClient];
  connected: [client: SinterClient];
  closed: [client: SinterClient];
  error: [error: Error];
}

export const SinterClientState = {
  New: "new",
  Connecting: "connecting",
  Connected: "connected",
  Closing: "closing",
  Closed: "closed",
} as const;

export type SinterClientState =
  (typeof SinterClientState)[keyof typeof SinterClientState];

export class SinterClient extends EventEmitter<SinterClientEvents> {
  public readonly target: ParsedSinterConnectionString;
  public readonly connectTimeoutMS: number;
  public readonly requestTimeoutMS: number;
  public readonly socketTimeoutMS: number;

  private currentState: SinterClientState = SinterClientState.New;
  private socket: Socket | undefined;
  private pendingConnection: Promise<this> | undefined;
  private negotiatedServer: SinterServerInfo | undefined;
  private requestDispatcher: RequestDispatcher | undefined;

  public constructor(
    connectionString: string,
    options: SinterClientOptions = {},
  ) {
    super();

    this.target = parseSinterConnectionString(connectionString);
    this.connectTimeoutMS = resolveTimeout(
      "connectTimeoutMS",
      options.connectTimeoutMS,
      DEFAULT_CONNECT_TIMEOUT_MS,
    );
    this.requestTimeoutMS = resolveTimeout(
      "requestTimeoutMS",
      options.requestTimeoutMS,
      DEFAULT_REQUEST_TIMEOUT_MS,
    );
    this.socketTimeoutMS = resolveTimeout(
      "socketTimeoutMS",
      options.socketTimeoutMS,
      DEFAULT_SOCKET_TIMEOUT_MS,
      0,
    );
  }

  public get state(): SinterClientState {
    return this.currentState;
  }

  public get connected(): boolean {
    return this.currentState === SinterClientState.Connected;
  }

  public get serverInfo(): SinterServerInfo | undefined {
    return this.negotiatedServer;
  }

  public connect(): Promise<this> {
    if (this.currentState === SinterClientState.Connected) {
      return Promise.resolve(this);
    }

    if (
      this.currentState === SinterClientState.Closing ||
      this.currentState === SinterClientState.Closed
    ) {
      return Promise.reject(
        new SinterClientStateError(
          SinterErrorCode.ClientClosed,
          "A closed SinterDB client cannot be connected again.",
        ),
      );
    }

    if (this.pendingConnection !== undefined) {
      return this.pendingConnection;
    }

    this.currentState = SinterClientState.Connecting;
    this.emit("connecting", this);

    const connection = this.openSocket();
    this.pendingConnection = connection;

    void connection.then(
      () => {
        if (this.pendingConnection === connection) {
          this.pendingConnection = undefined;
        }
      },
      () => {
        if (this.pendingConnection === connection) {
          this.pendingConnection = undefined;
        }
      },
    );

    return connection;
  }

  public async ping(): Promise<SinterPingResult> {
    const dispatcher = this.getRequestDispatcher();
    const sentAt = new Date();
    const startedAt = performance.now();

    const response = await dispatcher.request(MessageKind.Ping, {
      sentAt,
    });

    const roundTripTimeMS = performance.now() - startedAt;

    if (response.kind !== MessageKind.Result) {
      throw new SinterProtocolError(
        "The server did not return a result for the ping request.",
      );
    }

    return parsePingResult(response.payload.value, sentAt, roundTripTimeMS);
  }

  public async executeCommand(
    database: string,
    command: string,
    parameters: Document,
  ): Promise<DocumentValue> {
    const dispatcher = this.getRequestDispatcher();

    const response = await dispatcher.request(MessageKind.Command, {
      command,
      database,
      parameters,
    });

    if (response.kind !== MessageKind.Result) {
      throw new SinterProtocolError(
        `The server did not return a result for command ${JSON.stringify(command)}.`,
      );
    }

    return response.payload.value;
  }

  public db(name?: string): SinterDatabase {
    const selectedName = name ?? this.target.database;

    if (selectedName === undefined) {
      throw new SinterNamespaceError(
        "No database was selected in the connection string or db() call.",
      );
    }

    return new SinterDatabase(this, selectedName);
  }

  public async close(): Promise<void> {
    if (this.currentState === SinterClientState.Closed) {
      return;
    }

    this.currentState = SinterClientState.Closing;
    this.negotiatedServer = undefined;

    const dispatcher = this.requestDispatcher;
    this.requestDispatcher = undefined;

    dispatcher?.close(
      new SinterClientStateError(
        SinterErrorCode.ClientClosed,
        "The client closed before the request completed.",
      ),
    );

    const socket = this.socket;
    this.socket = undefined;

    if (socket === undefined || socket.destroyed) {
      this.transitionToClosed();
      return;
    }

    await new Promise<void>((resolve) => {
      socket.once("close", resolve);
      socket.destroy();
    });

    this.transitionToClosed();
  }

  private openSocket(): Promise<this> {
    const { host, port } = this.target;

    return new Promise<this>((resolve, reject) => {
      const socket = createConnection({
        host,
        port,
      });

      this.socket = socket;

      let settled = false;
      let timeout: ReturnType<typeof setTimeout>;

      const cleanupConnectionListeners = (): void => {
        socket.off("connect", onConnect);
        socket.off("error", onError);
        socket.off("close", onClose);
      };

      const finishFailure = (error: Error): void => {
        if (settled) {
          return;
        }

        settled = true;
        clearTimeout(timeout);
        cleanupConnectionListeners();
        socket.destroy();

        if (this.socket === socket) {
          this.socket = undefined;
        }

        this.negotiatedServer = undefined;
        this.requestDispatcher = undefined;

        const shouldEmitError =
          this.currentState !== SinterClientState.Closing &&
          this.currentState !== SinterClientState.Closed;

        if (this.currentState === SinterClientState.Connecting) {
          this.currentState = SinterClientState.New;
        }

        if (shouldEmitError) {
          this.emitDriverError(error);
        }

        reject(error);
      };

      const finishSuccess = (handshake: ServerHandshake): void => {
        if (settled) {
          return;
        }

        if (this.currentState !== SinterClientState.Connecting) {
          finishFailure(
            new SinterClientStateError(
              SinterErrorCode.ClientClosed,
              "The client was closed while connecting.",
            ),
          );
          return;
        }

        settled = true;
        clearTimeout(timeout);
        cleanupConnectionListeners();
        socket.setTimeout(this.socketTimeoutMS);

        this.negotiatedServer = Object.freeze({
          protocolVersion: handshake.protocolVersion,
          product: handshake.product,
          productVersion: handshake.productVersion,
          capabilities: handshake.capabilities,
        });

        this.requestDispatcher = new RequestDispatcher(socket, {
          requestTimeoutMS: this.requestTimeoutMS,
        });

        this.currentState = SinterClientState.Connected;
        this.attachSocketLifecycle(socket);
        this.emit("connected", this);
        resolve(this);
      };

      const onConnect = (): void => {
        cleanupConnectionListeners();

        void performClientHandshake(socket, {
          product: DRIVER_PRODUCT,
          productVersion: DRIVER_PRODUCT_VERSION,
          capabilities: [ProtocolCapability.TypedDocuments],
        }).then(finishSuccess, (error: unknown) => {
          finishFailure(
            error instanceof Error
              ? error
              : new SinterProtocolError(
                  "The client handshake failed with an unknown error.",
                ),
          );
        });
      };

      const onError = (cause: Error): void => {
        finishFailure(
          new SinterConnectionError(`Could not connect to ${host}:${port}.`, {
            cause,
          }),
        );
      };

      const onClose = (): void => {
        finishFailure(
          new SinterConnectionError(
            `The connection to ${host}:${port} closed before it was established.`,
          ),
        );
      };

      socket.once("connect", onConnect);
      socket.once("error", onError);
      socket.once("close", onClose);

      timeout = setTimeout(() => {
        finishFailure(
          new SinterConnectionTimeoutError(
            `Timed out while connecting to ${host}:${port}.`,
          ),
        );
      }, this.connectTimeoutMS);
    });
  }

  private attachSocketLifecycle(socket: Socket): void {
    socket.on("timeout", () => {
      if (this.socket !== socket) {
        return;
      }

      const error = new SinterSocketTimeoutError(
        `The connection was inactive for ${this.socketTimeoutMS}ms.`,
      );

      this.emitDriverError(error);

      this.requestDispatcher?.close(error);
      this.requestDispatcher = undefined;

      socket.destroy();
    });

    socket.on("error", (error) => {
      this.emitDriverError(error);
    });

    socket.once("close", () => {
      if (this.socket !== socket) {
        return;
      }

      this.socket = undefined;
      this.negotiatedServer = undefined;

      this.requestDispatcher?.close(
        new SinterConnectionError(
          "The database connection closed unexpectedly.",
        ),
      );
      this.requestDispatcher = undefined;

      this.transitionToClosed();
    });
  }

  private getRequestDispatcher(): RequestDispatcher {
    if (
      this.currentState !== SinterClientState.Connected ||
      this.requestDispatcher === undefined
    ) {
      throw new SinterClientStateError(
        SinterErrorCode.ClientNotConnected,
        "The SinterDB client is not connected.",
      );
    }

    return this.requestDispatcher;
  }

  private transitionToClosed(): void {
    if (this.currentState === SinterClientState.Closed) {
      return;
    }

    this.currentState = SinterClientState.Closed;
    this.emit("closed", this);
  }

  private emitDriverError(error: Error): void {
    if (this.listenerCount("error") > 0) {
      this.emit("error", error);
    }
  }
}

function resolveTimeout(
  name: "connectTimeoutMS" | "requestTimeoutMS" | "socketTimeoutMS",
  value: number | undefined,
  defaultValue: number,
  minimum = 1,
): number {
  if (value === undefined) {
    return defaultValue;
  }

  if (
    !Number.isSafeInteger(value) ||
    value < minimum ||
    value > MAX_TIMEOUT_MS
  ) {
    throw new SinterClientOptionsError(
      `${name} must be an integer between ${minimum} and ${MAX_TIMEOUT_MS}.`,
    );
  }

  return value;
}

function parsePingResult(
  value: unknown,
  expectedSentAt: Date,
  roundTripTimeMS: number,
): SinterPingResult {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    value instanceof Date ||
    value instanceof Uint8Array
  ) {
    throw new SinterProtocolError(
      "The server returned an invalid ping result.",
    );
  }

  const result = value as Record<string, unknown>;
  const ok = result["ok"];
  const sentAt = result["sentAt"];
  const receivedAt = result["receivedAt"];

  if (
    ok !== true ||
    !(sentAt instanceof Date) ||
    !(receivedAt instanceof Date) ||
    !Number.isFinite(sentAt.getTime()) ||
    !Number.isFinite(receivedAt.getTime())
  ) {
    throw new SinterProtocolError(
      "The server returned an invalid ping result.",
    );
  }

  if (sentAt.getTime() !== expectedSentAt.getTime()) {
    throw new SinterProtocolError(
      "The ping result did not contain the original timestamp.",
    );
  }

  return Object.freeze({
    ok: true,
    sentAt,
    receivedAt,
    roundTripTimeMS,
  });
}
