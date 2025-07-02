import { ClassValue, clsx as _clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const _twMerge = extendTailwindMerge({
  override: {
    // theme: {
    //   colors: [],
    // },
  },
  extend: {
    classGroups: {
      shadow: [{ shadow: ['glow'] }],
    },
  },
})

/**
 * className merge
 */
export const cm = function (...inputs: ClassValue[]) {
  return _twMerge(_clsx(...inputs))
}

export const cn = _clsx

/**
 * 查询是否偏好暗色
 */
export const isPreferDark = function () {
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
}
