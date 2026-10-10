[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / ComparisonOperators

# Type Alias: ComparisonOperators\<TValue\>

> **ComparisonOperators**\<`TValue`\> = \[`Extract`\<`TValue`, [`ComparableValue`](ComparableValue.md)\>\] *extends* \[`never`\] ? `unknown` : `object`

Defined in: packages/driver/dist/filter.d.ts:18

The range operators `$gt`, `$gte`, `$lt` and `$lte`. They are available
only when the value type includes a comparable type.

## Type Parameters

### TValue

`TValue`
