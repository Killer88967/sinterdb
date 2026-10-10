[**SinterDB driver API**](../README.md)

***

[SinterDB driver API](../README.md) / ExplainResult

# Interface: ExplainResult

Defined in: packages/driver/dist/indexes.d.ts:62

**`Beta`**

The query plan the server reports for a find. The shape is experimental and
may change in any release; see docs/compatibility.md.

## Properties

### access?

> `readonly` `optional` **access?**: `"equality"` \| `"in"` \| `"range"`

Defined in: packages/driver/dist/indexes.d.ts:75

**`Beta`**

How the index is read: by equality, by a list of values, or by a range.

***

### documents

> `readonly` **documents**: `number`

Defined in: packages/driver/dist/indexes.d.ts:83

**`Beta`**

How many documents the collection holds.

***

### estimatedCandidates

> `readonly` **estimatedCandidates**: `number`

Defined in: packages/driver/dist/indexes.d.ts:81

**`Beta`**

How many documents the server expects to examine.

***

### field?

> `readonly` `optional` **field?**: `string`

Defined in: packages/driver/dist/indexes.d.ts:71

**`Beta`**

The field the index covers, for `IXSCAN`.

***

### index?

> `readonly` `optional` **index?**: `string`

Defined in: packages/driver/dist/indexes.d.ts:69

**`Beta`**

The index used, for `IXSCAN`.

***

### lower?

> `readonly` `optional` **lower?**: [`IndexBoundInfo`](IndexBoundInfo.md)

Defined in: packages/driver/dist/indexes.d.ts:77

**`Beta`**

The lower end of a range scan.

***

### stage

> `readonly` **stage**: `"COLLSCAN"` \| `"IDLOOKUP"` \| `"IXSCAN"`

Defined in: packages/driver/dist/indexes.d.ts:67

**`Beta`**

The strategy: `COLLSCAN` reads every document, `IDLOOKUP` reads by `_id`,
and `IXSCAN` scans an index.

***

### upper?

> `readonly` `optional` **upper?**: [`IndexBoundInfo`](IndexBoundInfo.md)

Defined in: packages/driver/dist/indexes.d.ts:79

**`Beta`**

The upper end of a range scan.
