/**
 * ASCII representation: SNTR
 */
export const PROTOCOL_MAGIC = [0x53, 0x4e, 0x54, 0x52] as const;

/**
 * Version of the binary wire protocol, independent of the package version.
 */
export const PROTOCOL_VERSION = 1;

export const FRAME_HEADER_SIZE = 16;

export const MAX_PAYLOAD_SIZE = 16 * 1024 * 1024;

export const MessageKind = {
  Handshake: 0x01,
  Request: 0x02,
  Response: 0x03,
  Error: 0x04,
  Event: 0x05,
} as const;

export type MessageKind = (typeof MessageKind)[keyof typeof MessageKind];

export const FrameFlag = {
  None: 0,
  More: 1 << 0,
} as const;

export type FrameFlag = (typeof FrameFlag)[keyof typeof FrameFlag];

export const FrameOffset = {
  Magic: 0,
  Version: 4,
  Kind: 6,
  Flags: 7,
  RequestId: 8,
  PayloadLength: 12,
} as const;
