export {
  FRAME_HEADER_SIZE,
  MAX_PAYLOAD_SIZE,
  PROTOCOL_MAGIC,
  PROTOCOL_VERSION,
  FrameFlag,
  FrameOffset,
  MessageKind,
} from "./constants.js";
export { ProtocolError, ProtocolErrorCode } from "./errors.js";
export { decodeFrame, encodeFrame } from "./frame.js";
export { decodeJsonPayload, encodeJsonPayload } from "./serialization.js";
export { MAX_DOCUMENT_DEPTH, ValueTag } from "./document.js";

export type {
  FrameFlag as FrameFlagValue,
  MessageKind as MessageKindValue,
} from "./constants.js";
export type { ProtocolErrorCode as ProtocolErrorCodeValue } from "./errors.js";
export type { Frame, FrameInput } from "./frame.js";
export type {
  Document,
  DocumentValue,
  ValueTag as ValueTagValue,
} from "./document.js";
