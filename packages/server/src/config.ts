export const DEFAULT_SERVER_HOST = "127.0.0.1";
export const DEFAULT_SERVER_PORT = 4721;

export interface ServerConfig {
  host: string;
  port: number;
}

export interface ServerConfigInput {
  host?: string;
  port?: number | string;
}

export type ServerEnvironment = Readonly<{
  SINTERDB_HOST?: string;
  SINTERDB_PORT?: string;
}>;

export type ServerConfigurationOption = "host" | "port";

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

  return {
    host,
    port,
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

function invalidPort(value: number | string): ServerConfigurationError {
  return new ServerConfigurationError(
    "port",
    `Server port must be an integer between 0 and 65535; received ${JSON.stringify(value)}.`,
  );
}
