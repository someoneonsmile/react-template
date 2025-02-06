import { DEFAULT } from '@/constant'
import kanagawaThemeUrl from '@/css/theme/kanagawa.css?url'
import kimiThemeUrl from '@/css/theme/kimi.css?url'
import nordDarkThemeUrl from '@/css/theme/nord-dark.css?url'
import nordLightThemeUrl from '@/css/theme/nord-light.css?url'
import { HighOrders, Orders } from '@/util/sort'
import { isPreferDark } from '@/util/style'

export interface ThemeFilterType {
  name: string
  variance: StringDefault
  type: 'light' | 'dark'
}

export type ThemeType = ThemeFilterType & {
  url: string
  displayName: string
}

export type ThemeContextType = [
  ThemeFilterType,
  undefined | ((value: ThemeFilterType) => void),
]

export const themes: ThemeType[] = [
  {
    name: 'nord',
    displayName: 'nord-light',
    variance: DEFAULT,
    type: 'light',
    url: nordLightThemeUrl,
  },
  {
    name: 'nord',
    displayName: 'nord-dark',
    variance: DEFAULT,
    type: 'dark',
    url: nordDarkThemeUrl,
  },
  {
    name: 'kanagawa',
    displayName: 'kanagawa-dark',
    variance: DEFAULT,
    type: 'dark',
    url: kanagawaThemeUrl,
  },
  {
    name: 'kimi',
    displayName: 'kimi-light',
    variance: DEFAULT,
    type: 'light',
    url: kimiThemeUrl,
  },
]

export function getTheme(themeValue?: Partial<ThemeFilterType>): ThemeType {
  const preferType = isPreferDark() ? 'dark' : 'light'
  themeValue = themeValue || {
    type: preferType,
  }

  const compareFn = HighOrders.pipeWith(
    HighOrders.withNullLast,
    HighOrders.withReverse,
  )(
    Orders.compareWith<ThemeFilterType, number>(
      (it) => (it.type === preferType ? 1 : 0),
      Orders.natural,
    ),
  )
  const firstTheme = themes
    .filter(
      (it) =>
        (!themeValue.type || it.type === themeValue.type) &&
        (!themeValue.name || it.name === themeValue.name) &&
        (!themeValue.variance || it.variance === themeValue.variance),
    )
    .sort(compareFn)
    .at(0)
  return firstTheme!
}
