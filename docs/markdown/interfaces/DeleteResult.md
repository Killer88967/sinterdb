[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / DeleteResult

# Interface: DeleteResult

Defined in: packages/driver/dist/update.d.ts:90

The result of a delete.

## Properties

### acknowledged

> `readonly` **acknowledged**: `true`

Defined in: packages/driver/dist/update.d.ts:92

Always `true`; a failed delete throws instead.

***

### deletedCount

> `readonly` **deletedCount**: `number`

Defined in: packages/driver/dist/update.d.ts:94

How many documents were deleted.
