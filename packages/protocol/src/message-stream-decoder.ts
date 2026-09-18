import { FRAME_HEADER_SIZE } from "./constants.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";
import { getFrameLength } from "./frame.js";
import { decodeMessage, type DecodedMessage } from "./message-frame.js";

export class MessageStreamDecoder {
  private buffered = new Uint8Array();

  public get bufferedBytes(): number {
    return this.buffered.byteLength;
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

    while (this.buffered.byteLength >= FRAME_HEADER_SIZE) {
      const frameLength = getFrameLength(this.buffered);

      if (this.buffered.byteLength < frameLength) {
        break;
      }

      const frame = this.buffered.slice(0, frameLength);
      this.buffered = this.buffered.slice(frameLength);

      messages.push(decodeMessage(frame));
    }

    return messages;
  }

  public reset(): void {
    this.buffered = new Uint8Array();
  }

  private append(chunk: Uint8Array): void {
    if (this.buffered.byteLength === 0) {
      this.buffered = chunk.slice();
      return;
    }

    const combined = new Uint8Array(
      this.buffered.byteLength + chunk.byteLength,
    );

    combined.set(this.buffered);
    combined.set(chunk, this.buffered.byteLength);

    this.buffered = combined;
  }
}
