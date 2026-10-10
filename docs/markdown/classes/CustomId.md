[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / CustomId

# Class: CustomId

Defined in: packages/protocol/dist/custom-id.d.ts:3

## Accessors

### timestamp

#### Get Signature

> **get** **timestamp**(): `Date`

Defined in: packages/protocol/dist/custom-id.d.ts:9

##### Returns

`Date`

## Methods

### equals()

> **equals**(`other`): `boolean`

Defined in: packages/protocol/dist/custom-id.d.ts:10

#### Parameters

##### other

`CustomId`

#### Returns

`boolean`

***

### toBytes()

> **toBytes**(): `Uint8Array`

Defined in: packages/protocol/dist/custom-id.d.ts:11

#### Returns

`Uint8Array`

***

### toHexString()

> **toHexString**(): `string`

Defined in: packages/protocol/dist/custom-id.d.ts:12

#### Returns

`string`

***

### toJSON()

> **toJSON**(): `string`

Defined in: packages/protocol/dist/custom-id.d.ts:14

#### Returns

`string`

***

### toString()

> **toString**(): `string`

Defined in: packages/protocol/dist/custom-id.d.ts:13

#### Returns

`string`

***

### fromBytes()

> `static` **fromBytes**(`value`): `CustomId`

Defined in: packages/protocol/dist/custom-id.d.ts:7

#### Parameters

##### value

`Uint8Array`

#### Returns

`CustomId`

***

### fromHexString()

> `static` **fromHexString**(`value`): `CustomId`

Defined in: packages/protocol/dist/custom-id.d.ts:8

#### Parameters

##### value

`string`

#### Returns

`CustomId`

***

### generate()

> `static` **generate**(): `CustomId`

Defined in: packages/protocol/dist/custom-id.d.ts:6

#### Returns

`CustomId`
