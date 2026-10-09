import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

// A new user follows the documentation from page to page. A link to a page or
// heading that does not exist is where that stops, so every relative link and
// every `#heading` anchor in the guides and READMEs has to resolve.

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));

function markdownFiles(): string[] {
  const files = ["README.md", "SECURITY.md", "ROADMAP.md"];
  const walk = (directory: string): void => {
    for (const name of readdirSync(join(ROOT, directory))) {
      const path = join(directory, name);

      if (name === "api" || name === "node_modules" || name === "dist") {
        continue;
      }

      if (statSync(join(ROOT, path)).isDirectory()) {
        walk(path);
      } else if (name.endsWith(".md") && name !== "CHANGELOG.md") {
        files.push(path);
      }
    }
  };

  for (const directory of ["docs", "packages", "apps", "examples", "tools"]) {
    walk(directory);
  }

  return files.filter((file) => existsSync(join(ROOT, file)));
}

/** How GitHub turns a heading into an anchor. */
function anchorOf(heading: string): string {
  return heading
    .trim()
    .toLowerCase()
    .replace(/`/g, "")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s/g, "-");
}

function anchorsIn(file: string): Set<string> {
  const text = readFileSync(join(ROOT, file), "utf8").replace(
    /```[\s\S]*?```/g,
    "",
  );
  const anchors = new Set<string>();

  for (const match of text.matchAll(/^#{1,6}\s+(.+)$/gm)) {
    anchors.add(anchorOf(match[1] as string));
  }

  return anchors;
}

describe("documentation links", () => {
  const files = markdownFiles();

  it("covers the guides and READMEs", () => {
    expect(files).toContain("docs/quick-start.md");
    expect(files).toContain("docs/releasing.md");
    expect(files).toContain("packages/driver/README.md");
  });

  it.each(files)("%s has no broken relative links", (file) => {
    const text = readFileSync(join(ROOT, file), "utf8").replace(
      /```[\s\S]*?```/g,
      "",
    );
    const broken: string[] = [];

    for (const match of text.matchAll(/\]\(([^)\s]+)\)/g)) {
      const target = match[1] as string;

      if (/^[a-z][a-z0-9+.-]*:/i.test(target)) {
        continue;
      }

      const [path = "", anchor] = target.split("#");
      const resolved =
        path === "" ? file : relative(ROOT, resolve(ROOT, dirname(file), path));

      if (!existsSync(join(ROOT, resolved))) {
        broken.push(`${target} (no such file)`);
      } else if (
        anchor !== undefined &&
        resolved.endsWith(".md") &&
        !anchorsIn(resolved).has(anchor)
      ) {
        broken.push(`${target} (no such heading)`);
      }
    }

    expect(broken).toEqual([]);
  });
});
