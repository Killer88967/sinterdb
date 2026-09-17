import { MAX_PAYLOAD_SIZE } from "./constants.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8", { fatal: true });

export function encodeJsonPayload(value: unknown): Uint8Array {
  let serialized: string | undefined;

  try {
    serialized = JSON.stringify(value);
  } catch {
    throw new ProtocolError(
      ProtocolErrorCode.SerializationFailure,
      "Value could not be serialized as JSON.",
    );
  }

  if (serialized === undefined) {
    throw new ProtocolError(
      ProtocolErrorCode.SerializationFailure,
      "Value does not have a JSON representation.",
    );
  }

  const payload = encoder.encode(serialized);

  if (payload.byteLength > MAX_PAYLOAD_SIZE) {
    throw new ProtocolError(
      ProtocolErrorCode.PayloadTooLarge,
      `Serialized payload exceeds the ${MAX_PAYLOAD_SIZE}-byte limit.`,
    );
  }

  return payload;
}

export function decodeJsonPayload<T = unknown>(payload: Uint8Array): T {
  if (!(payload instanceof Uint8Array)) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidPayload,
      "JSON payload must be a Uint8Array.",
    );
  }

  try {
    const serialized = decoder.decode(payload);

    return JSON.parse(serialized) as T;
  } catch {
    throw new ProtocolError(
      ProtocolErrorCode.SerializationFailure,
      "Payload does not contain valid UTF-8 JSON.",
    );
  }
}
