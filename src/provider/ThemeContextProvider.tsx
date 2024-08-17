import { ReactNode, useState } from 'react'
import { preload } from 'react-dom'

import { DEFAULT } from '@/constant'
import ThemeContext, {
  ThemeValueType,
  defaultThemeValue,
} from '@/context/ThemeContext'
import defaultThemeUrl from '@/css/theme/default.css?url'
import kanagawaThemeUrl from '@/css/theme/kanagawa.css?url'
import nordThemeUrl from '@/css/theme/nord.css?url'
import { useEffectCssLink } from '@/hook'

interface ThemeContextProviderProps {
  children?: ReactNode
}

function getThemeCssUrl(themeValue: ThemeValueType): string {
  if (themeValue.name === 'normal' && themeValue.variance === DEFAULT) {
    return defaultThemeUrl
  }
  if (themeValue.name === 'nord' && themeValue.variance === DEFAULT) {
    return nordThemeUrl
  }
  if (themeValue.name === 'kanagawa' && themeValue.variance === DEFAULT) {
    return kanagawaThemeUrl
  }
  return defaultThemeUrl
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  preload(defaultThemeUrl, { as: 'style' })
  preload(nordThemeUrl, { as: 'style' })
  preload(kanagawaThemeUrl, { as: 'style' })
  const [themeValue, setThemeValue] = useState(defaultThemeValue)
  const themeCssUrl = getThemeCssUrl(themeValue)
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
