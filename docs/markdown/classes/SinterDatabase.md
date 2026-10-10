[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / SinterDatabase

# Class: SinterDatabase

Defined in: packages/driver/dist/database.d.ts:9

A handle to a database on a server.

Get one from [SinterClient.db](SinterClient.md#db).

## Constructors

### Constructor

> **new SinterDatabase**(`client`, `name`): `SinterDatabase`

Defined in: packages/driver/dist/database.d.ts:14

#### Parameters

##### client

[`SinterClient`](SinterClient.md)

The client this database belongs to.

##### name

`string`

#### Returns

`SinterDatabase`

## Properties

### client

> `readonly` **client**: [`SinterClient`](SinterClient.md)

Defined in: packages/driver/dist/database.d.ts:11

The client this database belongs to.

***

### name

> `readonly` **name**: `string`

Defined in: packages/driver/dist/database.d.ts:13

The database name.

## Methods

### collection()

> **collection**\<`TDocument`\>(`name`): [`SinterCollection`](SinterCollection.md)\<`TDocument`\>

Defined in: packages/driver/dist/database.d.ts:25

Returns a handle to a collection. No request is sent; the collection is
created by the first write.

#### Type Parameters

##### TDocument

`TDocument` *extends* `object` = [`Document`](../interfaces/Document.md)

The shape of the documents, used for
  type-checking.

#### Parameters

##### name

`string`

The collection name.

#### Returns

[`SinterCollection`](SinterCollection.md)\<`TDocument`\>

***

### listCollections()

> **listCollections**(): `Promise`\<`string`[]\>

Defined in: packages/driver/dist/database.d.ts:27

Lists the names of the collections in this database.

#### Returns

`Promise`\<`string`[]\>
