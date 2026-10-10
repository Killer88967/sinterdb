[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / InsertOneResult

# Interface: InsertOneResult

Defined in: packages/driver/dist/collection.d.ts:41

The result of [SinterCollection.insertOne](../classes/SinterCollection.md#insertone).

## Properties

### acknowledged

> `readonly` **acknowledged**: `true`

Defined in: packages/driver/dist/collection.d.ts:43

Always `true`; a failed insert throws instead.

***

### insertedId

> `readonly` **insertedId**: [`CustomId`](../classes/CustomId.md)

Defined in: packages/driver/dist/collection.d.ts:45

The `_id` of the inserted document, whether supplied or generated.
