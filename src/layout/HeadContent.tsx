import { ReactNode } from 'react'

interface HeadContentProps {
  head: ReactNode
  children?: ReactNode
}
export default function HeadContent({ head, children }: HeadContentProps) {
  return (
    <div className='flex h-full w-full flex-auto flex-col p-2'>
      <div className='min-h-12'>{head}</div>
      <div className='min-h-0 flex-auto overflow-y-auto'>{children}</div>
    </div>
  )
}
