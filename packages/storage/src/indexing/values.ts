import { encodeDocumentValue, type DocumentValue } from "sinterdb-protocol";
import { CustomId } from "sinterdb-protocol";

import { compareValues, isComparableValue } from "../filter.js";

/**
 * The kinds of value that range operators can compare. A range operator only
 * ever matches values of the same kind as its operand.
 */
export type ValueClass =
  "string" | "number" | "bigint" | "date" | "binary" | "id";

/**
 * The exact bytes of the canonical encoding, which is how equality filters
 * decide whether two values are the same.
 */
export function canonicalKey(value: DocumentValue): string {
  const bytes = encodeDocumentValue(value);

  return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString(
    "latin1",
  );
}

export function valueClassOf(value: DocumentValue): ValueClass | undefined {
  if (!isComparableValue(value)) {
    return undefined;
  }

  if (typeof value === "string") {
    return "string";
  }

  if (typeof value === "number") {
    return "number";
  }

  if (typeof value === "bigint") {
    return "bigint";
  }

  if (value instanceof Date) {
    return "date";
  }

  if (value instanceof CustomId) {
    return "id";
  }

  return "binary";
}

export function compareSameClass(
  left: DocumentValue,
  right: DocumentValue,
): number {
  return compareValues(left, right) as number;
}

export function describeValue(value: DocumentValue): string {
  let text: string;

  try {
    text = JSON.stringify(value, (_key, item: unknown) => {
      if (typeof item === "bigint") {
        return `${item}n`;
      }

      if (item instanceof Uint8Array) {
        return `<${item.byteLength} bytes>`;
      }

      if (item instanceof CustomId) {
        return item.toHexString();
      }

      return item;
    }) as string;
  } catch {
    text = String(value);
  }

  return text.length > 100 ? `${text.slice(0, 97)}...` : text;
}
