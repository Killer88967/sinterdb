import type { Socket } from "node:net";

import {
  encodeMessage,
  MessageKind,
  MessageStreamDecoder,
  RequestIdGenerator,
  type DecodedMessage,
  type MessageKindValue,
  type MessagePayloadByKind,
} from "sinterdb-protocol";

import {
  SinterConnectionError,
  SinterProtocolError,
  SinterRequestTimeoutError,
  SinterServerError,
} from "./errors.js";
import { CLIENT_HANDSHAKE_REQUEST_ID } from "./handshake.js";

const FIRST_OPERATION_REQUEST_ID = CLIENT_HANDSHAKE_REQUEST_ID + 1;

interface PendingRequest {
  readonly resolve: (message: DecodedMessage) => void;
  readonly reject: (error: Error) => void;
  readonly timeout: ReturnType<typeof setTimeout>;
}

export interface RequestDispatcherOptions {
  readonly requestTimeoutMS: number;
}

export class RequestDispatcher {
  private readonly decoder = new MessageStreamDecoder();
  private readonly requestIds = new RequestIdGenerator(
    FIRST_OPERATION_REQUEST_ID,
  );
  private readonly pending = new Map<number, PendingRequest>();

  private closed = false;

  public constructor(
    private readonly socket: Socket,
    private readonly options: RequestDispatcherOptions,
  ) {
    socket.on("data", this.handleData);
    socket.on("error", this.handleError);
    socket.once("close", this.handleClose);
  }

  public request<K extends MessageKindValue>(
    kind: K,
    payload: MessagePayloadByKind[K],
  ): Promise<DecodedMessage> {
    if (this.closed || this.socket.destroyed) {
      return Promise.reject(
        new SinterConnectionError(
          "Cannot send a request because the connection is closed.",
        ),
      );
    }

    const requestId = this.allocateRequestId();

    return new Promise<DecodedMessage>((resolve, reject) => {
      const timeout = setTimeout(() => {
        if (!this.pending.delete(requestId)) {
          return;
        }

        reject(
          new SinterRequestTimeoutError(
            `Request ${requestId} timed out after ${this.options.requestTimeoutMS}ms.`,
          ),
        );
      }, this.options.requestTimeoutMS);

      this.pending.set(requestId, {
        resolve,
        reject,
        timeout,
      });

      try {
        this.socket.write(
          encodeMessage({
            kind,
            requestId,
            payload,
          }),
          (error?: Error | null) => {
            if (error !== undefined && error !== null) {
              this.rejectRequest(
                requestId,
                new SinterConnectionError(
                  `Could not write request ${requestId} to the server.`,
                  { cause: error },
                ),
              );
            }
          },
        );
      } catch (cause: unknown) {
        this.rejectRequest(
          requestId,
          new SinterConnectionError(
            `Could not write request ${requestId} to the server.`,
            { cause },
          ),
        );
      }
    });
  }

  public close(
    error: Error = new SinterConnectionError(
      "The connection closed before the request completed.",
    ),
  ): void {
    if (this.closed) {
      return;
    }

    this.closed = true;

    this.socket.off("data", this.handleData);
    this.socket.off("error", this.handleError);
    this.socket.off("close", this.handleClose);

    this.decoder.reset();
    this.rejectAll(error);
  }

  private readonly handleData = (chunk: string | Uint8Array): void => {
    if (typeof chunk === "string") {
      this.failConnection(
        new SinterProtocolError(
          "The server sent text data instead of binary protocol data.",
        ),
      );
      return;
    }

    let messages: DecodedMessage[];

    try {
      messages = this.decoder.push(chunk);
    } catch (cause: unknown) {
      this.failConnection(
        new SinterProtocolError("The server sent an invalid protocol frame.", {
          cause,
        }),
      );
      return;
    }

    for (const message of messages) {
      this.handleMessage(message);
    }
  };

  private readonly handleError = (cause: Error): void => {
    this.failConnection(
      new SinterConnectionError("The database connection failed.", {
        cause,
      }),
    );
  };

  private readonly handleClose = (): void => {
    this.close(
      new SinterConnectionError(
        "The database connection closed before the request completed.",
      ),
    );
  };

  private handleMessage(message: DecodedMessage): void {
    const pending = this.pending.get(message.requestId);

    if (pending === undefined) {
      return;
    }

    this.pending.delete(message.requestId);
    clearTimeout(pending.timeout);

    if (message.kind === MessageKind.Error) {
      pending.reject(
        new SinterServerError(message.payload.message, {
          wireCode: message.payload.code,
          serverErrorName: message.payload.name,
          retryable: message.payload.retryable,
          ...(message.payload.details === undefined
            ? {}
            : { details: message.payload.details }),
        }),
      );
      return;
    }

    pending.resolve(message);
  }

  private allocateRequestId(): number {
    const first = this.requestIds.next();
    let requestId = first;

    while (this.pending.has(requestId)) {
      requestId = this.requestIds.next();

      if (requestId === first) {
        throw new SinterProtocolError(
          "No request IDs are available for a new operation.",
        );
      }
    }

    return requestId;
  }

  private rejectRequest(requestId: number, error: Error): void {
    const pending = this.pending.get(requestId);

    if (pending === undefined) {
      return;
    }

    this.pending.delete(requestId);
    clearTimeout(pending.timeout);
    pending.reject(error);
  }

  private rejectAll(error: Error): void {
    for (const [requestId, pending] of this.pending) {
      this.pending.delete(requestId);
      clearTimeout(pending.timeout);
      pending.reject(error);
    }
  }

  private failConnection(error: Error): void {
    if (this.closed) {
      return;
    }

    this.close(error);
    this.socket.destroy();
  }
}
