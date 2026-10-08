import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterAll, describe, expect, it } from "vitest";

import { SERVER_BINARY } from "./harness.ts";
import { toMarkdown } from "./report.ts";

// Keeps the benchmark harness from rotting: a quick run must start real
// servers, finish every scenario, and write well-formed results. It does not
// check how fast anything is. `pnpm build` must have run first.

const APP = fileURLToPath(new URL("..", import.meta.url));
const output = mkdtempSync(join(tmpdir(), "sinterdb-bench-test-"));

afterAll(() => {
  rmSync(output, { recursive: true, force: true });
});

interface Results {
  environment: { node: string; quick: boolean };
  results: {
    name: string;
    operations: number;
    totalMS: number;
    operationsPerSecond: number;
    latencyMicros?: { p50: number; p95: number; p99: number; max: number };
  }[];
}

describe("benchmarks", () => {
  it("run to completion in quick mode and write their results", () => {
    expect(existsSync(SERVER_BINARY)).toBe(true);

    const file = join(output, "results.json");
    const run = spawnSync(
      process.execPath,
      ["src/bench.ts", "--quick", "--out", file],
      { cwd: APP, encoding: "utf8", timeout: 120_000 },
    );

    expect(run.status, run.stderr).toBe(0);

    const parsed = JSON.parse(readFileSync(file, "utf8")) as Results;

    expect(parsed.environment.quick).toBe(true);
    expect(parsed.environment.node).toBe(process.versions.node);

    const names = parsed.results.map((result) => result.name);

    for (const expected of [
      "ping",
      "findOne by _id",
      "find all, read through a cursor",
      "insertOne (disk, fsync)",
      "insertOne (disk, buffered)",
      "insertOne (memory only)",
      "start after a crash",
      "start after a clean stop",
    ]) {
      expect(
        names.some((name) => name.startsWith(expected)),
        expected,
      ).toBe(true);
    }

    for (const result of parsed.results) {
      expect(result.operations, result.name).toBeGreaterThan(0);
      expect(result.totalMS, result.name).toBeGreaterThan(0);

      if (result.latencyMicros !== undefined) {
        const { p50, p95, p99, max } = result.latencyMicros;

        expect(p50, result.name).toBeLessThanOrEqual(p95);
        expect(p95, result.name).toBeLessThanOrEqual(p99);
        expect(p99, result.name).toBeLessThanOrEqual(max);
      }
    }

    // The table the run prints is the one the report builds from the file.
    expect(run.stdout).toContain(toMarkdown(parsed.results));
  }, 120_000);

  it("are all described in docs/benchmarks.md, and the sample table is real", () => {
    const guide = readFileSync(
      fileURLToPath(new URL("../../../docs/benchmarks.md", import.meta.url)),
      "utf8",
    );
    const rows = guide
      .split("\n")
      .filter((line) => line.startsWith("| ") && !line.startsWith("| Scenario"))
      .map((line) => line.split("|")[1]?.trim() ?? "")
      .filter((cell) => cell !== "" && !cell.startsWith("---"));

    // Numbers in a scenario name, such as the document count, differ between
    // a full run and a quick one.
    const generic = (name: string): string => name.replaceAll(/\d[\d,]*/g, "N");
    const file = join(output, "described.json");
    const run = spawnSync(
      process.execPath,
      ["src/bench.ts", "--quick", "--out", file],
      { cwd: APP, encoding: "utf8", timeout: 120_000 },
    );

    expect(run.status, run.stderr).toBe(0);

    const produced = (
      JSON.parse(readFileSync(file, "utf8")) as Results
    ).results.map((result) => generic(result.name));
    const sample = rows.filter((cell) => !cell.startsWith("`"));

    expect(sample.length).toBeGreaterThanOrEqual(15);

    // Every row of the sample table is a scenario the harness still runs, and
    // every scenario the harness runs is in the sample table.
    expect(sample.map(generic).sort()).toEqual([...produced].sort());

    // The explanatory table names each scenario family in backticks.
    const described = rows.filter((cell) => cell.startsWith("`")).join(" ");

    for (const family of [
      "ping",
      "insertMany",
      "createIndex",
      "findOne",
      "insertOne",
      "updateOne",
      "deleteOne",
    ]) {
      expect(described, family).toContain(family);
    }
  }, 120_000);

  it("prints usage for --help", () => {
    const run = spawnSync(process.execPath, ["src/bench.ts", "--help"], {
      cwd: APP,
      encoding: "utf8",
    });

    expect(run.status).toBe(0);
    expect(run.stdout).toContain("--quick");
  });
});
