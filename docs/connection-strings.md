# Connection strings

A SinterDB connection string tells the driver where a server listens and,
optionally, which database to use by default.

```text
sinterdb://<host>[:<port>][/<database>]
```

This format is **stable for the whole `0.x` line**. A string that is accepted
today keeps meaning the same thing, and any change that would reject a string
that works today needs a minor release and a migration note (see
[compatibility.md](./compatibility.md)).

## Parts

| Part       | Required | Default | Notes                                                                       |
| ---------- | -------- | ------- | --------------------------------------------------------------------------- |
| `sinterdb` | yes      |         | The scheme. It is case-insensitive.                                         |
| host       | yes      |         | A DNS name, an IPv4 address, or an IPv6 address in brackets: `[::1]`.       |
| port       | no       | `4721`  | An integer from 1 to 65535. A trailing `:` with no number uses the default. |
| database   | no       | none    | One path segment, percent-decoded. No database means "none selected".       |

The database name follows the same rules as the server's database names: it
cannot be empty and cannot contain `/`, `\`, or a NUL character. Write a space
or any other special character percent-encoded (`my%20db`).

## Reserved parts

These parts of a URI are **reserved**. The driver rejects them today with a
clear error so that giving them a meaning later cannot change what an existing
string does.

- **Credentials** (`user:password@host`). Authentication is not implemented
  yet. Credentials in a string are an error, not ignored, so a password is
  never silently dropped or logged.
- **Query parameters** (`?name=value`). Any `?` is rejected, even an empty one.
- **Fragments** (`#...`). Any `#` is rejected, even an empty one.
- **Other schemes** such as `sinterdb+tls://`. Only `sinterdb://` is accepted.

Use the options of `SinterClient` for anything a query parameter might have
carried, such as timeouts.

## Accepted examples

| String                           | Host          | Port  | Database |
| -------------------------------- | ------------- | ----- | -------- |
| `sinterdb://localhost`           | `localhost`   | 4721  | none     |
| `sinterdb://localhost:4721`      | `localhost`   | 4721  | none     |
| `sinterdb://localhost/`          | `localhost`   | 4721  | none     |
| `sinterdb://localhost:5000/app`  | `localhost`   | 5000  | `app`    |
| `sinterdb://localhost/my%20db`   | `localhost`   | 4721  | `my db`  |
| `sinterdb://localhost/%E2%82%AC` | `localhost`   | 4721  | `€`      |
| `sinterdb://[::1]:5000/app`      | `::1`         | 5000  | `app`    |
| `sinterdb://192.168.0.1`         | `192.168.0.1` | 4721  | none     |
| `sinterdb://db_host`             | `db_host`     | 4721  | none     |
| `SINTERDB://LocalHost/App`       | `LocalHost`   | 4721  | `App`    |
| `sinterdb://localhost:`          | `localhost`   | 4721  | none     |
| `sinterdb://localhost:65535`     | `localhost`   | 65535 | none     |

Host names keep the case you wrote. Database names are case-sensitive.

## Rejected examples

Every string below makes `new SinterClient(...)` throw a
`SinterConnectionStringError` (code `INVALID_CONNECTION_STRING`) before any
network connection is attempted.

| String                         | Why                                           |
| ------------------------------ | --------------------------------------------- |
| `localhost`                    | Not a URL with the `sinterdb://` scheme.      |
| `http://localhost`             | Wrong scheme.                                 |
| `sinterdb+tls://localhost`     | Wrong scheme.                                 |
| `sinterdb://`                  | No host.                                      |
| `sinterdb:///app`              | No host.                                      |
| `sinterdb:localhost`           | No host.                                      |
| `sinterdb://localhost:0`       | Port out of range.                            |
| `sinterdb://localhost:65536`   | Port out of range.                            |
| `sinterdb://localhost:4721.5`  | Port is not an integer.                       |
| `sinterdb://localhost/a/b`     | More than one path segment.                   |
| `sinterdb://localhost//`       | More than one path segment.                   |
| `sinterdb://localhost/my db`   | Whitespace must be percent-encoded.           |
| `sinterdb://localhost/%2F`     | Database name contains `/`.                   |
| `sinterdb://localhost/%00`     | Database name contains NUL.                   |
| `sinterdb://localhost/%zz`     | Invalid percent encoding.                     |
| `sinterdb://user@localhost`    | Credentials are reserved.                     |
| `sinterdb://user:pw@localhost` | Credentials are reserved.                     |
| `sinterdb://localhost?x=1`     | Query parameters are reserved.                |
| `sinterdb://localhost/app?`    | Query parameters are reserved, even if empty. |
| `sinterdb://localhost#frag`    | Fragments are reserved.                       |
| `sinterdb://localhost/app#`    | Fragments are reserved, even if empty.        |
| `sinterdb://bücher.example`    | Host must be ASCII; use punycode `xn--...`.   |
