export { InMemoryCollection } from "./in-memory-collection.js";
export {
  StorageError,
  StorageErrorCode,
  StorageInsertManyError,
} from "./errors.js";
import { compileFilter } from "./filter.js";

export type {
  StorageInsertManyResult,
  StorageInsertOneResult,
} from "./in-memory-collection.js";
export type { StorageErrorCode as StorageErrorCodeValue } from "./errors.js";
import type { CompiledFilter} from "./filter.js";
