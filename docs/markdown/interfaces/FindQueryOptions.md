[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / FindQueryOptions

# Interface: FindQueryOptions

Defined in: packages/driver/dist/cursor.d.ts:11

The query parts of a find that are sent with the first request.

## Properties

### limit?

> `readonly` `optional` **limit?**: `number`

Defined in: packages/driver/dist/cursor.d.ts:17

The maximum number of documents to return.

***

### skip?

> `readonly` `optional` **skip?**: `number`

Defined in: packages/driver/dist/cursor.d.ts:15

How many matching documents to skip.

***

### sort?

> `readonly` `optional` **sort?**: readonly readonly \[`string`, [`SortDirection`](../type-aliases/SortDirection.md)\][]

Defined in: packages/driver/dist/cursor.d.ts:13

Sort order as `[path, direction]` pairs.
