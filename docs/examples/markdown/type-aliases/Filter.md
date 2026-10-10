[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / Filter

# Type Alias: Filter\<TDocument\>

> **Filter**\<`TDocument`\> = \{ readonly \[Path in FilterPaths\<TDocument\>\]?: FilterPathValue\<TDocument, Path\> \| FilterOperators\<FilterPathValue\<TDocument, Path\>\> \} & `object`

Defined in: packages/driver/dist/filter.d.ts:66

A query filter: field paths mapped to a value or to operators, combined
with `$and`, `$or` and `$nor`. An empty filter matches every document.

## Type Declaration

### \_id?

> `readonly` `optional` **\_id?**: [`CustomId`](../classes/CustomId.md) \| [`FilterOperators`](FilterOperators.md)\<[`CustomId`](../classes/CustomId.md)\>

Matches the document `_id`.

### $and?

> `readonly` `optional` **$and?**: readonly `Filter`\<`TDocument`\>[]

Matches when every filter matches.

### $nor?

> `readonly` `optional` **$nor?**: readonly `Filter`\<`TDocument`\>[]

Matches when no filter matches.

### $or?

> `readonly` `optional` **$or?**: readonly `Filter`\<`TDocument`\>[]

Matches when at least one filter matches.

## Type Parameters

### TDocument

`TDocument` *extends* `object`
