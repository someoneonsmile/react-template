import { useEffect, useRef } from 'react'

const useOnceRef = <V>(v: V, clear?: () => void) => {
  const ref = useRef(v)
  useEffect(() => {
    clear?.()
  }, [])
  return ref
}

export default useOnceRef
