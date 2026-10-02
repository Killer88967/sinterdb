import type { DocumentValue } from "sinterdb-protocol";

import { SinterProtocolError } from "./errors.js";

export function parseNameList(
  value: DocumentValue,
  field: string,
  command: string,
): string[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw invalidListResult(command);
  }

  const names = (value as Record<string, DocumentValue>)[field];

  if (
    !Array.isArray(names) ||
    !names.every((name) => typeof name === "string")
  ) {
    throw invalidListResult(command);
  }

  return [...(names as string[])];
}

function invalidListResult(command: string): SinterProtocolError {
  return new SinterProtocolError(
    `The server returned an invalid ${command} result.`,
  );
}
