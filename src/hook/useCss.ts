import hash from 'object-hash'
import { Dispatch, useEffect, useState } from 'react'

export function useCssLink(
  initHref?: string,
): [string | undefined, Dispatch<React.SetStateAction<string | undefined>>] {
  const [href, setHref] = useState(initHref)
  useEffect(() => {
    if (href) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href
      document.head.appendChild(link)
      return () => {
        if (link) {
          document.head.removeChild(link)
        }
      }
    }
  }, [href])
  return [href, setHref]
}

interface useCssProp {
  initCss?: string
  clean?: boolean
}

export function useCss({
  initCss,
  clean = true,
}: useCssProp): [
  string | undefined,
  Dispatch<React.SetStateAction<string | undefined>>,
] {
  const [css, setCss] = useState(initCss)
  useEffect(() => {
    if (css) {
      const id = 'css-' + hash.MD5(css)
      let style = document.getElementById(id)
      if (!style) {
        style = document.createElement('style')
        style.id = id
        style.innerHTML = css
        document.head.appendChild(style)
      }
      return () => {
        if (clean) {
          style?.remove()
        }
      }
    }
  }, [css])
  return [css, setCss]
}
