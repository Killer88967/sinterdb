import type { Socket } from "node:net";
import {
  encodeMessage,
  HandshakeRole,
  MessageKind,
  MessageStreamDecoder,
  PROTOCOL_VERSION,
  type HandshakeEnvelope,
} from "sinterdb-protocol";

import {
  SinterCompatibilityError,
  SinterConnectionError,
  SinterProtocolError,
  SinterServerError,
} from "./errors.js";

export const CLIENT_HANDSHAKE_REQUEST_ID = 1;

export interface ClientHandshakeOptions {
  readonly product: string;
  readonly productVersion: string;
  readonly capabilities?: readonly string[];
}

export interface ServerHandshake {
  readonly protocolVersion: number;
  readonly product: string;
  readonly productVersion: string;
  readonly capabilities: readonly string[];
}

export function performClientHandshake(
  socket: Socket,
  options: ClientHandshakeOptions,
): Promise<ServerHandshake> {
  return new Promise<ServerHandshake>((resolve, reject) => {
    const decoder = new MessageStreamDecoder();
    let settled = false;

    const cleanup = (): void => {
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("close", onClose);
    };

    const fail = (error: Error): void => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();
      socket.destroy();
      reject(error);
    };

    const succeed = (handshake: HandshakeEnvelope): void => {
      if (settled) {
        return;
      }

      settled = true;
      cleanup();

      resolve(
        Object.freeze({
          protocolVersion: handshake.protocolVersion,
          product: handshake.product,
          productVersion: handshake.productVersion,
          capabilities: Object.freeze([...handshake.capabilities]),
        }),
      );
    };

    const onData = (chunk: string | Uint8Array): void => {
      if (typeof chunk === "string") {
        fail(
          new SinterProtocolError(
            "The server sent text data instead of binary protocol data.",
          ),
        );
        return;
      }

      let messages;

      try {
        messages = decoder.push(chunk);
      } catch (cause: unknown) {
        fail(
          new SinterProtocolError(
            "The server sent an invalid protocol frame.",
            { cause },
          ),
        );
        return;
      }

      for (const message of messages) {
        if (message.requestId !== CLIENT_HANDSHAKE_REQUEST_ID) {
          fail(
            new SinterProtocolError(
              "The server handshake used an unexpected request ID.",
            ),
          );
          return;
        }

        if (message.kind === MessageKind.Error) {
          if (
            message.payload.name === "UnsupportedProtocolVersion" ||
            message.payload.name === "UnsupportedCapabilities"
          ) {
            fail(new SinterCompatibilityError(message.payload.message));
            return;
          }

          fail(new SinterServerError(message.payload.message));
          return;
        }

        if (message.kind !== MessageKind.Handshake) {
          fail(
            new SinterProtocolError(
              "The server did not respond with a handshake message.",
            ),
          );
          return;
        }

        if (message.payload.role !== HandshakeRole.Server) {
          fail(
            new SinterProtocolError(
              "The handshake response did not use the server role.",
            ),
          );
          return;
        }

        if (message.payload.protocolVersion !== PROTOCOL_VERSION) {
          fail(
            new SinterCompatibilityError(
              `The server selected protocol version ${message.payload.protocolVersion}, but the driver requires version ${PROTOCOL_VERSION}.`,
            ),
          );
          return;
        }

        const requiredCapabilities = options.capabilities ?? [];
        const missingCapabilities = requiredCapabilities.filter(
          (capability) => !message.payload.capabilities.includes(capability),
        );

        if (missingCapabilities.length > 0) {
          fail(
            new SinterCompatibilityError(
              `The server does not support the required capabilities: ${missingCapabilities.join(", ")}.`,
            ),
          );
          return;
        }

        succeed(message.payload);
        return;
      }
    };

    const onError = (cause: Error): void => {
      fail(
        new SinterConnectionError(
          "The connection failed during the protocol handshake.",
          { cause },
        ),
      );
    };

    const onClose = (): void => {
      fail(
        new SinterConnectionError(
          "The connection closed before the protocol handshake completed.",
        ),
      );
    };

    socket.on("data", onData);
    socket.once("error", onError);
    socket.once("close", onClose);

    const handshake: HandshakeEnvelope = {
      role: HandshakeRole.Client,
      protocolVersion: PROTOCOL_VERSION,
      product: options.product,
      productVersion: options.productVersion,
      capabilities: [...(options.capabilities ?? [])],
    };

    try {
      socket.write(
        encodeMessage({
          kind: MessageKind.Handshake,
          requestId: CLIENT_HANDSHAKE_REQUEST_ID,
          payload: handshake,
        }),
      );
    } catch (cause: unknown) {
      fail(
        new SinterConnectionError("Could not send the protocol handshake.", {
          cause,
        }),
      );
    }
  });
}
