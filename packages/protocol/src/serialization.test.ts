import { describe, expect, it } from "vitest";

import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import { decodeJsonPayload, encodeJsonPayload } from "./serialization.js";

describe("JSON payload serialization", () => {
  it("round-trips structured data", () => {
    const value = {
      command: "ping",
      sequence: 42,
      active: true,
      metadata: {
        source: "driver",
      },
      values: [1, 2, 3],
    };

    const payload = encodeJsonPayload(value);
    const decoded = decodeJsonPayload(payload);

    expect(decoded).toEqual(value);
  });

  it("encodes payloads as UTF-8", () => {
    const value = {
      database: "日本語",
      message: "Hello, SinterDB!",
    };

    const payload = encodeJsonPayload(value);

    expect(new TextDecoder().decode(payload)).toBe(JSON.stringify(value));
    expect(decodeJsonPayload(payload)).toEqual(value);
  });

  it("rejects values without a JSON representation", () => {
    expectProtocolError(
      () => encodeJsonPayload(undefined),
      ProtocolErrorCode.SerializationFailure,
    );
  });

  it("rejects circular objects", () => {
    const value: { self?: unknown } = {};
    value.self = value;

    expectProtocolError(
      () => encodeJsonPayload(value),
      ProtocolErrorCode.SerializationFailure,
    );
  });

  it("rejects malformed JSON", () => {
    const payload = new TextEncoder().encode('{"incomplete":');

    expectProtocolError(
      () => decodeJsonPayload(payload),
      ProtocolErrorCode.SerializationFailure,
    );
  });

  it("rejects invalid UTF-8", () => {
    const payload = new Uint8Array([0xff, 0xfe]);

    expectProtocolError(
      () => decodeJsonPayload(payload),
      ProtocolErrorCode.SerializationFailure,
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
