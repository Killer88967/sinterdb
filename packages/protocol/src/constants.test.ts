import { describe, expect, it } from "vitest";

import {
  FRAME_HEADER_SIZE,
  MAX_PAYLOAD_SIZE,
  PROTOCOL_MAGIC,
  PROTOCOL_VERSION,
  FrameFlag,
  FrameOffset,
  MessageKind,
} from "./constants.js";

describe("protocol constants", () => {
  it("uses the SNTR protocol signature", () => {
    const signature = new TextDecoder().decode(Uint8Array.from(PROTOCOL_MAGIC));

    expect(signature).toBe("SNTR");
  });

  it("defines a 16-byte frame header", () => {
    expect(FRAME_HEADER_SIZE).toBe(16);
    expect(FrameOffset.PayloadLength + 4).toBe(FRAME_HEADER_SIZE);
  });

  it("starts at protocol version 1", () => {
    expect(PROTOCOL_VERSION).toBe(1);
  });

  it("limits individual payloads to 16 MiB", () => {
    expect(MAX_PAYLOAD_SIZE).toBe(16_777_216);
  });

  it("assigns unique message kinds", () => {
    expect(new Set(Object.values(MessageKind)).size).toBe(
      Object.values(MessageKind).length,
    );
  });

  it("assigns stable message kind values", () => {
    expect(MessageKind).toEqual({
      Handshake: 0x01,
      Ping: 0x02,
      Command: 0x03,
      Result: 0x04,
      StreamItem: 0x05,
      StreamEnd: 0x06,
      Error: 0x07,
    });
  });

  it("reserves the first flag bit for continuation frames", () => {
    expect(FrameFlag.None).toBe(0);
    expect(FrameFlag.More).toBe(1);
  });
});
