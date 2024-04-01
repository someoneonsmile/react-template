import { DependencyList, useEffect, useRef } from 'react'

function useSyncRef<S>(state: S, deps: DependencyList = []) {
  const ref = useRef<typeof state>(state)
  useEffect(() => {
    ref.current = state
  }, [state, ...deps])
  return ref
}

export default useSyncRef
