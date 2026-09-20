import { CustomId } from "./custom-id.js";

export interface Document {
  [key: string]: DocumentValue;
}

export type DocumentValue =
  | null
  | boolean
  | number
  | bigint
  | string
  | Date
  | Uint8Array
  | CustomId
  | DocumentValue[]
  | Document;

export const ValueTag = {
  Null: 0x00,
  False: 0x01,
  True: 0x02,
  Int32: 0x03,
  Int64: 0x04,
  Float64: 0x05,
  BigInt64: 0x06,
  String: 0x07,
  Binary: 0x08,
  DateTime: 0x09,
  Array: 0x0a,
  Document: 0x0b,
  CustomId: 0x0c,
} as const;

export type ValueTag = (typeof ValueTag)[keyof typeof ValueTag];

export const MAX_DOCUMENT_DEPTH = 100;
