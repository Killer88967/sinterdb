export const ProtocolErrorCode = {
  InvalidMagic: "INVALID_MAGIC",
  UnsupportedVersion: "UNSUPPORTED_VERSION",
  InvalidMessageKind: "INVALID_MESSAGE_KIND",
  InvalidFlags: "INVALID_FLAGS",
  InvalidRequestId: "INVALID_REQUEST_ID",
  InvalidPayload: "INVALID_PAYLOAD",
  PayloadTooLarge: "PAYLOAD_TOO_LARGE",
  IncompleteFrame: "INCOMPLETE_FRAME",
  PayloadLengthMismatch: "PAYLOAD_LENGTH_MISMATCH",
  SerializationFailure: "SERIALIZATION_FAILURE",
} as const;

export type ProtocolErrorCode =
  (typeof ProtocolErrorCode)[keyof typeof ProtocolErrorCode];

export class ProtocolError extends Error {
  public override readonly name = "ProtocolError";
  public readonly code: ProtocolErrorCode;
  public constructor(code: ProtocolErrorCode, message: string) {
    super(message);
    this.code = code;
  }
}
