import { BinaryReader } from "./binary-reader.js";
import { MAX_PAYLOAD_SIZE } from "./constants.js";
import { CUSTOM_ID_BYTE_LENGTH, CustomId } from "./custom-id.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import {
  MAX_DOCUMENT_DEPTH,
  ValueTag,
  type Document,
  type DocumentValue,
} from "./document.js";

const decoder = new TextDecoder("utf-8", { fatal: true });

const MIN_SAFE_INTEGER = BigInt(Number.MIN_SAFE_INTEGER);
const MAX_SAFE_INTEGER = BigInt(Number.MAX_SAFE_INTEGER);

export function decodeDocument(payload: Uint8Array): Document {
  const value = decodeDocumentValue(payload);

  if (!isDocument(value)) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidDocumentValue,
      "Encoded payload does not contain a top-level document.",
    );
  }

  return value;
}

export function decodeDocumentValue(payload: Uint8Array): DocumentValue {
  if (!(payload instanceof Uint8Array)) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidPayload,
      "Encoded document payload must be a Uint8Array.",
    );
  }

  if (payload.byteLength > MAX_PAYLOAD_SIZE) {
    throw new ProtocolError(
      ProtocolErrorCode.PayloadTooLarge,
      `Encoded payload exceeds the ${MAX_PAYLOAD_SIZE}-byte limit.`,
    );
  }

  const reader = new BinaryReader(payload);
  const value = readValue(reader, 0);

  if (reader.remaining !== 0) {
    throw new ProtocolError(
      ProtocolErrorCode.TrailingData,
      `Encoded value contains ${reader.remaining} unexpected trailing bytes.`,
    );
  }

  return value;
}

function readValue(reader: BinaryReader, depth: number): DocumentValue {
  if (depth > MAX_DOCUMENT_DEPTH) {
    throw new ProtocolError(
      ProtocolErrorCode.DocumentTooDeep,
      `Document nesting exceeds the maximum depth of ${MAX_DOCUMENT_DEPTH}.`,
    );
  }

  const tag = reader.readUint8();

  switch (tag) {
    case ValueTag.Null:
      return null;

    case ValueTag.False:
      return false;

    case ValueTag.True:
      return true;

    case ValueTag.Int32:
      return reader.readInt32();

    case ValueTag.Int64:
      return readInt64(reader);

    case ValueTag.Float64:
      return reader.readFloat64();

    case ValueTag.BigInt64:
      return reader.readBigInt64();

    case ValueTag.String:
      return readString(reader);

    case ValueTag.Binary:
      return readLengthPrefixedBytes(reader);

    case ValueTag.DateTime:
      return readDate(reader);

    case ValueTag.CustomId:
      return CustomId.fromBytes(reader.readBytes(CUSTOM_ID_BYTE_LENGTH));

    case ValueTag.Array:
      return readArray(reader, depth);

    case ValueTag.Document:
      return readDocument(reader, depth);

    default:
      throw new ProtocolError(
        ProtocolErrorCode.UnknownValueTag,
        `Unknown document value tag ${tag}.`,
      );
  }
}

function readInt64(reader: BinaryReader): number {
  const value = reader.readBigInt64();

  if (value < MIN_SAFE_INTEGER || value > MAX_SAFE_INTEGER) {
    throw new ProtocolError(
      ProtocolErrorCode.IntegerOutOfRange,
      `Int64 value ${value} cannot be represented safely as a JavaScript number.`,
    );
  }

  return Number(value);
}

function readDate(reader: BinaryReader): Date {
  const milliseconds = reader.readBigInt64();
  const value = new Date(Number(milliseconds));

  if (!Number.isFinite(value.getTime())) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidDate,
      `Date value ${milliseconds} is outside the supported range.`,
    );
  }

  return value;
}

function readArray(reader: BinaryReader, depth: number): DocumentValue[] {
  const length = reader.readUint32();
  const value: DocumentValue[] = [];

  for (let index = 0; index < length; index += 1) {
    value.push(readValue(reader, depth + 1));
  }

  return value;
}

function readDocument(reader: BinaryReader, depth: number): Document {
  const fieldCount = reader.readUint32();
  const document: Document = {};

  for (let index = 0; index < fieldCount; index += 1) {
    const key = readString(reader);

    if (Object.hasOwn(document, key)) {
      throw new ProtocolError(
        ProtocolErrorCode.DuplicateDocumentKey,
        `Document contains the duplicate key "${key}".`,
      );
    }

    const value = readValue(reader, depth + 1);

    Object.defineProperty(document, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  }

  return document;
}

function readString(reader: BinaryReader): string {
  const bytes = readLengthPrefixedBytes(reader);

  try {
    return decoder.decode(bytes);
  } catch {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidUtf8,
      "Encoded string does not contain valid UTF-8.",
    );
  }
}

function readLengthPrefixedBytes(reader: BinaryReader): Uint8Array {
  const length = reader.readUint32();

  return reader.readBytes(length);
}

function isDocument(value: DocumentValue): value is Document {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    !(value instanceof Uint8Array) &&
    !(value instanceof CustomId)
  );
}
