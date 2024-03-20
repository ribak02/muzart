'use client'
import SwiperView from '../components/Swiper/SwiperView'
// import { Item } from '../components/ItemCard/ItemCard'
import { useArtworks } from '../context/ArtworkContext'

// import { artworks } from './api/data'
import Navbar from '../components/NavBar/NavBar'
import { getOriginalNFTMetadata } from '../ethereum/deployment/muzartArtifactService'
import { useEffect } from 'react'

export default function Home() {
  const { artworks, setArtworks } = useArtworks()
  // const [artworks, setArtworks] = useState<Item[]>([])

  useEffect(() => {
    async function fetchArtworks() {
      const response = await getOriginalNFTMetadata()
      setArtworks(response)
    }
    fetchArtworks()
  }, [])

  const handleSearch = (value: string) => {
    console.log(value) // Perform search operation
  }
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="bg-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SwiperView title="Artworks" items={artworks} gridCols={3} />
          {/* <SwiperView title="Collections" items={collections} gridCols={5} /> */}
        </div>
      </div>
    </>
  )
}
