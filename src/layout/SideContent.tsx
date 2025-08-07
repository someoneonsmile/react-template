import { ClassValue } from 'clsx'
import { ReactNode } from 'react'

import { cm } from '@/util/style'

interface SideContentProps {
  side?: ReactNode
  children?: ReactNode
  className?: ClassValue
  sideClassName?: ClassValue
  contentCalssName?: ClassValue
  reverse?: boolean
}

function SideContent({
  side,
  children,
  className,
  sideClassName,
  contentCalssName,
  reverse,
}: SideContentProps) {
  return (
    <div
      className={cm(
        'flex',
        { 'flex-row-reverse': reverse },
        'h-full',
        'w-full',
        className,
      )}
    >
      <div className={cm('flex-none', 'overflow-hidden', sideClassName)}>
        {side}
      </div>
      <div className={cm('flex-1', contentCalssName)}>{children}</div>
    </div>
  )
}

export default SideContent
