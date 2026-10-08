import { CustomId, type Document } from "sinterdb-protocol";

/**
 * The stable string codes carried by {@link SinterError.code}. Branch on
 * these rather than on message text.
 */
export const SinterErrorCode = {
  /** The connection string is malformed. */
  InvalidConnectionString: "INVALID_CONNECTION_STRING",
  /** A client option or a database or collection name is invalid. */
  InvalidClientOptions: "INVALID_CLIENT_OPTIONS",
  /** The client has been closed. */
  ClientClosed: "CLIENT_CLOSED",
  /** A command was sent before `connect()` completed. */
  ClientNotConnected: "CLIENT_NOT_CONNECTED",
  /** The connection could not be established or was lost. */
  ConnectionFailed: "CONNECTION_FAILED",
  /** Connecting exceeded `connectTimeoutMS`. */
  ConnectionTimeout: "CONNECTION_TIMEOUT",
  /** The connection was idle for longer than `socketTimeoutMS`. */
  SocketTimeout: "SOCKET_TIMEOUT",
  /** A request exceeded `requestTimeoutMS`. */
  RequestTimeout: "REQUEST_TIMEOUT",
  /** The server does not speak a compatible protocol version. */
  IncompatibleProtocol: "INCOMPATIBLE_PROTOCOL",
  /** The server sent a message the driver cannot interpret. */
  ProtocolViolation: "PROTOCOL_VIOLATION",
  /** The server rejected the request. See `serverErrorName`. */
  ServerError: "SERVER_ERROR",
} as const;

/** A value of {@link SinterErrorCode}. */
export type SinterErrorCode =
  (typeof SinterErrorCode)[keyof typeof SinterErrorCode];

/** Details a server error response can carry. */
export interface SinterServerErrorOptions extends ErrorOptions {
  /** The numeric error code from the wire protocol. */
  readonly wireCode?: number;
  /** The server's name for the error, such as `DuplicateKey`. */
  readonly serverErrorName?: string;
  /** Whether the server says the same request may succeed if retried. */
  readonly retryable?: boolean;
  /** Extra structured information from the server. */
  readonly details?: Document;
}

/**
 * The base class of every error the driver throws on its own. Check `code` to
 * tell them apart.
 */
export class SinterError extends Error {
  /**
   * A stable identifier for the kind of failure; see {@link SinterErrorCode}.
   */
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

/** The connection string is malformed. Code `INVALID_CONNECTION_STRING`. */
export class SinterConnectionStringError extends SinterError {
  public constructor(message: string, options?: ErrorOptions) {
    super(SinterErrorCode.InvalidConnectionString, message, options);
  }
}

/**
 * A client option or a database or collection name is invalid. Code
 * `INVALID_CLIENT_OPTIONS`.
 */
export class SinterClientOptionsError extends SinterError {
  public constructor(message: string, options?: ErrorOptions) {
    super(SinterErrorCode.InvalidClientOptions, message, options);
  }
}

/**
 * A command was used in the wrong client state: `CLIENT_NOT_CONNECTED` before
 * `connect()`, or `CLIENT_CLOSED` after `close()`.
 */
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

/**
 * The connection could not be established or was lost. Code
 * `CONNECTION_FAILED`.
 */
export class SinterConnectionError extends SinterError {
  public constructor(message: string, options?: ErrorOptions) {
    super(SinterErrorCode.ConnectionFailed, message, options);
  }
}

/** Connecting took longer than `connectTimeoutMS`. */
export class SinterConnectionTimeoutError extends SinterConnectionError {
  /** Always `CONNECTION_TIMEOUT`. */
  public override readonly code: typeof SinterErrorCode.ConnectionTimeout =
    SinterErrorCode.ConnectionTimeout;
}

/** The connection was idle for longer than `socketTimeoutMS`. */
export class SinterSocketTimeoutError extends SinterConnectionError {
  /** Always `SOCKET_TIMEOUT`. */
  public override readonly code: typeof SinterErrorCode.SocketTimeout =
    SinterErrorCode.SocketTimeout;
}

/**
 * A request got no response within `requestTimeoutMS`. The request may still
 * have run on the server. Code `REQUEST_TIMEOUT`.
 */
export class SinterRequestTimeoutError extends SinterError {
  public constructor(message: string, options?: ErrorOptions) {
    super(SinterErrorCode.RequestTimeout, message, options);
  }
}

/**
 * The server sent something the driver cannot interpret. Code
 * `PROTOCOL_VIOLATION`.
 */
export class SinterProtocolError extends SinterError {
  public constructor(message: string, options?: ErrorOptions) {
    super(SinterErrorCode.ProtocolViolation, message, options);
  }
}

/**
 * The server rejected a request. Code `SERVER_ERROR`.
 *
 * Use `serverErrorName` to tell failures apart, such as `DuplicateKey`.
 */
export class SinterServerError extends SinterError {
  /**
   * The numeric error code from the wire protocol, if the server sent one.
   */
  public readonly wireCode: number | undefined;
  /** The server's name for the error, such as `DuplicateKey`. */
  public readonly serverErrorName: string | undefined;
  /**
   * Whether the server says the same request may succeed if retried. `false`
   * unless stated.
   */
  public readonly retryable: boolean;
  /** Extra structured information from the server, if any. */
  public readonly details: Document | undefined;

  public constructor(message: string, options: SinterServerErrorOptions = {}) {
    super(SinterErrorCode.ServerError, message, options);

    this.wireCode = options.wireCode;
    this.serverErrorName = options.serverErrorName;
    this.retryable = options.retryable ?? false;
    this.details = options.details;
  }
}

/**
 * `insertMany` failed partway. The documents before `failedIndex` were
 * inserted and stay committed.
 */
export class SinterInsertManyError extends SinterServerError {
  /** The position, in the input array, of the document that failed. */
  public readonly failedIndex: number;
  /** The `_id` of every document that was inserted before the failure. */
  public readonly insertedIds: readonly CustomId[];

  public constructor(
    serverError: SinterServerError,
    failedIndex: number,
    insertedIds: readonly CustomId[],
  ) {
    super(serverError.message, {
      cause: serverError,
      retryable: serverError.retryable,
      ...(serverError.wireCode === undefined
        ? {}
        : { wireCode: serverError.wireCode }),
      ...(serverError.serverErrorName === undefined
        ? {}
        : { serverErrorName: serverError.serverErrorName }),
      ...(serverError.details === undefined
        ? {}
        : { details: serverError.details }),
    });

    this.failedIndex = failedIndex;
    this.insertedIds = Object.freeze([...insertedIds]);
  }
}

/**
 * The server does not speak a compatible protocol version. Code
 * `INCOMPATIBLE_PROTOCOL`.
 */
export class SinterCompatibilityError extends SinterServerError {
  /** Always `INCOMPATIBLE_PROTOCOL`. */
  public override readonly code: typeof SinterErrorCode.IncompatibleProtocol =
    SinterErrorCode.IncompatibleProtocol;
}
