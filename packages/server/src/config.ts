import type { DurabilityMode } from "@sinterdb-internal/storage";

export const DEFAULT_SERVER_HOST = "127.0.0.1";
export const DEFAULT_SERVER_PORT = 4721;
export const DEFAULT_DURABILITY: DurabilityMode = "fsync";

export interface ServerConfig {
  host: string;
  port: number;
  /**
   * Directory for durable storage. When it is not set the server keeps all
   * data in memory and loses it on shutdown.
   */
  dataDirectory?: string;
  durability: DurabilityMode;
  /**
   * Bytes of log written between automatic checkpoints. The storage engine's
   * default applies when it is not set.
   */
  checkpointThresholdBytes?: number;
  /**
   * Take over a data directory lock left by a process on another host or
   * container. Off by default.
   */
  reclaimLock: boolean;
}

export interface ServerConfigInput {
  host?: string;
  port?: number | string;
  dataDirectory?: string;
  durability?: string;
  checkpointThresholdBytes?: number | string;
  reclaimLock?: boolean | string;
}

/**
 * The environment variables the server reads. docs/configuration.md documents
 * each of them, and a test fails when the two lists differ.
 */
export const SERVER_ENVIRONMENT_VARIABLES = [
  "SINTERDB_HOST",
  "SINTERDB_PORT",
  "SINTERDB_DATA_DIR",
  "SINTERDB_DURABILITY",
  "SINTERDB_CHECKPOINT_BYTES",
  "SINTERDB_RECLAIM_LOCK",
] as const;

export type ServerEnvironment = Readonly<{
  [Name in (typeof SERVER_ENVIRONMENT_VARIABLES)[number]]?: string;
}>;

export type ServerConfigurationOption =
  | "host"
  | "port"
  | "dataDirectory"
  | "durability"
  | "checkpointThresholdBytes"
  | "reclaimLock";

export class ServerConfigurationError extends Error {
  public readonly option: ServerConfigurationOption;

  public constructor(option: ServerConfigurationOption, message: string) {
    super(message);

    this.name = "ServerConfigurationError";
    this.option = option;
  }
}

export function resolveServerConfig(
  input: ServerConfigInput = {},
  environment: ServerEnvironment = process.env,
): ServerConfig {
  const host = resolveHost(input.host ?? environment.SINTERDB_HOST);
  const port = resolvePort(input.port ?? environment.SINTERDB_PORT);
  const dataDirectory = resolveDataDirectory(
    input.dataDirectory ?? environment.SINTERDB_DATA_DIR,
  );
  const requestDurability = input.durability ?? environment.SINTERDB_DURABILITY;

  if (requestDurability !== undefined && dataDirectory === undefined) {
    throw new ServerConfigurationError(
      "durability",
      "A durability mode only applies when a data directory is configured.",
    );
  }

  const checkpointThresholdBytes = resolveCheckpointThreshold(
    input.checkpointThresholdBytes ?? environment.SINTERDB_CHECKPOINT_BYTES,
  );

  if (checkpointThresholdBytes !== undefined && dataDirectory === undefined) {
    throw new ServerConfigurationError(
      "checkpointThresholdBytes",
      "A checkpoint threshold only applies when a data directory is configured.",
    );
  }

  const reclaimLock = resolveReclaimLock(
    input.reclaimLock ?? environment.SINTERDB_RECLAIM_LOCK,
  );

  if (reclaimLock && dataDirectory === undefined) {
    throw new ServerConfigurationError(
      "reclaimLock",
      "Reclaiming a lock only applies when a data directory is configured.",
    );
  }

  return {
    host,
    port,
    ...(dataDirectory === undefined ? {} : { dataDirectory }),
    durability: resolveDurability(requestDurability),
    ...(checkpointThresholdBytes === undefined
      ? {}
      : { checkpointThresholdBytes }),
    reclaimLock,
  };
}

function resolveHost(value: string | undefined): string {
  if (value === undefined) {
    return DEFAULT_SERVER_HOST;
  }

  const host = value.trim();

  if (host.length === 0) {
    throw new ServerConfigurationError("host", "Server host cannot be empty.");
  }

  return host;
}

function resolvePort(value: number | string | undefined): number {
  if (value === undefined) {
    return DEFAULT_SERVER_PORT;
  }

  if (typeof value === "string" && value.trim().length === 0) {
    throw invalidPort(value);
  }

  const port = typeof value === "number" ? value : Number(value);

  if (!Number.isInteger(port) || port < 0 || port > 65_535) {
    throw invalidPort(value);
  }

  return port;
}

function resolveDataDirectory(value: string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const directory = value.trim();

  if (directory.length === 0) {
    throw new ServerConfigurationError(
      "dataDirectory",
      "Server data directory cannot be empty.",
    );
  }

  return directory;
}

function resolveDurability(value: string | undefined): DurabilityMode {
  if (value === undefined) {
    return DEFAULT_DURABILITY;
  }

  const mode = value.trim();

  if (mode !== "buffered" && mode !== "fsync") {
    throw new ServerConfigurationError(
      "durability",
      `Server durability must be "buffered" or "fsync"; received ${JSON.stringify(value)}.`,
    );
  }

  return mode;
}

function resolveCheckpointThreshold(
  value: number | string | undefined,
): number | undefined {
  if (value === undefined) {
    return undefined;
  }

  const bytes =
    typeof value === "number"
      ? value
      : value.trim().length === 0
        ? Number.NaN
        : Number(value);

  if (!Number.isSafeInteger(bytes) || bytes < 1) {
    throw new ServerConfigurationError(
      "checkpointThresholdBytes",
      `Checkpoint threshold must be a positive integer number of bytes; received ${JSON.stringify(value)}.`,
    );
  }

  return bytes;
}

function resolveReclaimLock(value: boolean | string | undefined): boolean {
  if (value === undefined) {
    return false;
  }

  if (typeof value === "boolean") {
    return value;
  }

  const text = value.trim();

  if (text !== "true" && text !== "false") {
    throw new ServerConfigurationError(
      "reclaimLock",
      `Reclaim lock must be "true" or "false"; received ${JSON.stringify(value)}.`,
    );
  }

  return text === "true";
}

function invalidPort(value: number | string): ServerConfigurationError {
  return new ServerConfigurationError(
    "port",
    `Server port must be an integer between 0 and 65535; received ${JSON.stringify(value)}.`,
  );
}
