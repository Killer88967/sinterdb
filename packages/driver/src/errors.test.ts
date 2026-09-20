import { describe, expect, it } from "vitest";

import {
  SinterConnectionError,
  SinterConnectionStringError,
  SinterConnectionTimeoutError,
  SinterError,
  SinterErrorCode,
  SinterProtocolError,
  SinterServerError,
} from "./errors.js";

describe("driver errors", () => {
  it("exposes stable error codes", () => {
    expect(SinterErrorCode).toEqual({
      InvalidConnectionString: "INVALID_CONNECTION_STRING",
      InvalidClientOptions: "INVALID_CLIENT_OPTIONS",
      ClientClosed: "CLIENT_CLOSED",
      ClientNotConnected: "CLIENT_NOT_CONNECTED",
      ConnectionFailed: "CONNECTION_FAILED",
      ConnectionTimeout: "CONNECTION_TIMEOUT",
      SocketTimeout: "SOCKET_TIMEOUT",
      RequestTimeout: "REQUEST_TIMEOUT",
      IncompatibleProtocol: "INCOMPATIBLE_PROTOCOL",
      ProtocolViolation: "PROTOCOL_VIOLATION",
      ServerError: "SERVER_ERROR",
    });
  });

  it("preserves the error hierarchy", () => {
    const connectionStringError = new SinterConnectionStringError(
      "The connection string is invalid.",
    );

    expect(connectionStringError).toBeInstanceOf(SinterConnectionStringError);
    expect(connectionStringError).toBeInstanceOf(SinterError);
    expect(connectionStringError).toBeInstanceOf(Error);
    expect(connectionStringError.code).toBe(
      SinterErrorCode.InvalidConnectionString,
    );
  });

  it("identifies connection timeouts as connection errors", () => {
    const error = new SinterConnectionTimeoutError(
      "The connection attempt timed out.",
    );

    expect(error).toBeInstanceOf(SinterConnectionTimeoutError);
    expect(error).toBeInstanceOf(SinterConnectionError);
    expect(error).toBeInstanceOf(SinterError);
    expect(error.code).toBe(SinterErrorCode.ConnectionTimeout);
  });

  it("preserves error causes", () => {
    const cause = new Error("Socket failure");
    const error = new SinterConnectionError("Could not connect to SinterDB.", {
      cause,
    });

    expect(error.cause).toBe(cause);
  });

  it("provides distinct protocol and server errors", () => {
    const protocolError = new SinterProtocolError("Received an invalid frame.");
    const serverError = new SinterServerError(
      "The server rejected the request.",
    );

    expect(protocolError.code).toBe(SinterErrorCode.ProtocolViolation);
    expect(serverError.code).toBe(SinterErrorCode.ServerError);
    expect(protocolError.name).toBe("SinterProtocolError");
    expect(serverError.name).toBe("SinterServerError");
  });

  it("preserves server error metadata", () => {
    const error = new SinterServerError("The identifier already exists.", {
      wireCode: 4001,
      serverErrorName: "DuplicateKey",
      retryable: false,
      details: {
        field: "_id",
      },
    });

    expect(error.code).toBe(SinterErrorCode.ServerError);
    expect(error.wireCode).toBe(4001);
    expect(error.serverErrorName).toBe("DuplicateKey");
    expect(error.retryable).toBe(false);
    expect(error.details).toEqual({
      field: "_id",
    });
  });
});
