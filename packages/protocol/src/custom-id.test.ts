import { describe, expect, it } from "vitest";

import {
  CUSTOM_ID_BYTE_LENGTH,
  CUSTOM_ID_HEX_LENGTH,
  CustomId,
} from "./custom-id.js";

describe("CustomId", () => {
  it("generates a fixed-width identifier", () => {
    const id = CustomId.generate();

    expect(id.toBytes()).toHaveLength(CUSTOM_ID_BYTE_LENGTH);
    expect(id.toHexString()).toHaveLength(CUSTOM_ID_HEX_LENGTH);
    expect(id.toHexString()).toMatch(/^[0-9a-f]{32}$/);
  });

  it("generates distinct identifiers", () => {
    const first = CustomId.generate();
    const second = CustomId.generate();

    expect(first.equals(second)).toBe(false);
    expect(first.toHexString()).not.toBe(second.toHexString());
  });

  it("round-trips through hexadecimal strings", () => {
    const original = CustomId.generate();
    const decoded = CustomId.fromHexString(original.toHexString());

    expect(decoded.equals(original)).toBe(true);
    expect(decoded.toString()).toBe(original.toHexString());
    expect(decoded.toJSON()).toBe(original.toHexString());
  });

  it("accepts uppercase hexadecimal strings", () => {
    const original = CustomId.generate();
    const decoded = CustomId.fromHexString(
      original.toHexString().toUpperCase(),
    );

    expect(decoded.equals(original)).toBe(true);
  });

  it("round-trips through bytes", () => {
    const original = CustomId.generate();
    const decoded = CustomId.fromBytes(original.toBytes());

    expect(decoded.equals(original)).toBe(true);
  });

  it("does not expose mutable internal bytes", () => {
    const id = CustomId.generate();
    const original = id.toHexString();
    const bytes = id.toBytes();

    bytes.fill(0);

    expect(id.toHexString()).toBe(original);
  });

  it("contains its creation timestamp", () => {
    const before = Date.now();
    const id = CustomId.generate();
    const after = Date.now();

    expect(id.timestamp.getTime()).toBeGreaterThanOrEqual(before);
    expect(id.timestamp.getTime()).toBeLessThanOrEqual(after);
  });

  it.each([
    "",
    "00",
    "g".repeat(CUSTOM_ID_HEX_LENGTH),
    "0".repeat(CUSTOM_ID_HEX_LENGTH - 1),
    "0".repeat(CUSTOM_ID_HEX_LENGTH + 1),
  ])("rejects the invalid hexadecimal value %j", (value) => {
    expect(() => CustomId.fromHexString(value)).toThrow(TypeError);
  });

  it("rejects byte arrays with the wrong length", () => {
    expect(() =>
      CustomId.fromBytes(new Uint8Array(CUSTOM_ID_BYTE_LENGTH - 1)),
    ).toThrow(TypeError);
  });
});
