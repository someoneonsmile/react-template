import { CiDesktop } from 'react-icons/ci'
import { IoMoon, IoSunnyOutline } from 'react-icons/io5'

import { LightDarkMode, ThemeFilterType, ThemeType } from '@/theme'
import { cm } from '@/util/style'

import FillContainer from '../common/FillContainer'
import Switch from '../common/Switch'

interface ThemeSwitchProps {
  themes: ThemeType[]
  themeFilter: ThemeFilterType
  setThemeFilter: (themeFilter: ThemeFilterType) => void
  lightDarkMode: LightDarkMode
  setLightDarkMode: (lightDarkMode: LightDarkMode) => void
  align?: AlignType
  direction?: DirectionType
  hover?: boolean
}

const alignCssMap: Record<AlignType, string> = {
  start: 'dropdown-start',
  end: 'dropdown-end',
}

const directionCssMap: Record<DirectionType, string> = {
  left: 'dropdown-left',
  right: 'dropdown-right',
  bottom: 'dropdown-bottom',
  top: 'dropdown-top',
}

function ThemeSwitch({
  themes,
  themeFilter,
  setThemeFilter,
  lightDarkMode,
  setLightDarkMode,
  align = 'start',
  direction = 'bottom',
  hover = true,
}: ThemeSwitchProps) {
  const themeNames = [...new Set(themes.map((it) => it.name))]
  return (
    <div className={cm('flex', 'flex-col', 'gap-1')}>
      <div
        className={cm(
          'dropdown',
          directionCssMap[direction],
          alignCssMap[align],
          {
            'dropdown-hover': hover,
          },
        )}
      >
        <div role='button' className={cm('btn', 'm-1')}>
          切换主题
        </div>
        <ul
          tabIndex={0}
          className={cm(
            'menu',
            'dropdown-content',
            'bg-subtle-more',
            'text-elegant',
            'rounded-box',
            'w-fit',
            'p-2',
            'shadow-sm',
          )}
        >
          {themeNames.map((themeName, i) => {
            return (
              <li key={i}>
                <button
                  disabled={themeFilter.name === themeName}
                  onClick={() => {
                    setThemeFilter({ ...themeFilter, name: themeName })
                  }}
                >
                  {themeName}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <Switch<LightDarkMode>
          value={lightDarkMode}
          onChange={function (v) {
            setLightDarkMode(v)
          }}
          items={[
            {
              name: '浅色',
              value: 'light',
              icon: <FillContainer c={IoSunnyOutline} />,
            },
            {
              name: '系统',
              value: undefined,
              icon: <FillContainer c={CiDesktop} />,
            },
            {
              name: '深色',
              value: 'dark',
              icon: <FillContainer c={IoMoon} />,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default ThemeSwitch
