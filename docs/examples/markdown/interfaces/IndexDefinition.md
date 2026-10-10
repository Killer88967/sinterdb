[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / IndexDefinition

# Interface: IndexDefinition\<TDocument\>

Defined in: packages/driver/dist/indexes.d.ts:9

How to build an index, passed to [SinterCollection.createIndex](../classes/SinterCollection.md#createindex).

## Type Parameters

### TDocument

`TDocument` *extends* `object` = [`Document`](Document.md)

## Properties

### direction?

> `readonly` `optional` **direction?**: `1` \| `-1`

Defined in: packages/driver/dist/indexes.d.ts:13

Defaults to 1. Both directions serve the same lookups today.

***

### field

> `readonly` **field**: `Exclude`\<`TDocument` *extends* `object` ? \{ \[Key in string\]: Key \| (NonNullable\<TDocument\[Key\]\> extends AtomicValue \| readonly unknown\[\] ? never : NonNullable\<TDocument\[Key\]\> extends object ? \`$\{Key\}.$\{NonNullable\<TDocument\[Key\]\> extends object ? \{ \[Key in string\]: Key \| (NonNullable\<NonNullable\<TDocument\[Key\]\>\[Key\]\> extends AtomicValue \| readonly unknown\[\] ? never : NonNullable\<NonNullable\<TDocument\[Key\]\>\[Key\]\> extends object ? \`$\{Key\}.$\{NonNullable\<NonNullable\<TDocument\[Key\]\>\[Key\]\> extends object ? \{ \[Key in string\]: Key \| (NonNullable\<(...)\> extends (...) \| (...) ? never : (...) extends (...) ? (...) : (...)) \}\[keyof NonNullable\<(...)\[(...)\]\> & string\] : never\}\` : never) \}\[keyof NonNullable\<TDocument\[Key\]\> & string\] : never\}\` : never) \}\[keyof `TDocument` & `string`\] : `never`\>

Defined in: packages/driver/dist/indexes.d.ts:11

The field to index. Dotted paths reach into nested documents.

***

### name?

> `readonly` `optional` **name?**: `string`

Defined in: packages/driver/dist/indexes.d.ts:19

Defaults to the field and direction, such as `email_1`.

***

### sparse?

> `readonly` `optional` **sparse?**: `boolean`

Defined in: packages/driver/dist/indexes.d.ts:17

Documents without the field are left out, so they never conflict.

***

### unique?

> `readonly` `optional` **unique?**: `boolean`

Defined in: packages/driver/dist/indexes.d.ts:15

At most one document may hold a given value, or lack the field.
