import { ReactNode } from 'react'
import { preload } from 'react-dom'

import ThemeContext from '@/context/ThemeContext'
import { useEffectCssLink } from '@/hook'
import useStore from '@/hook/useStore'
import { ThemeType, getTheme, themes } from '@/theme'
import { cm } from '@/util/style'

interface ThemeContextProviderProps {
  children?: ReactNode
}

function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  themes.forEach((it) => {
    preload(it.url, { as: 'style' })
  })
  const [themeValue, setThemeValue] = useStore<ThemeType>('theme', {
    defaultValue: getTheme(),
  })
  const themeCssUrl = getTheme(themeValue)?.url ?? getTheme()?.url
  console.log(themeCssUrl)

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
