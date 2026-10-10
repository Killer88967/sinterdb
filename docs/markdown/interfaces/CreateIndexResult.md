[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / CreateIndexResult

# Interface: CreateIndexResult

Defined in: packages/driver/dist/indexes.d.ts:22

The result of [SinterCollection.createIndex](../classes/SinterCollection.md#createindex).

## Properties

### acknowledged

> `readonly` **acknowledged**: `true`

Defined in: packages/driver/dist/indexes.d.ts:24

Always `true`; a failed request throws instead.

***

### created

> `readonly` **created**: `boolean`

Defined in: packages/driver/dist/indexes.d.ts:28

False when an identical index already existed.

***

### name

> `readonly` **name**: `string`

Defined in: packages/driver/dist/indexes.d.ts:26

The name of the index, whether new or existing.
