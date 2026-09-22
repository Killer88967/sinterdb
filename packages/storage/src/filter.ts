import {
  encodeDocument,
  encodeDocumentValue,
  type Document,
  type DocumentValue,
} from "sinterdb-protocol";

import { StorageError, StorageErrorCode } from "./errors.js";

interface CompiledEqualityField {
  readonly path: string;
  readonly segments: readonly string[];
  readonly encodedValue: Uint8Array;
}

type ResolvedField =
  | {
      readonly found: true;
      readonly value: DocumentValue;
    }
  | {
      readonly found: false;
    };

export type CompiledFilter = (document: Document) => boolean;

export function compileFilter(filter: Document): CompiledFilter {
  if (!isPlainDocument(filter)) {
    throw invalidFilter("Find filter must be a document.");
  }

  let fields: readonly CompiledEqualityField[];

  try {
    encodeDocument(filter);

    fields = Object.keys(filter).map((path) =>
      compileEqualityField(path, filter[path] as DocumentValue),
    );
  } catch (error: unknown) {
    if (error instanceof StorageError) {
      throw error;
    }

    throw invalidFilter("Find filter could not be encoded.", error);
  }

  return (document) => matchesCompiledFilter(document, fields);
}

function compileEqualityField(
  path: string,
  value: DocumentValue,
): CompiledEqualityField {
  const segments = compileFieldPath(path);

  return {
    path,
    segments,
    encodedValue: encodeDocumentValue(value),
  };
}

function compileFieldPath(path: string): readonly string[] {
  if (path.length === 0) {
    throw invalidFilter("Filter field paths cannot be empty.");
  }

  const segments = path.split(".");

  for (const segment of segments) {
    if (segment.length === 0) {
      throw invalidFilter(
        `Filter field path ${JSON.stringify(path)} contains an empty segment.`,
      );
    }

    if (segment.startsWith("$")) {
      throw invalidFilter(
        `Filter field path ${JSON.stringify(path)} contains a reserved segment.`,
      );
    }
  }

  return Object.freeze(segments);
}

function matchesCompiledFilter(
  document: Document,
  fields: readonly CompiledEqualityField[],
): boolean {
  for (const field of fields) {
    const resolved = resolveField(document, field.segments);

    if (!resolved.found) {
      return false;
    }

    const encodedValue = encodeDocumentValue(resolved.value);

    if (!bytesEqual(encodedValue, field.encodedValue)) {
      return false;
    }
  }

  return true;
}

function resolveField(
  document: Document,
  segments: readonly string[],
): ResolvedField {
  let current: Document = document;

  for (let index = 0; index < segments.length; index += 1) {
    const segment = segments[index] as string;

    if (!Object.hasOwn(current, segment)) {
      return {
        found: false,
      };
    }

    const value = current[segment] as DocumentValue;

    if (index === segments.length - 1) {
      return {
        found: true,
        value,
      };
    }

    if (!isPlainDocument(value)) {
      return {
        found: false,
      };
    }

    current = value;
  }

  return {
    found: false,
  };
}

function isPlainDocument(value: unknown): value is Document {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    value instanceof Date ||
    value instanceof Uint8Array
  ) {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}

function bytesEqual(left: Uint8Array, right: Uint8Array): boolean {
  if (left.byteLength !== right.byteLength) {
    return false;
  }

  return left.every((byte, index) => byte === right[index]);
}

function invalidFilter(message: string, cause?: unknown): StorageError {
  return new StorageError(StorageErrorCode.InvalidFilter, message, {
    ...(cause === undefined ? {} : { cause }),
  });
}
