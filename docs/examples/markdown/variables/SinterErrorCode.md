[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / SinterErrorCode

# Variable: SinterErrorCode

> `const` **SinterErrorCode**: `object`

Defined in: packages/driver/dist/errors.d.ts:6

The stable string codes carried by [SinterError.code](../classes/SinterError.md#code). Branch on
these rather than on message text.

## Type Declaration

### ClientClosed

> `readonly` **ClientClosed**: `"CLIENT_CLOSED"`

The client has been closed.

### ClientNotConnected

> `readonly` **ClientNotConnected**: `"CLIENT_NOT_CONNECTED"`

A command was sent before `connect()` completed.

### ConnectionFailed

> `readonly` **ConnectionFailed**: `"CONNECTION_FAILED"`

The connection could not be established or was lost.

### ConnectionTimeout

> `readonly` **ConnectionTimeout**: `"CONNECTION_TIMEOUT"`

Connecting exceeded `connectTimeoutMS`.

### IncompatibleProtocol

> `readonly` **IncompatibleProtocol**: `"INCOMPATIBLE_PROTOCOL"`

The server does not speak a compatible protocol version.

### InvalidClientOptions

> `readonly` **InvalidClientOptions**: `"INVALID_CLIENT_OPTIONS"`

A client option or a database or collection name is invalid.

### InvalidConnectionString

> `readonly` **InvalidConnectionString**: `"INVALID_CONNECTION_STRING"`

The connection string is malformed.

### InvalidDocument

> `readonly` **InvalidDocument**: `"INVALID_DOCUMENT"`

A request holds a value the driver cannot encode. Nothing was sent.

### ProtocolViolation

> `readonly` **ProtocolViolation**: `"PROTOCOL_VIOLATION"`

The server sent a message the driver cannot interpret.

### RequestTimeout

> `readonly` **RequestTimeout**: `"REQUEST_TIMEOUT"`

A request exceeded `requestTimeoutMS`.

### ServerError

> `readonly` **ServerError**: `"SERVER_ERROR"`

The server rejected the request. See `serverErrorName`.

### SocketTimeout

> `readonly` **SocketTimeout**: `"SOCKET_TIMEOUT"`

The connection was idle for longer than `socketTimeoutMS`.
