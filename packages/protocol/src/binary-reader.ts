import { ProtocolError, ProtocolErrorCode } from "./errors.js";

export class BinaryReader {
  private offset = 0;

  public constructor(private readonly data: Uint8Array) {}

  public get remaining(): number {
    return this.data.byteLength - this.offset;
  }

  public readUint8(): number {
    this.ensureAvailable(1);

    const value = this.createView().getUint8(this.offset);
    this.offset += 1;

    return value;
  }

  public readInt32(): number {
    this.ensureAvailable(4);

    const value = this.createView().getInt32(this.offset);
    this.offset += 4;

    return value;
  }

  public readUint32(): number {
    this.ensureAvailable(4);

    const value = this.createView().getUint32(this.offset);
    this.offset += 4;

    return value;
  }

  public readBigInt64(): bigint {
    this.ensureAvailable(8);

    const value = this.createView().getBigInt64(this.offset);
    this.offset += 8;

    return value;
  }

  public readFloat64(): number {
    this.ensureAvailable(8);

    const value = this.createView().getFloat64(this.offset);
    this.offset += 8;

    return value;
  }

  public readBytes(length: number): Uint8Array {
    this.ensureAvailable(length);

    const value = this.data.slice(this.offset, this.offset + length);
    this.offset += length;

    return value;
  }

  private createView(): DataView {
    return new DataView(
      this.data.buffer,
      this.data.byteOffset,
      this.data.byteLength,
    );
  }

  private ensureAvailable(length: number): void {
    if (length > this.remaining) {
      throw new ProtocolError(
        ProtocolErrorCode.UnexpectedEnd,
        `Encoded value requires ${length} bytes but only ${this.remaining} remain.`,
      );
    }
  }
}
