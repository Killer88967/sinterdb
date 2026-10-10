[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / FindCursor

# Class: FindCursor\<TDocument\>

Defined in: packages/driver/dist/cursor.d.ts:27

A lazy, batched cursor over the results of a find.

Nothing is sent until the first read. Documents arrive in batches, and the
cursor releases its server-side state when it is exhausted or closed.
`toArray()` and `for await` close the cursor for you, even when the loop
exits early or throws.

## Type Parameters

### TDocument

`TDocument` *extends* `object` = [`Document`](../interfaces/Document.md)

## Implements

- `AsyncIterable`\<[`WithId`](../type-aliases/WithId.md)\<`TDocument`\>\>

## Constructors

### Constructor

> **new FindCursor**\<`TDocument`\>(`execute`, `collection`, `filter`, `batchSize`, `query?`): `FindCursor`\<`TDocument`\>

Defined in: packages/driver/dist/cursor.d.ts:36

#### Parameters

##### execute

[`CursorExecutor`](../type-aliases/CursorExecutor.md)

##### collection

`string`

##### filter

[`Document`](../interfaces/Document.md)

##### batchSize

`number` \| `undefined`

##### query?

[`FindQueryOptions`](../interfaces/FindQueryOptions.md)

#### Returns

`FindCursor`\<`TDocument`\>

## Methods

### \[asyncIterator\]()

> **\[asyncIterator\]**(): `AsyncGenerator`\<[`WithId`](../type-aliases/WithId.md)\<`TDocument`\>, `void`, `undefined`\>

Defined in: packages/driver/dist/cursor.d.ts:66

Iterates the remaining documents, closing the cursor when the loop ends.

#### Returns

`AsyncGenerator`\<[`WithId`](../type-aliases/WithId.md)\<`TDocument`\>, `void`, `undefined`\>

#### Implementation of

`AsyncIterable.[asyncIterator]`

***

### close()

> **close**(): `Promise`\<`void`\>

Defined in: packages/driver/dist/cursor.d.ts:62

Closes the cursor and releases it on the server. Closing twice does
nothing.

#### Returns

`Promise`\<`void`\>

***

### explain()

> **explain**(): `Promise`\<[`ExplainResult`](../interfaces/ExplainResult.md)\>

Defined in: packages/driver/dist/cursor.d.ts:43

**`Beta`**

Asks the server how it would run this query, without running it. The
sort, skip, limit, and batch size do not change the plan.

#### Returns

`Promise`\<[`ExplainResult`](../interfaces/ExplainResult.md)\>

***

### hasNext()

> **hasNext**(): `Promise`\<`boolean`\>

Defined in: packages/driver/dist/cursor.d.ts:47

Whether another document is available. This may fetch the next batch.

#### Returns

`Promise`\<`boolean`\>

***

### next()

> **next**(): `Promise`\<[`WithId`](../type-aliases/WithId.md)\<`TDocument`\> \| `null`\>

Defined in: packages/driver/dist/cursor.d.ts:52

Returns the next document, or `null` when the results are exhausted or
the cursor is closed.

#### Returns

`Promise`\<[`WithId`](../type-aliases/WithId.md)\<`TDocument`\> \| `null`\>

***

### toArray()

> **toArray**(): `Promise`\<[`WithId`](../type-aliases/WithId.md)\<`TDocument`\>[]\>

Defined in: packages/driver/dist/cursor.d.ts:57

Reads all remaining documents into an array and closes the cursor. Large
result sets are held in memory; iterate instead when they may be large.

#### Returns

`Promise`\<[`WithId`](../type-aliases/WithId.md)\<`TDocument`\>[]\>
