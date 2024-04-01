import { RefObject, useEffect, useRef } from 'react'

const useSyncScroll = (...refs: RefObject<HTMLElement>[]) => {
  const currentScrollRef = useRef<HTMLElement | null>(null)
  useEffect(() => {
    const handler = (currentRef: RefObject<HTMLElement>) => (_e: any) => {
      currentScrollRef.current = currentRef.current
    }
    const handlerMap = new Map()
    refs.forEach((ref, i) => {
      if (ref.current) {
        handlerMap.set(i, handler(ref))
        ref.current.addEventListener('mouseenter', handlerMap.get(i))
      }
    })
    return () => {
      refs.forEach((ref, i) => {
        if (ref.current) {
          ref.current.removeEventListener('mouseenter', handlerMap.get(i))
        }
      })
    }
  }, [...refs, ...refs.map((it) => it.current)])

  useEffect(() => {
    const handler = (_currentRef: RefObject<HTMLElement>) => (_e: any) => {
      currentScrollRef.current = null
    }
    const handlerMap = new Map()
    refs.forEach((ref, i) => {
      if (ref.current) {
        handlerMap.set(i, handler(ref))
        ref.current.addEventListener('mouseleave', handlerMap.get(i))
      }
    })
    return () => {
      refs.forEach((ref, i) => {
        if (ref.current) {
          ref.current.removeEventListener('mouseleave', handlerMap.get(i))
        }
      })
    }
  }, [...refs, ...refs.map((it) => it.current)])

  useEffect(() => {
    const handler = (currentRef: RefObject<HTMLElement>) => (e: any) => {
      if (currentScrollRef.current !== currentRef.current) {
        return
      }
      const radio =
        e.target.scrollTop / (e.target.scrollHeight - e.target.clientHeight)
      refs.forEach((ref) => {
        if (ref != currentRef && ref.current) {
          ref.current.scrollTo(
            0,
            (ref.current.scrollHeight - ref.current.clientHeight) * radio
          )
        }
      })
    }
    const handlerMap = new Map()
    refs.forEach((ref, i) => {
      if (ref.current) {
        handlerMap.set(i, handler(ref))
        ref.current.addEventListener('scroll', handlerMap.get(i))
      }
    })
    return () => {
      refs.forEach((ref, i) => {
        if (ref.current) {
          ref.current.removeEventListener('scroll', handlerMap.get(i))
        }
      })
    }
  }, [...refs, ...refs.map((it) => it.current)])
}

export default useSyncScroll
