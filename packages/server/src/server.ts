import { EventEmitter } from "node:events";
import {
  createServer,
  type AddressInfo,
  type Server as NetServer,
  type Socket,
} from "node:net";

import {
  resolveServerConfig,
  type ServerConfig,
  type ServerConfigInput,
  type ServerEnvironment,
} from "./config.js";
import { ServerSession } from "./session.js";

export const SinterServerState = {
  Stopped: "stopped",
  Starting: "starting",
  Running: "running",
  Stopping: "stopping",
} as const;

export type SinterServerState =
  (typeof SinterServerState)[keyof typeof SinterServerState];

export interface SinterServerAddress {
  host: string;
  port: number;
  family: string;
}

export class ServerLifecycleError extends Error {
  public readonly state: SinterServerState;

  public constructor(state: SinterServerState, message: string) {
    super(message);

    this.name = "ServerLifecycleError";
    this.state = state;
  }
}

export class SinterServer extends EventEmitter {
  public readonly config: Readonly<ServerConfig>;

  private netServer: NetServer | undefined;
  private readonly sockets = new Set<Socket>();
  private currentState: SinterServerState = SinterServerState.Stopped;
  private currentAddress: SinterServerAddress | undefined;
  private stopOperation: Promise<void> | undefined;

  public constructor(
    input: ServerConfigInput = {},
    environment: ServerEnvironment = process.env,
  ) {
    super();

    this.config = resolveServerConfig(input, environment);
  }

  public get state(): SinterServerState {
    return this.currentState;
  }

  public get address(): SinterServerAddress | undefined {
    return this.currentAddress;
  }

  public get activeConnectionCount(): number {
    return this.sockets.size;
  }

  public async start(): Promise<SinterServerAddress> {
    if (this.currentState !== SinterServerState.Stopped) {
      throw new ServerLifecycleError(
        this.currentState,
        `Cannot start the server while it is ${this.currentState}.`,
      );
    }

    this.currentState = SinterServerState.Starting;

    const server = createServer((socket) => {
      this.trackSocket(socket);
    });

    this.netServer = server;

    try {
      const address = await listen(server, this.config, (error) =>
        this.emit("error", error),
      );

      this.currentAddress = address;
      this.currentState = SinterServerState.Running;

      return address;
    } catch (error: unknown) {
      this.netServer = undefined;
      this.currentAddress = undefined;
      this.currentState = SinterServerState.Stopped;

      throw error;
    }
  }

  public async stop(): Promise<void> {
    if (this.currentState === SinterServerState.Stopped) {
      return;
    }

    if (this.currentState === SinterServerState.Stopping) {
      await this.stopOperation;
      return;
    }

    if (
      this.currentState !== SinterServerState.Running ||
      this.netServer === undefined
    ) {
      throw new ServerLifecycleError(
        this.currentState,
        `Cannot stop the server while it is ${this.currentState}.`,
      );
    }

    this.currentState = SinterServerState.Stopping;

    const server = this.netServer;
    const operation = this.close(server);

    this.stopOperation = operation;

    try {
      await operation;
    } finally {
      this.netServer = undefined;
      this.currentAddress = undefined;
      this.stopOperation = undefined;
      this.currentState = SinterServerState.Stopped;
    }
  }

  private trackSocket(socket: Socket): void {
    this.sockets.add(socket);

    new ServerSession(socket, {
      onError: (error) => this.emit("error", error),
    });

    socket.once("close", () => {
      this.sockets.delete(socket);
    });
  }

  private async close(server: NetServer): Promise<void> {
    const sockets = [...this.sockets];
    const socketClosures = sockets.map(waitForSocketClose);

    const serverClosed = new Promise<void>((resolve, reject) => {
      server.close((error) => {
        if (error !== undefined) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    for (const socket of sockets) {
      socket.end();
    }

    await Promise.all([serverClosed, ...socketClosures]);
  }
}

async function listen(
  server: NetServer,
  config: Readonly<ServerConfig>,
  onRuntimeError: (error: Error) => void,
): Promise<SinterServerAddress> {
  return await new Promise<SinterServerAddress>((resolve, reject) => {
    const handleStartupError = (error: Error): void => {
      server.off("listening", handleListening);
      reject(error);
    };

    const handleListening = (): void => {
      server.off("error", handleStartupError);
      server.on("error", onRuntimeError);

      const address = server.address();

      if (address === null || typeof address === "string") {
        reject(
          new ServerLifecycleError(
            SinterServerState.Starting,
            "The TCP server did not provide an IP address.",
          ),
        );
        return;
      }

      resolve(toServerAddress(address));
    };

    server.once("error", handleStartupError);
    server.once("listening", handleListening);

    server.listen({
      host: config.host,
      port: config.port,
    });
  });
}

function toServerAddress(address: AddressInfo): SinterServerAddress {
  return {
    host: address.address,
    port: address.port,
    family: address.family,
  };
}

function waitForSocketClose(socket: Socket): Promise<void> {
  if (socket.closed) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    socket.once("close", () => resolve());
  });
}
