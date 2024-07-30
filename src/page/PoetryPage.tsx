import { useLocalStorageState, useRequest } from 'ahooks'
import { useEffect, useMemo, useState } from 'react'
import { SwiperClass } from 'swiper/react'

import { getPoetryList } from '@/action/poetry'
import PoetryList from '@/component/biz/PoetryList'
import ProgressBar from '@/component/common/ProgressBar'
import HeadContent from '@/layout/HeadContent'
import { PoetryType } from '@/type/share'
import { isBlank } from '@/util'
import { StoreItem } from '@/util/store'
import { cn } from '@/util/style'

interface PoetryPageProps {}

const idxStore = new StoreItem<number>('idx')

function PoetryPage({}: PoetryPageProps) {
  let [curIdx, setCurIdx] = useState(0)
  useEffect(() => {
    idxStore.set(curIdx)
  }, [curIdx])

  const { data: poetryListData, error, loading } = useRequest(getPoetryList)
  const [likes, setLikes] = useLocalStorageState<Array<PoetryType['id']>>(
    'user-like',
    {
      defaultValue: [],
    }
  )
  const tempLikes: Set<number> = likes ? new Set(likes) : new Set()

  const renderList = useMemo(() => {
    return poetryListData?.map((it: PoetryType) => {
      return { ...it, like: tempLikes.has(it.id) }
    })
  }, [poetryListData, likes])

  const onToggleLike = (id: PoetryType['id']) => {
    tempLikes.has(id) ? tempLikes.delete(id) : tempLikes.add(id)
    setLikes(Array.from(tempLikes))
  }

  const onAfterInit = function (swiper: SwiperClass) {
    const hash = window.location.hash
    console.log(`getHash: ${hash}`)
    if (!isBlank(hash)) {
      const pn = Number.parseInt(hash.replace('#slide-', ''))
      console.log(`init: setIdxFromStore(${pn - 1})`)
      setCurIdx(pn - 1)
      console.log(`slideTo: ${pn - 1}`)
      swiper.slideTo(pn - 1, 0)
      return
    }
    const idx = idxStore.get(0)
    setCurIdx(idx ?? 0)
    console.log(`slideTo: ${idx}`)
    swiper.slideTo(idx!, 0)
  }

  const onSlideChange = function (swiper: SwiperClass) {
    setCurIdx(swiper.realIndex)
  }

  let p = renderList ? 100 * (curIdx / renderList.length) : 0

  return (
    <>
      <ProgressBar progress={p} />
      <HeadContent
        head={
          <h1
            className={cn(
              'font-bold',
              'text-xl',
              'text-center',
              'py-2',
              'max-md:hidden'
            )}
          >
            诗词
          </h1>
        }
      >
        {loading ? (
          <p>loading</p>
        ) : (
          <PoetryList
            poetryList={renderList}
            onToggleLike={onToggleLike}
            onAfterInit={onAfterInit}
            onSlideChange={onSlideChange}
          />
        )}
      </HeadContent>
    </>
  )
}

export default PoetryPage
