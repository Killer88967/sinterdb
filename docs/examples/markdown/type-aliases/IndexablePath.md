[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / IndexablePath

# Type Alias: IndexablePath\<TDocument\>

> **IndexablePath**\<`TDocument`\> = `Exclude`\<[`FilterPaths`](FilterPaths.md)\<`TDocument`\>, `"_id"` \| `` `_id.${string}` ``\>

Defined in: packages/driver/dist/indexes.d.ts:7

Field paths that can be indexed: every known path except `_id`, which
always has its own unique index.

## Type Parameters

### TDocument

`TDocument` *extends* `object`
