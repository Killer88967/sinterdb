[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / SinterServerErrorOptions

# Interface: SinterServerErrorOptions

Defined in: packages/driver/dist/errors.d.ts:35

Details a server error response can carry.

## Extends

- `ErrorOptions`

## Properties

### cause?

> `optional` **cause?**: `unknown`

Defined in: node\_modules/.pnpm/typescript@6.0.3/node\_modules/typescript/lib/lib.es2022.error.d.ts:20

#### Inherited from

`ErrorOptions.cause`

***

### details?

> `readonly` `optional` **details?**: [`Document`](Document.md)

Defined in: packages/driver/dist/errors.d.ts:43

Extra structured information from the server.

***

### retryable?

> `readonly` `optional` **retryable?**: `boolean`

Defined in: packages/driver/dist/errors.d.ts:41

Whether the server says the same request may succeed if retried.

***

### serverErrorName?

> `readonly` `optional` **serverErrorName?**: `string`

Defined in: packages/driver/dist/errors.d.ts:39

The server's name for the error, such as `DuplicateKey`.

***

### wireCode?

> `readonly` `optional` **wireCode?**: `number`

Defined in: packages/driver/dist/errors.d.ts:37

The numeric error code from the wire protocol.
