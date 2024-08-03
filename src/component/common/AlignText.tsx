import { ComponentProps } from 'react'

import { cn } from '@/util/style'

import './AlignText.css'

type htmlpProps = ComponentProps<'p'>
// type htmlpProps = NonNullable<Parameters<ReactHTML['p']>[0]>

interface AlignTextProps extends htmlpProps {}

function AlignText({ className, children, ...otherProps }: AlignTextProps) {
  return (
    <p
      {...otherProps}
      className={cn(
        `${className ?? ''} text-balance text-left [text-align-last:right]`.split(
          's+',
        ),
      )}
    >
      {children}
    </p>
  )
}

export default AlignText
