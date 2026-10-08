import type { CustomId } from "sinterdb-protocol";

/** Values that can be compared with `$gt`, `$gte`, `$lt` and `$lte`. */
export type ComparableValue =
  string | number | bigint | Date | Uint8Array | CustomId;

/**
 * Values that can be matched by equality: comparable values, booleans and
 * `null`.
 */
export type AtomicValue = ComparableValue | boolean | null;

/**
 * The element type of an array type, or the type itself when it is not an
 * array.
 */
export type ElementOf<TValue> = TValue extends readonly (infer TElement)[]
  ? TElement
  : TValue;

/**
 * The range operators `$gt`, `$gte`, `$lt` and `$lte`. They are available
 * only when the value type includes a comparable type.
 */
export type ComparisonOperators<TValue> = [
  Extract<TValue, ComparableValue>,
] extends [never]
  ? unknown
  : {
      /** Greater than. */
      readonly $gt?: Extract<TValue, ComparableValue>;
      /** Greater than or equal to. */
      readonly $gte?: Extract<TValue, ComparableValue>;
      /** Less than. */
      readonly $lt?: Extract<TValue, ComparableValue>;
      /** Less than or equal to. */
      readonly $lte?: Extract<TValue, ComparableValue>;
    };

/**
 * The operators that can be applied to a single field: `$eq`, `$ne`, `$in`,
 * `$nin`, `$exists`, `$not`, plus the range operators for comparable values.
 */
export type FilterOperators<TValue> = {
  /** Equal to the value. */
  readonly $eq?: TValue;
  /** Not equal to the value. */
  readonly $ne?: TValue;
  /** Equal to any listed value. For an array field, matches when any element equals one. */
  readonly $in?: readonly (TValue | ElementOf<TValue>)[];
  /** Equal to none of the listed values. */
  readonly $nin?: readonly (TValue | ElementOf<TValue>)[];
  /** Whether the field is present. */
  readonly $exists?: boolean;
  /** Matches when the nested operators do not. */
  readonly $not?: FilterOperators<TValue>;
} & ComparisonOperators<TValue>;

/**
 * How many levels of nesting the compiler follows when it builds field paths.
 * Deeper paths still work at runtime but are not suggested or type-checked.
 */
export type MaxPathDepth = 5;

/**
 * Every dotted field path of a document type, such as `profile.name`. Arrays
 * and atomic values end a path.
 */
export type FilterPaths<
  TDocument,
  TDepth extends readonly unknown[] = [],
> = TDepth["length"] extends MaxPathDepth
  ? never
  : TDocument extends object
    ? {
        [Key in keyof TDocument & string]:
          | Key
          | (NonNullable<TDocument[Key]> extends
              readonly unknown[] | AtomicValue
              ? never
              : NonNullable<TDocument[Key]> extends object
                ? `${Key}.${FilterPaths<NonNullable<TDocument[Key]>, [...TDepth, unknown]>}`
                : never);
      }[keyof TDocument & string]
    : never;

/** The type of the value at a dotted field path. */
export type FilterPathValue<
  TDocument,
  TPath extends string,
> = TPath extends keyof TDocument
  ? TDocument[TPath]
  : TPath extends `${infer THead}.${infer TRest}`
    ? THead extends keyof TDocument
      ? FilterPathValue<NonNullable<TDocument[THead]>, TRest>
      : never
    : never;

/**
 * A query filter: field paths mapped to a value or to operators, combined
 * with `$and`, `$or` and `$nor`. An empty filter matches every document.
 */
export type Filter<TDocument extends object> = {
  readonly [Path in FilterPaths<TDocument>]?:
    | FilterPathValue<TDocument, Path>
    | FilterOperators<FilterPathValue<TDocument, Path>>;
} & {
  /** Matches the document `_id`. */
  readonly _id?: CustomId | FilterOperators<CustomId>;
  /** Matches when every filter matches. */
  readonly $and?: readonly Filter<TDocument>[];
  /** Matches when at least one filter matches. */
  readonly $or?: readonly Filter<TDocument>[];
  /** Matches when no filter matches. */
  readonly $nor?: readonly Filter<TDocument>[];
};

/** `1` for ascending or `-1` for descending. */
export type SortDirection = 1 | -1;

/**
 * A sort order: `[path, direction]` pairs, where earlier pairs take priority.
 */
export type Sort<TDocument extends object> = readonly (readonly [
  path: FilterPaths<TDocument> | "_id",
  direction: SortDirection,
])[];
