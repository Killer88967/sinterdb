[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / SinterPingResult

# Interface: SinterPingResult

Defined in: packages/driver/dist/client.d.ts:52

The result of [SinterClient.ping](../classes/SinterClient.md#ping).

## Properties

### ok

> `readonly` **ok**: `true`

Defined in: packages/driver/dist/client.d.ts:54

Always `true`; a failed ping throws instead.

***

### receivedAt

> `readonly` **receivedAt**: `Date`

Defined in: packages/driver/dist/client.d.ts:58

When the server received the ping, by the server's clock.

***

### roundTripTimeMS

> `readonly` **roundTripTimeMS**: `number`

Defined in: packages/driver/dist/client.d.ts:62

The measured round trip, in milliseconds, with sub-millisecond precision.

***

### sentAt

> `readonly` **sentAt**: `Date`

Defined in: packages/driver/dist/client.d.ts:56

When the client sent the ping.
