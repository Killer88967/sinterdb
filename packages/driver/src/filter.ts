import type { CustomId } from "sinterdb-protocol";

export type ComparableValue =
  string | number | bigint | Date | Uint8Array | CustomId;

type AtomicValue = ComparableValue | boolean | null;

export type ElementOf<TValue> = TValue extends readonly (infer TElement)[]
  ? TElement
  : TValue;

type ComparisonOperators<TValue> = [Extract<TValue, ComparableValue>] extends [
  never,
]
  ? unknown
  : {
      readonly $gt?: Extract<TValue, ComparableValue>;
      readonly $gte?: Extract<TValue, ComparableValue>;
      readonly $lt?: Extract<TValue, ComparableValue>;
      readonly $lte?: Extract<TValue, ComparableValue>;
    };

export type FilterOperators<TValue> = {
  readonly $eq?: TValue;
  readonly $ne?: TValue;
  readonly $in?: readonly (TValue | ElementOf<TValue>)[];
  readonly $nin?: readonly (TValue | ElementOf<TValue>)[];
  readonly $exists?: boolean;
  readonly $not?: FilterOperators<TValue>;
} & ComparisonOperators<TValue>;

type MaxPathDepth = 5;

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

export type Filter<TDocument extends object> = {
  readonly [Path in FilterPaths<TDocument>]?:
    | FilterPathValue<TDocument, Path>
    | FilterOperators<FilterPathValue<TDocument, Path>>;
} & {
  readonly _id?: CustomId | FilterOperators<CustomId>;
  readonly $and?: readonly Filter<TDocument>[];
  readonly $or?: readonly Filter<TDocument>[];
  readonly $nor?: readonly Filter<TDocument>[];
};

export type SortDirection = 1 | -1;

export type Sort<TDocument extends object> = readonly (readonly [
  path: FilterPaths<TDocument> | "_id",
  direction: SortDirection,
])[];
