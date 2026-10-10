[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / IndexInfo

# Interface: IndexInfo

Defined in: packages/driver/dist/indexes.d.ts:33

A description of an index, as returned by [SinterCollection.indexes](../classes/SinterCollection.md#indexes).

## Properties

### direction

> `readonly` **direction**: `-1` \| `1`

Defined in: packages/driver/dist/indexes.d.ts:39

`1` for ascending or `-1` for descending.

***

### field

> `readonly` **field**: `string`

Defined in: packages/driver/dist/indexes.d.ts:37

The indexed field path.

***

### name

> `readonly` **name**: `string`

Defined in: packages/driver/dist/indexes.d.ts:35

The index name.

***

### sparse

> `readonly` **sparse**: `boolean`

Defined in: packages/driver/dist/indexes.d.ts:43

Whether documents without the field are left out of the index.

***

### unique

> `readonly` **unique**: `boolean`

Defined in: packages/driver/dist/indexes.d.ts:41

Whether the index rejects duplicate values.
