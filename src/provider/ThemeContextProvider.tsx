import { ReactNode, useEffect } from 'react'
import { preload } from 'react-dom'

import ThemeContext from '@/context/ThemeContext'
import { useEffectCssLink } from '@/hook'
import useMatchMedia from '@/hook/useMatchMedia'
import useStore from '@/hook/useStore'
import { LightDarkMode, ThemeFilterType, getTheme, themes } from '@/theme'

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
  const theme = getTheme(themeFilter)
  const themeCssUrl = theme?.url

  const [lightDarkMode, setLightDarkMode] = useStore<LightDarkMode>(
    'light-dark-mode',
    {
      defaultValue: undefined,
    },
  )

  const isPreferDark = useMatchMedia('(prefers-color-scheme: dark)')

  const lightDarkModeCalc: LightDarkMode =
    lightDarkMode ?? (isPreferDark ? 'dark' : 'light')

  useEffectCssLink(themeCssUrl)
  useEffect(() => {
    const html = document.getElementsByTagName('html')[0]
    console.log(lightDarkModeCalc)

    html.dataset.theme = lightDarkModeCalc
    return () => {
      html.dataset.theme = undefined
    }
  }, [lightDarkModeCalc])

  return (
    <>
      <ThemeContext
        value={[
          theme,
          themeFilter,
          setThemeFilter,
          lightDarkMode,
          setLightDarkMode,
        ]}
      >
        {children}
      </ThemeContext>
    </>
  )
}

export default ThemeContextProvider
