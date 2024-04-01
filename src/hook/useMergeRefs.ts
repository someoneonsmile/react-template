// 跟 useForkRef 一样
// import { useForkRef } from '@mui/material'
// copy form chakra ui hook.
import { MutableRefObject, RefCallback, useMemo } from 'react'

export type Ref<T> = RefCallback<T> | MutableRefObject<T>

export function assignRef<T = any>(ref: Ref<T> | null | undefined, value: T) {
  if (ref == null) return

  if (typeof ref === 'function') {
    ref(value)
    return
  }

  try {
    ref.current = value
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
  }
}

export function mergeRefs<T>(...refs: (Ref<T> | null | undefined)[]) {
  return (node: T | null) => {
    refs.forEach((ref) => {
      assignRef(ref, node)
    })
  }
}

export function useMergeRefs<T>(...refs: (Ref<T> | null | undefined)[]) {
  return useMemo(() => mergeRefs(...refs), refs)
}
