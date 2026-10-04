import { crc32 } from "node:zlib";

export const WAL_FORMAT_VERSION = 1;

export const SEGMENT_MAGIC = Buffer.from("SINTWAL\0", "latin1");
export const SEGMENT_HEADER_SIZE = 24;
export const RECORD_HEADER_SIZE = 21;
export const MAX_RECORD_PAYLOAD_SIZE = 256 * 1024 * 1024;

export type SegmentHeaderResult =
  | { readonly ok: true; readonly firstLsn: bigint }
  | { readonly ok: false; readonly reason: string };

export type RecordScanResult =
  | {
      readonly kind: "record";
      readonly lsn: bigint;
      readonly type: number;
      readonly payload: Uint8Array;
      readonly end: number;
    }
  | { readonly kind: "end" }
  | { readonly kind: "torn"; readonly reason: string }
  | { readonly kind: "corrupt"; readonly reason: string };

export function encodeSegmentHeader(firstLsn: bigint): Buffer {
  const header = Buffer.alloc(SEGMENT_HEADER_SIZE);

  SEGMENT_MAGIC.copy(header, 0);
  header.writeUInt32BE(WAL_FORMAT_VERSION, 8);
  header.writeBigUInt64BE(firstLsn, 12);
  header.writeUInt32BE(crc32(header.subarray(0, 20)), 20);

  return header;
}

export function decodeSegmentHeader(bytes: Uint8Array): SegmentHeaderResult {
  if (bytes.byteLength < SEGMENT_HEADER_SIZE) {
    return { ok: false, reason: "The segment header is incomplete." };
  }

  const header = Buffer.from(
    bytes.buffer,
    bytes.byteOffset,
    SEGMENT_HEADER_SIZE,
  );

  if (!header.subarray(0, 8).equals(SEGMENT_MAGIC)) {
    return { ok: false, reason: "The file is not a SinterDB log segment." };
  }

  if (header.readUInt32BE(20) !== crc32(header.subarray(0, 20))) {
    return { ok: false, reason: "The segment header checksum is invalid." };
  }

  const version = header.readUInt32BE(8);

  if (version !== WAL_FORMAT_VERSION) {
    return {
      ok: false,
      reason: `The segment uses unsupported log format version ${version}.`,
    };
  }

  return { ok: true, firstLsn: header.readBigUInt64BE(12) };
}

export function encodeRecord(
  lsn: bigint,
  type: number,
  payload: Uint8Array,
): Buffer {
  if (!Number.isInteger(type) || type < 0 || type > 255) {
    throw new RangeError("Record type must be an integer from 0 to 255.");
  }

  if (payload.byteLength > MAX_RECORD_PAYLOAD_SIZE) {
    throw new RangeError("Record payload exceeds the maximum record size.");
  }

  const record = Buffer.alloc(RECORD_HEADER_SIZE + payload.byteLength);

  record.writeUInt32BE(payload.byteLength, 4);
  record.writeBigUInt64BE(lsn, 8);
  record.writeUInt8(type, 16);
  record.writeUInt32BE(crc32(payload), 17);
  record.set(payload, RECORD_HEADER_SIZE);
  record.writeUInt32BE(crc32(record.subarray(4, 17)), 0);

  return record;
}

export function scanRecord(
  bytes: Uint8Array,
  offset: number,
  expectedLsn: bigint,
): RecordScanResult {
  const size = bytes.byteLength;

  if (offset === size) {
    return { kind: "end" };
  }

  const remaining = size - offset;
  const buffer = Buffer.from(bytes.buffer, bytes.byteOffset, size);

  if (remaining < RECORD_HEADER_SIZE) {
    return {
      kind: "torn",
      reason: "The log ends inside a record header.",
    };
  }

  if (isZeroFilled(buffer, offset, size)) {
    return {
      kind: "torn",
      reason: "The log ends with unwritten zero bytes.",
    };
  }

  if (
    buffer.readUInt32BE(offset) !==
    crc32(buffer.subarray(offset + 4, offset + 17))
  ) {
    return {
      kind: "corrupt",
      reason: "The record header checksum is invalid.",
    };
  }

  const length = buffer.readUInt32BE(offset + 4);
  const lsn = buffer.readBigUInt64BE(offset + 8);
  const type = buffer.readUInt8(offset + 16);

  if (lsn !== expectedLsn) {
    return {
      kind: "corrupt",
      reason: `Expected log sequence number ${expectedLsn} but found ${lsn}.`,
    };
  }

  if (length > MAX_RECORD_PAYLOAD_SIZE) {
    return {
      kind: "corrupt",
      reason: `The record length ${length} exceeds the maximum record size.`,
    };
  }

  const end = offset + RECORD_HEADER_SIZE + length;

  if (end > size) {
    return {
      kind: "torn",
      reason: "The log ends inside a record payload.",
    };
  }

  const payload = buffer.subarray(offset + RECORD_HEADER_SIZE, end);

  if (buffer.readUInt32BE(offset + 17) !== crc32(payload)) {
    return {
      kind: end === size ? "torn" : "corrupt",
      reason: "The record payload checksum is invalid.",
    };
  }

  return { kind: "record", lsn, type, payload, end };
}

function isZeroFilled(buffer: Buffer, start: number, end: number): boolean {
  for (let index = start; index < end; index += 1) {
    if (buffer[index] !== 0) {
      return false;
    }
  }

  return true;
}
