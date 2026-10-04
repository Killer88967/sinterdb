import type { CustomId } from "sinterdb-protocol";

import type {
  ComparableValue,
  ElementOf,
  FilterPaths,
  FilterPathValue,
} from "./filter.js";

type UpdatePaths<TDocument extends object> = Exclude<
  FilterPaths<TDocument>,
  "_id" | `_id.${string}`
>;

type PathsMatching<TDocument extends object, TKind> = {
  [Path in UpdatePaths<TDocument>]: [
    NonNullable<FilterPathValue<TDocument, Path>>,
  ] extends [TKind]
    ? Path
    : never;
}[UpdatePaths<TDocument>];

type NumericPaths<TDocument extends object> = PathsMatching<
  TDocument,
  number | bigint
>;

type ComparablePaths<TDocument extends object> = PathsMatching<
  TDocument,
  ComparableValue | boolean
>;

type ArrayPaths<TDocument extends object> = PathsMatching<
  TDocument,
  readonly unknown[]
>;

export interface UpdateOptions {
  /**
   * Insert a new document when nothing matches the filter.
   */
  readonly upsert?: boolean;
}

export type UpdateFilter<TDocument extends object> = {
  readonly $set?: {
    readonly [Path in UpdatePaths<TDocument>]?: FilterPathValue<
      TDocument,
      Path
    >;
  };
  readonly $unset?: {
    readonly [Path in UpdatePaths<TDocument>]?: true | 1;
  };
  readonly $inc?: {
    readonly [Path in NumericPaths<TDocument>]?: NonNullable<
      FilterPathValue<TDocument, Path>
    >;
  };
  readonly $min?: {
    readonly [Path in ComparablePaths<TDocument>]?: NonNullable<
      FilterPathValue<TDocument, Path>
    >;
  };
  readonly $max?: {
    readonly [Path in ComparablePaths<TDocument>]?: NonNullable<
      FilterPathValue<TDocument, Path>
    >;
  };
  readonly $push?: {
    readonly [Path in ArrayPaths<TDocument>]?: ElementOf<
      NonNullable<FilterPathValue<TDocument, Path>>
    >;
  };
  readonly $addToSet?: {
    readonly [Path in ArrayPaths<TDocument>]?: ElementOf<
      NonNullable<FilterPathValue<TDocument, Path>>
    >;
  };
  readonly $pull?: {
    readonly [Path in ArrayPaths<TDocument>]?: ElementOf<
      NonNullable<FilterPathValue<TDocument, Path>>
    >;
  };
};

export interface UpdateResult {
  readonly acknowledged: true;
  readonly matchedCount: number;
  readonly modifiedCount: number;
  readonly upsertedId: CustomId | null;
}

export interface DeleteResult {
  readonly acknowledged: true;
  readonly deletedCount: number;
}
