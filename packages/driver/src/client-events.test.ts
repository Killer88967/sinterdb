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

import { SinterClient } from "./client.js";
import { SinterConnectionError } from "./errors.js";

describe("SinterClient events", () => {
  it("emits connecting, connected, and closed in order", async () => {
    const { server, port } = await startTestServer();
    const client = new SinterClient(`sinterdb://127.0.0.1:${port}`);
    const events: string[] = [];

    client.on("connecting", (eventClient) => {
      expect(eventClient).toBe(client);
      events.push("connecting");
    });

    client.on("connected", (eventClient) => {
      expect(eventClient).toBe(client);
      events.push("connected");
    });

    client.on("closed", (eventClient) => {
      expect(eventClient).toBe(client);
      events.push("closed");
    });

    try {
      await client.connect();
      await client.close();

      expect(events).toEqual(["connecting", "connected", "closed"]);
    } finally {
      await client.close();
      await stopTestServer(server);
    }
  });

  it("emits connection errors when an error listener exists", async () => {
    const { server, port } = await startTestServer();
    await stopTestServer(server);

    const client = new SinterClient(`sinterdb://127.0.0.1:${port}`);

    const errors: Error[] = [];

    client.on("error", (error) => {
      errors.push(error);
    });

    await expect(client.connect()).rejects.toBeInstanceOf(
      SinterConnectionError,
    );

    expect(errors).toHaveLength(1);
    expect(errors[0]).toBeInstanceOf(SinterConnectionError);
  });

  it("does not emit closed more than once", async () => {
    const client = new SinterClient("sinterdb://127.0.0.1");
    let closedCount = 0;

    client.on("closed", () => {
      closedCount += 1;
    });

    await client.close();
    await client.close();

    expect(closedCount).toBe(1);
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
