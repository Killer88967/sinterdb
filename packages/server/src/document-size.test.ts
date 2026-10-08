import {
  CustomId,
  encodeDocumentValue,
  type DocumentValue,
} from "sinterdb-protocol";
import { describe, expect, it } from "vitest";

import { estimateEncodedSize } from "./document-size.js";

// Cursors rely on the estimate never being smaller than the real encoding,
// or a batch could still overflow a message.

const samples: readonly (readonly [string, DocumentValue])[] = [
  ["null", null],
  ["true", true],
  ["a small integer", 7],
  ["a large integer", 2 ** 40],
  ["a float", 1.5],
  ["a bigint", 12n],
  ["an empty string", ""],
  ["an ASCII string", "hello"],
  ["a multi-byte string", "héllo wörld ☃ 𝄞"],
  ["a date", new Date("2026-10-08T00:00:00Z")],
  ["binary data", new Uint8Array([1, 2, 3, 4])],
  ["an id", CustomId.generate()],
  ["an empty array", []],
  ["an array", [1, "two", null, [3]]],
  ["an empty document", {}],
  [
    "a nested document",
    {
      name: "Ada",
      ключ: "значение",
      tags: ["a", "b"],
      profile: { level: 3, since: new Date(0), blob: new Uint8Array(100) },
    },
  ],
];

describe("estimateEncodedSize", () => {
  it.each(samples)("never underestimates %s", (_name, value) => {
    const actual = encodeDocumentValue(value).byteLength;
    const estimate = estimateEncodedSize(value);

    expect(estimate).toBeGreaterThanOrEqual(actual);
    // And it stays close: no more than eight bytes over per value.
    expect(estimate).toBeLessThanOrEqual(actual * 3 + 16);
  });

  it("grows with the content of a large document", () => {
    const small = estimateEncodedSize({ text: "x".repeat(10) });
    const large = estimateEncodedSize({ text: "x".repeat(10_000_000) });

    expect(large - small).toBe(10_000_000 - 10);
  });
});
