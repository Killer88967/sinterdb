import {
  closeSync,
  fsyncSync,
  openSync,
  renameSync,
  unlinkSync,
  writeSync,
} from "node:fs";

import { translateIo } from "../io-error.js";
import { syncDirectory } from "../wal/index.js";

export function writeFileAtomic(
  directory: string,
  path: string,
  contents: string,
): void {
  const temporary = `${path}.tmp`;

  try {
    writeTemporary(temporary, contents);
    renameSync(temporary, path);
  } catch (error: unknown) {
    removeQuietly(temporary);

    throw translateIo("write a file", path, error);
  }

  syncDirectory(directory);
}

function writeTemporary(path: string, contents: string): void {
  const bytes = Buffer.from(contents, "utf8");
  const fd = openSync(path, "w");

  try {
    let written = 0;

    while (written < bytes.byteLength) {
      written += writeSync(fd, bytes, written, bytes.byteLength - written);
    }

    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
}

function removeQuietly(path: string): void {
  try {
    unlinkSync(path);
  } catch {
    // A leftover temporary file is removed the next time the directory opens.
  }
}
