import { connect, createServer, type Server, type Socket } from "node:net";

import {
  encodeMessage,
  HandshakeRole,
  MessageKind,
  MessageStreamDecoder,
  PROTOCOL_VERSION,
  type DecodedMessage,
} from "sinterdb-protocol";
import { afterEach, describe, expect, it, vi } from "vitest";

import type { CommandDispatcher } from "./command-dispatcher.js";
import type { DurabilityBarrier } from "./group-commit.js";
import { ServerSession } from "./session.js";

class FakeBarrier implements DurabilityBarrier {
  public hasPending = true;
  public readonly callbacks: ((error?: unknown) => void)[] = [];

  public whenDurable(callback: (error?: unknown) => void): void {
    this.callbacks.push(callback);
  }

  public release(error?: unknown): void {
    this.hasPending = false;

    for (const callback of this.callbacks.splice(0)) {
      callback(error);
    }
  }
}

interface Harness {
  readonly barrier: FakeBarrier;
  readonly onError: ReturnType<typeof vi.fn>;
  readonly messages: DecodedMessage[];
  readonly client: Socket;
  readonly closed: Promise<void>;
}

let listener: Server | undefined;
let client: Socket | undefined;

afterEach(async () => {
  client?.destroy();
  client = undefined;

  if (listener !== undefined) {
    const closing = listener;

    listener = undefined;
    await new Promise((resolve) => closing.close(resolve));
  }
});

async function start(): Promise<Harness> {
  const barrier = new FakeBarrier();
  const onError = vi.fn();
  const dispatcher = {
    dispatch: (): { ok: boolean } => ({ ok: true }),
  } as unknown as CommandDispatcher;

  listener = createServer((socket) => {
    new ServerSession(socket, { dispatcher, durability: barrier, onError });
  });

  await new Promise<void>((resolve) => {
    (listener as Server).listen(0, "127.0.0.1", resolve);
  });

  const address = (listener as Server).address();

  if (address === null || typeof address === "string") {
    throw new Error("Expected a TCP address.");
  }

  const socket = connect({ host: "127.0.0.1", port: address.port });
  const decoder = new MessageStreamDecoder();
  const messages: DecodedMessage[] = [];

  socket.on("data", (chunk: Buffer) => {
    messages.push(...decoder.push(chunk));
  });

  const closed = new Promise<void>((resolve) => {
    socket.once("close", () => resolve());
  });

  await new Promise<void>((resolve) => socket.once("connect", resolve));

  client = socket;

  // The handshake is answered before any write happens, so nothing is held.
  barrier.hasPending = false;
  send(socket, {
    kind: MessageKind.Handshake,
    requestId: 1,
    payload: {
      role: HandshakeRole.Client,
      protocolVersion: PROTOCOL_VERSION,
      product: "test",
      productVersion: "0.0.0",
      capabilities: [],
    },
  });
  await waitFor(() => messages.length === 1);
  messages.length = 0;
  barrier.hasPending = true;

  return { barrier, onError, messages, client: socket, closed };
}

function send(
  socket: Socket,
  input: Parameters<typeof encodeMessage>[0],
): void {
  socket.write(encodeMessage(input));
}

function command(requestId: number): Parameters<typeof encodeMessage>[0] {
  return {
    kind: MessageKind.Command,
    requestId,
    payload: { command: "find", database: "app", parameters: {} },
  };
}

async function waitFor(condition: () => boolean): Promise<void> {
  const deadline = Date.now() + 2_000;

  while (!condition()) {
    if (Date.now() > deadline) {
      throw new Error("Timed out waiting for the condition.");
    }

    await new Promise((resolve) => setTimeout(resolve, 5));
  }
}

const quiet = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 60));

describe("a session with a durability barrier", () => {
  it("holds a reply until the barrier reports the flush", async () => {
    const harness = await start();

    send(harness.client, command(2));
    await waitFor(() => harness.barrier.callbacks.length === 1);
    await quiet();

    expect(harness.messages).toHaveLength(0);

    harness.barrier.release();
    await waitFor(() => harness.messages.length === 1);

    expect(harness.messages[0]?.kind).toBe(MessageKind.Result);
    expect(harness.messages[0]?.requestId).toBe(2);
  });

  it("registers one callback and keeps replies in request order", async () => {
    const harness = await start();

    send(harness.client, command(2));
    send(harness.client, command(3));
    send(harness.client, command(4));
    await waitFor(() => harness.barrier.callbacks.length >= 1);
    await quiet();

    expect(harness.barrier.callbacks).toHaveLength(1);
    expect(harness.messages).toHaveLength(0);

    harness.barrier.release();
    await waitFor(() => harness.messages.length === 3);

    expect(harness.messages.map((message) => message.requestId)).toEqual([
      2, 3, 4,
    ]);
  });

  it("replies at once when nothing is waiting for a flush", async () => {
    const harness = await start();

    harness.barrier.hasPending = false;
    send(harness.client, command(2));
    await waitFor(() => harness.messages.length === 1);

    expect(harness.barrier.callbacks).toHaveLength(0);
  });

  it("drops the connection instead of replying when the flush fails", async () => {
    const harness = await start();

    send(harness.client, command(2));
    await waitFor(() => harness.barrier.callbacks.length === 1);

    harness.barrier.release(new Error("disk failure"));
    await harness.closed;

    expect(harness.messages).toHaveLength(0);
    expect(harness.onError).toHaveBeenCalledOnce();
  });
});
