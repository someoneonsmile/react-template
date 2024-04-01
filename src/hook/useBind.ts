import { useState } from 'react'

function useBind<T>(init: T) {
  const [value, setValue] = useState(init)
  return {
    value,
    setValue,
    reset: () => setValue(init),
    bind: {
      value,
      onChange: (e: any) => {
        e?.target?.value ?? e
      },
    },
  }
}

export default useBind
