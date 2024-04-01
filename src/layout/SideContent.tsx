import { ReactNode } from 'react'

interface SideContentProps {
  side?: ReactNode
  children?: ReactNode
}

function SideContent({ side, children }: SideContentProps) {
  return (
    <div className='flex h-full w-full flex-auto'>
      <div className='w-5'>{side}</div>
      <div className='min-h-0 flex-auto overflow-y-auto'>{children}</div>
    </div>
  )
}

export default SideContent
