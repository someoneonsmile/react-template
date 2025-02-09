import { ReactNode } from 'react'

import { cn } from '@/util/style'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

interface TooltipProps {
  children: ReactNode
  tip: ReactNode
  delayDuration?: number
  skipDelayDuration?: number
}

function Tooltip({
  children,
  tip,
  delayDuration,
  skipDelayDuration,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={3}
            // TODO: 根据切换的主题来配置
            className={cn(
              'bg-black/70',
              'text-slate-300',
              'dark:bg-gray-300/70',
              'dark:text-slate-900',
              'p-1',
              'rounded-md',
              'backdrop-blur-sm',
              'text-sm',
            )}
          >
            {tip}
            <TooltipPrimitive.Arrow
              className={cn('fill-gray-900/50', 'dark:fill-gray-300/50')}
            />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
