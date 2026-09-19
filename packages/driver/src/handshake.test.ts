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
  WireErrorCode,
  type DecodedMessage,
} from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import {
  CLIENT_HANDSHAKE_REQUEST_ID,
  performClientHandshake,
} from "./handshake.js";
import { SinterProtocolError, SinterServerError } from "./errors.js";

describe("performClientHandshake", () => {
  it("negotiates a server handshake", async () => {
    let receivedRequest: DecodedMessage | undefined;

    const { server, port } = await startHandshakeServer((request) => {
      receivedRequest = request;

      return encodeMessage({
        kind: MessageKind.Handshake,
        requestId: request.requestId,
        payload: {
          role: HandshakeRole.Server,
          protocolVersion: PROTOCOL_VERSION,
          product: "sinterdb-server",
          productVersion: "0.0.3",
          capabilities: ["typed-documents", "streaming"],
        },
      });
    });

    const socket = await connectToServer(port);

    try {
      const result = await performClientHandshake(socket, {
        product: "sinterdb",
        productVersion: "0.0.3",
        capabilities: ["typed-documents"],
      });

      expect(result).toEqual({
        protocolVersion: PROTOCOL_VERSION,
        product: "sinterdb-server",
        productVersion: "0.0.3",
        capabilities: ["typed-documents", "streaming"],
      });

      expect(receivedRequest?.kind).toBe(MessageKind.Handshake);
      expect(receivedRequest?.requestId).toBe(CLIENT_HANDSHAKE_REQUEST_ID);

      if (receivedRequest?.kind === MessageKind.Handshake) {
        expect(receivedRequest.payload).toEqual({
          role: HandshakeRole.Client,
          protocolVersion: PROTOCOL_VERSION,
          product: "sinterdb",
          productVersion: "0.0.3",
          capabilities: ["typed-documents"],
        });
      }
    } finally {
      await closeSocket(socket);
      await stopServer(server);
    }
  });

  it("converts a handshake error into a driver server error", async () => {
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
        }),
      ).rejects.toBeInstanceOf(SinterServerError);
    } finally {
      await closeSocket(socket);
      await stopServer(server);
    }
  });

  it("rejects a handshake using the client role", async () => {
    const { server, port } = await startHandshakeServer((request) =>
      encodeMessage({
        kind: MessageKind.Handshake,
        requestId: request.requestId,
        payload: {
          role: HandshakeRole.Client,
          protocolVersion: PROTOCOL_VERSION,
          product: "invalid-server",
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
        }),
      ).rejects.toBeInstanceOf(SinterProtocolError);
    } finally {
      await closeSocket(socket);
      await stopServer(server);
    }
  });

  it("rejects a handshake with the wrong request ID", async () => {
    const { server, port } = await startHandshakeServer(() =>
      encodeMessage({
        kind: MessageKind.Handshake,
        requestId: CLIENT_HANDSHAKE_REQUEST_ID + 1,
        payload: {
          role: HandshakeRole.Server,
          protocolVersion: PROTOCOL_VERSION,
          product: "sinterdb-server",
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
        }),
      ).rejects.toBeInstanceOf(SinterProtocolError);
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
