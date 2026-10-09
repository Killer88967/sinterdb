import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, isAbsolute } from "node:path";
import { fileURLToPath } from "node:url";

import { afterAll, describe, expect, it } from "vitest";

import { rehearseRelease } from "./rehearse.ts";

// Packs the three public packages, installs the tarballs into empty folders,
// and follows docs/quick-start.md with them, including a crash. It needs
// `pnpm build` first. See rehearse.ts.

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const output = mkdtempSync(join(tmpdir(), "sinterdb-rehearsal-test-"));

afterAll(() => {
  rmSync(output, { recursive: true, force: true });
});

describe("the release rehearsal", () => {
  it("packs, installs, and follows the quick-start", async () => {
    const lines: string[] = [];
    const result = await rehearseRelease({
      root: ROOT,
      outputDirectory: output,
      log: (line) => lines.push(line),
    });

    expect(result.packages.map((p) => p.name)).toEqual([
      "sinterdb-protocol",
      "sinterdb",
      "@sinterdb/cli",
    ]);

    for (const entry of result.packages) {
      expect(existsSync(entry.file)).toBe(true);
      expect(entry.bytes).toBeGreaterThan(1000);
    }

    expect(lines.join("\n")).toContain(
      "Writing a document, killing the server",
    );
  }, 180_000);

  it("accepts a relative folder name, as the release workflow gives it", async () => {
    // A bare name such as `release` is what `--out release` passes. npm reads
    // `release/x.tgz` as a GitHub repository, so the paths must be made absolute.
    const folder = mkdtempSync(join(process.cwd(), "rehearsal-relative-"));

    try {
      const name = folder.slice(process.cwd().length + 1);

      expect(isAbsolute(name)).toBe(false);
      expect(name.startsWith(".")).toBe(false);

      const result = await rehearseRelease({
        root: ROOT,
        outputDirectory: name,
      });

      for (const entry of result.packages) {
        expect(existsSync(entry.file)).toBe(true);
        expect(entry.file.startsWith(folder)).toBe(true);
      }
    } finally {
      rmSync(folder, { recursive: true, force: true });
    }
  }, 180_000);
});
