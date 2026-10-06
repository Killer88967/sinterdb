import { StorageError, StorageErrorCode } from "../errors.js";

export const ID_INDEX_NAME = "_id_";
export const MAX_INDEXES_PER_COLLECTION = 32;
export const MAX_INDEX_NAME_LENGTH = 127;

export interface IndexSpec {
  readonly name: string;
  readonly field: string;
  readonly direction: 1 | -1;
  /** At most one document may have a given value (or lack the field). */
  readonly unique: boolean;
  /** Documents without the field are not indexed, so they never conflict. */
  readonly sparse: boolean;
}

export interface CreateIndexInput {
  readonly field: string;
  readonly direction?: 1 | -1;
  readonly unique?: boolean;
  readonly sparse?: boolean;
  readonly name?: string;
}

export function normalizeIndexSpec(input: CreateIndexInput): IndexSpec {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    throw invalidIndex("An index definition must be an object.");
  }

  const { field } = input;

  if (typeof field !== "string" || field.length === 0) {
    throw invalidIndex("An index requires a non-empty field path.");
  }

  const segments = field.split(".");

  for (const segment of segments) {
    if (
      segment.length === 0 ||
      segment.startsWith("$") ||
      segment === "__proto__"
    ) {
      throw invalidIndex(
        `Index field path ${JSON.stringify(field)} contains an empty or reserved segment.`,
      );
    }
  }

  if (field === "_id" || field.startsWith("_id.")) {
    throw invalidIndex(
      "The _id field always has a unique index, which cannot be created or changed.",
    );
  }

  const direction = input.direction ?? 1;

  if (direction !== 1 && direction !== -1) {
    throw invalidIndex("Index direction must be 1 or -1.");
  }

  const unique = readFlag(input.unique, "unique");
  const sparse = readFlag(input.sparse, "sparse");
  const name = input.name ?? `${field}_${direction}`;

  if (
    typeof name !== "string" ||
    name.length === 0 ||
    name.length > MAX_INDEX_NAME_LENGTH ||
    name === ID_INDEX_NAME ||
    [...name].some((character) => character.charCodeAt(0) < 32)
  ) {
    throw invalidIndex(
      `Index names must be 1 to ${MAX_INDEX_NAME_LENGTH} characters without control characters, and cannot be ${JSON.stringify(ID_INDEX_NAME)}.`,
    );
  }

  return { name, field, direction, unique, sparse };
}

export function sameDefinition(left: IndexSpec, right: IndexSpec): boolean {
  return (
    left.field === right.field &&
    left.direction === right.direction &&
    left.unique === right.unique &&
    left.sparse === right.sparse
  );
}

export function idIndexSpec(): IndexSpec {
  return {
    name: ID_INDEX_NAME,
    field: "_id",
    direction: 1,
    unique: true,
    sparse: false,
  };
}

function readFlag(value: boolean | undefined, name: string): boolean {
  if (value === undefined) {
    return false;
  }

  if (typeof value !== "boolean") {
    throw invalidIndex(`Index option ${name} must be a boolean.`);
  }

  return value;
}

function invalidIndex(message: string): StorageError {
  return new StorageError(StorageErrorCode.InvalidIndex, message);
}
