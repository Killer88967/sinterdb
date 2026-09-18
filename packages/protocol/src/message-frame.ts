import { type MessageKind as MessageKindValue } from "./constants.js";
import { decodeFrame, encodeFrame, type Frame } from "./frame.js";
import { decodeMessagePayload, encodeMessagePayload } from "./message-codec.js";
import type { MessagePayloadByKind } from "./messages.js";

export interface MessageInput<K extends MessageKindValue> {
  kind: K;
  requestId: number;
  payload: MessagePayloadByKind[K];
  flags?: number;
}

type FrameMetadata = Omit<Frame, "kind" | "payload">;

export type DecodedMessage = {
  [K in MessageKindValue]: FrameMetadata & {
    kind: K;
    payload: MessagePayloadByKind[K];
  };
}[MessageKindValue];

export function encodeMessage<K extends MessageKindValue>(
  input: Readonly<MessageInput<K>>,
): Uint8Array {
  const payload = encodeMessagePayload(input.kind, input.payload);

  return encodeFrame({
    kind: input.kind,
    requestId: input.requestId,
    payload,
    ...(input.flags === undefined ? {} : { flags: input.flags }),
  });
}

export function decodeMessage(encoded: Uint8Array): DecodedMessage {
  const frame = decodeFrame(encoded);
  const payload = decodeMessagePayload(frame.kind, frame.payload);

  return {
    ...frame,
    payload,
  } as DecodedMessage;
}
