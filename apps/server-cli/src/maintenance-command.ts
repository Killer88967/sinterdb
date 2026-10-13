import { parseArgs } from "node:util";

import {
  inspectDataDirectory,
  repairDataDirectory,
  type InspectionReport,
  type RepairOptions,
  type RepairResult,
} from "@sinterdb-internal/server";

export const MAINTENANCE_COMMANDS = ["inspect", "repair"] as const;

export type MaintenanceCommandName = (typeof MAINTENANCE_COMMANDS)[number];

export const MAINTENANCE_HELP_TEXT = `SinterDB Server: inspect and repair commands

Usage:
  sinterd inspect --data-dir <path> [--json]
  sinterd repair --data-dir <path> [--apply] [--rebuild-manifest]
                 [--clear-lock] [--allow-data-loss] [--json]

Options:
  --data-dir <path>     The data directory to examine or repair
  --json                Print the report as JSON
  --apply               Make the changes. Without it, repair only shows what
                        it would do
  --rebuild-manifest    Replace a missing or unreadable manifest.json
  --clear-lock          Take over a lock left by another host or container.
                        Only use it when no server can be using the directory
  --allow-data-loss     Allow steps that discard log records which are not in
                        any snapshot
  -h, --help            Show this help message

inspect never changes anything and can run while a server is using the
directory. repair needs the server stopped. Nothing is deleted: removed files
are moved to quarantine/ inside the data directory.

Exit codes: inspect 0 if the directory can be opened, 1 if not. repair 0 if the
directory is, or after --apply becomes, openable and nothing was skipped, 1
otherwise. 2 for a usage error.
`;

export interface MaintenanceCommand {
  readonly name: MaintenanceCommandName;
  readonly help: boolean;
  readonly dataDir?: string;
  readonly json: boolean;
  readonly apply: boolean;
  readonly rebuildManifest: boolean;
  readonly clearLock: boolean;
  readonly allowDataLoss: boolean;
}

export class MaintenanceUsageError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "MaintenanceUsageError";
  }
}

export function isMaintenanceCommandName(
  value: unknown,
): value is MaintenanceCommandName {
  return MAINTENANCE_COMMANDS.some((name) => name === value);
}

export function parseMaintenanceArguments(
  name: MaintenanceCommandName,
  arguments_: readonly string[],
): MaintenanceCommand {
  let values: ReturnType<typeof parseArgs>["values"];

  try {
    values = parseArgs({
      args: [...arguments_],
      strict: true,
      allowPositionals: false,
      options: {
        "data-dir": { type: "string" },
        json: { type: "boolean" },
        apply: { type: "boolean" },
        "rebuild-manifest": { type: "boolean" },
        "clear-lock": { type: "boolean" },
        "allow-data-loss": { type: "boolean" },
        help: { type: "boolean", short: "h" },
      },
    }).values;
  } catch (error: unknown) {
    throw new MaintenanceUsageError(
      error instanceof Error
        ? error.message
        : "Invalid command-line arguments.",
    );
  }

  const dataDir =
    typeof values["data-dir"] === "string" ? values["data-dir"] : undefined;
  const help = values["help"] === true;
  const command: MaintenanceCommand = {
    name,
    help,
    ...(dataDir === undefined ? {} : { dataDir }),
    json: values["json"] === true,
    apply: values["apply"] === true,
    rebuildManifest: values["rebuild-manifest"] === true,
    clearLock: values["clear-lock"] === true,
    allowDataLoss: values["allow-data-loss"] === true,
  };

  if (help) {
    return command;
  }

  if (dataDir === undefined || dataDir === "") {
    throw new MaintenanceUsageError(`${name} requires --data-dir.`);
  }

  if (name === "inspect") {
    const repairOnly: [string, boolean][] = [
      ["--apply", command.apply],
      ["--rebuild-manifest", command.rebuildManifest],
      ["--clear-lock", command.clearLock],
      ["--allow-data-loss", command.allowDataLoss],
    ];

    for (const [option, given] of repairOnly) {
      if (given) {
        throw new MaintenanceUsageError(`inspect does not accept ${option}.`);
      }
    }
  }

  return command;
}

export function runMaintenanceCommand(command: MaintenanceCommand): void {
  if (command.help) {
    process.stdout.write(MAINTENANCE_HELP_TEXT);
    return;
  }

  const directory = command.dataDir as string;

  try {
    if (command.name === "inspect") {
      const report = inspectDataDirectory(directory);

      process.stdout.write(
        command.json ? toJson(report) : formatInspection(report),
      );

      if (!report.recovery.recoverable) {
        process.exitCode = 1;
      }

      return;
    }

    const options: RepairOptions = {
      directory,
      ...(command.apply ? { apply: true } : {}),
      ...(command.rebuildManifest ? { rebuildManifest: true } : {}),
      ...(command.clearLock ? { clearLock: true } : {}),
      ...(command.allowDataLoss ? { allowDataLoss: true } : {}),
    };
    const result = repairDataDirectory(options);

    process.stdout.write(command.json ? toJson(result) : formatRepair(result));

    if (!repairSucceeded(result)) {
      process.exitCode = 1;
    }
  } catch (error: unknown) {
    process.stderr.write(
      `${command.name} failed: ${error instanceof Error ? error.message : String(error)}\n`,
    );
    process.exitCode = 1;
  }
}

function repairSucceeded(result: RepairResult): boolean {
  if (!result.apply) {
    return result.before.recovery.recoverable && result.actions.length === 0;
  }

  return (
    result.after?.recovery.recoverable === true &&
    result.blocked.length === 0 &&
    result.actions.every((action) => action.applied)
  );
}

function toJson(value: unknown): string {
  return `${JSON.stringify(
    value,
    (_key, item: unknown) =>
      typeof item === "bigint" ? item.toString() : item,
    2,
  )}\n`;
}

export function formatInspection(report: InspectionReport): string {
  const lines: string[] = [`Data directory: ${report.directory}`];
  const { recovery, manifest, log } = report;

  lines.push(
    recovery.recoverable
      ? "Verdict: the server can open this directory."
      : "Verdict: the server CANNOT open this directory.",
  );

  for (const problem of recovery.problems) {
    lines.push(`  problem: ${problem}`);
  }

  lines.push("");
  lines.push(
    manifest.status === "ok"
      ? `Manifest: ok, storage format version ${manifest.formatVersion}${manifest.needsUpgrade ? " (will be upgraded on the next start)" : ""}`
      : `Manifest: ${manifest.status}${manifest.problem === undefined ? "" : `, ${manifest.problem}`}`,
  );

  if (report.lock === undefined) {
    lines.push("Lock: none");
  } else {
    const holder = report.lock.holder;

    lines.push(
      `Lock: ${report.lock.state}${holder === undefined ? "" : `, process ${holder.pid} on ${holder.hostname}, started ${holder.startedAt}`}`,
    );
  }

  lines.push("");
  lines.push(`Snapshots: ${report.snapshots.length}`);

  for (const snapshot of report.snapshots) {
    lines.push(
      `  ${snapshot.file}  ${snapshot.status}  ${snapshot.bytes} bytes` +
        (snapshot.status === "ok"
          ? `, ${snapshot.collections} collections, ${snapshot.documents} documents`
          : `, ${snapshot.problem}`),
    );
  }

  lines.push("");
  lines.push(
    `Log: ${log.segments.length} segments, ${log.records} intact records` +
      (log.firstLsn === undefined
        ? ""
        : `, sequence numbers ${log.firstLsn} to ${log.lastLsn}`),
  );

  for (const segment of log.segments) {
    if (segment.status === "ok" && segment.gap === undefined) {
      continue;
    }

    lines.push(
      `  ${segment.file}  ${segment.status}${segment.problem === undefined ? "" : `, ${segment.problem}`}${segment.gap === undefined ? "" : `, ${segment.gap}`}`,
    );
  }

  if (report.leftovers.length > 0) {
    lines.push("");
    lines.push(`Temporary files (removed on the next start):`);

    for (const name of report.leftovers) {
      lines.push(`  ${name}`);
    }
  }

  if (recovery.recoverable) {
    lines.push("");
    lines.push(
      recovery.baseSnapshot === undefined
        ? `Recovery would replay ${recovery.recordsToReplay} log records.`
        : `Recovery would start from ${recovery.baseSnapshot} and replay ${recovery.recordsToReplay} log records.`,
    );
  } else {
    lines.push("");
    lines.push(
      "Run sinterd repair --data-dir <path> to see what can be fixed.",
    );
  }

  return `${lines.join("\n")}\n`;
}

export function formatRepair(result: RepairResult): string {
  const lines: string[] = [`Data directory: ${result.directory}`];

  if (result.actions.length === 0 && result.blocked.length === 0) {
    lines.push(
      result.before.recovery.recoverable
        ? "Nothing to repair: the server can open this directory."
        : "Nothing the repair command can fix. Problems:",
    );

    for (const problem of result.before.recovery.problems) {
      lines.push(`  ${problem}`);
    }
  }

  if (result.actions.length > 0) {
    lines.push(result.apply ? "Steps:" : "Steps it would take:");

    for (const action of result.actions) {
      const state = !result.apply
        ? ""
        : action.applied
          ? "[done] "
          : "[skipped] ";
      const notes = [
        action.dataLoss ? "can lose data" : undefined,
        action.requires === undefined || action.allowed
          ? undefined
          : `needs ${flagFor(action.requires)}`,
      ].filter((note): note is string => note !== undefined);

      lines.push(
        `  ${state}${action.description}${notes.length === 0 ? "" : ` (${notes.join("; ")})`}`,
      );
    }
  }

  for (const reason of result.blocked) {
    lines.push(`Blocked: ${reason}`);
  }

  if (!result.apply) {
    if (result.actions.length > 0) {
      lines.push("Nothing was changed. Add --apply to carry out these steps.");
    }

    return `${lines.join("\n")}\n`;
  }

  if (result.quarantine !== undefined) {
    lines.push(`Removed files were moved to ${result.quarantine}`);
  }

  if (result.after !== undefined) {
    lines.push(
      result.after.recovery.recoverable
        ? "The server can now open this directory."
        : "The server still cannot open this directory:",
    );

    if (!result.after.recovery.recoverable) {
      for (const problem of result.after.recovery.problems) {
        lines.push(`  ${problem}`);
      }
    }
  }

  return `${lines.join("\n")}\n`;
}

function flagFor(option: string): string {
  switch (option) {
    case "rebuildManifest":
      return "--rebuild-manifest";
    case "clearLock":
      return "--clear-lock";
    default:
      return "--allow-data-loss";
  }
}
