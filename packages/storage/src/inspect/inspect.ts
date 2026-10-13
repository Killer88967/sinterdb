import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import {
  CheckpointDamagedError,
  listCheckpoints,
  readCheckpoint,
} from "../engine/checkpoint.js";
import { describeLock, type LockDescription } from "../engine/lock.js";
import {
  STORAGE_FORMAT,
  STORAGE_FORMAT_VERSION,
} from "../engine/storage-engine.js";
import { StorageError, StorageErrorCode } from "../errors.js";
import { ioError } from "../io-error.js";
import {
  SEGMENT_HEADER_SIZE,
  decodeSegmentHeader,
  scanRecord,
} from "../wal/format.js";

const SEGMENT_NAME = /^(\d{20})\.wal$/;

export type ManifestStatus =
  "ok" | "missing" | "unreadable" | "foreign" | "invalid" | "newer";

export interface ManifestReport {
  readonly status: ManifestStatus;
  /** Why the manifest is not usable. Absent when the status is `ok`. */
  readonly problem?: string;
  readonly formatVersion?: number;
  readonly createdAt?: string;
  readonly upgradedFrom?: number;
  /** Set when an upgrade was interrupted; the next start finishes it. */
  readonly migratingFrom?: number;
  /** True when the next start will upgrade the files to the current version. */
  readonly needsUpgrade: boolean;
}

export interface SnapshotReport {
  readonly file: string;
  readonly lsn: bigint;
  readonly bytes: number;
  readonly status: "ok" | "damaged";
  /** Why the snapshot cannot be used. Absent when the status is `ok`. */
  readonly problem?: string;
  readonly collections?: number;
  readonly documents?: number;
}

export type SegmentStatus =
  /** Every record is intact. */
  | "ok"
  /** The file ends inside a record, as after a crash during a write. */
  | "torn-tail"
  /** A record in the middle of the file is damaged. */
  | "corrupt"
  /** The header cannot be used, or does not agree with the file name. */
  | "bad-header"
  /** The file is too short or empty to hold a header. */
  | "incomplete-header";

export interface SegmentReport {
  readonly file: string;
  readonly bytes: number;
  readonly status: SegmentStatus;
  readonly problem?: string;
  /** The first sequence number the segment claims, if its header is usable. */
  readonly firstLsn?: bigint;
  /** The sequence number of the last intact record, if the header is usable. */
  readonly lastLsn?: bigint;
  readonly records: number;
  /** The length of the intact part of the file, header included. */
  readonly validBytes: number;
  /** Set when this segment does not follow on from the one before it. */
  readonly gap?: string;
}

export interface LogDamage {
  readonly file: string;
  readonly offset: number;
  readonly reason: string;
  /** The last sequence number before the damage, or 0 if there is none. */
  readonly lastGoodLsn: bigint;
}

export interface LogReport {
  readonly segments: readonly SegmentReport[];
  /** The oldest sequence number the intact log holds, if any. */
  readonly firstLsn?: bigint;
  /** The newest sequence number before any damage; 0 when there are none. */
  readonly lastLsn: bigint;
  readonly records: number;
  /**
   * The first thing that stops the server from reading the log. A torn end
   * on the last segment is normal after a crash and is not reported here.
   */
  readonly damage?: LogDamage;
}

export interface RecoveryVerdict {
  /** True when starting the server on this directory would succeed. */
  readonly recoverable: boolean;
  readonly problems: readonly string[];
  /** The snapshot recovery would start from, if any. */
  readonly baseSnapshot?: string;
  readonly baseLsn: bigint;
  /** How many log records recovery would replay on top of the snapshot. */
  readonly recordsToReplay: bigint;
}

export interface InspectionReport {
  readonly directory: string;
  readonly manifest: ManifestReport;
  readonly lock?: LockDescription;
  /** Newest first. */
  readonly snapshots: readonly SnapshotReport[];
  readonly log: LogReport;
  /** Temporary files a crash left behind; the server removes them. */
  readonly leftovers: readonly string[];
  readonly recovery: RecoveryVerdict;
}

/**
 * Examines a data directory without changing it. Unlike opening the
 * directory with a server, nothing is repaired, truncated or deleted, and no
 * lock is taken, so it is safe to run while a server is using the directory
 * (the answer may then be out of date by the time it is read).
 */
export function inspectDataDirectory(directory: string): InspectionReport {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    throw new StorageError(
      StorageErrorCode.Io,
      `The data directory ${directory} does not exist.`,
    );
  }

  const manifest = inspectManifest(directory);
  const lock = describeLock(join(directory, "LOCK"));
  const snapshots = inspectSnapshots(join(directory, "checkpoints"));
  const log = inspectLog(join(directory, "wal"));
  const leftovers = findLeftovers(directory);
  const recovery = judge(manifest, snapshots, log);

  return {
    directory,
    manifest,
    ...(lock === undefined ? {} : { lock }),
    snapshots,
    log,
    leftovers,
    recovery,
  };
}

interface RawManifest {
  format?: unknown;
  formatVersion?: unknown;
  createdAt?: unknown;
  upgradedFrom?: unknown;
  migratingFrom?: unknown;
}

function inspectManifest(directory: string): ManifestReport {
  const path = join(directory, "manifest.json");

  if (!existsSync(path)) {
    return { status: "missing", needsUpgrade: false };
  }

  let parsed: RawManifest;

  try {
    parsed = JSON.parse(readFileSync(path, "utf8")) as RawManifest;
  } catch (error: unknown) {
    return {
      status: "unreadable",
      problem: `manifest.json is not valid JSON: ${(error as Error).message}`,
      needsUpgrade: false,
    };
  }

  if (parsed === null || typeof parsed !== "object") {
    return {
      status: "unreadable",
      problem: "manifest.json does not hold an object.",
      needsUpgrade: false,
    };
  }

  if (parsed.format !== STORAGE_FORMAT) {
    return {
      status: "foreign",
      problem: `manifest.json says the format is ${JSON.stringify(parsed.format)}, so this is not a SinterDB data directory.`,
      needsUpgrade: false,
    };
  }

  const version = parsed.formatVersion;

  if (
    typeof version !== "number" ||
    !Number.isInteger(version) ||
    version < 1
  ) {
    return {
      status: "invalid",
      problem: "manifest.json has no valid format version.",
      needsUpgrade: false,
    };
  }

  const known = {
    formatVersion: version,
    ...(typeof parsed.createdAt === "string"
      ? { createdAt: parsed.createdAt }
      : {}),
    ...(typeof parsed.upgradedFrom === "number"
      ? { upgradedFrom: parsed.upgradedFrom }
      : {}),
    ...(typeof parsed.migratingFrom === "number"
      ? { migratingFrom: parsed.migratingFrom }
      : {}),
  };

  if (version > STORAGE_FORMAT_VERSION) {
    return {
      status: "newer",
      problem: `The directory uses storage format version ${version} but this version of SinterDB supports up to ${STORAGE_FORMAT_VERSION}.`,
      ...known,
      needsUpgrade: false,
    };
  }

  const interrupted =
    typeof parsed.migratingFrom === "number" &&
    Number.isInteger(parsed.migratingFrom) &&
    parsed.migratingFrom >= 1 &&
    parsed.migratingFrom < STORAGE_FORMAT_VERSION;

  if (typeof parsed.migratingFrom === "number" && !interrupted) {
    return {
      status: "invalid",
      problem: "manifest.json records an upgrade from an invalid version.",
      ...known,
      needsUpgrade: false,
    };
  }

  return {
    status: "ok",
    ...known,
    needsUpgrade: version < STORAGE_FORMAT_VERSION || interrupted,
  };
}

function inspectSnapshots(directory: string): SnapshotReport[] {
  if (!existsSync(directory)) {
    return [];
  }

  const reports: SnapshotReport[] = [];

  for (const entry of listCheckpoints(directory)) {
    const bytes = fileSize(entry.path);

    try {
      const snapshot = readCheckpoint(entry.path);

      if (snapshot.lsn !== entry.lsn) {
        throw new CheckpointDamagedError(
          "The snapshot's sequence number does not match its file name.",
        );
      }

      reports.push({
        file: entry.file,
        lsn: entry.lsn,
        bytes,
        status: "ok",
        collections: snapshot.collections.length,
        documents: snapshot.collections.reduce(
          (sum, collection) => sum + collection.documents.size,
          0,
        ),
      });
    } catch (error: unknown) {
      reports.push({
        file: entry.file,
        lsn: entry.lsn,
        bytes,
        status: "damaged",
        problem: (error as Error).message,
      });
    }
  }

  return reports;
}

function inspectLog(directory: string): LogReport {
  if (!existsSync(directory)) {
    return { segments: [], lastLsn: 0n, records: 0 };
  }

  let names: string[];

  try {
    names = readdirSync(directory)
      .filter((name) => SEGMENT_NAME.test(name))
      .sort();
  } catch (error: unknown) {
    throw ioError("list the log directory", directory, error);
  }

  const segments: SegmentReport[] = [];
  let previous: SegmentReport | undefined;

  names.forEach((name, index) => {
    const isLast = index === names.length - 1;
    let report = analyzeSegment(join(directory, name), name, isLast);

    if (
      previous?.lastLsn !== undefined &&
      report.firstLsn !== undefined &&
      report.firstLsn !== previous.lastLsn + 1n
    ) {
      report = {
        ...report,
        gap: `Expected the segment to start at ${previous.lastLsn + 1n} but it starts at ${report.firstLsn}. A log segment is missing.`,
      };
    }

    segments.push(report);
    previous = report;
  });

  return summarizeLog(directory, segments);
}

function analyzeSegment(
  path: string,
  file: string,
  isLast: boolean,
): SegmentReport {
  let bytes: Uint8Array;

  try {
    bytes = readFileSync(path);
  } catch (error: unknown) {
    throw ioError("read a log segment", path, error);
  }

  const size = bytes.byteLength;
  const nameLsn = BigInt(
    (SEGMENT_NAME.exec(file) as RegExpExecArray)[1] as string,
  );
  const header = decodeSegmentHeader(bytes);

  if (!header.ok) {
    const incomplete =
      size < SEGMENT_HEADER_SIZE || bytes.every((byte) => byte === 0);

    return {
      file,
      bytes: size,
      status: incomplete ? "incomplete-header" : "bad-header",
      problem: header.reason,
      records: 0,
      validBytes: 0,
    };
  }

  if (header.firstLsn !== nameLsn) {
    return {
      file,
      bytes: size,
      status: "bad-header",
      problem: `The segment header starts at ${header.firstLsn} but the file name says ${nameLsn}.`,
      records: 0,
      validBytes: 0,
    };
  }

  let offset = SEGMENT_HEADER_SIZE;
  let expected = header.firstLsn;
  let records = 0;
  let status: SegmentStatus = "ok";
  let problem: string | undefined;

  for (;;) {
    const result = scanRecord(bytes, offset, expected);

    if (result.kind === "end") {
      break;
    }

    if (result.kind === "record") {
      offset = result.end;
      expected = result.lsn + 1n;
      records += 1;
      continue;
    }

    problem = result.reason;
    // A torn end is only normal on the newest segment. Anywhere else the
    // server refuses it, so it counts as damage.
    status = result.kind === "torn" && isLast ? "torn-tail" : "corrupt";
    break;
  }

  return {
    file,
    bytes: size,
    status,
    ...(problem === undefined ? {} : { problem }),
    firstLsn: header.firstLsn,
    lastLsn: expected - 1n,
    records,
    validBytes: offset,
  };
}

function summarizeLog(
  directory: string,
  segments: readonly SegmentReport[],
): LogReport {
  let records = 0;
  let lastLsn = 0n;
  let firstLsn: bigint | undefined;
  let damage: LogDamage | undefined;

  for (const [index, segment] of segments.entries()) {
    const isLast = index === segments.length - 1;
    const path = join(directory, segment.file);

    // The server deletes a last segment that never got a complete header.
    if (segment.status === "incomplete-header" && isLast) {
      break;
    }

    if (
      segment.status === "bad-header" ||
      segment.status === "incomplete-header"
    ) {
      damage = {
        file: path,
        offset: 0,
        reason: segment.problem ?? "The segment header is unusable.",
        lastGoodLsn: lastLsn,
      };
      break;
    }

    if (segment.gap !== undefined) {
      damage = {
        file: path,
        offset: 0,
        reason: segment.gap,
        lastGoodLsn: lastLsn,
      };
      break;
    }

    firstLsn ??= segment.firstLsn;
    records += segment.records;
    lastLsn = segment.lastLsn ?? lastLsn;

    if (segment.status === "corrupt") {
      damage = {
        file: path,
        offset: segment.validBytes,
        reason: segment.problem ?? "A record is damaged.",
        lastGoodLsn: lastLsn,
      };
      break;
    }
  }

  return {
    segments,
    ...(firstLsn === undefined ? {} : { firstLsn }),
    lastLsn,
    records,
    ...(damage === undefined ? {} : { damage }),
  };
}

function findLeftovers(directory: string): string[] {
  const found: string[] = [];

  for (const sub of ["", "checkpoints", "wal"]) {
    const path = join(directory, sub);

    if (!existsSync(path)) {
      continue;
    }

    for (const name of readdirSync(path)) {
      if (name.endsWith(".tmp")) {
        found.push(sub === "" ? name : `${sub}/${name}`);
      }
    }
  }

  return found.sort();
}

/** Applies the same checks the server makes when it opens a directory. */
function judge(
  manifest: ManifestReport,
  snapshots: readonly SnapshotReport[],
  log: LogReport,
): RecoveryVerdict {
  const problems: string[] = [];
  const base = snapshots.find((snapshot) => snapshot.status === "ok");
  const baseLsn = base?.lsn ?? 0n;

  if (manifest.status === "missing") {
    if (log.segments.length > 0) {
      problems.push(
        "manifest.json is missing but the directory holds log files.",
      );
    }
  } else if (manifest.status !== "ok") {
    problems.push(manifest.problem ?? "manifest.json cannot be used.");
  }

  if (log.damage !== undefined) {
    problems.push(
      `The log is damaged in ${log.damage.file} at byte ${log.damage.offset}: ${log.damage.reason}`,
    );
  } else {
    const first = log.firstLsn ?? 1n;

    if (first > baseLsn + 1n) {
      const skipped = snapshots.filter(
        (snapshot) => snapshot.status === "damaged",
      );

      problems.push(
        skipped.length > 0
          ? `The log before ${first} has been removed and the newer snapshot${skipped.length > 1 ? "s" : ""} (${skipped.map((s) => s.file).join(", ")}) cannot be read.`
          : `The log before ${first} has been removed and no snapshot covers it.`,
      );
    }

    if (log.lastLsn < baseLsn) {
      problems.push(
        `The snapshot ${base?.file ?? ""} covers sequence number ${baseLsn} but the log ends at ${log.lastLsn}. The log has lost records.`,
      );
    }
  }

  const recoverable = problems.length === 0;

  return {
    recoverable,
    problems,
    ...(base === undefined ? {} : { baseSnapshot: base.file }),
    baseLsn,
    recordsToReplay:
      recoverable && log.lastLsn > baseLsn ? log.lastLsn - baseLsn : 0n,
  };
}

function fileSize(path: string): number {
  try {
    return statSync(path).size;
  } catch {
    return 0;
  }
}
