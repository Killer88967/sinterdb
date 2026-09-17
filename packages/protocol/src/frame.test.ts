import { describe, expect, it } from "vitest";

import {
  FRAME_HEADER_SIZE,
  PROTOCOL_VERSION,
  FrameFlag,
  FrameOffset,
  MessageKind,
} from "./constants.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import { decodeFrame, encodeFrame } from "./frame.js";

describe("frame encoding", () => {
  it("round-trips a binary frame", () => {
    const payload = new TextEncoder().encode('{"ping":true}');

    const encoded = encodeFrame({
      kind: MessageKind.Request,
      flags: FrameFlag.None,
      requestId: 42,
      payload,
    });

    const decoded = decodeFrame(encoded);

    expect(decoded).toEqual({
      version: PROTOCOL_VERSION,
      kind: MessageKind.Request,
      flags: FrameFlag.None,
      requestId: 42,
      payload,
    });
  });

  it("writes integers in network byte order", () => {
    const encoded = encodeFrame({
      kind: MessageKind.Request,
      requestId: 0x01020304,
      payload: new Uint8Array([1, 2, 3]),
    });

    const view = new DataView(
      encoded.buffer,
      encoded.byteOffset,
      encoded.byteLength,
    );

    expect(view.getUint16(FrameOffset.Version)).toBe(PROTOCOL_VERSION);
    expect(view.getUint32(FrameOffset.RequestId)).toBe(0x01020304);
    expect(view.getUint32(FrameOffset.PayloadLength)).toBe(3);
    expect(encoded.byteLength).toBe(FRAME_HEADER_SIZE + 3);
  });
});

describe("frame decoding", () => {
  it("rejects an invalid protocol signature", () => {
    const encoded = encodeFrame({
      kind: MessageKind.Request,
      requestId: 1,
      payload: new Uint8Array(),
    });

    encoded[0] = 0;

    expectProtocolError(
      () => decodeFrame(encoded),
      ProtocolErrorCode.InvalidMagic,
    );
  });

  it("rejects unsupported protocol versions", () => {
    const encoded = encodeFrame({
      kind: MessageKind.Request,
      requestId: 1,
      payload: new Uint8Array(),
    });

    const view = new DataView(
      encoded.buffer,
      encoded.byteOffset,
      encoded.byteLength,
    );

    view.setUint16(FrameOffset.Version, PROTOCOL_VERSION + 1);

    expectProtocolError(
      () => decodeFrame(encoded),
      ProtocolErrorCode.UnsupportedVersion,
    );
  });

  it("rejects incomplete payloads", () => {
    const encoded = encodeFrame({
      kind: MessageKind.Request,
      requestId: 1,
      payload: new Uint8Array([1, 2, 3]),
    });

    const incomplete = encoded.slice(0, encoded.byteLength - 1);

    expectProtocolError(
      () => decodeFrame(incomplete),
      ProtocolErrorCode.IncompleteFrame,
    );
  });

  it("rejects trailing bytes", () => {
    const encoded = encodeFrame({
      kind: MessageKind.Response,
      requestId: 1,
      payload: new Uint8Array(),
    });

    const oversized = new Uint8Array(encoded.byteLength + 1);
    oversized.set(encoded);

    expectProtocolError(
      () => decodeFrame(oversized),
      ProtocolErrorCode.PayloadLengthMismatch,
    );
  });
});

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
