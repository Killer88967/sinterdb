[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / SinterClientOptions

# Interface: SinterClientOptions

Defined in: packages/driver/dist/client.d.ts:18

Options for [SinterClient](../classes/SinterClient.md). Every timeout is a whole number of
milliseconds no greater than 2,147,483,647. An invalid value throws a
[SinterClientOptionsError](../classes/SinterClientOptionsError.md).

## Properties

### connectTimeoutMS?

> `readonly` `optional` **connectTimeoutMS?**: `number`

Defined in: packages/driver/dist/client.d.ts:24

How long `connect()` may take, including the protocol handshake, before
it fails with a [SinterConnectionTimeoutError](../classes/SinterConnectionTimeoutError.md). Must be at least 1.
Defaults to 10,000.

***

### requestTimeoutMS?

> `readonly` `optional` **requestTimeoutMS?**: `number`

Defined in: packages/driver/dist/client.d.ts:30

How long a single request may wait for its response before it fails with
a [SinterRequestTimeoutError](../classes/SinterRequestTimeoutError.md). Must be at least 1. Defaults to
10,000.

***

### socketTimeoutMS?

> `readonly` `optional` **socketTimeoutMS?**: `number`

Defined in: packages/driver/dist/client.d.ts:35

How long the connection may be inactive before the socket is closed with
a [SinterSocketTimeoutError](../classes/SinterSocketTimeoutError.md). 0, the default, disables the timeout.
