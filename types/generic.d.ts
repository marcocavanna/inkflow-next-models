export type {
  MongoDBAggregationInstruction
} from './miscellaneous/mongodb-aggregation';

/* --------
 * Base Types & Interfaces
 * -------- */

export type AnyObject = { [key: string]: any };

/**
 * @type APIResponse
 *
 * @description
 * Used to define object passed through
 * an API call. The result of this operation
 * is a Plain object, without function field
 */
export type APIResponse<T> = {
  [K in keyof T]: T[K] extends (() => (void | any | Promise<any> | Promise<void>))
    ? never
    : T[K] extends {}
      ? APIResponse<T[K]>
      : T[K]
};
