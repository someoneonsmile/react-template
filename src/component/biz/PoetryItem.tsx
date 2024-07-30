import { useEffect, useMemo, useRef } from 'react'

import readedImgUrl from '@/assets/readed.png?url'
import { PoetryType } from '@/type/share'
import { cn } from '@/util/style'

import AlignText from '../common/AlignText'

interface PoetryItemProps {
  data: PoetryType
  pn: number
  onToggleLike?: (id: PoetryType['id']) => void
}

function PoetryItem({ data, pn, onToggleLike }: PoetryItemProps) {
  const author = data.from.substring(0, data.from.indexOf('《'))
  const title = data.from.substring(data.from.indexOf('《'))
  const content = useMemo(
    () => data.content.replace(/，|。|！|？|；/g, '<br />'),
    [data.content]
  )
  const contentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (contentRef.current) [(contentRef.current.innerHTML = content)]
  }, [contentRef, content])

  return (
    <div
      className='card relative flex flex-col place-items-center bg-gray-100 py-5 shadow-xl'
      onClick={(e) => {
        e.preventDefault()
        if (e.detail === 2) {
          console.log(data.id)
          onToggleLike?.(data.id)
        }
      }}
    >
      <div
        className='place-item-center flex h-3/5 flex-col place-content-center place-items-center gap-10 px-[3em] py-1 text-xl tracking-[.5em]'
        style={{
          writingMode: 'vertical-rl',
        }}
      >
        <div className='flex max-h-[75%] min-h-0 flex-auto flex-col place-items-center gap-2 font-light'>
          <AlignText className=''>{title}</AlignText>
          <p className='text-gray-700 text-base'>{author}</p>
        </div>
        <p
          className='min-h-0 flex-auto font-medium leading-7'
          ref={contentRef}
        ></p>
      </div>
      <div className='text-xs font-light text-gray-500'>{pn}</div>
      <img
        src={readedImgUrl}
        className={cn(
          'absolute transition-opacity left-16 bottom-12 w-12 h-24 mix-blend-multiply'.split(
            's+'
          ),
          { 'opacity-0': !data.like }
        )}
      />
    </div>
  )
}

export default PoetryItem
