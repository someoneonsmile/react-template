import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-cards'
import 'swiper/css/hash-navigation'
import 'swiper/css/keyboard'
import 'swiper/css/mousewheel'
import 'swiper/css/virtual'
import {
  Autoplay,
  HashNavigation,
  Keyboard,
  Mousewheel,
  Virtual,
} from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'

import { PoetryType } from '@/type/share'

import { EmptyStore } from '../common/Svg'
import PoetryItem from './PoetryItem'

interface PoetryListProps {
  poetryList?: PoetryType[]
  onToggleLike?: (id: PoetryType['id']) => void
  onAfterInit?: (swiper: SwiperClass) => void
  onSlideChange?: (swiper: SwiperClass) => void
}

function PoetryList({
  poetryList,
  onToggleLike,
  onAfterInit,
  onSlideChange,
}: PoetryListProps) {
  if (!poetryList) {
    return <EmptyStore />
  }

  return (
    <Swiper
      speed={500}
      spaceBetween={30}
      slidesPerView={1}
      mousewheel={true}
      keyboard={true}
      virtual={{
        enabled: true,
        addSlidesBefore: 1,
        addSlidesAfter: 1,
        cache: false,
      }}
      hashNavigation={true}
      autoplay={false}
      modules={[
        Virtual,
        Keyboard,
        Mousewheel,
        Autoplay,
        HashNavigation,
        // EffectCards,
      ]}
      className='h-full w-full'
      onAfterInit={onAfterInit}
      onSlideChange={onSlideChange}
    >
      {poetryList.map((item, idx) => {
        return (
          <SwiperSlide
            key={item.id}
            data-hash={`slide-${idx + 1}`}
            virtualIndex={idx}
            className='flex place-content-center place-items-center'
          >
            <PoetryItem data={item} pn={idx + 1} onToggleLike={onToggleLike} />
          </SwiperSlide>
        )
      })}
    </Swiper>
  )
}

export default PoetryList
