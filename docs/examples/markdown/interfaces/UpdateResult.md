[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / UpdateResult

# Interface: UpdateResult

Defined in: packages/driver/dist/update.d.ts:73

The result of an update or replace.

## Properties

### acknowledged

> `readonly` **acknowledged**: `true`

Defined in: packages/driver/dist/update.d.ts:75

Always `true`; a failed update throws instead.

***

### matchedCount

> `readonly` **matchedCount**: `number`

Defined in: packages/driver/dist/update.d.ts:77

How many documents matched the filter.

***

### modifiedCount

> `readonly` **modifiedCount**: `number`

Defined in: packages/driver/dist/update.d.ts:82

How many documents actually changed. A document whose stored bytes are
identical after the update is not counted.

***

### upsertedId

> `readonly` **upsertedId**: [`CustomId`](../classes/CustomId.md) \| `null`

Defined in: packages/driver/dist/update.d.ts:87

The `_id` of the inserted document when an upsert inserted one, otherwise
`null`. In that case `matchedCount` is 0.
