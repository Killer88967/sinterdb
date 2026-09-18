import { describe, expect, it } from "vitest";

import { MAX_PAYLOAD_SIZE, FrameOffset, MessageKind } from "./constants.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import { encodeMessage } from "./message-frame.js";
import { MessageStreamDecoder } from "./message-stream-decoder.js";

describe("MessageStreamDecoder", () => {
  it("decodes a frame delivered one byte at a time", () => {
    const encoded = createPingMessage(1);
    const decoder = new MessageStreamDecoder();
    const messages = [];

    for (let index = 0; index < encoded.byteLength; index += 1) {
      messages.push(...decoder.push(encoded.slice(index, index + 1)));
    }

    expect(messages).toHaveLength(1);
    expect(messages[0]?.kind).toBe(MessageKind.Ping);
    expect(messages[0]?.requestId).toBe(1);
    expect(decoder.bufferedBytes).toBe(0);
  });

  it("decodes multiple frames from one chunk", () => {
    const first = createPingMessage(1);
    const second = createPingMessage(2);
    const combined = new Uint8Array(first.byteLength + second.byteLength);

    combined.set(first);
    combined.set(second, first.byteLength);

    const decoder = new MessageStreamDecoder();
    const messages = decoder.push(combined);

    expect(messages).toHaveLength(2);
    expect(messages.map((message) => message.requestId)).toEqual([1, 2]);
    expect(decoder.bufferedBytes).toBe(0);
  });

  it("retains an incomplete following frame", () => {
    const first = createPingMessage(1);
    const second = createPingMessage(2);
    const splitAt = Math.floor(second.byteLength / 2);

    const firstChunk = new Uint8Array(first.byteLength + splitAt);

    firstChunk.set(first);
    firstChunk.set(second.slice(0, splitAt), first.byteLength);

    const decoder = new MessageStreamDecoder();
    const firstMessages = decoder.push(firstChunk);

    expect(firstMessages).toHaveLength(1);
    expect(firstMessages[0]?.requestId).toBe(1);
    expect(decoder.bufferedBytes).toBe(splitAt);

    const secondMessages = decoder.push(second.slice(splitAt));

    expect(secondMessages).toHaveLength(1);
    expect(secondMessages[0]?.requestId).toBe(2);
    expect(decoder.bufferedBytes).toBe(0);
  });

  it("can discard buffered partial data", () => {
    const encoded = createPingMessage(1);
    const decoder = new MessageStreamDecoder();

    expect(decoder.push(encoded.slice(0, 5))).toEqual([]);
    expect(decoder.bufferedBytes).toBe(5);

    decoder.reset();

    expect(decoder.bufferedBytes).toBe(0);
  });

  it("rejects oversized payload declarations immediately", () => {
    const encoded = createPingMessage(1);
    const header = encoded.slice(0, 16);
    const view = new DataView(
      header.buffer,
      header.byteOffset,
      header.byteLength,
    );

    view.setUint32(FrameOffset.PayloadLength, MAX_PAYLOAD_SIZE + 1);

    const decoder = new MessageStreamDecoder();

    expectProtocolError(
      () => decoder.push(header),
      ProtocolErrorCode.PayloadTooLarge,
    );
  });
});

function createPingMessage(requestId: number): Uint8Array {
  return encodeMessage({
    kind: MessageKind.Ping,
    requestId,
    payload: {
      sentAt: new Date("2026-09-18T00:00:00.000Z"),
    },
  });
}

function expectProtocolError(
  action: () => unknown,
  expectedCode: ProtocolErrorCode,
): void {
  try {
    action();
  } catch (error: unknown) {
    expect(error).toBeInstanceOf(ProtocolError);

    if (error instanceof ProtocolError) {
      expect(error.code).toBe(expectedCode);
    }

    return;
  }

  throw new Error(`Expected ${expectedCode} to be thrown.`);
}
