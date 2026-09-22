import {
  CustomId,
  encodeDocument,
  encodeDocumentValue,
  type Document,
  type DocumentValue,
} from "sinterdb-protocol";

import { StorageError, StorageErrorCode } from "./errors.js";

interface CompiledField {
  readonly segments: readonly string[];
  readonly predicates: readonly FieldPredicate[];
}

type ResolvedField =
  | {
      readonly found: true;
      readonly value: DocumentValue;
    }
  | {
      readonly found: false;
    };

type FieldPredicate = (field: ResolvedField) => boolean;

type ComparisonOperator = "$gt" | "$gte" | "$lt" | "$lte";

export type CompiledFilter = (document: Document) => boolean;

export function compileFilter(filter: Document): CompiledFilter {
  if (!isPlainDocument(filter)) {
    throw invalidFilter("Find filter must be a document.");
  }

  let fields: readonly CompiledField[];

  try {
    encodeDocument(filter);

    fields = Object.keys(filter).map((path) =>
      compileField(path, filter[path] as DocumentValue),
    );
  } catch (error: unknown) {
    if (error instanceof StorageError) {
      throw error;
    }

    throw invalidFilter("Find filter could not be encoded.", error);
  }

  return (document) => matchesCompiledFilter(document, fields);
}

function compileField(path: string, value: DocumentValue): CompiledField {
  const segments = compileFieldPath(path);
  const predicates = isOperatorDocument(value)
    ? compileOperatorDocument(path, value)
    : [compileEqualityPredicate(value)];

  return {
    segments,
    predicates,
  };
}

function compileOperatorDocument(
  path: string,
  operators: Document,
): readonly FieldPredicate[] {
  const names = Object.keys(operators);

  if (names.some((name) => !name.startsWith("$"))) {
    throw invalidFilter(
      `Filter field ${JSON.stringify(path)} cannot mix operators with literal fields.`,
    );
  }

  return names.map((name) => {
    const operand = operators[name] as DocumentValue;

    switch (name) {
      case "$eq":
        return compileEqualityPredicate(operand);

      case "$ne":
        return compileInequalityPredicate(operand);

      case "$gt":
      case "$gte":
      case "$lt":
      case "$lte":
        return compileComparisonPredicate(name, operand);

      default:
        throw invalidFilter(
          `Filter field ${JSON.stringify(path)} uses unsupported operator ${JSON.stringify(name)}.`,
        );
    }
  });
}

function compileEqualityPredicate(expected: DocumentValue): FieldPredicate {
  const encodedExpected = encodeDocumentValue(expected);

  return (field) => {
    if (!field.found) {
      return false;
    }

    return canonicalEquals(field.value, encodedExpected);
  };
}

function compileInequalityPredicate(expected: DocumentValue): FieldPredicate {
  const encodedExpected = encodeDocumentValue(expected);

  return (field) => {
    if (!field.found) {
      return true;
    }

    return !canonicalEquals(field.value, encodedExpected);
  };
}

function compileComparisonPredicate(
  operator: ComparisonOperator,
  expected: DocumentValue,
): FieldPredicate {
  if (!isComparableValue(expected)) {
    throw invalidFilter(
      `Filter operator ${operator} requires a comparable string, number, bigint, date, binary value, or CustomId.`,
    );
  }

  return (field) => {
    if (!field.found) {
      return false;
    }

    const comparison = compareValues(field.value, expected);

    if (comparison === undefined) {
      return false;
    }

    switch (operator) {
      case "$gt":
        return comparison > 0;

      case "$gte":
        return comparison >= 0;

      case "$lt":
        return comparison < 0;

      case "$lte":
        return comparison <= 0;
    }
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
  fields: readonly CompiledField[],
): boolean {
  for (const field of fields) {
    const resolved = resolveField(document, field.segments);

    for (const predicate of field.predicates) {
      if (!predicate(resolved)) {
        return false;
      }
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

function canonicalEquals(
  actual: DocumentValue,
  encodedExpected: Uint8Array,
): boolean {
  return bytesEqual(encodeDocumentValue(actual), encodedExpected);
}

function isComparableValue(value: DocumentValue): boolean {
  if (typeof value === "string" || typeof value === "bigint") {
    return true;
  }

  if (typeof value === "number") {
    return Number.isFinite(value);
  }

  if (value instanceof Date) {
    return Number.isFinite(value.getTime());
  }

  return value instanceof Uint8Array || value instanceof CustomId;
}

function compareValues(
  actual: DocumentValue,
  expected: DocumentValue,
): number | undefined {
  if (typeof expected === "string") {
    if (typeof actual !== "string") {
      return undefined;
    }

    return comparePrimitive(actual, expected);
  }

  if (typeof expected === "number") {
    if (
      typeof actual !== "number" ||
      !Number.isFinite(actual) ||
      !Number.isFinite(expected)
    ) {
      return undefined;
    }

    return comparePrimitive(actual, expected);
  }

  if (typeof expected === "bigint") {
    if (typeof actual !== "bigint") {
      return undefined;
    }

    return comparePrimitive(actual, expected);
  }

  if (expected instanceof Date) {
    if (
      !(actual instanceof Date) ||
      !Number.isFinite(actual.getTime()) ||
      !Number.isFinite(expected.getTime())
    ) {
      return undefined;
    }

    return comparePrimitive(actual.getTime(), expected.getTime());
  }

  if (expected instanceof Uint8Array) {
    if (!(actual instanceof Uint8Array)) {
      return undefined;
    }

    return compareBytes(actual, expected);
  }

  if (expected instanceof CustomId) {
    if (!(actual instanceof CustomId)) {
      return undefined;
    }

    return compareBytes(actual.toBytes(), expected.toBytes());
  }

  return undefined;
}

function comparePrimitive(
  left: string | number | bigint,
  right: string | number | bigint,
): number {
  if (left < right) {
    return -1;
  }

  if (left > right) {
    return 1;
  }

  return 0;
}

function compareBytes(left: Uint8Array, right: Uint8Array): number {
  const length = Math.min(left.byteLength, right.byteLength);

  for (let index = 0; index < length; index += 1) {
    const leftByte = left[index] ?? 0;
    const rightByte = right[index] ?? 0;

    if (leftByte < rightByte) {
      return -1;
    }

    if (leftByte > rightByte) {
      return 1;
    }
  }

  return comparePrimitive(left.byteLength, right.byteLength);
}

function isOperatorDocument(value: DocumentValue): value is Document {
  return (
    isPlainDocument(value) &&
    Object.keys(value).some((name) => name.startsWith("$"))
  );
}

function isPlainDocument(value: unknown): value is Document {
  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    value instanceof Date ||
    value instanceof Uint8Array ||
    value instanceof CustomId
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
