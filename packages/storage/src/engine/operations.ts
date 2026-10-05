import { StorageError, StorageErrorCode } from "../errors.js";

export const RecordType = {
  Transaction: 1,
} as const;

export const ID_BYTE_LENGTH = 16;
export const MAX_NAME_BYTE_LENGTH = 65_535;

const OperationKind = {
  CreateCollection: 1,
  Put: 2,
  Delete: 3,
} as const;

export type Operation =
  | {
      readonly kind: "createCollection";
      readonly database: string;
      readonly collection: string;
    }
  | {
      readonly kind: "put";
      readonly database: string;
      readonly collection: string;
      readonly id: Uint8Array;
      readonly document: Uint8Array;
    }
  | {
      readonly kind: "delete";
      readonly database: string;
      readonly collection: string;
      readonly id: Uint8Array;
    };

const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8", { fatal: true });

export function encodeOperations(operations: readonly Operation[]): Uint8Array {
  const parts: Uint8Array[] = [];
  const header = Buffer.alloc(4);

  header.writeUInt32BE(operations.length, 0);
  parts.push(header);

  for (const operation of operations) {
    switch (operation.kind) {
      case "createCollection":
        parts.push(
          Uint8Array.of(OperationKind.CreateCollection),
          encodeName(operation.database),
          encodeName(operation.collection),
        );
        break;

      case "put":
        parts.push(
          Uint8Array.of(OperationKind.Put),
          encodeName(operation.database),
          encodeName(operation.collection),
          encodeId(operation.id),
          encodeBytes(operation.document),
        );
        break;

      case "delete":
        parts.push(
          Uint8Array.of(OperationKind.Delete),
          encodeName(operation.database),
          encodeName(operation.collection),
          encodeId(operation.id),
        );
        break;
    }
  }

  return Buffer.concat(parts);
}

export function decodeOperations(payload: Uint8Array): Operation[] {
  const reader = new Reader(payload);
  const count = reader.u32();
  const operations: Operation[] = [];

  for (let index = 0; index < count; index += 1) {
    const kind = reader.u8();

    switch (kind) {
      case OperationKind.CreateCollection:
        operations.push({
          kind: "createCollection",
          database: reader.name(),
          collection: reader.name(),
        });
        break;

      case OperationKind.Put:
        operations.push({
          kind: "put",
          database: reader.name(),
          collection: reader.name(),
          id: reader.bytes(ID_BYTE_LENGTH),
          document: reader.bytes(reader.u32()),
        });
        break;

      case OperationKind.Delete:
        operations.push({
          kind: "delete",
          database: reader.name(),
          collection: reader.name(),
          id: reader.bytes(ID_BYTE_LENGTH),
        });
        break;

      default:
        throw malformed(`Unknown operation kind ${kind}.`);
    }
  }

  reader.finish();

  return operations;
}

function encodeName(name: string): Uint8Array {
  const bytes = encoder.encode(name);

  if (bytes.byteLength === 0 || bytes.byteLength > MAX_NAME_BYTE_LENGTH) {
    throw new RangeError(
      `Names must be 1 to ${MAX_NAME_BYTE_LENGTH} bytes of UTF-8.`,
    );
  }

  const encoded = Buffer.alloc(2 + bytes.byteLength);

  encoded.writeUInt16BE(bytes.byteLength, 0);
  encoded.set(bytes, 2);

  return encoded;
}

function encodeId(id: Uint8Array): Uint8Array {
  if (id.byteLength !== ID_BYTE_LENGTH) {
    throw new RangeError(`Document ids must be ${ID_BYTE_LENGTH} bytes.`);
  }

  return id;
}

function encodeBytes(bytes: Uint8Array): Uint8Array {
  const encoded = Buffer.alloc(4 + bytes.byteLength);

  encoded.writeUInt32BE(bytes.byteLength, 0);
  encoded.set(bytes, 4);

  return encoded;
}

function malformed(reason: string): StorageError {
  return new StorageError(
    StorageErrorCode.Corruption,
    `A transaction record is malformed: ${reason}`,
  );
}

class Reader {
  private offset = 0;

  public constructor(private readonly buffer: Uint8Array) {}

  public u8(): number {
    this.require(1);

    const value = this.buffer[this.offset] as number;

    this.offset += 1;

    return value;
  }

  public u16(): number {
    this.require(2);

    const value =
      ((this.buffer[this.offset] as number) << 8) |
      (this.buffer[this.offset + 1] as number);

    this.offset += 2;

    return value;
  }

  public u32(): number {
    this.require(4);

    const view = new DataView(
      this.buffer.buffer,
      this.buffer.byteOffset + this.offset,
      4,
    );

    this.offset += 4;

    return view.getUint32(0, false);
  }

  public bytes(length: number): Uint8Array {
    this.require(length);

    const value = new Uint8Array(
      this.buffer.subarray(this.offset, this.offset + length),
    );

    this.offset += length;

    return value;
  }

  public name(): string {
    const length = this.u16();

    if (length === 0) {
      throw malformed("A name is empty.");
    }

    this.require(length);

    const raw = this.buffer.subarray(this.offset, this.offset + length);

    this.offset += length;

    try {
      return decoder.decode(raw);
    } catch {
      throw malformed("A name is not valid UTF-8.");
    }
  }

  public finish(): void {
    if (this.offset !== this.buffer.byteLength) {
      throw malformed("The record has trailing bytes.");
    }
  }

  private require(length: number): void {
    if (this.offset + length > this.buffer.byteLength) {
      throw malformed("The record ends unexpectedly.");
    }
  }
}
