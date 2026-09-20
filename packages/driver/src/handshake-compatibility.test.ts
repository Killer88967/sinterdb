import { once } from "node:events";
import {
  createConnection,
  createServer,
  type AddressInfo,
  type Server,
  type Socket,
} from "node:net";

import {
  encodeMessage,
  HandshakeRole,
  MessageKind,
  MessageStreamDecoder,
  PROTOCOL_VERSION,
  ProtocolCapability,
  WireErrorCode,
  type DecodedMessage,
} from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { SinterCompatibilityError } from "./errors.js";
import { performClientHandshake } from "./handshake.js";

describe("handshake compatibility", () => {
  it("maps an unsupported-version response to a compatibility error", async () => {
    const { server, port } = await startHandshakeServer((request) =>
      encodeMessage({
        kind: MessageKind.Error,
        requestId: request.requestId,
        payload: {
          code: WireErrorCode.UnsupportedProtocolVersion,
          name: "UnsupportedProtocolVersion",
          message: "The protocol version is not supported.",
          retryable: true,
        },
      }),
    );

    const socket = await connectToServer(port);

    try {
      await expect(
        performClientHandshake(socket, {
          product: "sinterdb",
          productVersion: "0.0.3",
          capabilities: [ProtocolCapability.TypedDocuments],
        }),
      ).rejects.toBeInstanceOf(SinterCompatibilityError);
    } finally {
      await closeSocket(socket);
      await stopServer(server);
    }
  });

  it("rejects a server missing a required capability", async () => {
    const { server, port } = await startHandshakeServer((request) =>
      encodeMessage({
        kind: MessageKind.Handshake,
        requestId: request.requestId,
        payload: {
          role: HandshakeRole.Server,
          protocolVersion: PROTOCOL_VERSION,
          product: "limited-server",
          productVersion: "0.0.3",
          capabilities: [],
        },
      }),
    );

    const socket = await connectToServer(port);

    try {
      await expect(
        performClientHandshake(socket, {
          product: "sinterdb",
          productVersion: "0.0.3",
          capabilities: [ProtocolCapability.TypedDocuments],
        }),
      ).rejects.toBeInstanceOf(SinterCompatibilityError);
    } finally {
      await closeSocket(socket);
      await stopServer(server);
    }
  });
});

async function startHandshakeServer(
  createResponse: (request: DecodedMessage) => Uint8Array,
): Promise<{
  server: Server;
  port: number;
}> {
  const server = createServer((socket) => {
    const decoder = new MessageStreamDecoder();

    socket.on("data", (chunk) => {
      const messages = decoder.push(chunk);

      for (const message of messages) {
        socket.write(createResponse(message));
      }
    });
  });

  server.listen({
    host: "127.0.0.1",
    port: 0,
  });

  await once(server, "listening");

  const address = server.address();

  if (address === null || typeof address === "string") {
    throw new Error("Expected the test server to use a TCP address.");
  }

  return {
    server,
    port: (address as AddressInfo).port,
  };
}

async function connectToServer(port: number): Promise<Socket> {
  const socket = createConnection({
    host: "127.0.0.1",
    port,
  });

  await once(socket, "connect");

  return socket;
}

async function closeSocket(socket: Socket): Promise<void> {
  if (socket.destroyed) {
    return;
  }

  const closed = once(socket, "close");
  socket.destroy();
  await closed;
}

async function stopServer(server: Server): Promise<void> {
  if (!server.listening) {
    return;
  }

  server.close();
  await once(server, "close");
}
