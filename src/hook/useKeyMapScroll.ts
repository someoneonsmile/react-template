import { curry } from 'ramda'
import { RefObject, useEffect } from 'react'

import { half, keypress } from '../util'

interface useKeyMapScrollOption {
  listenOnRoot?: boolean
}

function useKeyMapScroll(
  contentRef: RefObject<HTMLElement>,
  { listenOnRoot = true }: useKeyMapScrollOption = {},
) {
  useEffect(() => {
    const step = 50

    const scrollHalfDonwHandler = (_: KeyboardEvent) => {
      contentRef.current?.scrollBy({
        top: half(contentRef.current?.offsetHeight),
      })
    }

    const scrollHalfUpHandler = (_: KeyboardEvent) => {
      contentRef.current?.scrollBy({
        top: half(-(contentRef.current?.offsetHeight ?? 0)),
      })
    }

    const scrollDownHandler = (_: KeyboardEvent) => {
      contentRef.current?.scrollBy({
        top: step,
      })
    }

    const scrollUpHandler = (_: KeyboardEvent) => {
      contentRef.current?.scrollBy({
        top: -step,
      })
    }

    const scrollDownPageHandler = (_: KeyboardEvent) => {
      contentRef.current?.scrollBy({
        top: contentRef.current?.offsetHeight,
      })
    }

    const scrollUpPageHandler = (_: KeyboardEvent) => {
      contentRef.current?.scrollBy({
        top: -contentRef.current?.offsetHeight,
      })
    }

    const scrollToHeadHandler = (_: KeyboardEvent) => {
      contentRef.current?.scroll({
        top: 0,
      })
    }

    const scrollToTailHandler = (_: KeyboardEvent) => {
      contentRef.current?.scroll({
        top: contentRef.current?.scrollHeight,
      })
    }

    const keyDownHandler = (e: KeyboardEvent) => {
      const blockSet = new Set(['INPUT', 'TEXTAREA'])
      if (blockSet.has((e.target as HTMLElement)?.tagName)) {
        return
      }
      const key = curry(keypress)(e)
      if (key('d')) {
        scrollHalfDonwHandler(e)
      } else if (key('u')) {
        scrollHalfUpHandler(e)
      } else if (key('h')) {
        scrollToHeadHandler(e)
      } else if (key('l')) {
        scrollToTailHandler(e)
      } else if (key('j')) {
        scrollDownHandler(e)
      } else if (key('k')) {
        scrollUpHandler(e)
      } else if (key('f')) {
        scrollDownPageHandler(e)
      } else if (key('b')) {
        scrollUpPageHandler(e)
      }
    }
    const listenOn = listenOnRoot ? document : contentRef.current
    if (!listenOn) {
      return
    }
    listenOn.addEventListener('keydown', keyDownHandler as EventListener)
    return () => {
      listenOn.removeEventListener('keydown', keyDownHandler as EventListener)
    }
  }, [contentRef, contentRef.current])
}

export default useKeyMapScroll
