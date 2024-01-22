'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import ItemCard, { Item } from '../ItemCard/ItemCard'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import { Pagination } from 'swiper/modules'
import './CustomSwiper.css'

export default function SwiperView(props: {
  title: string
  items: Item[]
  gridCols: number
}) {
  const gridClass = props.gridCols === 3 ? 'grid-cols-3' : 'grid-cols-5'

  const displayedItems = []
  for (let i = 0; i < props.items.length; i += props.gridCols) {
    displayedItems.push(props.items.slice(i, i + props.gridCols))
  }

  return (
    <div className="max-w-2xl sm:pt-3 lg:max-w-none">
      <h2 className="text-2xl font-bold text-gray-900">{props.title}</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
      >
        {displayedItems.map((swiperItems, index) => (
          <SwiperSlide key={`slide-${index}`}>
            <div className={`grid ${gridClass} gap-4 my-5`}>
              {swiperItems.map((item, idx) => (
                <ItemCard key={idx} item={item} />
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
