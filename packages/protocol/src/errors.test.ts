import { describe, expect, it } from "vitest";

import { ProtocolError, ProtocolErrorCode } from "./errors.js";

describe("ProtocolError", () => {
  it("contains a stable protocol error code", () => {
    const error = new ProtocolError(
      ProtocolErrorCode.InvalidMagic,
      "Invalid frame signature.",
    );

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(ProtocolError);
    expect(error.name).toBe("ProtocolError");
    expect(error.code).toBe("INVALID_MAGIC");
    expect(error.message).toBe("Invalid frame signature.");
  });

  it("defines unique error codes", () => {
    const codes = Object.values(ProtocolErrorCode);

    expect(new Set(codes).size).toBe(codes.length);
  });
});
