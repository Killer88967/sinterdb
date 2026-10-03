import {
  CustomId,
  encodeDocumentValue,
  type Document,
  type DocumentValue,
} from "sinterdb-protocol";

import { StorageError, StorageErrorCode } from "./errors.js";
import { compareDocumentValues } from "./sort.js";

export type CompiledUpdate = (document: Document) => void;

const UpdateOperator = {
  Set: "$set",
  Unset: "$unset",
  Inc: "$inc",
  Min: "$min",
  Max: "$max",
  Push: "$push",
  Pull: "$pull",
  AddToSet: "$addToSet",
} as const;

type UpdateOperator = (typeof UpdateOperator)[keyof typeof UpdateOperator];

const SUPPORTED_OPERATORS: ReadonlySet<string> = new Set(
  Object.values(UpdateOperator),
);

interface Instruction {
  readonly operator: UpdateOperator;
  readonly path: string;
  readonly segments: readonly string[];
  readonly operand: DocumentValue;
}

export function compileUpdate(update: Document): CompiledUpdate {
  const instructions = parseUpdate(update);

  return (document) => {
    for (const instruction of instructions) {
      applyInstruction(document, instruction);
    }
  };
}

export function seedDocumentFromFilter(filter: Document): Document {
  const seed: Document = {};
  const assigned: (readonly string[])[] = [];

  for (const key of Object.keys(filter)) {
    if (key.startsWith("$")) {
      continue;
    }

    const value = filter[key] as DocumentValue;
    const equality = extractEquality(value);

    if (equality === undefined) {
      continue;
    }

    const segments = key.split(".");

    if (
      segments.some(
        (segment) =>
          segment.length === 0 ||
          segment.startsWith("$") ||
          segment === "__proto__",
      ) ||
      assigned.some((other) => overlaps(other, segments))
    ) {
      throw invalidUpdate(
        `Cannot derive an upsert document from filter field ${JSON.stringify(key)}.`,
      );
    }

    assigned.push(segments);

    const parent = resolveParent(seed, segments, true) as Document;

    parent[segments[segments.length - 1] as string] = equality.value;
  }

  return seed;
}

function extractEquality(
  value: DocumentValue,
): { readonly value: DocumentValue } | undefined {
  if (!isPlainDocument(value)) {
    return { value };
  }

  const keys = Object.keys(value);

  if (!keys.some((key) => key.startsWith("$"))) {
    return { value };
  }

  if (keys.length === 1 && keys[0] === "$eq") {
    return { value: value["$eq"] as DocumentValue };
  }

  return undefined;
}

function parseUpdate(update: Document): readonly Instruction[] {
  if (!isPlainDocument(update) || Object.keys(update).length === 0) {
    throw invalidUpdate("Update must be a non-empty document of operators.");
  }

  const instructions: Instruction[] = [];

  for (const operator of Object.keys(update)) {
    if (!SUPPORTED_OPERATORS.has(operator)) {
      throw invalidUpdate(
        operator.startsWith("$")
          ? `Update operator ${JSON.stringify(operator)} is not supported.`
          : "Update documents may only contain update operators. Use replaceOne to replace a document.",
      );
    }

    const operands = update[operator] as DocumentValue;

    if (!isPlainDocument(operands) || Object.keys(operands).length === 0) {
      throw invalidUpdate(
        `Update operator ${operator} requires a non-empty document of field paths.`,
      );
    }

    for (const path of Object.keys(operands)) {
      const operand = operands[path] as DocumentValue;

      instructions.push({
        operator: operator as UpdateOperator,
        path,
        segments: parsePath(path, operator),
        operand: validateOperand(operator as UpdateOperator, path, operand),
      });
    }
  }

  for (let left = 0; left < instructions.length; left += 1) {
    for (let right = left + 1; right < instructions.length; right += 1) {
      const a = instructions[left] as Instruction;
      const b = instructions[right] as Instruction;

      if (overlaps(a.segments, b.segments)) {
        throw invalidUpdate(
          `Update paths ${JSON.stringify(a.path)} and ${JSON.stringify(b.path)} conflict.`,
        );
      }
    }
  }

  return instructions;
}

function parsePath(path: string, operator: string): readonly string[] {
  const segments = path.split(".");

  for (const segment of segments) {
    if (
      segment.length === 0 ||
      segment.startsWith("$") ||
      segment === "__proto__"
    ) {
      throw invalidUpdate(
        `Update path ${JSON.stringify(path)} for ${operator} contains an empty or reserved segment.`,
      );
    }
  }

  if (segments[0] === "_id") {
    throw new StorageError(
      StorageErrorCode.ImmutableId,
      "The _id field cannot be modified.",
    );
  }

  return Object.freeze(segments);
}

function validateOperand(
  operator: UpdateOperator,
  path: string,
  operand: DocumentValue,
): DocumentValue {
  switch (operator) {
    case UpdateOperator.Inc:
      if (
        !(typeof operand === "bigint") &&
        !(typeof operand === "number" && Number.isFinite(operand))
      ) {
        throw invalidUpdate(
          `$inc for ${JSON.stringify(path)} requires a finite number or bigint.`,
        );
      }

      return operand;

    case UpdateOperator.Min:
    case UpdateOperator.Max:
      if (Array.isArray(operand) || isPlainDocument(operand)) {
        throw invalidUpdate(
          `${operator} for ${JSON.stringify(path)} requires a scalar value.`,
        );
      }

      return operand;

    default:
      return operand;
  }
}

function applyInstruction(document: Document, instruction: Instruction): void {
  const { operator, segments, operand } = instruction;
  const key = segments[segments.length - 1] as string;
  const create =
    operator !== UpdateOperator.Unset && operator !== UpdateOperator.Pull;
  const parent = resolveParent(document, segments, create);

  switch (operator) {
    case UpdateOperator.Set:
      (parent as Document)[key] = operand;
      return;

    case UpdateOperator.Unset:
      if (parent !== undefined && Object.hasOwn(parent, key)) {
        delete parent[key];
      }

      return;

    case UpdateOperator.Inc:
      applyInc(parent as Document, key, operand, instruction.path);
      return;

    case UpdateOperator.Min:
    case UpdateOperator.Max:
      applyExtremum(parent as Document, key, operand, operator);
      return;

    case UpdateOperator.Push:
      getArray(parent as Document, key, instruction.path, true).push(operand);
      return;

    case UpdateOperator.AddToSet: {
      const array = getArray(parent as Document, key, instruction.path, true);

      if (!array.some((element) => valuesEqual(element, operand))) {
        array.push(operand);
      }

      return;
    }

    case UpdateOperator.Pull: {
      if (parent === undefined) {
        return;
      }

      const array = getArray(parent, key, instruction.path, false);

      if (array.length === 0) {
        return;
      }

      parent[key] = array.filter((element) => !valuesEqual(element, operand));
      return;
    }
  }
}

function resolveParent(
  document: Document,
  segments: readonly string[],
  create: boolean,
): Document | undefined {
  let current = document;

  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index] as string;

    if (!Object.hasOwn(current, segment)) {
      if (!create) {
        return undefined;
      }

      const created: Document = {};

      current[segment] = created;
      current = created;
      continue;
    }

    const value = current[segment] as DocumentValue;

    if (!isPlainDocument(value)) {
      if (!create) {
        return undefined;
      }

      throw invalidUpdate(
        `Cannot traverse field ${JSON.stringify(segments.slice(0, index + 1).join("."))} because it is not a document.`,
      );
    }

    current = value;
  }

  return current;
}

function applyInc(
  parent: Document,
  key: string,
  operand: DocumentValue,
  path: string,
): void {
  if (!Object.hasOwn(parent, key)) {
    parent[key] = operand;
    return;
  }

  const current = parent[key] as DocumentValue;

  if (typeof current === "number" && typeof operand === "number") {
    const result = current + operand;

    if (!Number.isFinite(result)) {
      throw invalidUpdate(`$inc for ${JSON.stringify(path)} overflowed.`);
    }

    parent[key] = result;
    return;
  }

  if (typeof current === "bigint" && typeof operand === "bigint") {
    parent[key] = current + operand;
    return;
  }

  throw invalidUpdate(
    `$inc for ${JSON.stringify(path)} requires the existing value and operand to both be numbers or both be bigints.`,
  );
}

function applyExtremum(
  parent: Document,
  key: string,
  operand: DocumentValue,
  operator: typeof UpdateOperator.Min | typeof UpdateOperator.Max,
): void {
  if (!Object.hasOwn(parent, key)) {
    parent[key] = operand;
    return;
  }

  const comparison = compareDocumentValues(
    operand,
    parent[key] as DocumentValue,
  );

  if (operator === UpdateOperator.Min ? comparison < 0 : comparison > 0) {
    parent[key] = operand;
  }
}

function getArray(
  parent: Document,
  key: string,
  path: string,
  create: boolean,
): DocumentValue[] {
  if (!Object.hasOwn(parent, key)) {
    if (!create) {
      return [];
    }

    const created: DocumentValue[] = [];

    parent[key] = created;

    return created;
  }

  const value = parent[key] as DocumentValue;

  if (!Array.isArray(value)) {
    throw invalidUpdate(`Field ${JSON.stringify(path)} is not an array.`);
  }

  return value as DocumentValue[];
}

function valuesEqual(left: DocumentValue, right: DocumentValue): boolean {
  const a = encodeDocumentValue(left);
  const b = encodeDocumentValue(right);

  if (a.byteLength !== b.byteLength) {
    return false;
  }

  return a.every((byte, index) => byte === b[index]);
}

function overlaps(left: readonly string[], right: readonly string[]): boolean {
  const length = Math.min(left.length, right.length);

  for (let index = 0; index < length; index += 1) {
    if (left[index] !== right[index]) {
      return false;
    }
  }

  return true;
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

function invalidUpdate(message: string): StorageError {
  return new StorageError(StorageErrorCode.InvalidUpdate, message);
}
