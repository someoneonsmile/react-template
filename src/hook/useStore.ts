import { Dispatch, SetStateAction, useMemo, useState } from 'react'

import { StoreItem, StoreItemOptions } from '@/util/store'

export default function useStore<S>(
  key: string,
  options: StoreItemOptions<S>,
): [Readonly<S>, Dispatch<SetStateAction<S>>] {
  const storeItem = useMemo(() => {
    return new StoreItem(key, options)
  }, [])

  const [value, setValue] = useState(() => storeItem.get())

  return [
    value,
    (v) => {
      setValue(v)
      if (typeof v === 'function') {
        const f = v as (prevState: Option<S>) => Option<S>
        storeItem.set(f(storeItem.get()))
        return
      }
      storeItem.set(v)
    },
  ]
}
