[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / SinterClientState

# Variable: SinterClientState

> `const` **SinterClientState**: `object`

Defined in: packages/driver/dist/client.d.ts:93

The lifecycle states of a [SinterClient](../classes/SinterClient.md).

A client moves from `new` to `connecting` to `connected`, and finally to
`closing` and `closed`. A failed connection attempt returns it to `new`, so
`connect()` can be called again. A closed client cannot be reused.

## Type Declaration

### Closed

> `readonly` **Closed**: `"closed"`

Closed for good; the client cannot be reused.

### Closing

> `readonly` **Closing**: `"closing"`

`close()` is in progress.

### Connected

> `readonly` **Connected**: `"connected"`

Connected and ready for commands.

### Connecting

> `readonly` **Connecting**: `"connecting"`

A connection attempt is in progress.

### New

> `readonly` **New**: `"new"`

Created, not yet connected. Also the state after a failed connection attempt.
