'use client'
import SwiperView from '../components/Swiper/SwiperView'

import { artworks, collections } from './api/data'
import Navbar from '../components/NavBar/NavBar'

export default function Home() {
  const handleSearch = (value: string) => {
    console.log(value) // Perform search operation
  }
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SwiperView title="Artworks" items={artworks} gridCols={3} />
          <SwiperView title="Collections" items={collections} gridCols={5} />
        </div>
      </div>
    </>
  )
}
