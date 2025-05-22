import { ReactNode } from 'react'

import { cm } from '@/util/style'

interface SwitchProps<T> {
  value: T
  onChange: (v: T) => void
  items: {
    value: T
    icon: ReactNode
    name: string
  }[]
}

function Switch<T>({ value, onChange, items }: SwitchProps<T>) {
  // ----------------------------------------------------------------------
  //    - calc -
  // ----------------------------------------------------------------------
  const selectedIndex =
    items.findIndex((item) => {
      return (item.value ?? '') === (value ?? '')
    }) ?? 0

  return (
    <div
      className={cm(
        'w-fit',
        'flex',
        'relative',
        'bg-ethereal-less',
        'select-none',
        'rounded-full',
        'p-0.5',
        'shadow-xl',
        'inset-shadow-sm',
      )}
    >
      {items.map((item) => {
        return (
          <button
            tabIndex={-1}
            className={cm(
              'z-10',
              'flex-none',
              'flex',
              'place-items-center',
              'w-8',
              'aspect-square',
              'place-items-center',
              'place-content-center',
            )}
            aria-label={item.name}
            key={item.name}
            onClick={() => onChange(item.value)}
          >
            <div className={cm('w-3/5', 'aspect-square')}>{item.icon}</div>
          </button>
        )
      })}

      <div
        style={{ transform: `translateX(${100 * selectedIndex}%)` }}
        className={cm(
          'z-5',
          'w-8',
          'aspect-square',
          'duration-200',
          'will-change-auto',
          'transition-normal',
          'absolute',
          'bg-ethereal-more',
          'rounded-full',
          'shadow-2xl',
        )}
      ></div>
    </div>
  )
}

export default Switch
