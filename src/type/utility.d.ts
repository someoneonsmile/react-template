/**
 * global utility types
 */

type Modify<T, R> = Omit<T, keyof R> & R

type Maybe<T> = T | null | undefined

type DeepMaybe<T> = { [P in keyof T]: DeepMaybe<T[P]> } | undefined | null

type Option<T> = T | undefined

type DeepOption<T> = { [P in keyof T]: DeepOption<T[P]> } | undefined

type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

/**
 * Exempt: `'k'` for Option key, `'k1' | 'k2'` for muti Option key
 */
type KeyNonNullable<T, Exempt extends keyof T = never> = {
  [K in keyof T as Exclude<K, Exempt>]-?: NonNullable<T[K]>
} & {
  [K in Exempt]: T[K]
}

// type DeepNonNullable<T, EXCLUDE extends keyof T = never> = {
//   [P in keyof T]: NonNullable<T[P]> extends EXCLUDE
//     ? T<P>
//     : NonNullable<T[P]> extends object
//       ? DeepNonNullable<NonNullable<T[P]>, EXCLUDE>
//       : NonNullable<T[P]>
// }

type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined
  : T extends (infer U)[]
    ? RecursivelyReplaceNullWithUndefined<U>[]
    : T extends Record<string, unknown>
      ? { [K in keyof T]: RecursivelyReplaceNullWithUndefined<T[K]> }
      : T
