import {
  MessageKind,
  type MessageKind as MessageKindValue,
} from "./constants.js";
import { CustomId } from "./custom-id.js";
import { decodeDocument } from "./document-decoder.js";
import { encodeDocument } from "./document-encoder.js";
import type { Document } from "./document.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import { HandshakeRole, type MessagePayloadByKind } from "./messages.js";

const MAX_UINT16 = 0xffff;
const MAX_UINT32 = 0xffffffff;

export function encodeMessagePayload<K extends MessageKindValue>(
  kind: K,
  payload: MessagePayloadByKind[K],
): Uint8Array {
  validateMessagePayload(kind, payload);

  return encodeDocument(payload);
}

export function decodeMessagePayload<K extends MessageKindValue>(
  kind: K,
  encoded: Uint8Array,
): MessagePayloadByKind[K] {
  const payload: unknown = decodeDocument(encoded);

  validateMessagePayload(kind, payload);

  return payload;
}

export function validateMessagePayload<K extends MessageKindValue>(
  kind: K,
  payload: unknown,
): asserts payload is MessagePayloadByKind[K] & Document {
  if (!isDocument(payload)) {
    fail(kind, "Payload must be a document.");
  }

  switch (kind) {
    case MessageKind.Handshake:
      validateHandshake(payload);
      return;

    case MessageKind.Ping:
      validatePing(payload);
      return;

    case MessageKind.Command:
      validateCommand(payload);
      return;

    case MessageKind.Result:
      validateResult(payload);
      return;

    case MessageKind.StreamItem:
      validateStreamItem(payload);
      return;

    case MessageKind.StreamEnd:
      validateStreamEnd(payload);
      return;

    case MessageKind.Error:
      validateError(payload);
      return;

    default:
      throw new ProtocolError(
        ProtocolErrorCode.InvalidMessageKind,
        `Unknown message kind ${kind}.`,
      );
  }
}

function validateHandshake(payload: Document): void {
  const role = payload["role"];
  const capabilities = payload["capabilities"];

  if (role !== HandshakeRole.Client && role !== HandshakeRole.Server) {
    fail(MessageKind.Handshake, "Handshake role is invalid.");
  }

  if (
    !isUnsignedInteger(payload["protocolVersion"], MAX_UINT16) ||
    payload["protocolVersion"] === 0
  ) {
    fail(
      MessageKind.Handshake,
      "Protocol version must be a positive unsigned 16-bit integer.",
    );
  }

  if (!isNonEmptyString(payload["product"])) {
    fail(MessageKind.Handshake, "Product name must be a non-empty string.");
  }

  if (!isNonEmptyString(payload["productVersion"])) {
    fail(MessageKind.Handshake, "Product version must be a non-empty string.");
  }

  if (
    !Array.isArray(capabilities) ||
    !capabilities.every((value) => typeof value === "string")
  ) {
    fail(MessageKind.Handshake, "Capabilities must be an array of strings.");
  }
}

function validatePing(payload: Document): void {
  const sentAt = payload["sentAt"];

  if (!(sentAt instanceof Date) || !Number.isFinite(sentAt.getTime())) {
    fail(MessageKind.Ping, "Ping timestamp must be a valid Date.");
  }
}

function validateCommand(payload: Document): void {
  if (!isNonEmptyString(payload["command"])) {
    fail(MessageKind.Command, "Command name must be a non-empty string.");
  }

  if (
    Object.hasOwn(payload, "database") &&
    !isNonEmptyString(payload["database"])
  ) {
    fail(
      MessageKind.Command,
      "Database name must be a non-empty string when provided.",
    );
  }

  if (!isDocument(payload["parameters"])) {
    fail(MessageKind.Command, "Command parameters must be a document.");
  }
}

function validateResult(payload: Document): void {
  if (!Object.hasOwn(payload, "value")) {
    fail(MessageKind.Result, 'Result payload must contain a "value" field.');
  }
}

function validateStreamItem(payload: Document): void {
  if (!isUnsignedInteger(payload["sequence"], Number.MAX_SAFE_INTEGER)) {
    fail(
      MessageKind.StreamItem,
      "Stream sequence must be a non-negative safe integer.",
    );
  }

  if (!Object.hasOwn(payload, "value")) {
    fail(MessageKind.StreamItem, 'Stream item must contain a "value" field.');
  }
}

function validateStreamEnd(payload: Document): void {
  if (!isUnsignedInteger(payload["count"], Number.MAX_SAFE_INTEGER)) {
    fail(
      MessageKind.StreamEnd,
      "Stream count must be a non-negative safe integer.",
    );
  }
}

function validateError(payload: Document): void {
  if (!isUnsignedInteger(payload["code"], MAX_UINT32)) {
    fail(MessageKind.Error, "Error code must be an unsigned 32-bit integer.");
  }

  if (!isNonEmptyString(payload["name"])) {
    fail(MessageKind.Error, "Error name must be a non-empty string.");
  }

  if (!isNonEmptyString(payload["message"])) {
    fail(MessageKind.Error, "Error message must be a non-empty string.");
  }

  if (typeof payload["retryable"] !== "boolean") {
    fail(MessageKind.Error, "Error retryable flag must be a boolean.");
  }

  if (Object.hasOwn(payload, "details") && !isDocument(payload["details"])) {
    fail(MessageKind.Error, "Error details must be a document when provided.");
  }
}

function isDocument(value: unknown): value is Document {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    value instanceof Date ||
    value instanceof Uint8Array ||
    value instanceof CustomId
  ) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isUnsignedInteger(value: unknown, maximum: number): value is number {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= maximum
  );
}

function fail(kind: MessageKindValue, reason: string): never {
  throw new ProtocolError(
    ProtocolErrorCode.InvalidMessagePayload,
    `Invalid message payload for kind ${kind}: ${reason}`,
  );
}
