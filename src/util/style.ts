import { clsx } from 'cn'
import { createCn } from 'cn/config'

const _cm = createCn({
  extend: {
    classGroups: {
      shadow: [{ shadow: ['glow'] }],
    },
  },
})

/**
 * className merge
 */
export const cm = _cm

export const cn = clsx

/**
 * 查询是否偏好暗色
 */
export const isPreferDark = function () {
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
}
