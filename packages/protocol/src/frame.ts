import {
  FRAME_HEADER_SIZE,
  MAX_PAYLOAD_SIZE,
  PROTOCOL_MAGIC,
  PROTOCOL_VERSION,
  FrameFlag,
  FrameOffset,
  MessageKind,
} from "./constants.js";
import { ProtocolError, ProtocolErrorCode } from "./errors.js";

const MAX_UINT32 = 0xffffffff;
const SUPPORTED_FRAME_FLAGS = FrameFlag.More;

export interface Frame {
  version: number;
  kind: MessageKind;
  flags: number;
  requestId: number;
  payload: Uint8Array;
}

export interface FrameInput {
  kind: MessageKind;
  requestId: number;
  payload: Uint8Array;
  flags?: number;
}

export function encodeFrame(input: Readonly<FrameInput>): Uint8Array {
  validateMessageKind(input.kind);
  validateRequestId(input.requestId);
  validateFlags(input.flags ?? FrameFlag.None);
  validatePayload(input.payload);

  const flags = input.flags ?? FrameFlag.None;
  const frame = new Uint8Array(FRAME_HEADER_SIZE + input.payload.byteLength);
  const view = createView(frame);

  frame.set(PROTOCOL_MAGIC, FrameOffset.Magic);

  view.setUint16(FrameOffset.Version, PROTOCOL_VERSION);
  view.setUint8(FrameOffset.Kind, input.kind);
  view.setUint8(FrameOffset.Flags, flags);
  view.setUint32(FrameOffset.RequestId, input.requestId);
  view.setUint32(FrameOffset.PayloadLength, input.payload.byteLength);

  frame.set(input.payload, FRAME_HEADER_SIZE);

  return frame;
}

export function decodeFrame(data: Uint8Array): Frame {
  if (data.byteLength < FRAME_HEADER_SIZE) {
    throw new ProtocolError(
      ProtocolErrorCode.IncompleteFrame,
      `A frame requires at least ${FRAME_HEADER_SIZE} bytes.`,
    );
  }

  validateMagic(data);

  const view = createView(data);
  const version = view.getUint16(FrameOffset.Version);
  const kind = view.getUint8(FrameOffset.Kind);
  const flags = view.getUint8(FrameOffset.Flags);
  const requestId = view.getUint32(FrameOffset.RequestId);
  const payloadLength = view.getUint32(FrameOffset.PayloadLength);

  if (version !== PROTOCOL_VERSION) {
    throw new ProtocolError(
      ProtocolErrorCode.UnsupportedVersion,
      `Unsupported protocol version ${version}. Expected ${PROTOCOL_VERSION}.`,
    );
  }

  validateMessageKind(kind);
  validateFlags(flags);

  if (payloadLength > MAX_PAYLOAD_SIZE) {
    throw new ProtocolError(
      ProtocolErrorCode.PayloadTooLarge,
      `Payload length ${payloadLength} exceeds the ${MAX_PAYLOAD_SIZE}-byte limit.`,
    );
  }

  const expectedLength = FRAME_HEADER_SIZE + payloadLength;

  if (data.byteLength < expectedLength) {
    throw new ProtocolError(
      ProtocolErrorCode.IncompleteFrame,
      `Frame declares ${payloadLength} payload bytes but only ${
        data.byteLength - FRAME_HEADER_SIZE
      } are available.`,
    );
  }

  if (data.byteLength > expectedLength) {
    throw new ProtocolError(
      ProtocolErrorCode.PayloadLengthMismatch,
      `Frame contains ${data.byteLength - expectedLength} unexpected trailing bytes.`,
    );
  }

  return {
    version,
    kind,
    flags,
    requestId,
    payload: data.slice(FRAME_HEADER_SIZE),
  };
}

function createView(data: Uint8Array): DataView {
  return new DataView(data.buffer, data.byteOffset, data.byteLength);
}

function validateMagic(data: Uint8Array): void {
  const matches = PROTOCOL_MAGIC.every(
    (expected, index) => data[FrameOffset.Magic + index] === expected,
  );

  if (!matches) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidMagic,
      "Frame does not contain the SinterDB protocol signature.",
    );
  }
}

function validateMessageKind(value: number): asserts value is MessageKind {
  const valid = Object.values(MessageKind).some((kind) => kind === value);

  if (!valid) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidMessageKind,
      `Unknown message kind ${value}.`,
    );
  }
}

function validateFlags(flags: number): void {
  const validByte = Number.isInteger(flags) && flags >= 0 && flags <= 0xff;

  if (!validByte || (flags & ~SUPPORTED_FRAME_FLAGS) !== 0) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidFlags,
      `Unsupported frame flags ${flags}.`,
    );
  }
}

function validateRequestId(requestId: number): void {
  if (!Number.isInteger(requestId) || requestId < 0 || requestId > MAX_UINT32) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidRequestId,
      `Request ID ${requestId} is outside the unsigned 32-bit range.`,
    );
  }
}

function validatePayload(payload: Uint8Array): void {
  if (!(payload instanceof Uint8Array)) {
    throw new ProtocolError(
      ProtocolErrorCode.InvalidPayload,
      "Frame payload must be a Uint8Array.",
    );
  }

  if (payload.byteLength > MAX_PAYLOAD_SIZE) {
    throw new ProtocolError(
      ProtocolErrorCode.PayloadTooLarge,
      `Payload length ${payload.byteLength} exceeds the ${MAX_PAYLOAD_SIZE}-byte limit.`,
    );
  }
}
