'use client'
import SwiperView from '../components/Swiper/SwiperView'
import { useArtworks } from '../context/ArtworkContext'
import Navbar from '../components/NavBar/NavBar'

export default function Home() {
  const { artworks } = useArtworks()
  const title = 'NFT Digital Artifacts (ERC-1155)'

  return (
    <div className="h-screen bg-gray-100">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32">
        <div className="flex justify-left items-center">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
        </div>
        <SwiperView title="Artworks" items={artworks} gridCols={3} />
        {/* <SwiperView title="Collections" items={collections} gridCols={5} /> */}
      </div>
    </div>
  )
}
