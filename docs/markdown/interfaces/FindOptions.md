[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / FindOptions

# Interface: FindOptions\<TDocument\>

Defined in: packages/driver/dist/collection.d.ts:25

Options for [SinterCollection.find](../classes/SinterCollection.md#find).

## Type Parameters

### TDocument

`TDocument` *extends* `object` = [`Document`](Document.md)

## Properties

### batchSize?

> `readonly` `optional` **batchSize?**: `number`

Defined in: packages/driver/dist/collection.d.ts:29

How many documents the cursor fetches from the server per round trip.

***

### limit?

> `readonly` `optional` **limit?**: `number`

Defined in: packages/driver/dist/collection.d.ts:38

The maximum number of documents to return.

***

### skip?

> `readonly` `optional` **skip?**: `number`

Defined in: packages/driver/dist/collection.d.ts:36

How many matching documents to skip, after sorting.

***

### sort?

> `readonly` `optional` **sort?**: [`Sort`](../type-aliases/Sort.md)\<`TDocument`\>

Defined in: packages/driver/dist/collection.d.ts:34

Sort order as `[path, direction]` pairs, where direction is `1` for
ascending and `-1` for descending. Earlier pairs take priority.
