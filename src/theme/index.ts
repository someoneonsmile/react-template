import { DEFAULT } from '@/constant'
import kanagawaThemeUrl from '@/css/theme/kanagawa.css?url'
import kimiThemeUrl from '@/css/theme/kimi.css?url'
import nordThemeUrl from '@/css/theme/nord.css?url'
// import { HighOrders, Orders } from '@/util/sort'
import { isPreferDark } from '@/util/style'

export interface ThemeFilterType {
  name?: string
  variance?: StringDefault
}

export type ThemeType = Required<ThemeFilterType> & {
  url: string
  displayName?: string
}

export type ThemeContextType = [
  ThemeFilterType,
  undefined | ((value: ThemeFilterType) => void),
]

export type LightDarkMode = Maybe<'light' | 'dark'>

export const themes: ThemeType[] = [
  {
    name: 'nord',
    // displayName: 'nord-light',
    variance: DEFAULT,
    url: nordThemeUrl,
  },
  {
    name: 'kanagawa',
    // displayName: 'kanagawa-dark',
    variance: DEFAULT,
    url: kanagawaThemeUrl,
  },
  {
    name: 'kimi',
    // displayName: 'kimi-light',
    variance: DEFAULT,
    url: kimiThemeUrl,
  },
]

export function getTheme(): ThemeType
export function getTheme(themeFilter: ThemeFilterType): ThemeType
export function getTheme(themeFilter?: ThemeFilterType): Option<ThemeType> {
  themeFilter = { ...themeFilter }

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
        (!themeFilter.name || it.name === themeFilter.name) &&
        (!themeFilter.variance || it.variance === themeFilter.variance),
    )
    // .sort(compareFn)
    .at(0)
  return firstTheme
}
