import { SinterClientOptionsError } from "./errors.js";

/**
 * A database or collection name is invalid: empty, or containing forbidden
 * characters. Code `INVALID_CLIENT_OPTIONS`.
 */
export class SinterNamespaceError extends SinterClientOptionsError {}

export function validateDatabaseName(name: string): void {
  validateCommonName(name, "Database");

  if (name.includes("/") || name.includes("\\") || name.includes("\0")) {
    throw new SinterNamespaceError(
      "Database names cannot contain slashes, backslashes, or null characters.",
    );
  }
}

export function validateCollectionName(name: string): void {
  validateCommonName(name, "Collection");

  if (name.includes("\0")) {
    throw new SinterNamespaceError(
      "Collection names cannot contain null characters.",
    );
  }
}

function validateCommonName(name: string, kind: string): void {
  if (typeof name !== "string" || name.trim().length === 0) {
    throw new SinterNamespaceError(`${kind} names must be non-empty strings.`);
  }
}
