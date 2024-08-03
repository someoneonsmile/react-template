import { __, defaultTo, memoizeWith } from 'ramda'

import { objectHash } from './hash'

// import {compose, divide } from 'ramda'

export * from './hash'
export * from './autoId'
export * from './notify'
export * from './helper'

export function isBlank(s: string | null | undefined) {
  return !s || s.trim().length === 0
}

export function keypress(
  e: KeyboardEvent,
  key: string,
  {
    ctrlKey,
    altKey,
    metaKey,
    shiftKey,
  }: Partial<Record<'ctrlKey' | 'altKey' | 'metaKey' | 'shiftKey', boolean>> = {
    ctrlKey: false,
    altKey: false,
    metaKey: false,
    shiftKey: false,
  },
) {
  return (
    e.key === key &&
    e.ctrlKey === ctrlKey &&
    e.altKey === altKey &&
    e.metaKey === metaKey &&
    e.shiftKey === shiftKey
  )
}

// export const half = compose(divide(__, 2), defaultTo(0)<number>)
export const half = (n: Maybe<number>) => {
  return (n ?? 0) / 2
}

export const defaultZero = defaultTo(0)<number>

// list convert to map
export const listToMap = <T, K, V>(list: T[], f: (t: T) => [K, V]) => {
  return new Map<K, V>(list.map(f))
}

export const memoizeListToMap = memoizeWith(
  (list, f) => objectHash({ list, f }),
  listToMap,
)

export const nullToUndefined = <T>(t: Maybe<T>) => {
  if (t === null) {
    return undefined
  }
  return t
}
