import { once } from "node:events";
import { createServer, type AddressInfo, type Server } from "node:net";

import { describe, expect, it } from "vitest";

import { SinterClient, SinterClientState } from "./client.js";
import { SinterClientStateError, SinterConnectionError } from "./errors.js";

describe("SinterClient", () => {
  it("connects to a TCP server", async () => {
    const { server, port } = await startTestServer();
    const client = new SinterClient(`sinterdb://127.0.0.1:${port}/application`);

    try {
      await expect(client.connect()).resolves.toBe(client);

      expect(client.connected).toBe(true);
      expect(client.state).toBe(SinterClientState.Connected);
      expect(client.target.database).toBe("application");
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
});

async function startTestServer(): Promise<{
  server: Server;
  port: number;
}> {
  const server = createServer();

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
