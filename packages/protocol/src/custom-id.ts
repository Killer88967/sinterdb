import { randomBytes } from "node:crypto";

export const CUSTOM_ID_BYTE_LENGTH = 16;
export const CUSTOM_ID_HEX_LENGTH = CUSTOM_ID_BYTE_LENGTH * 2;

const TIMESTAMP_BYTE_LENGTH = 6;
const RANDOM_BYTE_LENGTH = CUSTOM_ID_BYTE_LENGTH - TIMESTAMP_BYTE_LENGTH;
const MAX_TIMESTAMP = 0xffffffffffff;

export class CustomId {
  private constructor(private readonly bytes: Uint8Array) {}

  public static generate(): CustomId {
    const timestamp = Date.now();
    const bytes = new Uint8Array(CUSTOM_ID_BYTE_LENGTH);

    writeTimestamp(bytes, timestamp);
    bytes.set(randomBytes(RANDOM_BYTE_LENGTH), TIMESTAMP_BYTE_LENGTH);

    return new CustomId(bytes);
  }

  public static fromBytes(value: Uint8Array): CustomId {
    if (!(value instanceof Uint8Array)) {
      throw new TypeError("CustomId bytes must be a Uint8Array.");
    }

    if (value.byteLength !== CUSTOM_ID_BYTE_LENGTH) {
      throw new TypeError(
        `CustomId must contain exactly ${CUSTOM_ID_BYTE_LENGTH} bytes.`,
      );
    }

    return new CustomId(value.slice());
  }

  public static fromHexString(value: string): CustomId {
    if (
      typeof value !== "string" ||
      value.length !== CUSTOM_ID_HEX_LENGTH ||
      !/^[0-9a-fA-F]+$/.test(value)
    ) {
      throw new TypeError(
        `CustomId must be a ${CUSTOM_ID_HEX_LENGTH}-character hexadecimal string.`,
      );
    }

    const bytes = new Uint8Array(CUSTOM_ID_BYTE_LENGTH);

    for (let index = 0; index < CUSTOM_ID_BYTE_LENGTH; index += 1) {
      const offset = index * 2;
      bytes[index] = Number.parseInt(value.slice(offset, offset + 2), 16);
    }

    return new CustomId(bytes);
  }

  public get timestamp(): Date {
    let milliseconds = 0n;

    for (let index = 0; index < TIMESTAMP_BYTE_LENGTH; index += 1) {
      milliseconds =
        (milliseconds << 8n) | BigInt(this.bytes[index] ?? 0);
    }

    return new Date(Number(milliseconds));
  }

  public equals(other: CustomId): boolean {
    if (!(other instanceof CustomId)) {
      return false;
    }

    return this.bytes.every(
      (byte, index) => byte === other.bytes[index],
    );
  }

  public toBytes(): Uint8Array {
    return this.bytes.slice();
  }

  public toHexString(): string {
    return Array.from(this.bytes, (byte) =>
      byte.toString(16).padStart(2, "0"),
    ).join("");
  }

  public toString(): string {
    return this.toHexString();
  }

  public toJSON(): string {
    return this.toHexString();
  }
}

function writeTimestamp(target: Uint8Array, value: number): void {
  if (
    !Number.isSafeInteger(value) ||
    value < 0 ||
    value > MAX_TIMESTAMP
  ) {
    throw new RangeError(
      `CustomId timestamp must be an integer between 0 and ${MAX_TIMESTAMP}.`,
    );
  }

  let remaining = BigInt(value);

  for (let index = TIMESTAMP_BYTE_LENGTH - 1; index >= 0; index -= 1) {
    target[index] = Number(remaining & 0xffn);
    remaining >>= 8n;
  }
}
