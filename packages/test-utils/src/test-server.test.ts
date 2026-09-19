import {
  SinterServerState,
  type SinterServer,
} from "@sinterdb-internal/server";
import { afterEach, describe, expect, it } from "vitest";

import {
  startTestServer,
  type StartedTestServer,
  withTestServer,
} from "./test-server.js";

describe("test server utilities", () => {
  let testServer: StartedTestServer | undefined;

  afterEach(async () => {
    await testServer?.close();
  });

  it("starts a server on a temporary port", async () => {
    testServer = await startTestServer();

    expect(testServer.address.host).toBe("127.0.0.1");
    expect(testServer.address.port).toBeGreaterThan(0);
    expect(testServer.server.state).toBe(SinterServerState.Running);
    expect(testServer.uri).toBe(
      `sinterdb://127.0.0.1:${testServer.address.port}`,
    );
  });

  it("allows explicit configuration overrides", async () => {
    testServer = await startTestServer({
      host: "127.0.0.1",
      port: 0,
    });

    expect(testServer.server.config.host).toBe("127.0.0.1");
    expect(testServer.address.port).toBeGreaterThan(0);
  });

  it("closes idempotently", async () => {
    testServer = await startTestServer();

    await testServer.close();
    await testServer.close();

    expect(testServer.server.state).toBe(SinterServerState.Stopped);
  });

  it("closes after a successful callback", async () => {
    let capturedServer: SinterServer | undefined;

    const result = await withTestServer((current) => {
      capturedServer = current.server;
      return "complete";
    });

    expect(result).toBe("complete");
    expect(capturedServer?.state).toBe(SinterServerState.Stopped);
  });

  it("closes when a callback throws", async () => {
    let capturedServer: SinterServer | undefined;

    await expect(
      withTestServer((current) => {
        capturedServer = current.server;
        throw new Error("Expected test failure.");
      }),
    ).rejects.toThrow("Expected test failure.");

    expect(capturedServer?.state).toBe(SinterServerState.Stopped);
  });
});
