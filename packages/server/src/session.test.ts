import { connect, type Socket } from "node:net";

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
import { afterEach, describe, expect, it } from "vitest";

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
