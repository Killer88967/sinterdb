import { describe, expect, it } from "vitest";

import { encodeDocument, encodeDocumentValue } from "./document-encoder.js";
import { type DocumentValue } from "./document.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";

describe("document encoding", () => {
  it("matches the golden bytes for a simple document", () => {
    const encoded = encodeDocument({
      a: 1,
    });

    expect(Array.from(encoded)).toEqual([
      0x0b, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x61, 0x03, 0x00,
      0x00, 0x00, 0x01,
    ]);
  });

  it("sorts document keys deterministically", () => {
    const first = encodeDocument({
      z: 1,
      a: 2,
    });

    const second = encodeDocument({
      a: 2,
      z: 1,
    });

    expect(first).toEqual(second);
  });

  it("uses separate number and bigint encodings", () => {
    const numberValue = encodeDocumentValue(42);
    const bigintValue = encodeDocumentValue(42n);

    expect(numberValue).not.toEqual(bigintValue);
  });

  it("preserves negative zero as a floating-point value", () => {
    const positiveZero = encodeDocumentValue(0);
    const negativeZero = encodeDocumentValue(-0);

    expect(positiveZero).not.toEqual(negativeZero);
  });

  it("rejects invalid dates", () => {
    expectProtocolError(
      () => encodeDocumentValue(new Date(Number.NaN)),
      ProtocolErrorCode.InvalidDate,
    );
  });

  it("rejects bigint values outside the signed 64-bit range", () => {
    expectProtocolError(
      () => encodeDocumentValue(2n ** 63n),
      ProtocolErrorCode.IntegerOutOfRange,
    );
  });

  it("rejects cyclic documents", () => {
    const document: { self?: DocumentValue } = {};
    document.self = document;

    expectProtocolError(
      () => encodeDocument(document),
      ProtocolErrorCode.CyclicDocument,
    );
  });

  it("rejects unsupported runtime values", () => {
    const invalidValue = undefined as unknown as DocumentValue;

    expectProtocolError(
      () => encodeDocumentValue(invalidValue),
      ProtocolErrorCode.InvalidDocumentValue,
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
