import { describe, expect, it } from "vitest";

import { MAX_REQUEST_ID, MIN_REQUEST_ID } from "./constants.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import { RequestIdGenerator } from "./request-id.js";

describe("RequestIdGenerator", () => {
  it("generates increasing request IDs", () => {
    const generator = new RequestIdGenerator();

    expect(generator.next()).toBe(1);
    expect(generator.next()).toBe(2);
    expect(generator.next()).toBe(3);
  });

  it("supports a custom initial request ID", () => {
    const generator = new RequestIdGenerator(42);

    expect(generator.next()).toBe(42);
    expect(generator.next()).toBe(43);
  });

  it("wraps to the minimum request ID", () => {
    const generator = new RequestIdGenerator(MAX_REQUEST_ID);

    expect(generator.next()).toBe(MAX_REQUEST_ID);
    expect(generator.next()).toBe(MIN_REQUEST_ID);
  });

  it.each([0, -1, 1.5, MAX_REQUEST_ID + 1])(
    "rejects invalid initial request ID %s",
    (initialValue) => {
      expectProtocolError(
        () => new RequestIdGenerator(initialValue),
        ProtocolErrorCode.InvalidRequestId,
      );
    },
  );
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
