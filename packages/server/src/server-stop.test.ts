import { connect, type Socket } from "node:net";

import { afterEach, describe, expect, it } from "vitest";

import {
  DEFAULT_STOP_TIMEOUT_MS,
  SinterServer,
  SinterServerState,
  type SinterServerAddress,
} from "./server.js";

describe("SinterServer stop timeout", () => {
  let server: SinterServer | undefined;
  const clients: Socket[] = [];

  afterEach(async () => {
    for (const client of clients) {
      client.destroy();
    }

    clients.length = 0;

    await server?.stop({ timeoutMS: 100 });
  });

  it("uses a five second default timeout", () => {
    expect(DEFAULT_STOP_TIMEOUT_MS).toBe(5_000);
  });

  it("destroys sockets that never close after the timeout", async () => {
    server = new SinterServer({ port: 0 }, {});
    const address = await server.start();

    clients.push(await connectHalfOpenClient(address));

    await waitFor(() => server?.activeConnectionCount === 1);

    const startedAt = Date.now();

    await server.stop({ timeoutMS: 100 });

    expect(Date.now() - startedAt).toBeLessThan(2_000);
    expect(server.state).toBe(SinterServerState.Stopped);
    expect(server.activeConnectionCount).toBe(0);
  });

  it("stops immediately when every client closes on its own", async () => {
    server = new SinterServer({ port: 0 }, {});
    const address = await server.start();

    clients.push(await connectClient(address));

    await waitFor(() => server?.activeConnectionCount === 1);

    const startedAt = Date.now();

    await server.stop({ timeoutMS: 10_000 });

    expect(Date.now() - startedAt).toBeLessThan(2_000);
    expect(server.state).toBe(SinterServerState.Stopped);
  });

  it("rejects an invalid timeout", async () => {
    server = new SinterServer({ port: 0 }, {});
    await server.start();

    for (const timeoutMS of [0, -1, 1.5, Number.NaN]) {
      await expect(server.stop({ timeoutMS })).rejects.toThrow(TypeError);
    }

    expect(server.state).toBe(SinterServerState.Running);
  });
});

function connectClient(address: SinterServerAddress): Promise<Socket> {
  return openSocket(address, false);
}

function connectHalfOpenClient(address: SinterServerAddress): Promise<Socket> {
  return openSocket(address, true);
}

function openSocket(
  address: SinterServerAddress,
  allowHalfOpen: boolean,
): Promise<Socket> {
  return new Promise<Socket>((resolve, reject) => {
    const socket = connect({
      host: address.host,
      port: address.port,
      allowHalfOpen,
    });

    socket.once("connect", () => resolve(socket));
    socket.once("error", reject);
  });
}

async function waitFor(condition: () => boolean): Promise<void> {
  const deadline = Date.now() + 2_000;

  while (!condition()) {
    if (Date.now() > deadline) {
      throw new Error("Timed out waiting for the condition.");
    }

    await new Promise((resolve) => setTimeout(resolve, 10));
  }
}
