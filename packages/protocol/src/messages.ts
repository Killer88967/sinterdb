import type { MessageKindByName } from "./constants.js";
import type { Document, DocumentValue } from "./document.js";

export const ProtocolCapability = {
  TypedDocuments: "typed-documents",
  Streaming: "streaming",
} as const;

export type ProtocolCapability =
  (typeof ProtocolCapability)[keyof typeof ProtocolCapability];

export const HandshakeRole = {
  Client: "client",
  Server: "server",
} as const;

export type HandshakeRole = (typeof HandshakeRole)[keyof typeof HandshakeRole];

export interface HandshakeEnvelope extends Document {
  role: HandshakeRole;
  protocolVersion: number;
  product: string;
  productVersion: string;
  capabilities: string[];
}

export interface PingEnvelope extends Document {
  sentAt: Date;
}

export interface CommandEnvelope extends Document {
  command: string;
  database?: string;
  parameters: Document;
}

export interface ResultEnvelope extends Document {
  value: DocumentValue;
}

export interface StreamItemEnvelope extends Document {
  sequence: number;
  value: DocumentValue;
}

export interface StreamEndEnvelope extends Document {
  count: number;
}

export interface ErrorEnvelope extends Document {
  code: number;
  name: string;
  message: string;
  retryable: boolean;
  details?: Document;
}

type MessagePayloadByName = {
  Handshake: HandshakeEnvelope;
  Ping: PingEnvelope;
  Command: CommandEnvelope;
  Result: ResultEnvelope;
  StreamItem: StreamItemEnvelope;
  StreamEnd: StreamEndEnvelope;
  Error: ErrorEnvelope;
};

export type MessagePayloadByKind = {
  [
    K in keyof MessagePayloadByName as MessageKindByName[K]
  ]: MessagePayloadByName[K];
};

export type ProtocolEnvelope = MessagePayloadByKind[keyof MessagePayloadByKind];
