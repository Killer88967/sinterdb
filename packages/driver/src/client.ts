import { createConnection, type Socket } from "node:net";
import { ProtocolCapability } from "sinterdb-protocol";
import {
  type ParsedSinterConnectionString,
  parseSinterConnectionString,
} from "./connection-string.js";
import {
  SinterClientOptionsError,
  SinterClientStateError,
  SinterConnectionError,
  SinterConnectionTimeoutError,
  SinterErrorCode,
  SinterProtocolError,
} from "./errors.js";
import { performClientHandshake, type ServerHandshake } from "./handshake.js";

export const DEFAULT_CONNECT_TIMEOUT_MS = 10_000;
export const DRIVER_PRODUCT = "sinterdb-node-driver";
export const DRIVER_PRODUCT_VERSION = "0.0.3";

const MAX_CONNECT_TIMEOUT_MS = 2_147_483_647;

export interface SinterClientOptions {
  readonly connectTimeoutMS?: number;
}

export interface SinterServerInfo {
  readonly protocolVersion: number;
  readonly product: string;
  readonly productVersion: string;
  readonly capabilities: readonly string[];
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

export class SinterClient {
  public readonly target: ParsedSinterConnectionString;
  public readonly connectTimeoutMS: number;

  private currentState: SinterClientState = SinterClientState.New;
  private socket: Socket | undefined;
  private pendingConnection: Promise<this> | undefined;
  private negotiatedServer: SinterServerInfo | undefined;

  public constructor(
    connectionString: string,
    options: SinterClientOptions = {},
  ) {
    this.target = parseSinterConnectionString(connectionString);
    this.connectTimeoutMS = resolveConnectTimeout(options);
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

  public async close(): Promise<void> {
    if (this.currentState === SinterClientState.Closed) {
      return;
    }

    this.currentState = SinterClientState.Closing;
    this.negotiatedServer = undefined;

    const socket = this.socket;
    this.socket = undefined;

    if (socket === undefined || socket.destroyed) {
      this.currentState = SinterClientState.Closed;
      return;
    }

    await new Promise<void>((resolve) => {
      socket.once("close", resolve);
      socket.destroy();
    });

    this.currentState = SinterClientState.Closed;
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

        if (this.currentState === SinterClientState.Connecting) {
          this.currentState = SinterClientState.New;
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

        this.negotiatedServer = Object.freeze({
          protocolVersion: handshake.protocolVersion,
          product: handshake.product,
          productVersion: handshake.productVersion,
          capabilities: handshake.capabilities,
        });

        this.currentState = SinterClientState.Connected;
        this.attachSocketLifecycle(socket);
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
    socket.on("error", () => {
      // The close event performs the state transition. Pending operations
      // will receive detailed connection errors when request support lands.
    });

    socket.once("close", () => {
      if (this.socket !== socket) {
        return;
      }

      this.socket = undefined;
      this.negotiatedServer = undefined;

      if (this.currentState !== SinterClientState.Closing) {
        this.currentState = SinterClientState.Closed;
      }
    });
  }
}

function resolveConnectTimeout(options: SinterClientOptions): number {
  if (options.connectTimeoutMS === undefined) {
    return DEFAULT_CONNECT_TIMEOUT_MS;
  }

  const timeout = options.connectTimeoutMS;

  if (
    !Number.isSafeInteger(timeout) ||
    timeout < 1 ||
    timeout > MAX_CONNECT_TIMEOUT_MS
  ) {
    throw new SinterClientOptionsError(
      `connectTimeoutMS must be an integer between 1 and ${MAX_CONNECT_TIMEOUT_MS}.`,
    );
  }

  return timeout;
}
