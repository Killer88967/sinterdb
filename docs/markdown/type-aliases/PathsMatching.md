[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / PathsMatching

# Type Alias: PathsMatching\<TDocument, TKind\>

> **PathsMatching**\<`TDocument`, `TKind`\> = `{ [Path in UpdatePaths<TDocument>]: [NonNullable<FilterPathValue<TDocument, Path>>] extends [TKind] ? Path : never }`\[[`UpdatePaths`](UpdatePaths.md)\<`TDocument`\>\]

Defined in: packages/driver/dist/update.d.ts:9

The updatable paths whose value type is assignable to `TKind`.

## Type Parameters

### TDocument

`TDocument` *extends* `object`

### TKind

`TKind`
