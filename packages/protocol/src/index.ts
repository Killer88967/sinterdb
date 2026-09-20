export {
  FRAME_HEADER_SIZE,
  MAX_PAYLOAD_SIZE,
  MIN_REQUEST_ID,
  MAX_REQUEST_ID,
  PROTOCOL_MAGIC,
  PROTOCOL_VERSION,
  FrameFlag,
  FrameOffset,
  MessageKind,
} from "./constants.js";
export { ProtocolError, ProtocolErrorCode, WireErrorCode } from "./errors.js";
export { decodeFrame, encodeFrame, getFrameLength } from "./frame.js";
export { MAX_DOCUMENT_DEPTH, ValueTag } from "./document.js";
export { encodeDocument, encodeDocumentValue } from "./document-encoder.js";
export { decodeDocument, decodeDocumentValue } from "./document-decoder.js";
export { HandshakeRole, ProtocolCapability } from "./messages.js";
export {
  encodeMessagePayload,
  decodeMessagePayload,
  validateMessagePayload,
} from "./message-codec.js";
export { RequestIdGenerator } from "./request-id.js";
export { decodeMessage, encodeMessage } from "./message-frame.js";
export { MessageStreamDecoder } from "./message-stream-decoder.js";
export {
  CUSTOM_ID_BYTE_LENGTH,
  CUSTOM_ID_HEX_LENGTH,
  CustomId,
} from "./custom-id.js";

export type {
  FrameFlag as FrameFlagValue,
  MessageKind as MessageKindValue,
} from "./constants.js";
export type {
  ProtocolErrorCode as ProtocolErrorCodeValue,
  WireErrorCode as WireErrorCodeValue,
} from "./errors.js";
export type { Frame, FrameInput } from "./frame.js";
export type {
  Document,
  DocumentValue,
  ValueTag as ValueTagValue,
} from "./document.js";
export type {
  CommandEnvelope,
  ErrorEnvelope,
  HandshakeEnvelope,
  HandshakeRole as HandshakeRoleValue,
  MessagePayloadByKind,
  PingEnvelope,
  ProtocolCapability as ProtocolCapabilityValue,
  ProtocolEnvelope,
  ResultEnvelope,
  StreamEndEnvelope,
  StreamItemEnvelope,
} from "./messages.js";
export type { DecodedMessage, MessageInput } from "./message-frame.js";
