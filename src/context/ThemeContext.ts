import { createContext } from 'react'

import { ThemeType, getTheme } from '@/theme'

export type ThemeContextType = [
  ThemeType,
  undefined | ((value: ThemeType) => void),
]

export default createContext<ThemeContextType>([getTheme(), undefined])
