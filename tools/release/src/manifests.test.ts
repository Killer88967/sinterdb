import { isAbsolute, resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { tarballSpec } from "./manifests.ts";

describe("tarballSpec", () => {
  it("makes a bare relative path absolute, so npm does not read it as a GitHub repository", () => {
    expect(isAbsolute(tarballSpec("release/sinterdb-0.1.0.tgz"))).toBe(true);
    expect(tarballSpec("release/sinterdb-0.1.0.tgz")).toBe(
      resolve("release/sinterdb-0.1.0.tgz"),
    );
  });

  it("leaves an absolute path alone", () => {
    expect(tarballSpec("/tarballs/sinterdb-0.1.0.tgz")).toBe(
      "/tarballs/sinterdb-0.1.0.tgz",
    );
  });
});
