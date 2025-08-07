import { ClassValue } from 'clsx'
import { ReactNode } from 'react'

import { cm } from '@/util/style'

interface HeadContentProps {
  head: ReactNode
  children?: ReactNode
  className?: ClassValue
  headClassName?: ClassValue
  contentClassName?: ClassValue
  reverse?: boolean
}
export default function HeadContent({
  head,
  children,
  className,
  headClassName,
  contentClassName,
  reverse,
}: HeadContentProps) {
  return (
    <div
      className={cm(
        'flex',
        { 'flex-col-reverse': reverse },
        'flex-col',
        'h-full',
        'w-full',
        className,
        className,
      )}
    >
      <div className={cm('flex-none', 'overflow-hidden', headClassName)}>
        {head}
      </div>
      <div className={cm('flex-1', contentClassName)}>{children}</div>
    </div>
  )
}
