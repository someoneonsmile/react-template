import { ReactNode } from 'react'

import { EmptyRecord } from '@/component/common/Svg'

interface EmptyProps {
  tips?: ReactNode
}

function Empty({ tips }: EmptyProps) {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center gap-2'>
      <EmptyRecord className='aspect-square w-52' />
      <div className='max-w-[70%]'>{tips}</div>
    </div>
  )
}

export default Empty
