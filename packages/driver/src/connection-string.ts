import { URL } from "node:url";
import { SinterConnectionStringError } from "./errors.js";

export const DEFAULT_SINTERDB_PORT = 4721;

export interface ParsedSinterConnectionString {
  readonly host: string;
  readonly port: number;
  readonly database?: string;
}

export function parseSinterConnectionString(
  connectionString: string,
): ParsedSinterConnectionString {
  if (
    typeof connectionString !== "string" ||
    connectionString.length === 0 ||
    connectionString !== connectionString.trim()
  ) {
    throw new SinterConnectionStringError(
      "The connection string must be a non-empty string without surrounding whitespace.",
    );
  }

  let url: URL;

  try {
    url = new URL(connectionString);
  } catch (cause: unknown) {
    throw new SinterConnectionStringError(
      "The connection string is not a valid URL.",
      { cause },
    );
  }

  if (url.protocol !== "sinterdb:") {
    throw new SinterConnectionStringError(
      'The connection string must use the "sinterdb://" scheme.',
    );
  }

  if (url.hostname.length === 0) {
    throw new SinterConnectionStringError(
      "The connection string must include a host.",
    );
  }

  if (url.username.length > 0 || url.password.length > 0) {
    throw new SinterConnectionStringError(
      "Authentication credentials are not supported yet.",
    );
  }

  if (url.search.length > 0) {
    throw new SinterConnectionStringError(
      "Connection-string query parameters are not supported yet.",
    );
  }

  if (url.hash.length > 0) {
    throw new SinterConnectionStringError(
      "Connection-string fragments are not supported.",
    );
  }

  const port = parsePort(url.port);
  const database = parseDatabase(url.pathname);
  const host = removeIpv6Brackets(url.hostname);

  if (database === undefined) {
    return Object.freeze({
      host,
      port,
    });
  }

  return Object.freeze({
    host,
    port,
    database,
  });
}

function parsePort(portText: string): number {
  if (portText.length === 0) {
    return DEFAULT_SINTERDB_PORT;
  }

  const port = Number(portText);

  if (!Number.isInteger(port) || port < 1 || port > 65_535) {
    throw new SinterConnectionStringError(
      "The connection-string port must be an integer between 1 and 65535.",
    );
  }

  return port;
}

function parseDatabase(pathname: string): string | undefined {
  if (pathname === "" || pathname === "/") {
    return undefined;
  }

  const encodedDatabase = pathname.slice(1);

  if (encodedDatabase.length === 0 || encodedDatabase.includes("/")) {
    throw new SinterConnectionStringError(
      "The connection string may contain at most one database name.",
    );
  }

  let database: string;

  try {
    database = decodeURIComponent(encodedDatabase);
  } catch (cause: unknown) {
    throw new SinterConnectionStringError(
      "The database name contains invalid percent encoding.",
      { cause },
    );
  }

  if (database.trim().length === 0) {
    throw new SinterConnectionStringError("The database name cannot be empty.");
  }

  if (
    database.includes("/") ||
    database.includes("\\") ||
    database.includes("\0")
  ) {
    throw new SinterConnectionStringError(
      "The database name contains an invalid character.",
    );
  }

  return database;
}

function removeIpv6Brackets(hostname: string): string {
  if (hostname.startsWith("[") && hostname.endsWith("]")) {
    return hostname.slice(1, -1);
  }

  return hostname;
}
