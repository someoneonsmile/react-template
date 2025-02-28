import { useEffect, useState } from 'react'

export default function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(
    () => window.matchMedia?.(query)?.matches ?? false,
  )
  useEffect(() => {
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    const mediaQuery = window.matchMedia?.(query)
    mediaQuery?.addEventListener('change', onChange)
    return () => mediaQuery?.removeEventListener('change', onChange)
  }, [])
  return matches
}
