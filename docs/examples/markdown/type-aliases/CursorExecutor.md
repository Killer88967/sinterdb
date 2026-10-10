[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / CursorExecutor

# Type Alias: CursorExecutor

> **CursorExecutor** = (`command`, `parameters`) => `Promise`\<`DocumentValue`\>

Defined in: packages/driver/dist/cursor.d.ts:9

The function a [FindCursor](../classes/FindCursor.md) uses to reach the server. Cursors are
created by [SinterCollection.find](../classes/SinterCollection.md#find); do not construct them directly.

## Parameters

### command

`string`

### parameters

[`Document`](../interfaces/Document.md)

## Returns

`Promise`\<`DocumentValue`\>
