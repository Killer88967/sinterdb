import { describe, expect, it } from "vitest";

import { PROTOCOL_VERSION, FrameFlag, MessageKind } from "./constants.js";
import { encodeDocument } from "./document-encoder.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import { encodeFrame } from "./frame.js";
import { decodeMessage, encodeMessage } from "./message-frame.js";

describe("message frames", () => {
  it("round-trips a command message", () => {
    const encoded = encodeMessage({
      kind: MessageKind.Command,
      requestId: 42,
      flags: FrameFlag.None,
      payload: {
        command: "listCollections",
        database: "example",
        parameters: {
          includeSystemCollections: false,
        },
      },
    });

    const decoded = decodeMessage(encoded);

    expect(decoded.version).toBe(PROTOCOL_VERSION);
    expect(decoded.kind).toBe(MessageKind.Command);
    expect(decoded.flags).toBe(FrameFlag.None);
    expect(decoded.requestId).toBe(42);

    if (decoded.kind === MessageKind.Command) {
      expect(decoded.payload).toEqual({
        command: "listCollections",
        database: "example",
        parameters: {
          includeSystemCollections: false,
        },
      });
    }
  });

  it("preserves typed ping timestamps", () => {
    const sentAt = new Date("2026-09-18T00:00:00.000Z");

    const decoded = decodeMessage(
      encodeMessage({
        kind: MessageKind.Ping,
        requestId: 7,
        payload: {
          sentAt,
        },
      }),
    );

    expect(decoded.kind).toBe(MessageKind.Ping);

    if (decoded.kind === MessageKind.Ping) {
      expect(decoded.payload.sentAt).toEqual(sentAt);
    }
  });

  it("supports uncorrelated handshake messages", () => {
    const decoded = decodeMessage(
      encodeMessage({
        kind: MessageKind.Handshake,
        requestId: 0,
        payload: {
          role: "client",
          protocolVersion: PROTOCOL_VERSION,
          product: "sinterdb",
          productVersion: "0.0.2",
          capabilities: ["typed-documents", "streaming"],
        },
      }),
    );

    expect(decoded.requestId).toBe(0);
    expect(decoded.kind).toBe(MessageKind.Handshake);
  });

  it("rejects a payload that does not match its frame kind", () => {
    const encoded = encodeFrame({
      kind: MessageKind.Command,
      requestId: 1,
      payload: encodeDocument({
        sentAt: new Date("2026-09-18T00:00:00.000Z"),
      }),
    });

    expectProtocolError(
      () => decodeMessage(encoded),
      ProtocolErrorCode.InvalidMessagePayload,
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
