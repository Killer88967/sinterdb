[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / Sort

# Type Alias: Sort\<TDocument\>

> **Sort**\<`TDocument`\> = readonly readonly \[[`FilterPaths`](FilterPaths.md)\<`TDocument`\> \| `"_id"`, [`SortDirection`](SortDirection.md)\][]

Defined in: packages/driver/dist/filter.d.ts:83

A sort order: `[path, direction]` pairs, where earlier pairs take priority.

## Type Parameters

### TDocument

`TDocument` *extends* `object`
