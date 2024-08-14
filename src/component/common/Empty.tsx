import { ReactNode } from 'react'

import { EmptyRecord } from '@component/common/Svg'

interface EmptyProps {
  tips?: ReactNode
}

function Empty({ tips }: EmptyProps) {
  return (
    <div className='flex h-full w-full flex-col justify-center items-center gap-2'>
      <EmptyRecord className='h-[30%] max-h-[270px] min-h-[200px] w-[30%] min-w-[200px] max-w-[270px]' />
      <div className='max-w-[70%]'>{tips}</div>
    </div>
  )
}

export default Empty
