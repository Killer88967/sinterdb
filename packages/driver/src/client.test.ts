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
  DEFAULT_CONNECT_TIMEOUT_MS,
  DRIVER_PRODUCT,
  DRIVER_PRODUCT_VERSION,
  SinterClient,
  SinterClientState,
} from "./client.js";
import {
  SinterClientOptionsError,
  SinterClientStateError,
  SinterConnectionError,
} from "./errors.js";

describe("SinterClient", () => {
  it("connects and completes the protocol handshake", async () => {
    const { server, port } = await startTestServer();
    const client = new SinterClient(`sinterdb://127.0.0.1:${port}/application`);

    try {
      await expect(client.connect()).resolves.toBe(client);

      expect(client.connected).toBe(true);
      expect(client.state).toBe(SinterClientState.Connected);
      expect(client.target.database).toBe("application");
      expect(client.serverInfo).toEqual({
        protocolVersion: PROTOCOL_VERSION,
        product: "sinterdb-test-server",
        productVersion: "0.0.3",
        capabilities: [
          ProtocolCapability.TypedDocuments,
          ProtocolCapability.Streaming,
        ],
      });
    } finally {
      await client.close();
      await stopTestServer(server);
    }
  });

  it("sends the driver identity during the handshake", async () => {
    let clientProduct: string | undefined;
    let clientProductVersion: string | undefined;

    const { server, port } = await startTestServer((handshake) => {
      clientProduct = handshake.product;
      clientProductVersion = handshake.productVersion;
    });

    const client = new SinterClient(`sinterdb://127.0.0.1:${port}`);

    try {
      await client.connect();

      expect(clientProduct).toBe(DRIVER_PRODUCT);
      expect(clientProductVersion).toBe(DRIVER_PRODUCT_VERSION);
    } finally {
      await client.close();
      await stopTestServer(server);
    }
  });

  it("shares an in-progress connection attempt", async () => {
    const { server, port } = await startTestServer();
    const client = new SinterClient(`sinterdb://127.0.0.1:${port}`);

    try {
      const first = client.connect();
      const second = client.connect();

      expect(second).toBe(first);

      await first;
      expect(client.connected).toBe(true);
    } finally {
      await client.close();
      await stopTestServer(server);
    }
  });

  it("clears server information when closed", async () => {
    const { server, port } = await startTestServer();
    const client = new SinterClient(`sinterdb://127.0.0.1:${port}`);

    await client.connect();
    expect(client.serverInfo).toBeDefined();

    await client.close();

    expect(client.serverInfo).toBeUndefined();
    expect(client.state).toBe(SinterClientState.Closed);

    await stopTestServer(server);
  });

  it("allows repeated close calls", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1");

    await client.close();
    await client.close();

    expect(client.state).toBe(SinterClientState.Closed);
  });

  it("rejects reconnecting a closed client", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1");

    await client.close();

    await expect(client.connect()).rejects.toBeInstanceOf(
      SinterClientStateError,
    );
  });

  it("wraps TCP connection failures", async () => {
    const { server, port } = await startTestServer();
    await stopTestServer(server);

    const client = new SinterClient(`sinterdb://127.0.0.1:${port}`);

    await expect(client.connect()).rejects.toBeInstanceOf(
      SinterConnectionError,
    );

    expect(client.state).toBe(SinterClientState.New);
  });

  it("uses the default connection timeout", () => {
    const client = new SinterClient("sinterdb://127.0.0.1");

    expect(client.connectTimeoutMS).toBe(DEFAULT_CONNECT_TIMEOUT_MS);
  });

  it("accepts a custom connection timeout", () => {
    const client = new SinterClient("sinterdb://127.0.0.1", {
      connectTimeoutMS: 2_500,
    });

    expect(client.connectTimeoutMS).toBe(2_500);
  });

  it.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY, 2_147_483_648])(
    "rejects the invalid connection timeout %s",
    (connectTimeoutMS) => {
      expect(
        () =>
          new SinterClient("sinterdb://127.0.0.1", {
            connectTimeoutMS,
          }),
      ).toThrow(SinterClientOptionsError);
    },
  );
});

interface TestClientHandshake {
  readonly product: string;
  readonly productVersion: string;
}

async function startTestServer(
  onHandshake?: (handshake: TestClientHandshake) => void,
): Promise<{
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

        onHandshake?.({
          product: message.payload.product,
          productVersion: message.payload.productVersion,
        });

        socket.write(
          encodeMessage({
            kind: MessageKind.Handshake,
            requestId: message.requestId,
            payload: {
              role: HandshakeRole.Server,
              protocolVersion: PROTOCOL_VERSION,
              product: "sinterdb-test-server",
              productVersion: "0.0.3",
              capabilities: [
                ProtocolCapability.TypedDocuments,
                ProtocolCapability.Streaming,
              ],
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
