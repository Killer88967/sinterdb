# @sinterdb-internal/test-utils

Internal testing utilities for the SinterDB workspace.

This package is private and is not intended to be published.

## Temporary Test Servers

Start a server on an automatically assigned port:

```ts
import { startTestServer, withTestServer } from "@sinterdb-internal/test-utils";

const testServer = await startTestServer();

console.log(testServer.uri);

await testServer.close();
```

Use `withTestServer()` for automatic cleanup:

```ts
await withTestServer(async (testServer) => {
  console.log(testServer.address);
});
```

The server is stopped in a `finally` block whether the callback succeeds or throws.

## Planned Utilities

Future versions will add:

- Isolated persistent data directories
- Protocol fixtures
- Test documents and collections
- Driver integration helpers
- Storage cleanup utilities
