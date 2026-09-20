import { once } from "node:events";
import { createServer, type AddressInfo, type Server } from "node:net";

import {
  encodeMessage,
  HandshakeRole,
  MessageKind,
  MessageStreamDecoder,
  PROTOCOL_VERSION,
  ProtocolCapability,
} from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import {
  DEFAULT_SOCKET_TIMEOUT_MS,
  SinterClient,
  SinterClientState,
} from "./client.js";
import {
  SinterClientOptionsError,
  SinterSocketTimeoutError,
} from "./errors.js";

describe("SinterClient socket timeout", () => {
  it("disables the socket timeout by default", () => {
    const client = new SinterClient("sinterdb://localhost");

    expect(client.socketTimeoutMS).toBe(DEFAULT_SOCKET_TIMEOUT_MS);
    expect(client.socketTimeoutMS).toBe(0);
  });

  it("accepts a custom socket timeout", () => {
    const client = new SinterClient("sinterdb://localhost", {
      socketTimeoutMS: 5_000,
    });

    expect(client.socketTimeoutMS).toBe(5_000);
  });

  it.each([-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, 2_147_483_648])(
    "rejects the invalid socket timeout %s",
    (socketTimeoutMS) => {
      expect(
        () =>
          new SinterClient("sinterdb://localhost", {
            socketTimeoutMS,
          }),
      ).toThrow(SinterClientOptionsError);
    },
  );

  it("closes an inactive connection", async () => {
    const { server, port } = await startTestServer();
    const client = new SinterClient(`sinterdb://127.0.0.1:${port}`, {
      socketTimeoutMS: 30,
    });

    let emittedError: Error | undefined;

    client.on("error", (error) => {
      emittedError = error;
    });

    try {
      await client.connect();

      await new Promise<void>((resolve) => {
        client.once("closed", () => resolve());
      });

      expect(emittedError).toBeInstanceOf(SinterSocketTimeoutError);
      expect(client.state).toBe(SinterClientState.Closed);
      expect(client.connected).toBe(false);
    } finally {
      await client.close();
      await stopTestServer(server);
    }
  });
});

async function startTestServer(): Promise<{
  server: Server;
  port: number;
}> {
  const server = createServer((socket) => {
    const decoder = new MessageStreamDecoder();

    socket.on("data", (chunk) => {
      const messages = decoder.push(chunk);

      for (const message of messages) {
        if (message.kind !== MessageKind.Handshake) {
          continue;
        }

        socket.write(
          encodeMessage({
            kind: MessageKind.Handshake,
            requestId: message.requestId,
            payload: {
              role: HandshakeRole.Server,
              protocolVersion: PROTOCOL_VERSION,
              product: "sinterdb-test-server",
              productVersion: "0.0.3",
              capabilities: [ProtocolCapability.TypedDocuments],
            },
          }),
        );
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

async function stopTestServer(server: Server): Promise<void> {
  if (!server.listening) {
    return;
  }

  server.close();
  await once(server, "close");
}
