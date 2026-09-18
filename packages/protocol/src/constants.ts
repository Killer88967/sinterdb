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

export const MIN_REQUEST_ID = 1;
export const MAX_REQUEST_ID = 0xffffffff;

export const MessageKind = {
  Handshake: 0x01,
  Ping: 0x02,
  Command: 0x03,
  Result: 0x04,
  StreamItem: 0x05,
  StreamEnd: 0x06,
  Error: 0x07,
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
