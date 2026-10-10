[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / EqualityFilter

# Type Alias: EqualityFilter\<TDocument\>

> **EqualityFilter**\<`TDocument`\> = `{ readonly [Key in keyof TDocument]?: TDocument[Key] }`

Defined in: packages/driver/dist/collection.d.ts:21

A shorthand filter that matches fields by equality only.

## Type Parameters

### TDocument

`TDocument` *extends* `object`
