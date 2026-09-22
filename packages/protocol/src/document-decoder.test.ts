import { describe, expect, it } from "vitest";

import { decodeDocument, decodeDocumentValue } from "./document-decoder.js";
import { encodeDocument, encodeDocumentValue } from "./document-encoder.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import { MAX_DOCUMENT_DEPTH, ValueTag } from "./document.js";

describe("document decoding", () => {
  it("decodes the simple-document golden bytes", () => {
    const encoded = new Uint8Array([
      0x0b, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x61, 0x03, 0x00,
      0x00, 0x00, 0x01,
    ]);

    expect(decodeDocument(encoded)).toEqual({
      a: 1,
    });
  });

  it("round-trips every supported value type", () => {
    const original = {
      nullValue: null,
      falseValue: false,
      trueValue: true,
      int32Value: 42,
      int64Value: Number.MAX_SAFE_INTEGER,
      floatValue: 3.14,
      negativeZero: -0,
      nanValue: Number.NaN,
      infinityValue: Number.POSITIVE_INFINITY,
      bigintValue: 42n,
      stringValue: "SinterDB",
      binaryValue: new Uint8Array([1, 2, 3]),
      dateValue: new Date("2026-09-17T00:00:00.000Z"),
      arrayValue: [1, "two", false],
      documentValue: {
        nested: true,
      },
    };

    const decoded = decodeDocument(encodeDocument(original));

    expect(decoded).toEqual(original);
    expect(Object.is(decoded["negativeZero"], -0)).toBe(true);
    expect(Number.isNaN(decoded["nanValue"])).toBe(true);
  });

  it("round-trips standalone values", () => {
    expect(decodeDocumentValue(encodeDocumentValue(42n))).toBe(42n);
    expect(
      decodeDocumentValue(encodeDocumentValue(new Uint8Array([4, 5, 6]))),
    ).toEqual(new Uint8Array([4, 5, 6]));
  });

  it("rejects truncated values", () => {
    const encoded = encodeDocument({
      value: "test",
    });

    expectProtocolError(
      () => decodeDocument(encoded.slice(0, -1)),
      ProtocolErrorCode.UnexpectedEnd,
    );
  });

  it("rejects unknown value tags", () => {
    expectProtocolError(
      () => decodeDocumentValue(new Uint8Array([0xff])),
      ProtocolErrorCode.UnknownValueTag,
    );
  });

  it("rejects trailing data", () => {
    const encoded = encodeDocumentValue(null);
    const payload = new Uint8Array(encoded.byteLength + 1);

    payload.set(encoded);

    expectProtocolError(
      () => decodeDocumentValue(payload),
      ProtocolErrorCode.TrailingData,
    );
  });

  it("rejects non-document roots when a document is required", () => {
    const encoded = encodeDocumentValue(42);

    expectProtocolError(
      () => decodeDocument(encoded),
      ProtocolErrorCode.InvalidDocumentValue,
    );
  });

  it("rejects encoded values beyond the maximum nesting depth", () => {
    const arrayCount = MAX_DOCUMENT_DEPTH + 1;
    const encoded = new Uint8Array(arrayCount * 5 + 1);
    const view = new DataView(encoded.buffer);

    let offset = 0;

    for (let depth = 0; depth < arrayCount; depth += 1) {
      encoded[offset] = ValueTag.Array;
      view.setUint32(offset + 1, 1);
      offset += 5;
    }

    encoded[offset] = ValueTag.Null;

    expectProtocolError(
      () => decodeDocumentValue(encoded),
      ProtocolErrorCode.DocumentTooDeep,
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
