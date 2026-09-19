import { parseArgs } from "node:util";

export const HELP_TEXT = `SinterDB Server

Usage:
  sinterd [options]

Options:
  --host <host>       Address to listen on
  --port <port>       TCP port to listen on
  -h, --help          Show this help message
  -v, --version       Show the server version

Environment:
  SINTERDB_HOST        Default listening address
  SINTERDB_PORT        Default listening port
`;

export type CliCommand =
  | {
      kind: "start";
      host?: string;
      port?: string;
    }
  | {
      kind: "help";
    }
  | {
      kind: "version";
    };

export class CliUsageError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "CliUsageError";
  }
}

export function parseCliArguments(arguments_: readonly string[]): CliCommand {
  let parsed: ReturnType<typeof parseArgs>;

  try {
    parsed = parseArgs({
      args: [...arguments_],
      strict: true,
      allowPositionals: false,
      options: {
        host: {
          type: "string",
        },
        port: {
          type: "string",
          short: "p",
        },
        help: {
          type: "boolean",
          short: "h",
        },
        version: {
          type: "boolean",
          short: "v",
        },
      },
    });
  } catch (error: unknown) {
    throw new CliUsageError(
      error instanceof Error
        ? error.message
        : "Invalid command-line arguments.",
    );
  }

  const help = readBooleanOption(parsed.values, "help");
  const version = readBooleanOption(parsed.values, "version");
  const host = readStringOption(parsed.values, "host");
  const port = readStringOption(parsed.values, "port");

  if (help && version) {
    throw new CliUsageError("--help and --version cannot be used together.");
  }

  if (help) {
    return {
      kind: "help",
    };
  }

  if (version) {
    return {
      kind: "version",
    };
  }

  return {
    kind: "start",
    ...(host === undefined ? {} : { host }),
    ...(port === undefined ? {} : { port }),
  };
}

function readBooleanOption(
  values: Readonly<Record<string, unknown>>,
  name: string,
): boolean {
  const value = values[name];

  if (value === undefined) {
    return false;
  }

  if (typeof value !== "boolean") {
    throw new CliUsageError(`Option --${name} must be a boolean flag.`);
  }

  return value;
}

function readStringOption(
  values: Readonly<Record<string, unknown>>,
  name: string,
): string | undefined {
  const value = values[name];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string") {
    throw new CliUsageError(`Option --${name} must have a string value.`);
  }

  return value;
}
