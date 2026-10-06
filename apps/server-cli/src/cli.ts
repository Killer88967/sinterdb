import { parseArgs } from "node:util";

export const HELP_TEXT = `SinterDB Server

Usage:
  sinterd [options]

Options:
  --host <host>       Address to listen on
  -p, --port <port>   TCP port to listen on
  --data-dir <path>   Store data durably in this directory
  --durability <mode> How writes are acknowledged: fsync (default) or buffered
  --checkpoint-bytes <n>
                      Bytes of log between automatic checkpoints (default 64 MiB)
  -h, --help          Show this help message
  -v, --version       Show the server version

Without --data-dir all data is kept in memory and lost on shutdown.

Durability modes (with --data-dir):
  fsync     A write is acknowledged after it reaches stable storage. It
            survives a crash or power loss.
  buffered  A write is acknowledged after it reaches the operating system. It
            survives a server crash but can be lost on power loss.

Environment:
  SINTERDB_HOST          Default listening address
  SINTERDB_PORT          Default listening port
  SINTERDB_DATA_DIR      Default data directory
  SINTERDB_DURABILITY    Default durability mode
  SINTERDB_CHECKPOINT_BYTES
                         Default bytes of log between checkpoints

`;

export type CliCommand =
  | {
      kind: "start";
      host?: string;
      port?: string;
      dataDir?: string;
      durability?: string;
      checkpointBytes?: string;
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
        "data-dir": {
          type: "string",
        },
        durability: {
          type: "string",
        },
        "checkpoint-bytes": {
          type: "string",
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
  const dataDir = readStringOption(parsed.values, "data-dir");
  const durability = readStringOption(parsed.values, "durability");
  const checkpointBytes = readStringOption(parsed.values, "checkpoint-bytes");

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
    ...(dataDir === undefined ? {} : { dataDir }),
    ...(durability === undefined ? {} : { durability }),
    ...(checkpointBytes === undefined ? {} : { checkpointBytes }),
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
