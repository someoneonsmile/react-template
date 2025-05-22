import type { ComponentType } from 'react'

import { cm } from '@/util/style'

interface FillContainerProps<P> {
  c: ComponentType<P>
  className?: string
}

/**
 * Renders the provided component with `w-full h-full` classes and passes through all other props.
 */
function FillContainer<P extends { className?: string }>({
  c: Component,
  className,
  ...restProps
}: FillContainerProps<P> & P) {
  const props = { className: cm('w-full', 'h-full', className), ...restProps }
  return <Component {...(props as unknown as P)} />
}

export default FillContainer
