import { mkdtempSync, rmSync } from "node:fs";
import { connect, type Socket } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { StorageEngine } from "@sinterdb-internal/storage";
import {
  encodeMessage,
  HandshakeRole,
  MessageKind,
  MessageStreamDecoder,
  PROTOCOL_VERSION,
  type DecodedMessage,
} from "sinterdb-protocol";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SinterServer } from "./server.js";

let directory: string;
let server: SinterServer | undefined;
let client: Socket | undefined;

beforeEach(() => {
  directory = mkdtempSync(join(tmpdir(), "sinterdb-group-commit-"));
});

afterEach(async () => {
  client?.destroy();
  client = undefined;
  await server?.stop();
  server = undefined;
  vi.restoreAllMocks();
  rmSync(directory, { recursive: true, force: true });
});

async function connectClient(
  target: SinterServer,
): Promise<{ socket: Socket; messages: DecodedMessage[] }> {
  const address = target.address;

  if (address === undefined) {
    throw new Error("The server is not listening.");
  }

  const socket = connect({ host: address.host, port: address.port });
  const decoder = new MessageStreamDecoder();
  const messages: DecodedMessage[] = [];

  socket.on("data", (chunk: Buffer) => {
    messages.push(...decoder.push(chunk));
  });
  await new Promise<void>((resolve) => socket.once("connect", resolve));

  client = socket;

  socket.write(
    encodeMessage({
      kind: MessageKind.Handshake,
      requestId: 1,
      payload: {
        role: HandshakeRole.Client,
        protocolVersion: PROTOCOL_VERSION,
        product: "test",
        productVersion: "0.0.0",
        capabilities: [],
      },
    }),
  );
  await waitFor(() => messages.length === 1);
  messages.length = 0;

  return { socket, messages };
}

async function waitFor(condition: () => boolean): Promise<void> {
  const deadline = Date.now() + 5_000;

  while (!condition()) {
    if (Date.now() > deadline) {
      throw new Error("Timed out waiting for the condition.");
    }

    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}

function insert(requestId: number): Uint8Array {
  return encodeMessage({
    kind: MessageKind.Command,
    requestId,
    payload: {
      command: "insertOne",
      database: "app",
      parameters: { collection: "things", document: { n: requestId } },
    },
  });
}

describe("group commit in the server", () => {
  it("shares flushes between pipelined writes and loses none", async () => {
    const commit = vi.spyOn(StorageEngine.prototype, "commit");

    server = new SinterServer({ port: 0, dataDirectory: directory }, {});
    await server.start();

    const { socket, messages } = await connectClient(server);
    const count = 50;
    const writes: Uint8Array[] = [];

    for (let index = 0; index < count; index += 1) {
      writes.push(insert(index + 2));
    }

    socket.write(Buffer.concat(writes));
    await waitFor(() => messages.length === count);

    expect(messages.every((m) => m.kind === MessageKind.Result)).toBe(true);
    expect(messages.map((m) => m.requestId)).toEqual(
      Array.from({ length: count }, (_, index) => index + 2),
    );
    expect(commit.mock.calls.length).toBeGreaterThanOrEqual(1);
    expect(commit.mock.calls.length).toBeLessThan(count);

    socket.destroy();
    await server.stop();
    server = undefined;

    const engine = StorageEngine.open({ directory });

    try {
      expect(engine.getCollection("app", "things")?.documentCount).toBe(count);
    } finally {
      engine.close();
    }
  });

  it("does not defer flushes for the journaled write concern", async () => {
    const commit = vi.spyOn(StorageEngine.prototype, "commit");

    server = new SinterServer(
      { port: 0, dataDirectory: directory, writeConcern: "journaled" },
      {},
    );
    await server.start();

    const { socket, messages } = await connectClient(server);

    socket.write(Buffer.from(insert(2)));
    await waitFor(() => messages.length === 1);

    expect(messages[0]?.kind).toBe(MessageKind.Result);
    expect(commit).not.toHaveBeenCalled();
  });
});
