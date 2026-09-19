import { describe, expect, it } from "vitest";

import { MessageKind, PROTOCOL_VERSION } from "./constants.js";
import { encodeDocument } from "./document-encoder.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import { decodeMessagePayload, encodeMessagePayload } from "./message-codec.js";
import { HandshakeRole, ProtocolCapability } from "./messages.js";

describe("message payload codec", () => {
  it("round-trips handshake payloads", () => {
    const payload = {
      role: HandshakeRole.Client,
      protocolVersion: PROTOCOL_VERSION,
      product: "sinterdb",
      productVersion: "0.0.3",
      capabilities: [
        ProtocolCapability.TypedDocuments,
        ProtocolCapability.Streaming,
        "future-capability",
      ],
    };

    const decoded = decodeMessagePayload(
      MessageKind.Handshake,
      encodeMessagePayload(MessageKind.Handshake, payload),
    );

    expect(decoded).toEqual(payload);
  });

  it("round-trips command payloads", () => {
    const payload = {
      command: "listCollections",
      database: "example",
      parameters: {
        includeSystemCollections: false,
      },
    };

    const decoded = decodeMessagePayload(
      MessageKind.Command,
      encodeMessagePayload(MessageKind.Command, payload),
    );

    expect(decoded).toEqual(payload);
  });

  it("rejects malformed command payloads while encoding", () => {
    expectProtocolError(
      () =>
        encodeMessagePayload(MessageKind.Command, {
          command: "",
          parameters: {},
        }),
      ProtocolErrorCode.InvalidMessagePayload,
    );
  });

  it("rejects malformed command payloads while decoding", () => {
    const encoded = encodeDocument({
      command: "ping",
      parameters: "not-a-document",
    });

    expectProtocolError(
      () => decodeMessagePayload(MessageKind.Command, encoded),
      ProtocolErrorCode.InvalidMessagePayload,
    );
  });

  it("requires result payloads to contain a value", () => {
    const encoded = encodeDocument({});

    expectProtocolError(
      () => decodeMessagePayload(MessageKind.Result, encoded),
      ProtocolErrorCode.InvalidMessagePayload,
    );
  });

  it("rejects invalid stream sequence numbers", () => {
    const encoded = encodeDocument({
      sequence: -1,
      value: null,
    });

    expectProtocolError(
      () => decodeMessagePayload(MessageKind.StreamItem, encoded),
      ProtocolErrorCode.InvalidMessagePayload,
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
