[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / FilterPathValue

# Type Alias: FilterPathValue\<TDocument, TPath\>

> **FilterPathValue**\<`TDocument`, `TPath`\> = `TPath` *extends* keyof `TDocument` ? `TDocument`\[`TPath`\] : `TPath` *extends* `` `${infer THead}.${infer TRest}` `` ? `THead` *extends* keyof `TDocument` ? `FilterPathValue`\<`NonNullable`\<`TDocument`\[`THead`\]\>, `TRest`\> : `never` : `never`

Defined in: packages/driver/dist/filter.d.ts:61

The type of the value at a dotted field path.

## Type Parameters

### TDocument

`TDocument`

### TPath

`TPath` *extends* `string`
