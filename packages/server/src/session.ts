import type { Socket } from "node:net";

import {
  encodeMessage,
  HandshakeRole,
  MessageKind,
  MessageStreamDecoder,
  PROTOCOL_VERSION,
  ProtocolCapability,
  ProtocolError,
  WireErrorCode,
  type CommandEnvelope,
  type DecodedMessage,
  type Document,
  type ErrorEnvelope,
} from "sinterdb-protocol";
import {
  CommandExecutionError,
  SERVER_PRODUCT,
  SERVER_PRODUCT_VERSION,
  type CommandDispatcher,
} from "./command-dispatcher.js";

export const ServerSessionState = {
  AwaitingHandshake: "awaiting-handshake",
  Ready: "ready",
  Closing: "closing",
  Closed: "closed",
} as const;

export type ServerSessionState =
  (typeof ServerSessionState)[keyof typeof ServerSessionState];

export interface ServerSessionOptions {
  dispatcher: CommandDispatcher;
  product?: string;
  productVersion?: string;
  onError?: (error: Error) => void;
}

export class ServerSession {
  private readonly decoder = new MessageStreamDecoder();
  private readonly dispatcher: CommandDispatcher;
  private readonly product: string;
  private readonly productVersion: string;
  private readonly onError: (error: Error) => void;
  private currentState: ServerSessionState =
    ServerSessionState.AwaitingHandshake;

  public constructor(
    private readonly socket: Socket,
    options: ServerSessionOptions,
  ) {
    this.dispatcher = options.dispatcher;
    this.product = options.product ?? SERVER_PRODUCT;
    this.productVersion = options.productVersion ?? SERVER_PRODUCT_VERSION;
    this.onError = options.onError ?? (() => undefined);

    socket.on("data", (chunk) => {
      if (typeof chunk === "string") {
        this.handleProtocolFailure(
          new TypeError("SinterDB sockets must provide binary data."),
        );
        return;
      }

      this.handleData(chunk);
    });
    socket.on("error", (error) => this.onError(error));

    socket.once("close", () => {
      this.decoder.reset();
      this.currentState = ServerSessionState.Closed;
    });
  }

  public get state(): ServerSessionState {
    return this.currentState;
  }

  public close(): void {
    if (
      this.currentState === ServerSessionState.Closing ||
      this.currentState === ServerSessionState.Closed
    ) {
      return;
    }

    this.currentState = ServerSessionState.Closing;
    this.socket.end();
  }

  private handleData(chunk: Uint8Array): void {
    if (!this.canReceiveMessages()) {
      return;
    }

    let messages: DecodedMessage[];

    try {
      messages = this.decoder.push(chunk);
    } catch (error: unknown) {
      this.handleProtocolFailure(error);
      return;
    }

    for (const message of messages) {
      if (!this.canReceiveMessages()) {
        break;
      }

      this.handleMessage(message);
    }
  }

  private canReceiveMessages(): boolean {
    return (
      this.currentState === ServerSessionState.AwaitingHandshake ||
      this.currentState === ServerSessionState.Ready
    );
  }

  private handleMessage(message: DecodedMessage): void {
    if (message.requestId === 0) {
      this.sendError(
        0,
        WireErrorCode.InvalidRequest,
        "InvalidRequest",
        "Client requests must use a non-zero request ID.",
        true,
      );
      return;
    }

    if (this.currentState === ServerSessionState.AwaitingHandshake) {
      this.handleHandshake(message);
      return;
    }

    switch (message.kind) {
      case MessageKind.Ping:
        this.send(MessageKind.Result, message.requestId, {
          value: {
            ok: true,
            sentAt: message.payload.sentAt,
            receivedAt: new Date(),
          },
        });
        return;

      case MessageKind.Command:
        this.handleCommand(message.requestId, message.payload);
        return;

      case MessageKind.Handshake:
        this.sendError(
          message.requestId,
          WireErrorCode.InvalidRequest,
          "InvalidRequest",
          "The connection handshake has already completed.",
          false,
        );
        return;

      default:
        this.sendError(
          message.requestId,
          WireErrorCode.InvalidRequest,
          "InvalidRequest",
          "Clients may only send handshake, ping, and command messages.",
          false,
        );
    }
  }

  private handleCommand(requestId: number, command: CommandEnvelope): void {
    try {
      const value = this.dispatcher.dispatch(command);

      this.send(MessageKind.Result, requestId, {
        value,
      });
    } catch (error: unknown) {
      if (error instanceof CommandExecutionError) {
        this.sendError(
          requestId,
          error.code,
          error.name,
          error.message,
          false,
          error.details,
        );
        return;
      }

      const internalError =
        error instanceof Error
          ? error
          : new Error("Unknown command execution failure.");

      this.onError(internalError);

      this.sendError(
        requestId,
        WireErrorCode.InternalError,
        "InternalError",
        "The server failed to execute the command.",
        false,
      );
    }
  }

  private handleHandshake(message: DecodedMessage): void {
    if (message.kind !== MessageKind.Handshake) {
      this.sendError(
        message.requestId,
        WireErrorCode.InvalidRequest,
        "InvalidRequest",
        "The first message on a connection must be a handshake.",
        true,
      );
      return;
    }

    if (message.payload.role !== HandshakeRole.Client) {
      this.sendError(
        message.requestId,
        WireErrorCode.InvalidRequest,
        "InvalidRequest",
        "The opening handshake must use the client role.",
        true,
      );
      return;
    }

    if (message.payload.protocolVersion !== PROTOCOL_VERSION) {
      this.sendError(
        message.requestId,
        WireErrorCode.UnsupportedProtocolVersion,
        "UnsupportedProtocolVersion",
        `Protocol version ${message.payload.protocolVersion} is not supported.`,
        true,
      );
      return;
    }

    this.send(MessageKind.Handshake, message.requestId, {
      role: HandshakeRole.Server,
      protocolVersion: PROTOCOL_VERSION,
      product: this.product,
      productVersion: this.productVersion,
      capabilities: [
        ProtocolCapability.TypedDocuments,
        ProtocolCapability.Streaming,
      ],
    });

    this.currentState = ServerSessionState.Ready;
  }

  private handleProtocolFailure(error: unknown): void {
    const details: Document =
      error instanceof ProtocolError
        ? {
            protocolErrorCode: error.code,
          }
        : {};

    this.sendError(
      0,
      WireErrorCode.InvalidRequest,
      "InvalidRequest",
      error instanceof Error ? error.message : "Invalid protocol input.",
      true,
      details,
    );
  }

  private send<K extends (typeof MessageKind)[keyof typeof MessageKind]>(
    kind: K,
    requestId: number,
    payload: Parameters<typeof encodeMessage<K>>[0]["payload"],
  ): void {
    this.socket.write(
      encodeMessage({
        kind,
        requestId,
        payload,
      }),
    );
  }

  private sendError(
    requestId: number,
    code: number,
    name: string,
    message: string,
    closeConnection: boolean,
    details?: Document,
  ): void {
    const payload: ErrorEnvelope = {
      code,
      name,
      message,
      retryable: false,
      ...(details === undefined ? {} : { details }),
    };

    const encoded = encodeMessage({
      kind: MessageKind.Error,
      requestId,
      payload,
    });

    if (closeConnection) {
      this.currentState = ServerSessionState.Closing;
      this.socket.end(encoded);
      return;
    }

    this.socket.write(encoded);
  }
}
