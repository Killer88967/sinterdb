import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { MessageKind } from "./constants.js";
import { decodeDocumentValue } from "./document-decoder.js";
import { encodeDocumentValue } from "./document-encoder.js";
import type { DocumentValue } from "./document.js";
import { decodeMessage, encodeMessage } from "./message-frame.js";

interface GoldenFixtures {
  protocolVersion: number;
  byteOrder: string;
  values: Record<string, string>;
  messages: Record<string, string>;
}

const fixturePath = fileURLToPath(
  new URL("../fixtures/protocol-v1.json", import.meta.url),
);

const fixtures = JSON.parse(
  readFileSync(fixturePath, "utf8"),
) as GoldenFixtures;

const valueCases: ReadonlyArray<readonly [name: string, value: DocumentValue]> =
  [
    ["null", null],
    ["false", false],
    ["true", true],
    ["int32-42", 42],
    ["int32-negative-one", -1],
    ["int64-max-safe", Number.MAX_SAFE_INTEGER],
    ["float64-pi", Math.PI],
    ["bigint-42", 42n],
    ["string-sinterdb", "SinterDB"],
    ["binary-010203", new Uint8Array([1, 2, 3])],
    ["unix-epoch", new Date(0)],
    ["array-null-true", [null, true]],
    ["simple-document", { a: 1 }],
  ];

describe("protocol v1 golden fixtures", () => {
  it("describes the current protocol", () => {
    expect(fixtures.protocolVersion).toBe(1);
    expect(fixtures.byteOrder).toBe("big-endian");
  });

  it.each(valueCases)("matches value fixture %s", (name, value) => {
    const expected = hexToBytes(getFixture(fixtures.values, name));

    expect(encodeDocumentValue(value)).toEqual(expected);
    expect(decodeDocumentValue(expected)).toEqual(value);
  });

  it("matches the null-result message fixture", () => {
    const expected = hexToBytes(
      getFixture(fixtures.messages, "result-null-request-1"),
    );

    const encoded = encodeMessage({
      kind: MessageKind.Result,
      requestId: 1,
      payload: {
        value: null,
      },
    });

    expect(encoded).toEqual(expected);

    const decoded = decodeMessage(expected);

    expect(decoded.kind).toBe(MessageKind.Result);
    expect(decoded.requestId).toBe(1);

    if (decoded.kind === MessageKind.Result) {
      expect(decoded.payload).toEqual({
        value: null,
      });
    }
  });
});

function getFixture(values: Record<string, string>, name: string): string {
  const value = values[name];

  if (value === undefined) {
    throw new Error(`Missing golden fixture "${name}".`);
  }

  return value;
}

function hexToBytes(hex: string): Uint8Array {
  if (hex.length % 2 !== 0 || !/^[0-9a-f]*$/iu.test(hex)) {
    throw new Error(`Invalid hexadecimal fixture "${hex}".`);
  }

  const bytes = new Uint8Array(hex.length / 2);

  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }

  return bytes;
}
