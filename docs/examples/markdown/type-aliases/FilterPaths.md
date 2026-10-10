[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / FilterPaths

# Type Alias: FilterPaths\<TDocument, TDepth\>

> **FilterPaths**\<`TDocument`, `TDepth`\> = `TDepth`\[`"length"`\] *extends* [`MaxPathDepth`](MaxPathDepth.md) ? `never` : `TDocument` *extends* `object` ? \{ \[Key in keyof TDocument & string\]: Key \| (NonNullable\<TDocument\[Key\]\> extends readonly unknown\[\] \| AtomicValue ? never : NonNullable\<TDocument\[Key\]\> extends object ? \`$\{Key\}.$\{FilterPaths\<NonNullable\<(...)\>, \[(...), (...)\]\>\}\` : never) \}\[keyof `TDocument` & `string`\] : `never`

Defined in: packages/driver/dist/filter.d.ts:57

Every dotted field path of a document type, such as `profile.name`. Arrays
and atomic values end a path.

## Type Parameters

### TDocument

`TDocument`

### TDepth

`TDepth` *extends* readonly `unknown`[] = \[\]
