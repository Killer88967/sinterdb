import { describe, expect, it } from "vitest";

import {
  DEFAULT_SERVER_HOST,
  DEFAULT_SERVER_PORT,
  ServerConfigurationError,
  resolveServerConfig,
} from "./config.js";

describe("resolveServerConfig", () => {
  it("uses the default configuration", () => {
    expect(resolveServerConfig({}, {})).toEqual({
      host: DEFAULT_SERVER_HOST,
      port: DEFAULT_SERVER_PORT,
      writeConcern: "flushed",
      reclaimLock: false,
    });
  });

  it("reads configuration from the environment", () => {
    expect(
      resolveServerConfig(
        {},
        {
          SINTERDB_HOST: "0.0.0.0",
          SINTERDB_PORT: "5000",
        },
      ),
    ).toEqual({
      host: "0.0.0.0",
      port: 5000,
      writeConcern: "flushed",
      reclaimLock: false,
    });
  });

  it("gives explicit input precedence over the environment", () => {
    expect(
      resolveServerConfig(
        {
          host: "127.0.0.1",
          port: 6000,
        },
        {
          SINTERDB_HOST: "0.0.0.0",
          SINTERDB_PORT: "5000",
        },
      ),
    ).toEqual({
      host: "127.0.0.1",
      port: 6000,
      writeConcern: "flushed",
      reclaimLock: false,
    });
  });

  it("allows port zero for temporary test servers", () => {
    expect(resolveServerConfig({ port: 0 }, {}).port).toBe(0);
  });

  it.each(["", " ", "-1", "65536", "1.5", "invalid"])(
    "rejects invalid port %j",
    (port) => {
      expect(() => resolveServerConfig({ port }, {})).toThrow(
        ServerConfigurationError,
      );
    },
  );

  it("rejects an empty host", () => {
    expect(() => resolveServerConfig({ host: " " }, {})).toThrow(
      ServerConfigurationError,
    );
  });

  it("identifies the invalid option", () => {
    try {
      resolveServerConfig({ port: -1 }, {});
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(ServerConfigurationError);

      if (error instanceof ServerConfigurationError) {
        expect(error.option).toBe("port");
      }

      return;
    }

    throw new Error("Expected invalid server configuration.");
  });
});

describe("resolveServerConfig storage options", () => {
  it("keeps the server in memory without a data directory", () => {
    expect(resolveServerConfig({}, {})).not.toHaveProperty("dataDirectory");
  });

  it("reads the data directory and write concern from input", () => {
    expect(
      resolveServerConfig(
        { dataDirectory: "  /var/lib/sinterdb  ", writeConcern: "memory" },
        {},
      ),
    ).toMatchObject({
      dataDirectory: "/var/lib/sinterdb",
      writeConcern: "memory",
    });
  });

  it("reads the data directory and write concern from the environment", () => {
    expect(
      resolveServerConfig(
        {},
        { SINTERDB_DATA_DIR: "/data", SINTERDB_WRITE_CONCERN: "journaled" },
      ),
    ).toMatchObject({ dataDirectory: "/data", writeConcern: "journaled" });
  });

  it("defaults to the flushed write concern with a data directory", () => {
    expect(resolveServerConfig({ dataDirectory: "/data" }, {})).toMatchObject({
      writeConcern: "flushed",
      reclaimLock: false,
    });
  });

  it("gives explicit input precedence over the environment", () => {
    expect(
      resolveServerConfig(
        { dataDirectory: "/explicit", writeConcern: "flushed" },
        { SINTERDB_DATA_DIR: "/env", SINTERDB_WRITE_CONCERN: "memory" },
      ),
    ).toMatchObject({ dataDirectory: "/explicit", writeConcern: "flushed" });
  });

  it("maps the deprecated durability names to write concerns", () => {
    expect(
      resolveServerConfig({ dataDirectory: "/d", durability: "buffered" }, {}),
    ).toMatchObject({ writeConcern: "journaled" });
    expect(
      resolveServerConfig({ dataDirectory: "/d", durability: "fsync" }, {}),
    ).toMatchObject({ writeConcern: "flushed" });
    expect(
      resolveServerConfig(
        {},
        { SINTERDB_DATA_DIR: "/d", SINTERDB_DURABILITY: "buffered" },
      ),
    ).toMatchObject({ writeConcern: "journaled" });
  });

  it("rejects setting both a write concern and a durability mode", () => {
    expect(() =>
      resolveServerConfig(
        { dataDirectory: "/d", writeConcern: "memory", durability: "fsync" },
        {},
      ),
    ).toThrow(ServerConfigurationError);
  });

  it("rejects an unknown write concern", () => {
    expect(() =>
      resolveServerConfig({ dataDirectory: "/d", writeConcern: "fast" }, {}),
    ).toThrow(ServerConfigurationError);
    expect(() =>
      resolveServerConfig({ dataDirectory: "/d", writeConcern: "fsync" }, {}),
    ).toThrow(ServerConfigurationError);
  });

  it("rejects an empty data directory", () => {
    expect(() => resolveServerConfig({ dataDirectory: "   " }, {})).toThrow(
      ServerConfigurationError,
    );
  });

  it("rejects a write concern without a data directory", () => {
    try {
      resolveServerConfig({ writeConcern: "flushed" }, {});
      throw new Error("Expected a configuration error.");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(ServerConfigurationError);
      expect((error as ServerConfigurationError).option).toBe("writeConcern");
    }
  });
});

describe("resolveServerConfig checkpoint threshold", () => {
  it("leaves the threshold unset by default", () => {
    expect(
      resolveServerConfig({ dataDirectory: "/data" }, {}),
    ).not.toHaveProperty("checkpointThresholdBytes");
  });

  it("reads the threshold from input and the environment", () => {
    expect(
      resolveServerConfig(
        { dataDirectory: "/data", checkpointThresholdBytes: 4096 },
        {},
      ),
    ).toMatchObject({ checkpointThresholdBytes: 4096 });

    expect(
      resolveServerConfig(
        { dataDirectory: "/data" },
        { SINTERDB_CHECKPOINT_BYTES: "8192" },
      ),
    ).toMatchObject({ checkpointThresholdBytes: 8192 });

    expect(
      resolveServerConfig(
        { dataDirectory: "/data", checkpointThresholdBytes: "1024" },
        {},
      ),
    ).toMatchObject({ checkpointThresholdBytes: 1024 });
  });

  it("rejects values that are not positive integers", () => {
    for (const value of [0, -1, 1.5, "abc", "", "  ", "1e400", Number.NaN]) {
      expect(
        () =>
          resolveServerConfig(
            { dataDirectory: "/data", checkpointThresholdBytes: value },
            {},
          ),
        String(value),
      ).toThrow(ServerConfigurationError);
    }
  });

  it("rejects a threshold without a data directory", () => {
    try {
      resolveServerConfig({ checkpointThresholdBytes: 4096 }, {});
      throw new Error("Expected a configuration error.");
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(ServerConfigurationError);
      expect((error as ServerConfigurationError).option).toBe(
        "checkpointThresholdBytes",
      );
    }
  });
});

describe("resolveServerConfig reclaim lock", () => {
  it("is off by default", () => {
    expect(
      resolveServerConfig({ dataDirectory: "/data" }, {}).reclaimLock,
    ).toBe(false);
  });

  it("reads true and false from input and the environment", () => {
    expect(
      resolveServerConfig({ dataDirectory: "/d", reclaimLock: true }, {})
        .reclaimLock,
    ).toBe(true);
    expect(
      resolveServerConfig(
        {},
        { SINTERDB_DATA_DIR: "/d", SINTERDB_RECLAIM_LOCK: "true" },
      ).reclaimLock,
    ).toBe(true);
    expect(
      resolveServerConfig(
        {},
        { SINTERDB_DATA_DIR: "/d", SINTERDB_RECLAIM_LOCK: " false " },
      ).reclaimLock,
    ).toBe(false);
  });

  it("lets input override the environment", () => {
    expect(
      resolveServerConfig(
        { reclaimLock: false },
        { SINTERDB_DATA_DIR: "/d", SINTERDB_RECLAIM_LOCK: "true" },
      ).reclaimLock,
    ).toBe(false);
  });

  it.each(["", "yes", "1", "TRUE"])("rejects %j", (value) => {
    expect(() =>
      resolveServerConfig(
        {},
        { SINTERDB_DATA_DIR: "/d", SINTERDB_RECLAIM_LOCK: value },
      ),
    ).toThrow(ServerConfigurationError);
  });

  it("requires a data directory when turned on", () => {
    expect(() => resolveServerConfig({ reclaimLock: true }, {})).toThrow(
      ServerConfigurationError,
    );
    expect(resolveServerConfig({ reclaimLock: false }, {}).reclaimLock).toBe(
      false,
    );
  });
});
