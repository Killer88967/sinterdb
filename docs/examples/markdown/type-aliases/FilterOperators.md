[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / FilterOperators

# Type Alias: FilterOperators\<TValue\>

> **FilterOperators**\<`TValue`\> = `object` & [`ComparisonOperators`](ComparisonOperators.md)\<`TValue`\>

Defined in: packages/driver/dist/filter.d.ts:34

The operators that can be applied to a single field: `$eq`, `$ne`, `$in`,
`$nin`, `$exists`, `$not`, plus the range operators for comparable values.

## Type Declaration

### $eq?

> `readonly` `optional` **$eq?**: `TValue`

Equal to the value.

### $exists?

> `readonly` `optional` **$exists?**: `boolean`

Whether the field is present.

### $in?

> `readonly` `optional` **$in?**: readonly (`TValue` \| [`ElementOf`](ElementOf.md)\<`TValue`\>)[]

Equal to any listed value. For an array field, matches when any element equals one.

### $ne?

> `readonly` `optional` **$ne?**: `TValue`

Not equal to the value.

### $nin?

> `readonly` `optional` **$nin?**: readonly (`TValue` \| [`ElementOf`](ElementOf.md)\<`TValue`\>)[]

Equal to none of the listed values.

### $not?

> `readonly` `optional` **$not?**: `FilterOperators`\<`TValue`\>

Matches when the nested operators do not.

## Type Parameters

### TValue

`TValue`
