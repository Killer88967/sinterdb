import { describe, expect, it } from "vitest";

import { CustomId } from "./custom-id.js";
import {
  MAX_DOCUMENT_DEPTH,
  ValueTag,
  type Document,
  type DocumentValue,
} from "./document.js";

describe("document value model", () => {
  it("defines stable binary type tags", () => {
    expect(ValueTag).toEqual({
      Null: 0x00,
      False: 0x01,
      True: 0x02,
      Int32: 0x03,
      Int64: 0x04,
      Float64: 0x05,
      BigInt64: 0x06,
      String: 0x07,
      Binary: 0x08,
      DateTime: 0x09,
      Array: 0x0a,
      Document: 0x0b,
      CustomId: 0x0c,
    });
  });

  it("assigns a unique byte to every value type", () => {
    const tags = Object.values(ValueTag);

    expect(new Set(tags).size).toBe(tags.length);
  });

  it("supports nested typed documents", () => {
    const value: Document = {
      nullValue: null,
      booleanValue: true,
      integerValue: 42,
      floatValue: 3.14,
      bigintValue: 42n,
      stringValue: "SinterDB",
      dateValue: new Date("2026-09-17T00:00:00.000Z"),
      binaryValue: new Uint8Array([1, 2, 3]),
      customIdValue: CustomId.fromHexString("00112233445566778899aabbccddeeff"),
      arrayValue: [1, "two", false],
      documentValue: {
        nested: true,
      },
    };

    const documentValue: DocumentValue = value;

    expect(documentValue).toBe(value);
  });

  it("limits nesting depth", () => {
    expect(MAX_DOCUMENT_DEPTH).toBe(100);
  });
});
