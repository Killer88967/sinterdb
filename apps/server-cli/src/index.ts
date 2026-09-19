#!/usr/bin/env node

import { CliUsageError, HELP_TEXT } from "./cli.js";
import { logError } from "./logger.js";
import { main } from "./main.js";

try {
  await main();
} catch (error: unknown) {
  if (error instanceof CliUsageError) {
    process.stderr.write(`${error.message}\n\n${HELP_TEXT}`);
    process.exitCode = 2;
  } else {
    logError("server.start_failed", "SinterDB server failed to start.", error);
    process.exitCode = 1;
  }
}
