import {
  SERVER_PRODUCT_VERSION,
  SinterServer,
  type ServerConfigInput,
} from "@sinterdb-internal/server";

import { HELP_TEXT, parseCliArguments, type CliCommand } from "./cli.js";
import { logError, logInfo, logWarning } from "./logger.js";

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
    ...(command.dataDir === undefined
      ? {}
      : { dataDirectory: command.dataDir }),
    ...(command.durability === undefined
      ? {}
      : { durability: command.durability }),
    ...(command.checkpointBytes === undefined
      ? {}
      : { checkpointThresholdBytes: command.checkpointBytes }),
    ...(command.reclaimLock === true ? { reclaimLock: true } : {}),
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

  // A client that disconnects abruptly is not a reason to stop the server.
  server.on("connectionError", (error: Error) => {
    logWarning(
      "server.connection_error",
      "A client connection failed and was closed.",
      error,
    );
  });

  server.on("error", (error: Error) => {
    process.exitCode = 1;

    logError(
      "server.runtime_error",
      "SinterDB server encountered a runtime error.",
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
    ...(server.config.dataDirectory === undefined
      ? { storage: "memory" }
      : {
          storage: "disk",
          dataDirectory: server.config.dataDirectory,
          durability: server.config.durability,
          databases: server.catalog.databaseCount,
          collections: server.catalog.collectionCount,
          checkpointLsn: String(server.recovery?.checkpointLsn ?? 0n),
          replayedRecords: server.recovery?.replayedRecords ?? 0,
          rebuiltIndexes: server.recovery?.rebuiltIndexes ?? 0,
          skippedCheckpoints: server.recovery?.skippedCheckpoints.map(
            (entry) => ({
              file: entry.file,
              reason: entry.reason,
            }),
          ),
        }),
  });
}
