import { connect, createServer, type Socket } from "node:net";

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
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandDispatcher } from "./command-dispatcher.js";
import { ServerSession } from "./session.js";
import { SinterServer, type SinterServerAddress } from "./server.js";

describe("server protocol sessions", () => {
  let server: SinterServer | undefined;
  let client: Socket | undefined;

  afterEach(async () => {
    client?.destroy();
    await server?.stop();
  });

  it("completes a client handshake", async () => {
    ({ server, client } = await startConnectedServer());

    const response = await exchange(client, {
      kind: MessageKind.Handshake,
      requestId: 1,
      payload: {
        role: HandshakeRole.Client,
        protocolVersion: PROTOCOL_VERSION,
        product: "sinterdb-test-client",
        productVersion: "0.0.3",
        capabilities: [ProtocolCapability.TypedDocuments],
      },
    });

    expect(response.kind).toBe(MessageKind.Handshake);
    expect(response.requestId).toBe(1);

    if (response.kind === MessageKind.Handshake) {
      expect(response.payload.role).toBe(HandshakeRole.Server);
      expect(response.payload.protocolVersion).toBe(PROTOCOL_VERSION);
      expect(response.payload.product).toBe("sinterdb-server");
    }
  });

  it("responds to ping after the handshake", async () => {
    ({ server, client } = await startConnectedServer());

    await performHandshake(client);

    const sentAt = new Date("2026-09-18T00:00:00.000Z");
    const response = await exchange(client, {
      kind: MessageKind.Ping,
      requestId: 2,
      payload: {
        sentAt,
      },
    });

    expect(response.kind).toBe(MessageKind.Result);
    expect(response.requestId).toBe(2);

    if (response.kind === MessageKind.Result) {
      expect(response.payload.value).toMatchObject({
        ok: true,
        sentAt,
      });
    }
  });

  it("rejects requests sent before the handshake", async () => {
    ({ server, client } = await startConnectedServer());

    const response = await exchange(client, {
      kind: MessageKind.Ping,
      requestId: 1,
      payload: {
        sentAt: new Date(),
      },
    });

    expect(response.kind).toBe(MessageKind.Error);

    if (response.kind === MessageKind.Error) {
      expect(response.payload.code).toBe(WireErrorCode.InvalidRequest);
    }
  });

  it("rejects an unsupported handshake protocol version", async () => {
    ({ server, client } = await startConnectedServer());

    const response = await exchange(client, {
      kind: MessageKind.Handshake,
      requestId: 1,
      payload: {
        role: HandshakeRole.Client,
        protocolVersion: PROTOCOL_VERSION + 1,
        product: "sinterdb-test-client",
        productVersion: "0.0.3",
        capabilities: [],
      },
    });

    expect(response.kind).toBe(MessageKind.Error);

    if (response.kind === MessageKind.Error) {
      expect(response.payload.code).toBe(
        WireErrorCode.UnsupportedProtocolVersion,
      );
    }
  });

  it("executes catalog commands over the wire", async () => {
    ({ server, client } = await startConnectedServer());

    await performHandshake(client);

    const createResponse = await exchange(client, {
      kind: MessageKind.Command,
      requestId: 2,
      payload: {
        command: "createCollection",
        database: "app",
        parameters: {
          name: "users",
        },
      },
    });

    expect(createResponse.kind).toBe(MessageKind.Result);

    if (createResponse.kind === MessageKind.Result) {
      expect(createResponse.payload.value).toEqual({
        database: "app",
        collection: "users",
        created: true,
      });
    }

    expect(server.catalog.hasCollection("app", "users")).toBe(true);

    const listResponse = await exchange(client, {
      kind: MessageKind.Command,
      requestId: 3,
      payload: {
        command: "listCollections",
        database: "app",
        parameters: {},
      },
    });

    expect(listResponse.kind).toBe(MessageKind.Result);

    if (listResponse.kind === MessageKind.Result) {
      expect(listResponse.payload.value).toEqual({
        database: "app",
        collections: ["users"],
      });
    }
  });

  it("keeps running when a client resets its connection", async () => {
    server = new SinterServer({ port: 0 }, {});

    const fatal = vi.fn();
    const connectionErrors: Error[] = [];

    server.on("error", fatal);
    server.on("connectionError", (error: Error) => {
      connectionErrors.push(error);
    });

    const address = await server.start();
    const resetting = await connectClient(address);

    resetting.on("error", () => undefined);
    resetting.write(Buffer.from("this is not the SinterDB protocol"));
    await new Promise((resolve) => setTimeout(resolve, 50));
    resetting.resetAndDestroy();
    await new Promise((resolve) => setTimeout(resolve, 100));

    // A broken connection is not a server failure.
    expect(fatal).not.toHaveBeenCalled();

    // Other clients are served as before.
    client = await connectClient(address);
    await performHandshake(client);

    const response = await exchange(client, {
      kind: MessageKind.Ping,
      requestId: 2,
      payload: { sentAt: new Date() },
    });

    expect(response.kind).toBe(MessageKind.Result);
  });

  it("answers ResultTooLarge when a result does not fit in a message", async () => {
    const onError = vi.fn();
    const dispatcher = {
      dispatch: (): { text: string } => ({ text: "x".repeat(17 << 20) }),
    } as unknown as CommandDispatcher;
    const listener = createServer((socket) => {
      new ServerSession(socket, { dispatcher, onError });
    });

    await new Promise<void>((resolve) => {
      listener.listen(0, "127.0.0.1", resolve);
    });

    try {
      const address = listener.address();

      if (address === null || typeof address === "string") {
        throw new Error("Expected a TCP address.");
      }

      client = await connectClient({
        host: "127.0.0.1",
        port: address.port,
        family: "IPv4",
      });
      await performHandshake(client);

      const response = await exchange(client, {
        kind: MessageKind.Command,
        requestId: 2,
        payload: { command: "find", database: "app", parameters: {} },
      });

      expect(response.kind).toBe(MessageKind.Error);

      if (response.kind === MessageKind.Error) {
        expect(response.payload.name).toBe("ResultTooLarge");
        expect(response.payload.code).toBe(WireErrorCode.InternalError);
      }

      // Not a bug in the server, so nothing is reported as fatal, and the
      // connection still works.
      expect(onError).not.toHaveBeenCalled();

      const ping = await exchange(client, {
        kind: MessageKind.Ping,
        requestId: 3,
        payload: { sentAt: new Date() },
      });

      expect(ping.kind).toBe(MessageKind.Result);
    } finally {
      client?.destroy();
      await new Promise((resolve) => listener.close(resolve));
    }
  });
});

async function startConnectedServer(): Promise<{
  server: SinterServer;
  client: Socket;
}> {
  const server = new SinterServer({ port: 0 }, {});
  const address = await server.start();
  const client = await connectClient(address);

  return {
    server,
    client,
  };
}

async function performHandshake(client: Socket): Promise<void> {
  const response = await exchange(client, {
    kind: MessageKind.Handshake,
    requestId: 1,
    payload: {
      role: HandshakeRole.Client,
      protocolVersion: PROTOCOL_VERSION,
      product: "sinterdb-test-client",
      productVersion: "0.0.3",
      capabilities: [],
    },
  });

  expect(response.kind).toBe(MessageKind.Handshake);
}

async function exchange(
  socket: Socket,
  input: Parameters<typeof encodeMessage>[0],
): Promise<DecodedMessage> {
  const response = readMessage(socket);

  socket.write(encodeMessage(input));

  return await response;
}

async function readMessage(socket: Socket): Promise<DecodedMessage> {
  const decoder = new MessageStreamDecoder();

  return await new Promise<DecodedMessage>((resolve, reject) => {
    const handleData = (chunk: Uint8Array): void => {
      try {
        const messages = decoder.push(chunk);
        const message = messages[0];

        if (message === undefined) {
          return;
        }

        cleanup();
        resolve(message);
      } catch (error: unknown) {
        cleanup();
        reject(error);
      }
    };

    const handleClose = (): void => {
      cleanup();
      reject(new Error("Connection closed before receiving a response."));
    };

    const cleanup = (): void => {
      socket.off("data", handleData);
      socket.off("close", handleClose);
    };

    socket.on("data", handleData);
    socket.once("close", handleClose);
  });
}

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
