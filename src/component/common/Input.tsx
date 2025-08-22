import { ComponentProps, ReactNode } from 'react'

import { cm } from '@/util/style'

interface InputProps extends ComponentProps<'input'> {
  icon?: ReactNode
}

function Input({ icon, className, ...rest }: InputProps) {
  return (
    <div
      className={cm(
        'flex',
        'items-center',
        'rounded-md',
        'border',
        'border-subtle-more',
        'bg-subtle-more',
        'has-focus:bg-transparent',
        className,
      )}
    >
      {icon && (
        <div
          className={cm(
            'h-full',
            'aspect-square',
            'flex-none',
            'place-center',
            'select-none',
          )}
        >
          <div className={cm('h-3/5', 'aspect-square')}>{icon}</div>
        </div>
      )}
      <input
        className={cm(
          'border-0',
          'outline-hidden',
          'focus:outline-hidden',
          'w-full',
        )}
        {...rest}
      />
    </div>
  )
}

export default Input
