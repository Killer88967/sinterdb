[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / UpdateFilter

# Type Alias: UpdateFilter\<TDocument\>

> **UpdateFilter**\<`TDocument`\> = `object`

Defined in: packages/driver/dist/update.d.ts:38

An update document built from operators: `$set`, `$unset`, `$inc`, `$min`,
`$max`, `$push`, `$addToSet` and `$pull`. Each operator accepts only paths
of a matching type.

## Type Parameters

### TDocument

`TDocument` *extends* `object`

## Properties

### $addToSet?

> `readonly` `optional` **$addToSet?**: `{ readonly [Path in ArrayPaths<TDocument>]?: ElementOf<NonNullable<FilterPathValue<TDocument, Path>>> }`

Defined in: packages/driver/dist/update.d.ts:64

Appends a value to an array unless an equal element is already present. A missing field becomes a new array.

***

### $inc?

> `readonly` `optional` **$inc?**: `{ readonly [Path in NumericPaths<TDocument>]?: NonNullable<FilterPathValue<TDocument, Path>> }`

Defined in: packages/driver/dist/update.d.ts:48

Adds a number to numeric fields. A missing field is set to the number.

***

### $max?

> `readonly` `optional` **$max?**: `{ readonly [Path in ComparablePaths<TDocument>]?: NonNullable<FilterPathValue<TDocument, Path>> }`

Defined in: packages/driver/dist/update.d.ts:56

Raises a field to the given value when the value is larger. A missing field is set to the value.

***

### $min?

> `readonly` `optional` **$min?**: `{ readonly [Path in ComparablePaths<TDocument>]?: NonNullable<FilterPathValue<TDocument, Path>> }`

Defined in: packages/driver/dist/update.d.ts:52

Lowers a field to the given value when the value is smaller. A missing field is set to the value.

***

### $pull?

> `readonly` `optional` **$pull?**: `{ readonly [Path in ArrayPaths<TDocument>]?: ElementOf<NonNullable<FilterPathValue<TDocument, Path>>> }`

Defined in: packages/driver/dist/update.d.ts:68

Removes every matching element from an array.

***

### $push?

> `readonly` `optional` **$push?**: `{ readonly [Path in ArrayPaths<TDocument>]?: ElementOf<NonNullable<FilterPathValue<TDocument, Path>>> }`

Defined in: packages/driver/dist/update.d.ts:60

Appends a value to an array, creating the array when the field is missing.

***

### $set?

> `readonly` `optional` **$set?**: `{ readonly [Path in UpdatePaths<TDocument>]?: FilterPathValue<TDocument, Path> }`

Defined in: packages/driver/dist/update.d.ts:40

Sets fields to values, creating them when missing.

***

### $unset?

> `readonly` `optional` **$unset?**: \{ readonly \[Path in UpdatePaths\<TDocument\>\]?: true \| 1 \}

Defined in: packages/driver/dist/update.d.ts:44

Removes fields.
