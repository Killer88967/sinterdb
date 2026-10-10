[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / ParsedSinterConnectionString

# Interface: ParsedSinterConnectionString

Defined in: packages/driver/dist/connection-string.d.ts:7

A parsed `sinterdb://` connection string, available as [SinterClient.target](../classes/SinterClient.md#target).

## Properties

### database?

> `readonly` `optional` **database?**: `string`

Defined in: packages/driver/dist/connection-string.d.ts:15

The database named in the path, if any.

***

### host

> `readonly` **host**: `string`

Defined in: packages/driver/dist/connection-string.d.ts:9

The server host.

***

### port

> `readonly` **port**: `number`

Defined in: packages/driver/dist/connection-string.d.ts:13

The server port; [DEFAULT\_SINTERDB\_PORT](../variables/DEFAULT_SINTERDB_PORT.md) when the string has none.
