[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / WithId

# Type Alias: WithId\<TDocument\>

> **WithId**\<`TDocument`\> = `Omit`\<`TDocument`, `"_id"`\> & `object`

Defined in: packages/driver/dist/collection.d.ts:16

A document as stored and returned: `_id` is always present.

## Type Declaration

### \_id

> `readonly` **\_id**: [`CustomId`](../classes/CustomId.md)

The document's `_id`.

## Type Parameters

### TDocument

`TDocument` *extends* `object`
