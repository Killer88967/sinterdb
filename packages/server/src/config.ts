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
}

export interface ServerConfigInput {
  host?: string;
  port?: number | string;
  dataDirectory?: string;
  durability?: string;
}

export type ServerEnvironment = Readonly<{
  SINTERDB_HOST?: string;
  SINTERDB_PORT?: string;
  SINTERDB_DATA_DIR?: string;
  SINTERDB_DURABILITY?: string;
}>;

export type ServerConfigurationOption =
  "host" | "port" | "dataDirectory" | "durability";

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

  return {
    host,
    port,
    ...(dataDirectory === undefined ? {} : { dataDirectory }),
    durability: resolveDurability(requestDurability),
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

function invalidPort(value: number | string): ServerConfigurationError {
  return new ServerConfigurationError(
    "port",
    `Server port must be an integer between 0 and 65535; received ${JSON.stringify(value)}.`,
  );
}
