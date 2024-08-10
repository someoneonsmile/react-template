// copy from react-use / useMouse
import { RefObject, useEffect, useRef } from 'react'

export interface State {
  docX: number
  docY: number
  posX: number
  posY: number
  elX: number
  elY: number
  elH: number
  elW: number
}

function useMouseRef(elementRef: RefObject<Element>) {
  // if (process.env.NODE_ENV === 'development') {
  //   if (!elementRef.current) {
  //     console.error('useMouseRef expects a single ref argument.')
  //   }
  // }
  const ref = useRef<State>(undefined)

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      if (elementRef && elementRef.current) {
        const {
          left,
          top,
          width: elW,
          height: elH,
        } = elementRef.current!.getBoundingClientRect()
        const posX = left + window.pageXOffset
        const posY = top + window.pageYOffset
        const elX = event.pageX - posX
        const elY = event.pageY - posY

        ref.current = {
          docX: event.pageX,
          docY: event.pageY,
          posX,
          posY,
          elX,
          elY,
          elH,
          elW,
        }
      }
    }

    document.addEventListener('mousemove', moveHandler)
    return () => {
      document.removeEventListener('mousemove', moveHandler)
    }
  })
  return ref
}

export default useMouseRef
