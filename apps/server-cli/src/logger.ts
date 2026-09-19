export type LogLevel = "info" | "error";

export interface LogDetails {
  readonly [key: string]: unknown;
}

export function logInfo(
  event: string,
  message: string,
  details?: LogDetails,
): void {
  writeLog("info", event, message, details, process.stdout);
}

export function logError(event: string, message: string, error: unknown): void {
  writeLog(
    "error",
    event,
    message,
    {
      error: serializationError(error),
    },
    process.stderr,
  );
}

function writeLog(
  level: LogLevel,
  event: string,
  message: string,
  details: LogDetails | undefined,
  stream: NodeJS.WriteStream,
): void {
  stream.write(
    `${JSON.stringify({
      timestamp: new Date().toISOString(),
      level,
      event,
      message,
      ...(details === undefined ? {} : { details }),
    })}\n`,
  );
}

function serializationError(error: unknown): LogDetails {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      ...(error.stack === undefined ? {} : { stack: error.stack }),
    };
  }

  return {
    name: "UnknownError",
    message: String(error),
  };
}
