import { CustomId, type DocumentValue } from "sinterdb-protocol";

const TAG_BYTES = 1;
const LENGTH_BYTES = 4;
// The widest fixed-size value: an Int64, Float64, BigInt64 or DateTime.
const WIDEST_NUMBER_BYTES = 8;
const CUSTOM_ID_BYTES = 16;

/**
 * An upper bound for the encoded size of a value in the wire protocol.
 *
 * Cursors use it to keep a batch of documents below the message size limit
 * without encoding every document twice. It never underestimates: an integer
 * that encodes in four bytes is counted as eight. The protocol encoder in
 * `sinterdb-protocol` remains the authority on what is valid; this only has to
 * be large enough.
 */
export function estimateEncodedSize(value: DocumentValue): number {
  if (value === null || typeof value === "boolean") {
    return TAG_BYTES;
  }

  switch (typeof value) {
    case "number":
    case "bigint":
      return TAG_BYTES + WIDEST_NUMBER_BYTES;

    case "string":
      return TAG_BYTES + LENGTH_BYTES + Buffer.byteLength(value, "utf8");
  }

  if (value instanceof Date) {
    return TAG_BYTES + WIDEST_NUMBER_BYTES;
  }

  if (value instanceof Uint8Array) {
    return TAG_BYTES + LENGTH_BYTES + value.byteLength;
  }

  if (value instanceof CustomId) {
    return TAG_BYTES + CUSTOM_ID_BYTES;
  }

  let size = TAG_BYTES + LENGTH_BYTES;

  if (Array.isArray(value)) {
    for (const item of value) {
      size += estimateEncodedSize(item);
    }

    return size;
  }

  for (const [key, field] of Object.entries(value)) {
    size +=
      LENGTH_BYTES +
      Buffer.byteLength(key, "utf8") +
      estimateEncodedSize(field as DocumentValue);
  }

  return size;
}
