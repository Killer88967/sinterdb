import { afterEach, beforeEach, vi } from "vitest";

/**
 * Makes tests that compare printed text behave the same everywhere. A
 * developer's terminal, and package managers such as pnpm, turn colors on for
 * the test run; these tests expect the plain text a pipe would get.
 */
export function usePlainOutput(): void {
  beforeEach(() => {
    vi.stubEnv("FORCE_COLOR", undefined);
    vi.stubEnv("NO_COLOR", undefined);

    for (const stream of [process.stdout, process.stderr]) {
      Object.defineProperty(stream, "isTTY", {
        value: false,
        configurable: true,
      });
    }
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    Reflect.deleteProperty(process.stdout, "isTTY");
    Reflect.deleteProperty(process.stderr, "isTTY");
  });
}
