import { BinaryWriter } from "./binary-writer.js";
import {
  MAX_DOCUMENT_DEPTH,
  ValueTag,
  type Document,
  type DocumentValue,
} from "./document.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";

const encoder = new TextEncoder();

const MIN_INT32 = -0x80000000;
const MAX_INT32 = 0x7fffffff;
const MIN_INT64 = -(2n ** 63n);
const MAX_INT64 = 2n ** 63n - 1n;

export function encodeDocument(document: Document): Uint8Array {
  return encodeDocumentValue(document);
}

export function encodeDocumentValue(value: DocumentValue): Uint8Array {
  const writer = new BinaryWriter();
  const activeContainers = new Set<object>();

  writeValue(writer, value, 0, activeContainers);

  return writer.finish();
}

function writeValue(
  writer: BinaryWriter,
  value: DocumentValue,
  depth: number,
  activeContainers: Set<object>,
): void {
  if (depth > MAX_DOCUMENT_DEPTH) {
    throw new ProtocolError(
      ProtocolErrorCode.DocumentTooDeep,
      `Document nesting exceeds the maximum depth of ${MAX_DOCUMENT_DEPTH}.`,
    );
  }

  if (value === null) {
    writer.writeUint8(ValueTag.Null);
    return;
  }

  if (typeof value === "boolean") {
    writer.writeUint8(value ? ValueTag.True : ValueTag.False);
    return;
  }

  if (typeof value === "number") {
    writeNumber(writer, value);
    return;
  }

  if (typeof value === "bigint") {
    writeBigInt(writer, value);
    return;
  }

  if (typeof value === "string") {
    writer.writeUint8(ValueTag.String);
    writeLengthPrefixedBytes(writer, encoder.encode(value));
    return;
  }

  if (value instanceof Date) {
    writeDate(writer, value);
    return;
  }

  if (value instanceof Uint8Array) {
    writer.writeUint8(ValueTag.Binary);
    writeLengthPrefixedBytes(writer, value);
    return;
  }

  if (Array.isArray(value)) {
    writeArray(writer, value, depth, activeContainers);
    return;
  }

  if (isPlainDocument(value)) {
    writeDocument(writer, value, depth, activeContainers);
    return;
  }

  throw new ProtocolError(
    ProtocolErrorCode.InvalidDocumentValue,
    `Unsupported document value: ${describeValue(value)}.`,
  );
}

function writeNumber(writer: BinaryWriter, value: number): void {
  if (
    Number.isInteger(value) &&
    !Object.is(value, -0) &&
    value >= MIN_INT32 &&
    value <= MAX_INT32
  ) {
    writer.writeUint8(ValueTag.Int32);
    writer.writeInt32(value);
    return;
  }

  if (Number.isSafeInteger(value) && !Object.is(value, -0)) {
    writer.writeUint8(ValueTag.Int64);
    writer.writeBigInt64(BigInt(value));
    return;
  }

  writer.writeUint8(ValueTag.Float64);
  writer.writeFloat64(value);
}

function writeBigInt(writer: BinaryWriter, value: bigint): void {
  if (value < MIN_INT64 || value > MAX_INT64) {
    throw new ProtocolError(
      ProtocolErrorCode.IntegerOutOfRange,
      `BigInt value ${value} is outside the signed 64-bit range.`,
    );
  }

  writer.writeUint8(ValueTag.BigInt64);
  writer.writeBigInt64(value);
}

function writeDate(writer: BinaryWriter, value: Date): void {
  const milliseconds = value.getTime();

  if (!Number.isFinite(milliseconds)) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidDate,
      "Invalid Date values cannot be encoded.",
    );
  }

  writer.writeUint8(ValueTag.DateTime);
  writer.writeBigInt64(BigInt(milliseconds));
}

function writeArray(
  writer: BinaryWriter,
  value: DocumentValue[],
  depth: number,
  activeContainers: Set<object>,
): void {
  assertNotCyclic(value, activeContainers);

  activeContainers.add(value);

  try {
    writer.writeUint8(ValueTag.Array);
    writer.writeUint32(value.length);

    for (const item of value) {
      writeValue(writer, item, depth + 1, activeContainers);
    }
  } finally {
    activeContainers.delete(value);
  }
}

function writeDocument(
  writer: BinaryWriter,
  value: Document,
  depth: number,
  activeContainers: Set<object>,
): void {
  assertNotCyclic(value, activeContainers);

  activeContainers.add(value);

  try {
    const keys = Object.keys(value).sort();

    writer.writeUint8(ValueTag.Document);
    writer.writeUint32(keys.length);

    for (const key of keys) {
      writeLengthPrefixedBytes(writer, encoder.encode(key));
      writeValue(
        writer,
        value[key] as DocumentValue,
        depth + 1,
        activeContainers,
      );
    }
  } finally {
    activeContainers.delete(value);
  }
}

function writeLengthPrefixedBytes(
  writer: BinaryWriter,
  value: Uint8Array,
): void {
  writer.writeUint32(value.byteLength);
  writer.writeBytes(value);
}

function assertNotCyclic(value: object, activeContainers: Set<object>): void {
  if (activeContainers.has(value)) {
    throw new ProtocolError(
      ProtocolErrorCode.CyclicDocument,
      "Cyclic documents and arrays cannot be encoded.",
    );
  }
}

function isPlainDocument(value: object): value is Document {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

function describeValue(value: unknown): string {
  if (value === undefined) {
    return "undefined";
  }

  if (typeof value === "function") {
    return "function";
  }

  if (typeof value === "symbol") {
    return "symbol";
  }

  return Object.prototype.toString.call(value);
}
