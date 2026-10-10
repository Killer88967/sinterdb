[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / SinterCollection

# Class: SinterCollection\<TDocument\>

Defined in: packages/driver/dist/collection.d.ts:63

A collection of documents, typed by `TDocument`.

Get one from [SinterDatabase.collection](SinterDatabase.md#collection). The type parameter makes
filters, updates and results type-checked against your document shape; it
is not enforced by the server.

## Type Parameters

### TDocument

`TDocument` *extends* `object` = [`Document`](../interfaces/Document.md)

## Constructors

### Constructor

> **new SinterCollection**\<`TDocument`\>(`database`, `name`): `SinterCollection`\<`TDocument`\>

Defined in: packages/driver/dist/collection.d.ts:70

#### Parameters

##### database

[`SinterDatabase`](SinterDatabase.md)

The database this collection belongs to.

##### name

`string`

#### Returns

`SinterCollection`\<`TDocument`\>

## Properties

### database

> `readonly` **database**: [`SinterDatabase`](SinterDatabase.md)

Defined in: packages/driver/dist/collection.d.ts:65

The database this collection belongs to.

***

### name

> `readonly` **name**: `string`

Defined in: packages/driver/dist/collection.d.ts:69

The collection name.

## Accessors

### namespace

#### Get Signature

> **get** **namespace**(): `string`

Defined in: packages/driver/dist/collection.d.ts:76

The database and collection names joined with a dot, such as `app.users`.

##### Returns

`string`

## Methods

### createIndex()

> **createIndex**(`definition`): `Promise`\<[`CreateIndexResult`](../interfaces/CreateIndexResult.md)\>

Defined in: packages/driver/dist/collection.d.ts:140

Creates an index, or confirms that an identical one exists. The collection
is created if it does not exist. A unique index fails with a
`DuplicateKey` server error when existing documents already violate it.

#### Parameters

##### definition

[`IndexDefinition`](../interfaces/IndexDefinition.md)\<`TDocument`\>

#### Returns

`Promise`\<[`CreateIndexResult`](../interfaces/CreateIndexResult.md)\>

***

### deleteMany()

> **deleteMany**(`filter`): `Promise`\<[`DeleteResult`](../interfaces/DeleteResult.md)\>

Defined in: packages/driver/dist/collection.d.ts:106

Deletes every document that matches the filter.

#### Parameters

##### filter

[`Filter`](../type-aliases/Filter.md)\<`TDocument`\>

#### Returns

`Promise`\<[`DeleteResult`](../interfaces/DeleteResult.md)\>

***

### deleteOne()

> **deleteOne**(`filter`): `Promise`\<[`DeleteResult`](../interfaces/DeleteResult.md)\>

Defined in: packages/driver/dist/collection.d.ts:104

Deletes the first document that matches the filter.

#### Parameters

##### filter

[`Filter`](../type-aliases/Filter.md)\<`TDocument`\>

#### Returns

`Promise`\<[`DeleteResult`](../interfaces/DeleteResult.md)\>

***

### dropIndex()

> **dropIndex**(`name`): `Promise`\<`void`\>

Defined in: packages/driver/dist/collection.d.ts:142

Drops an index by name. The `_id` index cannot be dropped.

#### Parameters

##### name

`string`

#### Returns

`Promise`\<`void`\>

***

### find()

> **find**(`filter?`, `options?`): [`FindCursor`](FindCursor.md)\<`TDocument`\>

Defined in: packages/driver/dist/collection.d.ts:155

Starts a query and returns a cursor. No request is sent until the cursor
is read.

The cursor can be read with `next()`, collected with `toArray()`, or
iterated with `for await`. Always finish or `close()` it so the server
can release it.

#### Parameters

##### filter?

[`Filter`](../type-aliases/Filter.md)\<`TDocument`\>

##### options?

[`FindOptions`](../interfaces/FindOptions.md)\<`TDocument`\>

#### Returns

[`FindCursor`](FindCursor.md)\<`TDocument`\>

***

### findOne()

> **findOne**(`filter?`): `Promise`\<[`WithId`](../type-aliases/WithId.md)\<`TDocument`\> \| `null`\>

Defined in: packages/driver/dist/collection.d.ts:102

Finds the first document that matches the filter, or `null`. Without a
filter, it returns the first document in the collection.

#### Parameters

##### filter?

[`Filter`](../type-aliases/Filter.md)\<`TDocument`\>

#### Returns

`Promise`\<[`WithId`](../type-aliases/WithId.md)\<`TDocument`\> \| `null`\>

***

### indexes()

> **indexes**(): `Promise`\<[`IndexInfo`](../interfaces/IndexInfo.md)[]\>

Defined in: packages/driver/dist/collection.d.ts:144

The `_id` index first, then the others in creation order.

#### Returns

`Promise`\<[`IndexInfo`](../interfaces/IndexInfo.md)[]\>

***

### insertMany()

> **insertMany**(`documents`): `Promise`\<[`InsertManyResult`](../interfaces/InsertManyResult.md)\>

Defined in: packages/driver/dist/collection.d.ts:97

Inserts several documents in order.

An empty array is rejected. If one document fails, the documents before
it stay inserted, and the thrown [SinterInsertManyError](SinterInsertManyError.md) reports
`failedIndex` and the `insertedIds` that were committed.

#### Parameters

##### documents

readonly [`OptionalId`](../type-aliases/OptionalId.md)\<`TDocument`\>[]

#### Returns

`Promise`\<[`InsertManyResult`](../interfaces/InsertManyResult.md)\>

The number of documents inserted and their `_id` values.

***

### insertOne()

> **insertOne**(`document`): `Promise`\<[`InsertOneResult`](../interfaces/InsertOneResult.md)\>

Defined in: packages/driver/dist/collection.d.ts:87

Inserts one document.

The collection is created if it does not exist. A missing `_id` is
generated.

#### Parameters

##### document

[`OptionalId`](../type-aliases/OptionalId.md)\<`TDocument`\>

#### Returns

`Promise`\<[`InsertOneResult`](../interfaces/InsertOneResult.md)\>

The `_id` of the inserted document.

#### Throws

[SinterServerError](SinterServerError.md) with a `DuplicateKey` name when `_id`
  or a unique index value already exists.

***

### replaceOne()

> **replaceOne**(`filter`, `replacement`, `options?`): `Promise`\<[`UpdateResult`](../interfaces/UpdateResult.md)\>

Defined in: packages/driver/dist/collection.d.ts:114

Replaces the first matching document with `replacement`.

The document keeps its `_id`. Giving the replacement a different `_id`
fails with an `ImmutableId` server error. With `upsert`, a replacement is
inserted when nothing matches.

#### Parameters

##### filter

[`Filter`](../type-aliases/Filter.md)\<`TDocument`\>

##### replacement

[`OptionalId`](../type-aliases/OptionalId.md)\<`TDocument`\>

##### options?

[`UpdateOptions`](../interfaces/UpdateOptions.md)

#### Returns

`Promise`\<[`UpdateResult`](../interfaces/UpdateResult.md)\>

***

### updateMany()

> **updateMany**(`filter`, `update`, `options?`): `Promise`\<[`UpdateResult`](../interfaces/UpdateResult.md)\>

Defined in: packages/driver/dist/collection.d.ts:134

Applies an update to every matching document.

With `upsert`, a document seeded from the equality terms of the filter is
inserted, updated, and reported in `upsertedId` when nothing matches.

#### Parameters

##### filter

[`Filter`](../type-aliases/Filter.md)\<`TDocument`\>

##### update

[`UpdateFilter`](../type-aliases/UpdateFilter.md)\<`TDocument`\>

##### options?

[`UpdateOptions`](../interfaces/UpdateOptions.md)

#### Returns

`Promise`\<[`UpdateResult`](../interfaces/UpdateResult.md)\>

`modifiedCount` counts only documents whose stored bytes
  actually changed.

***

### updateOne()

> **updateOne**(`filter`, `update`, `options?`): `Promise`\<[`UpdateResult`](../interfaces/UpdateResult.md)\>

Defined in: packages/driver/dist/collection.d.ts:124

Applies an update to the first matching document.

With `upsert`, a document seeded from the equality terms of the filter is
inserted, updated, and reported in `upsertedId` when nothing matches.

#### Parameters

##### filter

[`Filter`](../type-aliases/Filter.md)\<`TDocument`\>

##### update

[`UpdateFilter`](../type-aliases/UpdateFilter.md)\<`TDocument`\>

##### options?

[`UpdateOptions`](../interfaces/UpdateOptions.md)

#### Returns

`Promise`\<[`UpdateResult`](../interfaces/UpdateResult.md)\>

`modifiedCount` counts only documents whose stored bytes
  actually changed.

***

### validateIndexes()

> **validateIndexes**(): `Promise`\<[`IndexValidationResult`](../interfaces/IndexValidationResult.md)\>

Defined in: packages/driver/dist/collection.d.ts:146

Asks the server to rebuild every index and report any difference.

#### Returns

`Promise`\<[`IndexValidationResult`](../interfaces/IndexValidationResult.md)\>
