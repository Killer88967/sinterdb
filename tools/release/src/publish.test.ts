import { isAbsolute } from "node:path";

import { describe, expect, it } from "vitest";

import { publishTarballs, type CommandRunner } from "./publish.ts";

interface Call {
  readonly command: string;
  readonly arguments_: readonly string[];
}

/** A pretend npm. `onNpm` is the registry: names it already holds. */
function fakeNpm(options: {
  already?: readonly string[];
  failPublishOf?: string;
  tags?: (name: string) => Record<string, string>;
}) {
  const calls: Call[] = [];
  const uploaded = new Set<string>();
  const run: CommandRunner = (command, arguments_) => {
    calls.push({ command, arguments_ });

    const [verb, target] = arguments_ as [string, string];

    if (verb === "view" && arguments_[2] === "version") {
      const name = target.slice(0, target.lastIndexOf("@"));

      return options.already?.includes(name) === true || uploaded.has(name)
        ? { status: 0, stdout: "0.1.0\n", stderr: "" }
        : { status: 1, stdout: "", stderr: "E404" };
    }

    if (verb === "view") {
      return {
        status: 0,
        stdout: JSON.stringify(
          options.tags?.(target) ?? { next: "0.1.0", latest: "0.0.0" },
        ),
        stderr: "",
      };
    }

    if (verb === "publish") {
      const file = target.split("/").pop() as string;

      if (
        options.failPublishOf !== undefined &&
        file.includes(options.failPublishOf)
      ) {
        return { status: 1, stdout: "", stderr: "E403 trusted publisher" };
      }

      uploaded.add(
        file.startsWith("sinterdb-protocol")
          ? "sinterdb-protocol"
          : file.startsWith("sinterdb-cli")
            ? "@sinterdb/cli"
            : "sinterdb",
      );
    }

    return { status: 0, stdout: "", stderr: "" };
  };

  return {
    run,
    calls,
    publishes: () => calls.filter((c) => c.arguments_[0] === "publish"),
  };
}

const BASE = {
  directory: "/tarballs",
  version: "0.1.0",
  distTag: "next",
  wait: () => undefined,
};

describe("publishTarballs", () => {
  it("publishes protocol, then driver, then CLI, with provenance and the tag", () => {
    const npm = fakeNpm({});
    const result = publishTarballs({ ...BASE, run: npm.run });

    expect(result.published).toEqual([
      "sinterdb-protocol",
      "sinterdb",
      "@sinterdb/cli",
    ]);
    expect(npm.publishes().map((c) => c.arguments_)).toEqual([
      [
        "publish",
        "/tarballs/sinterdb-protocol-0.1.0.tgz",
        "--tag",
        "next",
        "--access",
        "public",
        "--provenance",
      ],
      [
        "publish",
        "/tarballs/sinterdb-0.1.0.tgz",
        "--tag",
        "next",
        "--access",
        "public",
        "--provenance",
      ],
      [
        "publish",
        "/tarballs/sinterdb-cli-0.1.0.tgz",
        "--tag",
        "next",
        "--access",
        "public",
        "--provenance",
      ],
    ]);
  });

  it("hands npm absolute paths even when given a relative folder", () => {
    // npm reads `release/x.tgz` as the GitHub repository `release/x.tgz`.
    const npm = fakeNpm({});

    publishTarballs({ ...BASE, directory: "release", run: npm.run });

    for (const call of npm.publishes()) {
      expect(isAbsolute(call.arguments_[1] as string)).toBe(true);
    }
  });

  it("skips what is already published, so a stopped run can be repeated", () => {
    const npm = fakeNpm({ already: ["sinterdb-protocol", "sinterdb"] });
    const result = publishTarballs({ ...BASE, run: npm.run });

    expect(result.skipped).toEqual(["sinterdb-protocol", "sinterdb"]);
    expect(result.published).toEqual(["@sinterdb/cli"]);
    expect(npm.publishes()).toHaveLength(1);
  });

  it("stops at the first failure and publishes nothing after it", () => {
    const npm = fakeNpm({ failPublishOf: "sinterdb-0.1.0" });

    expect(() => publishTarballs({ ...BASE, run: npm.run })).toThrow(
      /npm publish failed for sinterdb@0.1.0[\s\S]*E403/,
    );
    expect(npm.publishes()).toHaveLength(2);
  });

  it('refuses to publish under "latest"', () => {
    const npm = fakeNpm({});

    expect(() =>
      publishTarballs({ ...BASE, distTag: "latest", run: npm.run }),
    ).toThrow(/must not be published under "latest"/);
    expect(npm.calls).toHaveLength(0);
  });

  it("fails when the tag does not point at the new version", () => {
    const npm = fakeNpm({ tags: () => ({ next: "0.0.9" }) });

    expect(() => publishTarballs({ ...BASE, run: npm.run })).toThrow(
      /"next" tag does not point at it/,
    );
  });

  it("notes, but does not fail, when npm also points latest at a first version", () => {
    const npm = fakeNpm({ tags: () => ({ next: "0.1.0", latest: "0.1.0" }) });
    const lines: string[] = [];

    expect(() =>
      publishTarballs({ ...BASE, run: npm.run, log: (l) => lines.push(l) }),
    ).not.toThrow();
    expect(lines.join("\n")).toContain('npm also points "latest"');
  });

  it("waits for the registry to show the tag", () => {
    let reads = 0;
    const waits: number[] = [];
    const npm = fakeNpm({
      tags: () => (reads++ < 2 ? {} : { next: "0.1.0" }),
    });

    publishTarballs({ ...BASE, run: npm.run, wait: (ms) => waits.push(ms) });

    expect(waits.length).toBeGreaterThanOrEqual(2);
  });

  it("does a dry run without provenance and without checking tags", () => {
    const npm = fakeNpm({});

    publishTarballs({ ...BASE, dryRun: true, run: npm.run });

    for (const call of npm.publishes()) {
      expect(call.arguments_).toContain("--dry-run");
      expect(call.arguments_).not.toContain("--provenance");
    }

    expect(npm.calls.some((c) => c.arguments_.includes("dist-tags"))).toBe(
      false,
    );
  });
});
