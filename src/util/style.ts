import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * className
 */
export const cn = function (...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}
