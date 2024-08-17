import { createContext } from 'react'

import { DEFAULT } from '@/constant'

export interface ThemeValueType {
  name: 'normal' | 'nord' | 'kanagawa'
  variance: StringDefault
  type: 'light' | 'dark'
}

export type ThemeContextValueType = [
  ThemeValueType,
  (value: ThemeValueType) => void,
]

export const defaultThemeValue: ThemeValueType = {
  name: 'normal',
  type: 'light',
  variance: DEFAULT,
}

export default createContext<ThemeContextValueType>([
  defaultThemeValue,
  () => {},
])
