import { ReactNode, useEffect } from 'react'
import { preload } from 'react-dom'

import ThemeContext from '@/context/ThemeContext'
import { useEffectCssLink } from '@/hook'
import useMatchMedia from '@/hook/useMatchMedia'
import useStore from '@/hook/useStore'
import { ThemeFilterType, getTheme, themes } from '@/theme'

interface ThemeContextProviderProps {
  children?: ReactNode
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  themes.forEach((it) => {
    preload(it.url, { as: 'style' })
  })
  const [themeFilter, setThemeFilter] = useStore<ThemeFilterType>('theme', {
    defaultValue: {},
  })
  const isPreferDark = useMatchMedia('(prefers-color-scheme: dark)')
  const themeFilterWithPrefer = { ...themeFilter }
  if (!themeFilterWithPrefer.type) {
    themeFilterWithPrefer.type = isPreferDark ? 'dark' : 'light'
  }
  const theme = getTheme(themeFilterWithPrefer)
  const themeCssUrl = theme.url

  useEffectCssLink(themeCssUrl)
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0]
    html.dataset.theme = themeFilter.type
    return () => {
      html.dataset.theme = ''
    }
  }, [themeFilter])

  return (
    <>
      <ThemeContext value={[theme, themeFilter, setThemeFilter]}>
        {children}
      </ThemeContext>
    </>
  )
}

export default ThemeContextProvider
