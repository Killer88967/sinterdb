import {
  closeSync,
  fsyncSync,
  openSync,
  renameSync,
  unlinkSync,
  writeSync,
} from "node:fs";

import { syncDirectory } from "../wal/index.js";

export function writeFileAtomic(
  directory: string,
  path: string,
  contents: string,
): void {
  const temporary = `${path}.tmp`;
  const bytes = Buffer.from(contents, "utf8");
  const fd = openSync(temporary, "w");

  try {
    let written = 0;

    while (written < bytes.byteLength) {
      written += writeSync(fd, bytes, written, bytes.byteLength - written);
    }

    fsyncSync(fd);
  } catch (error: unknown) {
    closeSync(fd);
    unlinkSync(temporary);

    throw error;
  }

  closeSync(fd);
  renameSync(temporary, path);
  syncDirectory(directory);
}
