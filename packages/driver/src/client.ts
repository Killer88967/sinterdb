import { createConnection, type Socket } from "node:net";
import {
  type ParsedSinterConnectionString,
  parseSinterConnectionString,
} from "./connection-string.js";
import {
  SinterClientStateError,
  SinterConnectionError,
  SinterConnectionTimeoutError,
  SinterErrorCode,
} from "./errors.js";

export const DEFAULT_CONNECT_TIMEOUT_MS = 10_000;

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

  private currentState: SinterClientState = SinterClientState.New;
  private socket: Socket | undefined;
  private pendingConnection: Promise<this> | undefined;

  public constructor(connectionString: string) {
    this.target = parseSinterConnectionString(connectionString);
  }

  public get state(): SinterClientState {
    return this.currentState;
  }

  public get connected(): boolean {
    return this.currentState === SinterClientState.Connected;
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

      const timeout = setTimeout(() => {
        cleanup();
        socket.destroy();

        if (this.currentState === SinterClientState.Connecting) {
          this.currentState = SinterClientState.New;
        }

        this.socket = undefined;

        reject(
          new SinterConnectionTimeoutError(
            `Timed out while connecting to ${host}:${port}.`,
          ),
        );
      }, DEFAULT_CONNECT_TIMEOUT_MS);

      const onConnect = (): void => {
        cleanup();

        if (this.currentState !== SinterClientState.Connecting) {
          socket.destroy();

          reject(
            new SinterClientStateError(
              SinterErrorCode.ClientClosed,
              "The client was closed while connecting.",
            ),
          );

          return;
        }

        this.currentState = SinterClientState.Connected;
        this.attachSocketLifecycle(socket);
        resolve(this);
      };

      const onError = (cause: Error): void => {
        cleanup();
        socket.destroy();

        if (this.currentState === SinterClientState.Connecting) {
          this.currentState = SinterClientState.New;
        }

        this.socket = undefined;

        reject(
          new SinterConnectionError(`Could not connect to ${host}:${port}.`, {
            cause,
          }),
        );
      };

      const onClose = (): void => {
        cleanup();

        if (this.currentState === SinterClientState.Connecting) {
          this.currentState = SinterClientState.New;
        }

        this.socket = undefined;

        reject(
          new SinterConnectionError(
            `The connection to ${host}:${port} closed before it was established.`,
          ),
        );
      };

      const cleanup = (): void => {
        clearTimeout(timeout);
        socket.off("connect", onConnect);
        socket.off("error", onError);
        socket.off("close", onClose);
      };

      socket.once("connect", onConnect);
      socket.once("error", onError);
      socket.once("close", onClose);
    });
  }

  private attachSocketLifecycle(socket: Socket): void {
    socket.on("error", () => {
      // The close event performs the state transition. Later this will
      // also surface the failure to pending driver operations.
    });

    socket.once("close", () => {
      if (this.socket !== socket) {
        return;
      }

      this.socket = undefined;

      if (this.currentState !== SinterClientState.Closing) {
        this.currentState = SinterClientState.Closed;
      }
    });
  }
}
