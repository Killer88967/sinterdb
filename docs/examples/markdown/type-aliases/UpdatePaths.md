[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / UpdatePaths

# Type Alias: UpdatePaths\<TDocument\>

> **UpdatePaths**\<`TDocument`\> = `Exclude`\<[`FilterPaths`](FilterPaths.md)\<`TDocument`\>, `"_id"` \| `` `_id.${string}` ``\>

Defined in: packages/driver/dist/update.d.ts:7

The field paths an update can change: every path except `_id`, which is
immutable.

## Type Parameters

### TDocument

`TDocument` *extends* `object`
