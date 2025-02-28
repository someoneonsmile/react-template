import { createContext } from 'react'

import { ThemeFilterType, ThemeType, getTheme } from '@/theme'

export type ThemeContextType = [
  ThemeType,
  ThemeFilterType,
  undefined | ((value: ThemeFilterType) => void),
]

export default createContext<ThemeContextType>([getTheme(), {}, undefined])
