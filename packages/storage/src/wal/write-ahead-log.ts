import {
  closeSync,
  fsyncSync,
  ftruncateSync,
  mkdirSync,
  openSync,
  readdirSync,
  readFileSync,
  statSync,
  unlinkSync,
  writeSync,
} from "node:fs";
import { join } from "node:path";

import {
  StorageCorruptionError,
  StorageError,
  StorageErrorCode,
} from "../errors.js";
import {
  SEGMENT_HEADER_SIZE,
  decodeSegmentHeader,
  encodeRecord,
  encodeSegmentHeader,
  scanRecord,
} from "./format.js";

export type DurabilityMode = "buffered" | "fsync";

export const DEFAULT_SEGMENT_SIZE_BYTES = 64 * 1024 * 1024;

export interface WriteAheadLogOptions {
  readonly directory: string;
  /**
   * `fsync` waits for the operating system to flush each append to stable
   * storage. `buffered` only waits for the write to reach the operating
   * system, which survives a process crash but not a power loss.
   */
  readonly durability?: DurabilityMode;
  readonly segmentSizeBytes?: number;
}

export interface WalRecord {
  readonly lsn: bigint;
  readonly type: number;
  readonly payload: Uint8Array;
}

interface SegmentInfo {
  readonly path: string;
  readonly firstLsn: bigint;
}

const SEGMENT_NAME = /^(\d{20})\.wal$/;

export class WriteAheadLog {
  private segments: SegmentInfo[];
  private fd: number | undefined;
  private position: number;
  private nextLsn: bigint;
  private broken = false;
  private closed = false;

  private constructor(
    private readonly directory: string,
    private readonly mode: DurabilityMode,
    private readonly segmentSizeBytes: number,
    segments: SegmentInfo[],
    fd: number,
    position: number,
    nextLsn: bigint,
  ) {
    this.segments = segments;
    this.fd = fd;
    this.position = position;
    this.nextLsn = nextLsn;
  }

  public static open(options: WriteAheadLogOptions): WriteAheadLog {
    const mode = options.durability ?? "fsync";
    const segmentSizeBytes =
      options.segmentSizeBytes ?? DEFAULT_SEGMENT_SIZE_BYTES;

    if (mode !== "buffered" && mode !== "fsync") {
      throw new TypeError('Durability must be "buffered" or "fsync".');
    }

    if (
      !Number.isSafeInteger(segmentSizeBytes) ||
      segmentSizeBytes < SEGMENT_HEADER_SIZE + 64
    ) {
      throw new TypeError("Segment size is too small.");
    }

    try {
      mkdirSync(options.directory, { recursive: true });
    } catch (error: unknown) {
      throw ioError("create the log directory", options.directory, error);
    }

    const recovered = recoverSegments(options.directory);
    const durable = mode === "fsync";

    if (recovered.segments.length === 0) {
      const created = createSegment(options.directory, 1n, durable);

      return new WriteAheadLog(
        options.directory,
        mode,
        segmentSizeBytes,
        [created.info],
        created.fd,
        SEGMENT_HEADER_SIZE,
        1n,
      );
    }

    const last = recovered.segments[
      recovered.segments.length - 1
    ] as SegmentInfo;
    let fd: number;

    try {
      fd = openSync(last.path, "r+");

      if (recovered.validEnd < statSync(last.path).size) {
        ftruncateSync(fd, recovered.validEnd);
        fsyncSync(fd);
      }
    } catch (error: unknown) {
      throw ioError("open the active log segment", last.path, error);
    }

    return new WriteAheadLog(
      options.directory,
      mode,
      segmentSizeBytes,
      recovered.segments,
      fd,
      recovered.validEnd,
      recovered.lastLsn + 1n,
    );
  }

  public get durability(): DurabilityMode {
    return this.mode;
  }

  public get lastLsn(): bigint {
    return this.nextLsn - 1n;
  }

  /**
   * The log sequence number of the oldest record still available. It is
   * greater than 1 once old segments have been removed.
   */
  public get firstLsn(): bigint {
    return (this.segments[0] as SegmentInfo).firstLsn;
  }

  public get segmentCount(): number {
    return this.segments.length;
  }

  public append(type: number, payload: Uint8Array): bigint {
    this.assertWritable();

    const lsn = this.nextLsn;
    const record = encodeRecord(lsn, type, payload);

    if (
      this.position > SEGMENT_HEADER_SIZE &&
      this.position + record.byteLength > this.segmentSizeBytes
    ) {
      this.rotate();
    }

    try {
      writeFully(this.fd as number, record, this.position);

      if (this.mode === "fsync") {
        fsyncSync(this.fd as number);
      }
    } catch (error: unknown) {
      this.broken = true;

      throw ioError("append to the log", this.activePath(), error);
    }

    this.position += record.byteLength;
    this.nextLsn = lsn + 1n;

    return lsn;
  }

  public sync(): void {
    this.assertWritable();

    try {
      fsyncSync(this.fd as number);
    } catch (error: unknown) {
      this.broken = true;

      throw ioError("flush the log", this.activePath(), error);
    }
  }

  public *records(afterLsn = 0n): IterableIterator<WalRecord> {
    this.assertOpen();

    for (let index = 0; index < this.segments.length; index += 1) {
      const segment = this.segments[index] as SegmentInfo;
      const next = this.segments[index + 1];

      if (next !== undefined && next.firstLsn <= afterLsn + 1n) {
        continue;
      }

      const bytes = readSegment(segment.path);
      const header = decodeSegmentHeader(bytes);

      if (!header.ok || header.firstLsn !== segment.firstLsn) {
        throw corruption(
          segment.path,
          0,
          header.ok ? "The segment header changed." : header.reason,
        );
      }

      let offset = SEGMENT_HEADER_SIZE;
      let expected = segment.firstLsn;

      for (;;) {
        const result = scanRecord(bytes, offset, expected);

        if (result.kind === "end" || result.kind === "torn") {
          break;
        }

        if (result.kind === "corrupt") {
          throw corruption(segment.path, offset, result.reason, expected);
        }

        if (result.lsn > afterLsn) {
          yield {
            lsn: result.lsn,
            type: result.type,
            payload: Uint8Array.from(result.payload),
          };
        }

        offset = result.end;
        expected = result.lsn + 1n;
      }
    }
  }

  /**
   * Deletes whole segments that only contain records at or below `lsn`. The
   * active segment is never deleted.
   */
  public truncateThrough(lsn: bigint): number {
    this.assertWritable();

    let removed = 0;

    while (this.segments.length > 1) {
      const next = this.segments[1] as SegmentInfo;

      if (next.firstLsn > lsn + 1n) {
        break;
      }

      const [oldest] = this.segments.splice(0, 1) as [SegmentInfo];

      try {
        unlinkSync(oldest.path);
      } catch (error: unknown) {
        this.segments.unshift(oldest);

        throw ioError("remove an old log segment", oldest.path, error);
      }

      removed += 1;
    }

    if (removed > 0 && this.mode === "fsync") {
      syncDirectory(this.directory);
    }

    return removed;
  }

  public close(): void {
    if (this.closed) {
      return;
    }

    this.closed = true;

    const fd = this.fd;

    this.fd = undefined;

    if (fd !== undefined) {
      try {
        closeSync(fd);
      } catch (error: unknown) {
        throw ioError("close the log", this.directory, error);
      }
    }
  }

  private rotate(): void {
    const durable = this.mode === "fsync";

    try {
      if (durable) {
        fsyncSync(this.fd as number);
      }

      closeSync(this.fd as number);
    } catch (error: unknown) {
      this.broken = true;

      throw ioError("rotate the log", this.activePath(), error);
    }

    this.fd = undefined;

    try {
      const created = createSegment(this.directory, this.nextLsn, durable);

      this.segments.push(created.info);
      this.fd = created.fd;
      this.position = SEGMENT_HEADER_SIZE;
    } catch (error: unknown) {
      this.broken = true;

      throw error;
    }
  }

  private activePath(): string {
    return (this.segments[this.segments.length - 1] as SegmentInfo).path;
  }

  private assertOpen(): void {
    if (this.closed) {
      throw new StorageError(
        StorageErrorCode.Closed,
        "The write-ahead log is closed.",
      );
    }
  }

  private assertWritable(): void {
    this.assertOpen();

    if (this.broken) {
      throw new StorageError(
        StorageErrorCode.Io,
        "The write-ahead log failed earlier and must be reopened to recover.",
      );
    }
  }
}

interface RecoveredSegments {
  readonly segments: SegmentInfo[];
  readonly validEnd: number;
  readonly lastLsn: bigint;
}

function recoverSegments(directory: string): RecoveredSegments {
  let names: string[];

  try {
    names = readdirSync(directory)
      .filter((name) => SEGMENT_NAME.test(name))
      .sort();
  } catch (error: unknown) {
    throw ioError("list the log directory", directory, error);
  }

  const segments: SegmentInfo[] = [];
  let validEnd = SEGMENT_HEADER_SIZE;
  let lastLsn = 0n;

  for (let index = 0; index < names.length; index += 1) {
    const name = names[index] as string;
    const path = join(directory, name);
    const isLast = index === names.length - 1;
    const nameLsn = BigInt(
      (SEGMENT_NAME.exec(name) as RegExpExecArray)[1] as string,
    );
    const bytes = readSegment(path);
    const header = decodeSegmentHeader(bytes);

    if (!header.ok) {
      if (isLast && isIncompleteHeader(bytes)) {
        unlinkSync(path);
        syncDirectory(directory);
        break;
      }

      throw corruption(path, 0, header.reason);
    }

    if (header.firstLsn !== nameLsn) {
      throw corruption(
        path,
        0,
        `The segment header starts at ${header.firstLsn} but the file name says ${nameLsn}.`,
      );
    }

    if (segments.length > 0 && header.firstLsn !== lastLsn + 1n) {
      throw corruption(
        path,
        0,
        `Expected the segment to start at ${lastLsn + 1n} but it starts at ${header.firstLsn}. A log segment is missing.`,
      );
    }

    let offset = SEGMENT_HEADER_SIZE;
    let expected = header.firstLsn;

    for (;;) {
      const result = scanRecord(bytes, offset, expected);

      if (result.kind === "end") {
        break;
      }

      if (result.kind === "torn") {
        if (!isLast) {
          throw corruption(path, offset, result.reason, expected);
        }

        break;
      }

      if (result.kind === "corrupt") {
        throw corruption(path, offset, result.reason, expected);
      }

      offset = result.end;
      expected = result.lsn + 1n;
    }

    segments.push({ path, firstLsn: header.firstLsn });
    validEnd = offset;
    lastLsn = expected - 1n;
  }

  return { segments, validEnd, lastLsn };
}

function isIncompleteHeader(bytes: Uint8Array): boolean {
  if (bytes.byteLength < SEGMENT_HEADER_SIZE) {
    return true;
  }

  return bytes.every((byte) => byte === 0);
}

function createSegment(
  directory: string,
  firstLsn: bigint,
  durable: boolean,
): { info: SegmentInfo; fd: number } {
  const path = join(directory, `${firstLsn.toString().padStart(20, "0")}.wal`);

  try {
    const fd = openSync(path, "wx");

    writeFully(fd, encodeSegmentHeader(firstLsn), 0);

    if (durable) {
      fsyncSync(fd);
      syncDirectory(directory);
    }

    return { info: { path, firstLsn }, fd };
  } catch (error: unknown) {
    throw ioError("create a log segment", path, error);
  }
}

function writeFully(fd: number, bytes: Uint8Array, position: number): void {
  let written = 0;

  while (written < bytes.byteLength) {
    written += writeSync(
      fd,
      bytes,
      written,
      bytes.byteLength - written,
      position + written,
    );
  }
}

export function syncDirectory(directory: string): void {
  let fd: number | undefined;

  try {
    fd = openSync(directory, "r");
    fsyncSync(fd);
  } catch (error: unknown) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code !== "EISDIR" && code !== "EPERM" && code !== "EINVAL") {
      throw ioError("flush a directory", directory, error);
    }
  } finally {
    if (fd !== undefined) {
      closeSync(fd);
    }
  }
}

function readSegment(path: string): Uint8Array {
  try {
    return readFileSync(path);
  } catch (error: unknown) {
    throw ioError("read a log segment", path, error);
  }
}

function corruption(
  file: string,
  offset: number,
  reason: string,
  lsn?: bigint,
): StorageCorruptionError {
  return new StorageCorruptionError(
    `The write-ahead log is corrupt in ${file} at byte offset ${offset}${
      lsn === undefined ? "" : ` (log sequence number ${lsn})`
    }: ${reason} Records after this point cannot be trusted. Restore the data directory from a backup, or move the damaged segment aside only if you accept losing the writes it contains.`,
    lsn === undefined ? { file, offset } : { file, offset, lsn },
  );
}

function ioError(action: string, path: string, cause: unknown): StorageError {
  return new StorageError(
    StorageErrorCode.Io,
    `Could not ${action} at ${path}: ${(cause as Error).message}`,
    { cause },
  );
}
