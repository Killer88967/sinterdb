[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / SinterClientEvents

# Interface: SinterClientEvents

Defined in: packages/driver/dist/client.d.ts:70

The events a [SinterClient](../classes/SinterClient.md) emits.

An `error` event is emitted only while at least one `error` listener is
attached.

## Properties

### closed

> **closed**: \[[`SinterClient`](../classes/SinterClient.md)\]

Defined in: packages/driver/dist/client.d.ts:79

Emitted after the client has closed.

***

### connected

> **connected**: \[[`SinterClient`](../classes/SinterClient.md)\]

Defined in: packages/driver/dist/client.d.ts:77

Emitted once the handshake has succeeded and the client is ready for
commands.

***

### connecting

> **connecting**: \[[`SinterClient`](../classes/SinterClient.md)\]

Defined in: packages/driver/dist/client.d.ts:72

Emitted when `connect()` starts a connection attempt.

***

### error

> **error**: \[`Error`\]

Defined in: packages/driver/dist/client.d.ts:84

Emitted when the connection fails after it was established, such as a
socket error or an idle timeout.
