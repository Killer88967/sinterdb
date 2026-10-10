import { ApiIndex } from "./_components/api-index";

const reflections = [
  {
    "id": 1,
    "name": "CustomId",
    "slug": "CustomId",
    "route": "classes/CustomId",
    "kind": "Class",
    "kindId": 128,
    "description": ""
  },
  {
    "id": 285,
    "name": "FindCursor",
    "slug": "FindCursor",
    "route": "classes/FindCursor",
    "kind": "Class",
    "kindId": 128,
    "description": "A lazy, batched cursor over the results of a find.\n\nNothing is sent until the first read. Documents arrive in batches, and the\ncursor releases its server-side state when it is exhausted or closed.\n`toArray()` and `for await` close the cursor for you, even when the loop\nexits early or throws."
  },
  {
    "id": 32,
    "name": "SinterClient",
    "slug": "SinterClient",
    "route": "classes/SinterClient",
    "kind": "Class",
    "kindId": 128,
    "description": "A connection to a SinterDB server.\n\nCreate a client from a `sinterdb://` connection string, call `connect()`,\nand then use `db()` to reach databases and collections. Commands sent\nbefore `connect()` completes throw a SinterClientStateError. Call\n`close()` when finished."
  },
  {
    "id": 338,
    "name": "SinterClientOptionsError",
    "slug": "SinterClientOptionsError",
    "route": "classes/SinterClientOptionsError",
    "kind": "Class",
    "kindId": 128,
    "description": "A client option or a database or collection name is invalid. Code\n`INVALID_CLIENT_OPTIONS`."
  },
  {
    "id": 357,
    "name": "SinterClientStateError",
    "slug": "SinterClientStateError",
    "route": "classes/SinterClientStateError",
    "kind": "Class",
    "kindId": 128,
    "description": "A command was used in the wrong client state: `CLIENT_NOT_CONNECTED` before\n`connect()`, or `CLIENT_CLOSED` after `close()`."
  },
  {
    "id": 199,
    "name": "SinterCollection",
    "slug": "SinterCollection",
    "route": "classes/SinterCollection",
    "kind": "Class",
    "kindId": 128,
    "description": "A collection of documents, typed by `TDocument`.\n\nGet one from SinterDatabase.collection. The type parameter makes\nfilters, updates and results type-checked against your document shape; it\nis not enforced by the server."
  },
  {
    "id": 377,
    "name": "SinterCompatibilityError",
    "slug": "SinterCompatibilityError",
    "route": "classes/SinterCompatibilityError",
    "kind": "Class",
    "kindId": 128,
    "description": "The server does not speak a compatible protocol version. Code\n`INCOMPATIBLE_PROTOCOL`."
  },
  {
    "id": 400,
    "name": "SinterConnectionError",
    "slug": "SinterConnectionError",
    "route": "classes/SinterConnectionError",
    "kind": "Class",
    "kindId": 128,
    "description": "The connection could not be established or was lost. Code\n`CONNECTION_FAILED`."
  },
  {
    "id": 419,
    "name": "SinterConnectionStringError",
    "slug": "SinterConnectionStringError",
    "route": "classes/SinterConnectionStringError",
    "kind": "Class",
    "kindId": 128,
    "description": "The connection string is malformed. Code `INVALID_CONNECTION_STRING`."
  },
  {
    "id": 438,
    "name": "SinterConnectionTimeoutError",
    "slug": "SinterConnectionTimeoutError",
    "route": "classes/SinterConnectionTimeoutError",
    "kind": "Class",
    "kindId": 128,
    "description": "Connecting took longer than `connectTimeoutMS`."
  },
  {
    "id": 325,
    "name": "SinterDatabase",
    "slug": "SinterDatabase",
    "route": "classes/SinterDatabase",
    "kind": "Class",
    "kindId": 128,
    "description": "A handle to a database on a server.\n\nGet one from SinterClient.db."
  },
  {
    "id": 457,
    "name": "SinterDocumentError",
    "slug": "SinterDocumentError",
    "route": "classes/SinterDocumentError",
    "kind": "Class",
    "kindId": 128,
    "description": "A request could not be encoded, so nothing was sent and the connection is\nunaffected. The usual causes are a value the database cannot store (such as\n`undefined`, a function, or a class instance like `Map`), a document nested\nmore than 100 levels deep, or a request larger than 16 MiB. The `cause` says\nwhich. Code `INVALID_DOCUMENT`."
  },
  {
    "id": 476,
    "name": "SinterError",
    "slug": "SinterError",
    "route": "classes/SinterError",
    "kind": "Class",
    "kindId": 128,
    "description": "The base class of every error the driver throws on its own. Check `code` to\ntell them apart."
  },
  {
    "id": 511,
    "name": "SinterInsertManyError",
    "slug": "SinterInsertManyError",
    "route": "classes/SinterInsertManyError",
    "kind": "Class",
    "kindId": 128,
    "description": "`insertMany` failed partway. The documents before `failedIndex` were\ninserted and stay committed."
  },
  {
    "id": 700,
    "name": "SinterNamespaceError",
    "slug": "SinterNamespaceError",
    "route": "classes/SinterNamespaceError",
    "kind": "Class",
    "kindId": 128,
    "description": "A database or collection name is invalid: empty, or containing forbidden\ncharacters. Code `INVALID_CLIENT_OPTIONS`."
  },
  {
    "id": 537,
    "name": "SinterProtocolError",
    "slug": "SinterProtocolError",
    "route": "classes/SinterProtocolError",
    "kind": "Class",
    "kindId": 128,
    "description": "The server sent something the driver cannot interpret. Code\n`PROTOCOL_VIOLATION`."
  },
  {
    "id": 556,
    "name": "SinterRequestTimeoutError",
    "slug": "SinterRequestTimeoutError",
    "route": "classes/SinterRequestTimeoutError",
    "kind": "Class",
    "kindId": 128,
    "description": "A request got no response within `requestTimeoutMS`. The request may still\nhave run on the server. Code `REQUEST_TIMEOUT`."
  },
  {
    "id": 575,
    "name": "SinterServerError",
    "slug": "SinterServerError",
    "route": "classes/SinterServerError",
    "kind": "Class",
    "kindId": 128,
    "description": "The server rejected a request. Code `SERVER_ERROR`.\n\nUse `serverErrorName` to tell failures apart, such as `DuplicateKey`."
  },
  {
    "id": 598,
    "name": "SinterSocketTimeoutError",
    "slug": "SinterSocketTimeoutError",
    "route": "classes/SinterSocketTimeoutError",
    "kind": "Class",
    "kindId": 128,
    "description": "The connection was idle for longer than `socketTimeoutMS`."
  },
  {
    "id": 660,
    "name": "CreateIndexResult",
    "slug": "CreateIndexResult",
    "route": "interfaces/CreateIndexResult",
    "kind": "Interface",
    "kindId": 256,
    "description": "The result of SinterCollection.createIndex."
  },
  {
    "id": 723,
    "name": "DeleteResult",
    "slug": "DeleteResult",
    "route": "interfaces/DeleteResult",
    "kind": "Interface",
    "kindId": 256,
    "description": "The result of a delete."
  },
  {
    "id": 26,
    "name": "Document",
    "slug": "Document",
    "route": "interfaces/Document",
    "kind": "Interface",
    "kindId": 256,
    "description": ""
  },
  {
    "id": 664,
    "name": "ExplainResult",
    "slug": "ExplainResult",
    "route": "interfaces/ExplainResult",
    "kind": "Interface",
    "kindId": 256,
    "description": "The query plan the server reports for a find. The shape is experimental and\nmay change in any release; see docs/compatibility.md."
  },
  {
    "id": 259,
    "name": "FindOptions",
    "slug": "FindOptions",
    "route": "interfaces/FindOptions",
    "kind": "Interface",
    "kindId": 256,
    "description": "Options for SinterCollection.find."
  },
  {
    "id": 321,
    "name": "FindQueryOptions",
    "slug": "FindQueryOptions",
    "route": "interfaces/FindQueryOptions",
    "kind": "Interface",
    "kindId": 256,
    "description": "The query parts of a find that are sent with the first request."
  },
  {
    "id": 675,
    "name": "IndexBoundInfo",
    "slug": "IndexBoundInfo",
    "route": "interfaces/IndexBoundInfo",
    "kind": "Interface",
    "kindId": 256,
    "description": "One end of an index range in an ExplainResult."
  },
  {
    "id": 678,
    "name": "IndexDefinition",
    "slug": "IndexDefinition",
    "route": "interfaces/IndexDefinition",
    "kind": "Interface",
    "kindId": 256,
    "description": "How to build an index, passed to SinterCollection.createIndex."
  },
  {
    "id": 685,
    "name": "IndexInfo",
    "slug": "IndexInfo",
    "route": "interfaces/IndexInfo",
    "kind": "Interface",
    "kindId": 256,
    "description": "A description of an index, as returned by SinterCollection.indexes."
  },
  {
    "id": 691,
    "name": "IndexIssue",
    "slug": "IndexIssue",
    "route": "interfaces/IndexIssue",
    "kind": "Interface",
    "kindId": 256,
    "description": "One difference found by SinterCollection.validateIndexes."
  },
  {
    "id": 695,
    "name": "IndexValidationResult",
    "slug": "IndexValidationResult",
    "route": "interfaces/IndexValidationResult",
    "kind": "Interface",
    "kindId": 256,
    "description": "The result of SinterCollection.validateIndexes."
  },
  {
    "id": 265,
    "name": "InsertManyResult",
    "slug": "InsertManyResult",
    "route": "interfaces/InsertManyResult",
    "kind": "Interface",
    "kindId": 256,
    "description": "The result of SinterCollection.insertMany."
  },
  {
    "id": 269,
    "name": "InsertOneResult",
    "slug": "InsertOneResult",
    "route": "interfaces/InsertOneResult",
    "kind": "Interface",
    "kindId": 256,
    "description": "The result of SinterCollection.insertOne."
  },
  {
    "id": 281,
    "name": "ParsedSinterConnectionString",
    "slug": "ParsedSinterConnectionString",
    "route": "interfaces/ParsedSinterConnectionString",
    "kind": "Interface",
    "kindId": 256,
    "description": "A parsed `sinterdb://` connection string, available as SinterClient.target."
  },
  {
    "id": 180,
    "name": "SinterClientEvents",
    "slug": "SinterClientEvents",
    "route": "interfaces/SinterClientEvents",
    "kind": "Interface",
    "kindId": 256,
    "description": "The events a SinterClient emits.\n\nAn `error` event is emitted only while at least one `error` listener is\nattached."
  },
  {
    "id": 185,
    "name": "SinterClientOptions",
    "slug": "SinterClientOptions",
    "route": "interfaces/SinterClientOptions",
    "kind": "Interface",
    "kindId": 256,
    "description": "Options for SinterClient. Every timeout is a whole number of\nmilliseconds no greater than 2,147,483,647. An invalid value throws a\nSinterClientOptionsError."
  },
  {
    "id": 189,
    "name": "SinterPingResult",
    "slug": "SinterPingResult",
    "route": "interfaces/SinterPingResult",
    "kind": "Interface",
    "kindId": 256,
    "description": "The result of SinterClient.ping."
  },
  {
    "id": 617,
    "name": "SinterServerErrorOptions",
    "slug": "SinterServerErrorOptions",
    "route": "interfaces/SinterServerErrorOptions",
    "kind": "Interface",
    "kindId": 256,
    "description": "Details a server error response can carry."
  },
  {
    "id": 194,
    "name": "SinterServerInfo",
    "slug": "SinterServerInfo",
    "route": "interfaces/SinterServerInfo",
    "kind": "Interface",
    "kindId": 256,
    "description": "What the server reported during the protocol handshake. Available from\nSinterClient.serverInfo once the client is connected."
  },
  {
    "id": 742,
    "name": "UpdateOptions",
    "slug": "UpdateOptions",
    "route": "interfaces/UpdateOptions",
    "kind": "Interface",
    "kindId": 256,
    "description": "Options for updates and replacements."
  },
  {
    "id": 746,
    "name": "UpdateResult",
    "slug": "UpdateResult",
    "route": "interfaces/UpdateResult",
    "kind": "Interface",
    "kindId": 256,
    "description": "The result of an update or replace."
  },
  {
    "id": 719,
    "name": "ArrayPaths",
    "slug": "ArrayPaths",
    "route": "types/ArrayPaths",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "Updatable paths that hold an array, the targets of `$push`, `$addToSet` and\n`$pull`."
  },
  {
    "id": 623,
    "name": "AtomicValue",
    "slug": "AtomicValue",
    "route": "types/AtomicValue",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "Values that can be matched by equality: comparable values, booleans and\n`null`."
  },
  {
    "id": 721,
    "name": "ComparablePaths",
    "slug": "ComparablePaths",
    "route": "types/ComparablePaths",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "Updatable paths that hold a comparable value, the targets of `$min` and\n`$max`."
  },
  {
    "id": 624,
    "name": "ComparableValue",
    "slug": "ComparableValue",
    "route": "types/ComparableValue",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "Values that can be compared with `$gt`, `$gte`, `$lt` and `$lte`."
  },
  {
    "id": 625,
    "name": "ComparisonOperators",
    "slug": "ComparisonOperators",
    "route": "types/ComparisonOperators",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "The range operators `$gt`, `$gte`, `$lt` and `$lte`. They are available\nonly when the value type includes a comparable type."
  },
  {
    "id": 316,
    "name": "CursorExecutor",
    "slug": "CursorExecutor",
    "route": "types/CursorExecutor",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "The function a FindCursor uses to reach the server. Cursors are\ncreated by SinterCollection.find; do not construct them directly."
  },
  {
    "id": 632,
    "name": "ElementOf",
    "slug": "ElementOf",
    "route": "types/ElementOf",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "The element type of an array type, or the type itself when it is not an\narray."
  },
  {
    "id": 257,
    "name": "EqualityFilter",
    "slug": "EqualityFilter",
    "route": "types/EqualityFilter",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "A shorthand filter that matches fields by equality only."
  },
  {
    "id": 634,
    "name": "Filter",
    "slug": "Filter",
    "route": "types/Filter",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "A query filter: field paths mapped to a value or to operators, combined\nwith `$and`, `$or` and `$nor`. An empty filter matches every document."
  },
  {
    "id": 641,
    "name": "FilterOperators",
    "slug": "FilterOperators",
    "route": "types/FilterOperators",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "The operators that can be applied to a single field: `$eq`, `$ne`, `$in`,\n`$nin`, `$exists`, `$not`, plus the range operators for comparable values."
  },
  {
    "id": 650,
    "name": "FilterPaths",
    "slug": "FilterPaths",
    "route": "types/FilterPaths",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "Every dotted field path of a document type, such as `profile.name`. Arrays\nand atomic values end a path."
  },
  {
    "id": 653,
    "name": "FilterPathValue",
    "slug": "FilterPathValue",
    "route": "types/FilterPathValue",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "The type of the value at a dotted field path."
  },
  {
    "id": 673,
    "name": "IndexablePath",
    "slug": "IndexablePath",
    "route": "types/IndexablePath",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "Field paths that can be indexed: every known path except `_id`, which\nalways has its own unique index."
  },
  {
    "id": 656,
    "name": "MaxPathDepth",
    "slug": "MaxPathDepth",
    "route": "types/MaxPathDepth",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "How many levels of nesting the compiler follows when it builds field paths.\nDeeper paths still work at runtime but are not suggested or type-checked."
  },
  {
    "id": 726,
    "name": "NumericPaths",
    "slug": "NumericPaths",
    "route": "types/NumericPaths",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "Updatable paths that hold a number or bigint, the targets of `$inc`."
  },
  {
    "id": 272,
    "name": "OptionalId",
    "slug": "OptionalId",
    "route": "types/OptionalId",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "A document as accepted for insertion: `_id` is optional, and the server\ngenerates one when it is missing."
  },
  {
    "id": 728,
    "name": "PathsMatching",
    "slug": "PathsMatching",
    "route": "types/PathsMatching",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "The updatable paths whose value type is assignable to `TKind`."
  },
  {
    "id": 179,
    "name": "SinterClientState",
    "slug": "SinterClientState",
    "route": "types/SinterClientState",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "A value of SinterClientState."
  },
  {
    "id": 510,
    "name": "SinterErrorCode",
    "slug": "SinterErrorCode",
    "route": "types/SinterErrorCode",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "A value of SinterErrorCode."
  },
  {
    "id": 657,
    "name": "Sort",
    "slug": "Sort",
    "route": "types/Sort",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "A sort order: `[path, direction]` pairs, where earlier pairs take priority."
  },
  {
    "id": 659,
    "name": "SortDirection",
    "slug": "SortDirection",
    "route": "types/SortDirection",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "`1` for ascending or `-1` for descending."
  },
  {
    "id": 731,
    "name": "UpdateFilter",
    "slug": "UpdateFilter",
    "route": "types/UpdateFilter",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "An update document built from operators: `$set`, `$unset`, `$inc`, `$min`,\n`$max`, `$push`, `$addToSet` and `$pull`. Each operator accepts only paths\nof a matching type."
  },
  {
    "id": 744,
    "name": "UpdatePaths",
    "slug": "UpdatePaths",
    "route": "types/UpdatePaths",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "The field paths an update can change: every path except `_id`, which is\nimmutable."
  },
  {
    "id": 276,
    "name": "WithId",
    "slug": "WithId",
    "route": "types/WithId",
    "kind": "TypeAlias",
    "kindId": 2097152,
    "description": "A document as stored and returned: `_id` is always present."
  },
  {
    "id": 29,
    "name": "DEFAULT_CONNECT_TIMEOUT_MS",
    "slug": "DEFAULT_CONNECT_TIMEOUT_MS",
    "route": "variables/DEFAULT_CONNECT_TIMEOUT_MS",
    "kind": "Variable",
    "kindId": 32,
    "description": "The default `connectTimeoutMS`: 10 seconds."
  },
  {
    "id": 30,
    "name": "DEFAULT_REQUEST_TIMEOUT_MS",
    "slug": "DEFAULT_REQUEST_TIMEOUT_MS",
    "route": "variables/DEFAULT_REQUEST_TIMEOUT_MS",
    "kind": "Variable",
    "kindId": 32,
    "description": "The default `requestTimeoutMS`: 10 seconds."
  },
  {
    "id": 280,
    "name": "DEFAULT_SINTERDB_PORT",
    "slug": "DEFAULT_SINTERDB_PORT",
    "route": "variables/DEFAULT_SINTERDB_PORT",
    "kind": "Variable",
    "kindId": 32,
    "description": "The port used when a connection string does not name one: 4721."
  },
  {
    "id": 31,
    "name": "DEFAULT_SOCKET_TIMEOUT_MS",
    "slug": "DEFAULT_SOCKET_TIMEOUT_MS",
    "route": "variables/DEFAULT_SOCKET_TIMEOUT_MS",
    "kind": "Variable",
    "kindId": 32,
    "description": "The default `socketTimeoutMS`: 0, which disables the idle timeout."
  },
  {
    "id": 172,
    "name": "SinterClientState",
    "slug": "SinterClientState",
    "route": "variables/SinterClientState",
    "kind": "Variable",
    "kindId": 32,
    "description": "The lifecycle states of a SinterClient.\n\nA client moves from `new` to `connecting` to `connected`, and finally to\n`closing` and `closed`. A failed connection attempt returns it to `new`, so\n`connect()` can be called again. A closed client cannot be reused."
  },
  {
    "id": 496,
    "name": "SinterErrorCode",
    "slug": "SinterErrorCode",
    "route": "variables/SinterErrorCode",
    "kind": "Variable",
    "kindId": 32,
    "description": "The stable string codes carried by SinterError.code. Branch on\nthese rather than on message text."
  }
] as const;

export default function Page() {
  return (
    <ApiIndex
      name="SinterDB driver API"
      reflections={reflections}
    />
  );
}
