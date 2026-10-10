[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / SinterServerInfo

# Interface: SinterServerInfo

Defined in: packages/driver/dist/client.d.ts:41

What the server reported during the protocol handshake. Available from
[SinterClient.serverInfo](../classes/SinterClient.md#serverinfo) once the client is connected.

## Properties

### capabilities

> `readonly` **capabilities**: readonly `string`[]

Defined in: packages/driver/dist/client.d.ts:49

The protocol capabilities the server advertised.

***

### product

> `readonly` **product**: `string`

Defined in: packages/driver/dist/client.d.ts:45

The server's product name.

***

### productVersion

> `readonly` **productVersion**: `string`

Defined in: packages/driver/dist/client.d.ts:47

The server's version.

***

### protocolVersion

> `readonly` **protocolVersion**: `number`

Defined in: packages/driver/dist/client.d.ts:43

The wire protocol version both sides agreed on.
