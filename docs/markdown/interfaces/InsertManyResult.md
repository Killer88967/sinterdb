[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / InsertManyResult

# Interface: InsertManyResult

Defined in: packages/driver/dist/collection.d.ts:48

The result of [SinterCollection.insertMany](../classes/SinterCollection.md#insertmany).

## Properties

### acknowledged

> `readonly` **acknowledged**: `true`

Defined in: packages/driver/dist/collection.d.ts:50

Always `true`; a failed insert throws instead.

***

### insertedCount

> `readonly` **insertedCount**: `number`

Defined in: packages/driver/dist/collection.d.ts:52

How many documents were inserted.

***

### insertedIds

> `readonly` **insertedIds**: readonly [`CustomId`](../classes/CustomId.md)[]

Defined in: packages/driver/dist/collection.d.ts:54

The `_id` of every inserted document, in input order.
