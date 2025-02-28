import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * className
 */
export const cn = function (...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

/**
 * 查询是否偏好暗色
 */
export const isPreferDark = function () {
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ?? false
}
