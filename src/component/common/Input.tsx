import { InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/util/style'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode
}

function Input({ icon, className, ...rest }: InputProps) {
  return (
    <div
      className={cn(
        'flex',
        'gap-3',
        'rounded-md',
        'p-3',
        'border',
        'border-sky-900',
        'focus-within:border-sky-500',
        className?.split(/\s+/),
      )}
    >
      {icon && <div className={cn('aspect-square', 'h-3/4')}>{icon}</div>}
      <input
        className={cn(
          'border-0',
          'outline-hidden',
          'focus:outline-hidden',
          'w-full',
          'bg-transparent',
        )}
        {...rest}
      />
    </div>
  )
}

export default Input
