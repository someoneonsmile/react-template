import { ReactNode } from 'react'
import { preload } from 'react-dom'

import ThemeContext from '@/context/ThemeContext'
import { useEffectCssLink } from '@/hook'
import useStore from '@/hook/useStore'
import { ThemeValueType, getTheme, themes } from '@/theme'

interface ThemeContextProviderProps {
  children?: ReactNode
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  themes.forEach((it) => {
    preload(it.url, { as: 'style' })
  })
  const [themeValue, setThemeValue] = useStore<ThemeValueType>('theme', {
    defaultValue: getTheme(),
  })
  const themeCssUrl = getTheme(themeValue)!.url
  useEffectCssLink(themeCssUrl)

  return (
    <>
      <ThemeContext value={[themeValue, setThemeValue]}>
        {children}
      </ThemeContext>
    </>
  )
}

export default ThemeContextProvider
