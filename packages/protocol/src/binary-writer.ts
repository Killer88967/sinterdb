import { MAX_PAYLOAD_SIZE } from "./constants.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";

const INITIAL_CAPACITY = 256;

export class BinaryWriter {
  private buffer = new Uint8Array(INITIAL_CAPACITY);
  private length = 0;

  public writeUint8(value: number): void {
    this.ensureCapacity(1);
    this.buffer[this.length] = value;
    this.length += 1;
  }

  public writeInt32(value: number): void {
    this.ensureCapacity(4);
    this.createView().setInt32(this.length, value);
    this.length += 4;
  }

  public writeUint32(value: number): void {
    this.ensureCapacity(4);
    this.createView().setUint32(this.length, value);
    this.length += 4;
  }

  public writeBigInt64(value: bigint): void {
    this.ensureCapacity(8);
    this.createView().setBigInt64(this.length, value);
    this.length += 8;
  }

  public writeFloat64(value: number): void {
    this.ensureCapacity(8);
    this.createView().setFloat64(this.length, value);
    this.length += 8;
  }

  public writeBytes(value: Uint8Array): void {
    this.ensureCapacity(value.byteLength);
    this.buffer.set(value, this.length);
    this.length += value.byteLength;
  }

  public writeBigUint64(value: bigint): void {
    this.ensureCapacity(8);
    this.createView().setBigUint64(this.length, value);
    this.length += 8;
  }

  public finish(): Uint8Array {
    return this.buffer.slice(0, this.length);
  }

  private createView(): DataView {
    return new DataView(
      this.buffer.buffer,
      this.buffer.byteOffset,
      this.buffer.byteLength,
    );
  }

  private ensureCapacity(additionalBytes: number): void {
    const requiredCapacity = this.length + additionalBytes;

    if (requiredCapacity > MAX_PAYLOAD_SIZE) {
      throw new ProtocolError(
        ProtocolErrorCode.PayloadTooLarge,
        `Encoded payload exceeds the ${MAX_PAYLOAD_SIZE}-byte limit.`,
      );
    }

    if (requiredCapacity <= this.buffer.byteLength) {
      return;
    }

    const nextCapacity = Math.min(
      MAX_PAYLOAD_SIZE,
      Math.max(requiredCapacity, this.buffer.byteLength * 2),
    );

    const nextBuffer = new Uint8Array(nextCapacity);
    nextBuffer.set(this.buffer);

    this.buffer = nextBuffer;
  }
}
