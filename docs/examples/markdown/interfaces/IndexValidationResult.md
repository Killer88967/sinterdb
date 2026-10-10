[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / IndexValidationResult

# Interface: IndexValidationResult

Defined in: packages/driver/dist/indexes.d.ts:95

The result of [SinterCollection.validateIndexes](../classes/SinterCollection.md#validateindexes).

## Properties

### documents

> `readonly` **documents**: `number`

Defined in: packages/driver/dist/indexes.d.ts:101

How many documents were checked.

***

### indexes

> `readonly` **indexes**: `number`

Defined in: packages/driver/dist/indexes.d.ts:99

How many indexes were checked.

***

### issues

> `readonly` **issues**: readonly [`IndexIssue`](IndexIssue.md)[]

Defined in: packages/driver/dist/indexes.d.ts:103

Every difference found; empty when `valid` is `true`.

***

### valid

> `readonly` **valid**: `boolean`

Defined in: packages/driver/dist/indexes.d.ts:97

Whether every index matches the documents.
