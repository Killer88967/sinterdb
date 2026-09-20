import type { Document } from "sinterdb-protocol";

export const SinterErrorCode = {
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
} as const;

export type SinterErrorCode =
  (typeof SinterErrorCode)[keyof typeof SinterErrorCode];

export interface SinterServerErrorOptions extends ErrorOptions {
  readonly wireCode?: number;
  readonly serverErrorName?: string;
  readonly retryable?: boolean;
  readonly details?: Document;
}

export class SinterError extends Error {
  public readonly code: SinterErrorCode;

  public constructor(
    code: SinterErrorCode,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);

    this.name = new.target.name;
    this.code = code;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, new.target);
  }
}

export class SinterConnectionStringError extends SinterError {
  public constructor(message: string, options?: ErrorOptions) {
    super(SinterErrorCode.InvalidConnectionString, message, options);
  }
}

export class SinterClientOptionsError extends SinterError {
  public constructor(message: string, options?: ErrorOptions) {
    super(SinterErrorCode.InvalidClientOptions, message, options);
  }
}

export class SinterClientStateError extends SinterError {
  public constructor(
    code:
      | typeof SinterErrorCode.ClientClosed
      | typeof SinterErrorCode.ClientNotConnected,
    message: string,
    options?: ErrorOptions,
  ) {
    super(code, message, options);
  }
}

export class SinterConnectionError extends SinterError {
  public constructor(message: string, options?: ErrorOptions) {
    super(SinterErrorCode.ConnectionFailed, message, options);
  }
}

export class SinterConnectionTimeoutError extends SinterConnectionError {
  public override readonly code: typeof SinterErrorCode.ConnectionTimeout =
    SinterErrorCode.ConnectionTimeout;
}

export class SinterSocketTimeoutError extends SinterConnectionError {
  public override readonly code: typeof SinterErrorCode.SocketTimeout =
    SinterErrorCode.SocketTimeout;
}

export class SinterRequestTimeoutError extends SinterError {
  public constructor(message: string, options?: ErrorOptions) {
    super(SinterErrorCode.RequestTimeout, message, options);
  }
}

export class SinterProtocolError extends SinterError {
  public constructor(message: string, options?: ErrorOptions) {
    super(SinterErrorCode.ProtocolViolation, message, options);
  }
}

export class SinterServerError extends SinterError {
  public readonly wireCode: number | undefined;
  public readonly serverErrorName: string | undefined;
  public readonly retryable: boolean;
  public readonly details: Document | undefined;

  public constructor(message: string, options: SinterServerErrorOptions = {}) {
    super(SinterErrorCode.ServerError, message, options);

    this.wireCode = options.wireCode;
    this.serverErrorName = options.serverErrorName;
    this.retryable = options.retryable ?? false;
    this.details = options.details;
  }
}

export class SinterCompatibilityError extends SinterServerError {
  public override readonly code: typeof SinterErrorCode.IncompatibleProtocol =
    SinterErrorCode.IncompatibleProtocol;
}
