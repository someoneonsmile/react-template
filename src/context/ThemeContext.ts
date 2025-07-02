import { createContext } from 'react'

import { LightDarkMode, ThemeFilterType, ThemeType, getTheme } from '@/theme'

export type ThemeContextType = [
  ThemeType,
  ThemeFilterType,
  undefined | ((value: ThemeFilterType) => void),
  LightDarkMode,
  undefined | ((value: LightDarkMode) => void),
]

export default createContext<ThemeContextType>([
  getTheme(),
  {},
  undefined,
  undefined,
  undefined,
])
