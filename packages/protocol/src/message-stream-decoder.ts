import { FRAME_HEADER_SIZE } from "./constants.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import { getFrameLength } from "./frame.js";
import { decodeMessage, type DecodedMessage } from "./message-frame.js";

export class MessageStreamDecoder {
  private buffered = new Uint8Array();
  private length = 0;

  public get bufferedBytes(): number {
    return this.length;
  }

  public push(chunk: Uint8Array): DecodedMessage[] {
    if (!(chunk instanceof Uint8Array)) {
      throw new ProtocolError(
        ProtocolErrorCode.InvalidPayload,
        "TCP chunk must be a Uint8Array.",
      );
    }

    if (chunk.byteLength === 0) {
      return [];
    }

    this.append(chunk);

    const messages: DecodedMessage[] = [];
    let consumed = 0;

    try {
      while (this.length - consumed >= FRAME_HEADER_SIZE) {
        const frameLength = getFrameLength(
          this.buffered.subarray(consumed, this.length),
        );

        if (this.length - consumed < frameLength) {
          break;
        }

        const frame = this.buffered.subarray(consumed, consumed + frameLength);
        consumed += frameLength;
        messages.push(decodeMessage(frame));
      }
    } finally {
      if (consumed > 0) {
        this.buffered.copyWithin(0, consumed, this.length);
        this.length -= consumed;
      }
    }

    return messages;
  }

  public reset(): void {
    this.buffered = new Uint8Array();
    this.length = 0;
  }

  private append(chunk: Uint8Array): void {
    const required = this.length + chunk.byteLength;

    if (required > this.buffered.byteLength) {
      const grown = new Uint8Array(
        Math.max(required, this.buffered.byteLength * 2, FRAME_HEADER_SIZE),
      );
      grown.set(this.buffered.subarray(0, this.length));
      this.buffered = grown;
    }

    this.buffered.set(chunk, this.length);
    this.length = required;
  }
}
