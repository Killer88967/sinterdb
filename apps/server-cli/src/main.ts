import {
  SERVER_PRODUCT_VERSION,
  SinterServer,
  type ServerConfigInput,
} from "@sinterdb-internal/server";

import { HELP_TEXT, parseCliArguments, type CliCommand } from "./cli.js";
import { logError, logInfo } from "./logger.js";

export async function main(
  arguments_: readonly string[] = process.argv.slice(2),
): Promise<void> {
  const command = parseCliArguments(arguments_);

  switch (command.kind) {
    case "help":
      process.stdout.write(HELP_TEXT);
      return;

    case "version":
      process.stdout.write(`${SERVER_PRODUCT_VERSION}\n`);
      return;

    case "start":
      await startServer(command);
  }
}

async function startServer(
  command: Extract<CliCommand, { kind: "start" }>,
): Promise<void> {
  const config: ServerConfigInput = {
    ...(command.host === undefined ? {} : { host: command.host }),
    ...(command.port === undefined ? {} : { port: command.port }),
  };

  const server = new SinterServer(config);
  let shutdownOperation: Promise<void> | undefined;

  const shutdown = (reason: string): Promise<void> => {
    if (shutdownOperation !== undefined) {
      return shutdownOperation;
    }

    shutdownOperation = (async () => {
      logInfo("server.stopping", "SinterDB server is stopping.", {
        reason,
        activeConnections: server.activeConnectionCount,
      });

      await server.stop();

      logInfo("server.stopped", "SinterDB server stopped cleanly.", {
        reason,
      });
    })();

    return shutdownOperation;
  };

  const handleSignal = (signal: NodeJS.Signals): void => {
    void shutdown(signal).catch((error: unknown) => {
      process.exitCode = 1;

      logError(
        "server.shutdown_failed",
        "SinterDB server failed to stop cleanly.",
        error,
      );
    });
  };

  process.once("SIGINT", handleSignal);
  process.once("SIGTERM", handleSignal);

  server.on("error", (error: Error) => {
    process.exitCode = 1;

    logError(
      "server.runtime_error",
      "SinterDB server encounter a runtime error.",
      error,
    );

    void shutdown("server-error").catch((shutdownError: unknown) => {
      logError(
        "server.shutdown_failed",
        "SinterDB server failed to stop after a runtime error.",
        shutdownError,
      );
    });
  });

  const address = await server.start();

  logInfo("server.started", "SinterDB server is listening.", {
    host: address.host,
    port: address.port,
    family: address.family,
    version: SERVER_PRODUCT_VERSION,
  });
}
