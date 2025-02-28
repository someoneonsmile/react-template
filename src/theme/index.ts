import { DEFAULT } from '@/constant'
import kanagawaThemeUrl from '@/css/theme/kanagawa.css?url'
import kimiThemeUrl from '@/css/theme/kimi.css?url'
import nordDarkThemeUrl from '@/css/theme/nord-dark.css?url'
import nordLightThemeUrl from '@/css/theme/nord-light.css?url'
// import { HighOrders, Orders } from '@/util/sort'
import { isPreferDark } from '@/util/style'

export interface ThemeFilterType {
  name?: string
  variance?: StringDefault
  type?: 'light' | 'dark'
}

export type ThemeType = Required<ThemeFilterType> & {
  url: string
  displayName?: string
}

export type ThemeContextType = [
  ThemeFilterType,
  undefined | ((value: ThemeFilterType) => void),
]

export const themes: ThemeType[] = [
  {
    name: 'nord',
    // displayName: 'nord-light',
    variance: DEFAULT,
    type: 'light',
    url: nordLightThemeUrl,
  },
  {
    name: 'nord',
    // displayName: 'nord-dark',
    variance: DEFAULT,
    type: 'dark',
    url: nordDarkThemeUrl,
  },
  {
    name: 'kanagawa',
    // displayName: 'kanagawa-dark',
    variance: DEFAULT,
    type: 'dark',
    url: kanagawaThemeUrl,
  },
  {
    name: 'kimi',
    // displayName: 'kimi-light',
    variance: DEFAULT,
    type: 'light',
    url: kimiThemeUrl,
  },
]

export function getTheme(): ThemeType
export function getTheme(themeFilter: ThemeFilterType): ThemeType
export function getTheme(themeFilter?: ThemeFilterType): Option<ThemeType> {
  const preferType = isPreferDark() ? 'dark' : 'light'
  themeFilter = { ...themeFilter }
  if (!themeFilter.type) {
    themeFilter.type = preferType
  }

  // const compareFn = HighOrders.pipeWith(
  //   HighOrders.withNullLast,
  //   HighOrders.withReverse,
  // )(
  //   Orders.compareWith<ThemeFilterType, number>(
  //     (it) => (it.type === preferType ? 1 : 0),
  //     Orders.natural,
  //   ),
  // )
  const firstTheme = themes
    .filter(
      (it) =>
        (!themeFilter.type || it.type === themeFilter.type) &&
        (!themeFilter.name || it.name === themeFilter.name) &&
        (!themeFilter.variance || it.variance === themeFilter.variance),
    )
    // .sort(compareFn)
    .at(0)
  return firstTheme
}
