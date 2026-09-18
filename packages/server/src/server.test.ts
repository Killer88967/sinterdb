import { connect, type Socket } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import {
  ServerLifecycleError,
  SinterServer,
  SinterServerState,
  type SinterServerAddress,
} from "./server.js";

describe("SinterServer", () => {
  let server: SinterServer | undefined;
  const clients: Socket[] = [];

  afterEach(async () => {
    for (const client of clients) {
      client.destroy();
    }

    clients.length = 0;

    await server?.stop();
  });

  it("starts on a temporary port", async () => {
    server = new SinterServer({ port: 0 }, {});

    const address = await server.start();

    expect(address.port).toBeGreaterThan(0);
    expect(server.address).toEqual(address);
    expect(server.state).toBe(SinterServerState.Running);
  });

  it("accepts multiple TCP connections", async () => {
    server = new SinterServer({ port: 0 }, {});
    const address = await server.start();

    clients.push(await connectClient(address), await connectClient(address));

    await waitFor(() => server?.activeConnectionCount === 2);

    expect(server.activeConnectionCount).toBe(2);
  });

  it("closes active connections when stopped", async () => {
    server = new SinterServer({ port: 0 }, {});
    const address = await server.start();
    const client = await connectClient(address);

    clients.push(client);

    const clientClosed = waitForSocketClose(client);

    await server.stop();
    await clientClosed;

    expect(server.state).toBe(SinterServerState.Stopped);
    expect(server.address).toBeUndefined();
    expect(server.activeConnectionCount).toBe(0);
  });

  it("can be restarted after stopping", async () => {
    server = new SinterServer({ port: 0 }, {});

    const firstAddress = await server.start();
    await server.stop();
    const secondAddress = await server.start();

    expect(firstAddress.port).toBeGreaterThan(0);
    expect(secondAddress.port).toBeGreaterThan(0);
    expect(server.state).toBe(SinterServerState.Running);
  });

  it("rejects starting an already-running server", async () => {
    server = new SinterServer({ port: 0 }, {});
    await server.start();

    await expect(server.start()).rejects.toBeInstanceOf(ServerLifecycleError);
  });

  it("allows repeated stop calls after shutdown", async () => {
    server = new SinterServer({ port: 0 }, {});

    await server.start();
    await server.stop();
    await server.stop();

    expect(server.state).toBe(SinterServerState.Stopped);
  });
});

async function connectClient(address: SinterServerAddress): Promise<Socket> {
  return await new Promise<Socket>((resolve, reject) => {
    const socket = connect({
      host: address.host,
      port: address.port,
    });

    socket.once("connect", () => {
      socket.off("error", reject);
      resolve(socket);
    });

    socket.once("error", reject);
  });
}

async function waitForSocketClose(socket: Socket): Promise<void> {
  if (socket.closed) {
    return;
  }

  await new Promise<void>((resolve) => {
    socket.once("close", () => resolve());
  });
}

async function waitFor(
  condition: () => boolean,
  timeoutMilliseconds = 1_000,
): Promise<void> {
  const startedAt = Date.now();

  while (!condition()) {
    if (Date.now() - startedAt >= timeoutMilliseconds) {
      throw new Error("Timed out while waiting for the condition.");
    }

    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}
