import {
  closeSync,
  existsSync,
  fsyncSync,
  ftruncateSync,
  mkdirSync,
  openSync,
  readFileSync,
  renameSync,
  writeSync,
} from "node:fs";
import { dirname, join } from "node:path";

import { writeFileAtomic } from "../engine/files.js";
import { acquireDirectoryLock } from "../engine/lock.js";
import {
  STORAGE_FORMAT,
  STORAGE_FORMAT_VERSION,
} from "../engine/storage-engine.js";
import { StorageError, StorageErrorCode } from "../errors.js";
import { ioError } from "../io-error.js";
import { SEGMENT_HEADER_SIZE, encodeSegmentHeader } from "../wal/format.js";
import { syncDirectory } from "../wal/index.js";

import {
  inspectDataDirectory,
  type InspectionReport,
  type SegmentReport,
} from "./inspect.js";

export const QUARANTINE_DIRECTORY = "quarantine";

export type RepairActionKind =
  | "quarantine-segments"
  | "truncate-log"
  | "create-segment"
  | "rebuild-manifest"
  | "clear-lock";

export type RepairOption = "rebuildManifest" | "clearLock" | "allowDataLoss";

export interface RepairOptions {
  readonly directory: string;
  /** Make the changes. Without it nothing is changed and the plan is returned. */
  readonly apply?: boolean;
  /** Replace a missing or unreadable manifest.json with a new one. */
  readonly rebuildManifest?: boolean;
  /** Take over a lock file left by another host or container. */
  readonly clearLock?: boolean;
  /** Allow steps that discard log records that may not be anywhere else. */
  readonly allowDataLoss?: boolean;
}

export interface RepairAction {
  readonly kind: RepairActionKind;
  readonly description: string;
  /** True when the step can discard records that were not backed up. */
  readonly dataLoss: boolean;
  /** The option that must be given for this step to run, if any. */
  readonly requires?: RepairOption;
  /** False when the required option was not given. */
  readonly allowed: boolean;
  /** True once the step has been carried out. */
  readonly applied: boolean;
}

export interface RepairResult {
  readonly directory: string;
  /** True when changes were made (or attempted), false for a dry run. */
  readonly apply: boolean;
  readonly before: InspectionReport;
  readonly actions: readonly RepairAction[];
  /** Reasons the tool cannot fix something, or cannot change anything. */
  readonly blocked: readonly string[];
  /** Where removed files were moved. Absent if nothing was moved. */
  readonly quarantine?: string;
  /** The directory examined again after the changes. Absent for a dry run. */
  readonly after?: InspectionReport;
}

interface PlannedAction {
  readonly kind: RepairActionKind;
  readonly description: string;
  readonly dataLoss: boolean;
  readonly requires?: RepairOption;
  readonly run: (context: ApplyContext) => void;
}

interface ApplyContext {
  readonly root: string;
  quarantineRoot: string | undefined;
  quarantine(relativePath: string): void;
  saveBytes(relativePath: string, bytes: Uint8Array): void;
}

/**
 * Plans, and with `apply` carries out, the changes that make a damaged data
 * directory open again. Nothing is deleted: everything that is removed is moved
 * to `quarantine/<time>/` inside the data directory.
 *
 * It never invents data. A step that can discard records that are not in any
 * snapshot is marked `dataLoss` and only runs when `allowDataLoss` is given.
 */
export function repairDataDirectory(options: RepairOptions): RepairResult {
  const directory = options.directory;
  const before = inspectDataDirectory(directory);
  const planned: PlannedAction[] = [];
  const blocked: string[] = [];

  planManifest(before, planned, blocked);
  planLog(before, planned, blocked);
  planLock(before, planned, blocked, options);

  const actions = planned.map((action) =>
    describe(action, options, false),
  ) as RepairAction[];

  if (options.apply !== true) {
    return { directory, apply: false, before, actions, blocked };
  }

  if (blocked.length > 0 && planned.length === 0) {
    return { directory, apply: true, before, actions, blocked };
  }

  if (
    before.lock?.state === "running" ||
    (before.lock?.state === "foreign" && options.clearLock !== true)
  ) {
    return { directory, apply: true, before, actions, blocked };
  }

  const lock = acquireDirectoryLock(join(directory, "LOCK"), {
    reclaimForeignLock: options.clearLock === true,
  });
  const context = createContext(directory);
  const applied = new Set<PlannedAction>();

  try {
    // Examine again under the lock: nothing may have changed since the plan.
    const current = inspectDataDirectory(directory);

    if (!sameProblem(before, current)) {
      throw new StorageError(
        StorageErrorCode.Io,
        `The data directory ${directory} changed while the repair was being planned. Run the command again.`,
      );
    }

    for (const action of planned) {
      if (!isAllowed(action, options)) {
        continue;
      }

      action.run(context);
      applied.add(action);
    }
  } finally {
    lock.release();
  }

  return {
    directory,
    apply: true,
    before,
    actions: planned.map((action) =>
      describe(action, options, applied.has(action)),
    ),
    blocked,
    ...(context.quarantineRoot === undefined
      ? {}
      : { quarantine: context.quarantineRoot }),
    after: inspectDataDirectory(directory),
  };
}

function isAllowed(action: PlannedAction, options: RepairOptions): boolean {
  return action.requires === undefined || options[action.requires] === true;
}

function describe(
  action: PlannedAction,
  options: RepairOptions,
  applied: boolean,
): RepairAction {
  return {
    kind: action.kind,
    description: action.description,
    dataLoss: action.dataLoss,
    ...(action.requires === undefined ? {} : { requires: action.requires }),
    allowed: isAllowed(action, options),
    applied,
  };
}

function sameProblem(a: InspectionReport, b: InspectionReport): boolean {
  return (
    a.manifest.status === b.manifest.status &&
    a.log.segments.length === b.log.segments.length &&
    a.log.lastLsn === b.log.lastLsn &&
    a.snapshots.length === b.snapshots.length
  );
}

function planManifest(
  report: InspectionReport,
  planned: PlannedAction[],
  blocked: string[],
): void {
  const status = report.manifest.status;

  if (status === "foreign" || status === "newer") {
    blocked.push(
      `${report.manifest.problem ?? "The manifest cannot be used."} The repair command does not change it.`,
    );

    return;
  }

  const needsRebuild =
    status === "unreadable" ||
    status === "invalid" ||
    (status === "missing" && report.log.segments.length > 0);

  if (!needsRebuild) {
    return;
  }

  planned.push({
    kind: "rebuild-manifest",
    description: `Write a new manifest.json for storage format version ${STORAGE_FORMAT_VERSION}${status === "missing" ? "" : " and move the old one to quarantine"}. Only do this if the files were written by this version of SinterDB.`,
    dataLoss: false,
    requires: "rebuildManifest",
    run: (context) => {
      if (status !== "missing") {
        context.quarantine("manifest.json");
      }

      const manifest = {
        format: STORAGE_FORMAT,
        formatVersion: STORAGE_FORMAT_VERSION,
        createdAt: new Date().toISOString(),
      };

      writeFileAtomic(
        context.root,
        join(context.root, "manifest.json"),
        `${JSON.stringify(manifest, null, 2)}\n`,
      );
    },
  });
}

function planLock(
  report: InspectionReport,
  planned: PlannedAction[],
  blocked: string[],
  options: RepairOptions,
): void {
  const lock = report.lock;

  if (lock === undefined) {
    return;
  }

  if (lock.state === "running") {
    blocked.push(
      `A running process (id ${lock.holder?.pid ?? "unknown"}) holds the lock on this directory. Stop it before repairing.`,
    );

    return;
  }

  if (lock.state === "foreign") {
    planned.push({
      kind: "clear-lock",
      description: `Take over the lock left by ${lock.holder?.hostname ?? "another host"} (process ${lock.holder?.pid ?? "unknown"}). Only do this if that server is no longer running.`,
      dataLoss: false,
      requires: "clearLock",
      // The lock is taken over when the repair starts; nothing more to do.
      run: () => undefined,
    });

    if (options.clearLock !== true) {
      blocked.push(
        "The lock was written by another host, so nothing can be changed without --clear-lock.",
      );
    }
  }
}

function planLog(
  report: InspectionReport,
  planned: PlannedAction[],
  blocked: string[],
): void {
  if (report.recovery.problems.length === 0) {
    return;
  }

  const { log, recovery } = report;
  const baseLsn = recovery.baseLsn;
  const segments = log.segments;
  const logProblems = log.damage !== undefined || hasLogShortfall(report);

  if (!logProblems) {
    return;
  }

  // The first segment that can be kept. Everything before the last bad
  // segment is useless to the server, and is harmless to remove when a
  // snapshot already holds what it recorded.
  const firstClean = firstCleanIndex(segments);

  if (
    log.damage !== undefined &&
    firstClean < segments.length &&
    baseLsn > 0n &&
    (segments[firstClean]?.firstLsn ?? baseLsn + 2n) <= baseLsn + 1n
  ) {
    const prefix = segments.slice(0, firstClean);

    planned.push({
      kind: "quarantine-segments",
      description: `Move ${prefix.length} damaged or disconnected log segment${prefix.length === 1 ? "" : "s"} (${prefix.map((s) => s.file).join(", ")}) to quarantine. The snapshot ${recovery.baseSnapshot ?? ""} already holds everything they recorded, so no data is lost.`,
      dataLoss: false,
      run: (context) => {
        for (const segment of prefix) {
          context.quarantine(`wal/${segment.file}`);
        }
      },
    });

    return;
  }

  planTruncation(report, planned, blocked);
}

function hasLogShortfall(report: InspectionReport): boolean {
  const { log, recovery } = report;
  const first = log.firstLsn ?? 1n;

  return first > recovery.baseLsn + 1n || log.lastLsn < recovery.baseLsn;
}

/** Index of the first segment after the last damaged or disconnected one. */
function firstCleanIndex(segments: readonly SegmentReport[]): number {
  let clean = 0;

  segments.forEach((segment, index) => {
    const last = index === segments.length - 1;
    const bad =
      segment.status === "corrupt" ||
      segment.status === "bad-header" ||
      (segment.status === "incomplete-header" && !last);

    if (bad) {
      clean = index + 1;
    }

    if (segment.gap !== undefined) {
      clean = Math.max(clean, index);
    }
  });

  return clean;
}

function planTruncation(
  report: InspectionReport,
  planned: PlannedAction[],
  blocked: string[],
): void {
  const { log, recovery } = report;
  const baseLsn = recovery.baseLsn;
  const segments = log.segments;
  let keep = segments.length;
  let cutAt: { index: number; offset: number } | undefined;

  if (log.damage !== undefined) {
    const index = segments.findIndex(
      (segment) =>
        join(report.directory, "wal", segment.file) === log.damage?.file,
    );
    const segment = segments[index] as SegmentReport;

    if (
      segment.status === "corrupt" &&
      segment.validBytes > SEGMENT_HEADER_SIZE
    ) {
      keep = index + 1;
      cutAt = { index, offset: segment.validBytes };
    } else if (segment.status === "corrupt") {
      keep = index + 1;
      cutAt = { index, offset: SEGMENT_HEADER_SIZE };
    } else {
      keep = index;
    }
  }

  const kept = segments.slice(0, keep);
  const keptLast = log.lastLsn;
  const keptFirst = kept[0]?.firstLsn;

  if (keptFirst !== undefined && keptFirst > baseLsn + 1n) {
    blocked.push(
      `The log before ${keptFirst} is gone and no readable snapshot covers it, so the repair command cannot rebuild the directory. Restore it from a backup.`,
    );

    return;
  }

  const dropAll = kept.length === 0 || keptLast < baseLsn;

  if (dropAll) {
    const startAt = baseLsn + 1n;

    planned.push({
      kind: "quarantine-segments",
      description: `Move all ${segments.length} log segment${segments.length === 1 ? "" : "s"} to quarantine. The log ends at ${keptLast} but recovery needs it to reach ${baseLsn}; writes made after the snapshot ${recovery.baseSnapshot ?? ""} may be lost.`,
      dataLoss: true,
      requires: "allowDataLoss",
      run: (context) => {
        for (const segment of segments) {
          context.quarantine(`wal/${segment.file}`);
        }
      },
    });

    if (baseLsn > 0n) {
      planned.push({
        kind: "create-segment",
        description: `Start a new, empty log segment at sequence number ${startAt}.`,
        dataLoss: false,
        requires: "allowDataLoss",
        run: (context) => {
          createSegment(context.root, startAt);
        },
      });
    }

    return;
  }

  const dropped = segments.slice(keep);

  planned.push({
    kind: "truncate-log",
    description: `Cut the log after sequence number ${keptLast}${cutAt === undefined ? "" : ` (byte ${cutAt.offset} of ${segments[cutAt.index]?.file ?? ""})`}${dropped.length > 0 ? ` and move ${dropped.length} later segment${dropped.length === 1 ? "" : "s"} to quarantine` : ""}. Records after that point are lost.`,
    dataLoss: true,
    requires: "allowDataLoss",
    run: (context) => {
      for (const segment of dropped) {
        context.quarantine(`wal/${segment.file}`);
      }

      if (cutAt !== undefined) {
        truncateSegment(
          context,
          `wal/${segments[cutAt.index]?.file ?? ""}`,
          cutAt.offset,
        );
      }
    },
  });
}

function createContext(root: string): ApplyContext {
  const context: ApplyContext = {
    root,
    quarantineRoot: undefined,
    quarantine(relativePath: string): void {
      const target = join(ensureQuarantine(context), relativePath);

      try {
        mkdirSync(dirname(target), { recursive: true });
        renameSync(join(root, relativePath), target);
      } catch (error: unknown) {
        throw ioError("move a file to quarantine", target, error);
      }

      syncDirectory(dirname(join(root, relativePath)));
      syncDirectory(dirname(target));
    },
    saveBytes(relativePath: string, bytes: Uint8Array): void {
      const target = join(ensureQuarantine(context), relativePath);

      mkdirSync(dirname(target), { recursive: true });
      writeNew(target, bytes);
      syncDirectory(dirname(target));
    },
  };

  return context;
}

function ensureQuarantine(context: ApplyContext): string {
  if (context.quarantineRoot !== undefined) {
    return context.quarantineRoot;
  }

  const stamp = new Date()
    .toISOString()
    .replace(/\.\d+Z$/, "Z")
    .replace(/[-:]/g, "");
  const base = join(context.root, QUARANTINE_DIRECTORY);
  let path = join(base, stamp);

  for (let suffix = 2; existsSync(path); suffix += 1) {
    path = join(base, `${stamp}-${suffix}`);
  }

  mkdirSync(path, { recursive: true });
  syncDirectory(base);
  context.quarantineRoot = path;

  return path;
}

function truncateSegment(
  context: ApplyContext,
  relativePath: string,
  offset: number,
): void {
  const path = join(context.root, relativePath);
  const bytes = readFileSync(path);

  if (bytes.byteLength > offset) {
    // Keep the cut-off bytes: they may help someone recover a record by hand.
    context.saveBytes(`${relativePath}.tail`, bytes.subarray(offset));
  }

  const fd = openSync(path, "r+");

  try {
    ftruncateSync(fd, offset);
    fsyncSync(fd);
  } catch (error: unknown) {
    throw ioError("truncate a log segment", path, error, false);
  } finally {
    closeSync(fd);
  }
}

function createSegment(root: string, firstLsn: bigint): void {
  const path = join(
    root,
    "wal",
    `${firstLsn.toString().padStart(20, "0")}.wal`,
  );

  writeNew(path, encodeSegmentHeader(firstLsn));
  syncDirectory(join(root, "wal"));
}

function writeNew(path: string, bytes: Uint8Array): void {
  let fd: number | undefined;

  try {
    fd = openSync(path, "wx");

    let written = 0;

    while (written < bytes.byteLength) {
      written += writeSync(fd, bytes, written, bytes.byteLength - written);
    }

    fsyncSync(fd);
  } catch (error: unknown) {
    throw ioError("write a file", path, error);
  } finally {
    if (fd !== undefined) {
      closeSync(fd);
    }
  }
}
