'use client'
import { ItemInfo } from '@/src/components/ItemInfo/ItemInfo'
import Navbar from '@/src/components/NavBar/NavBar'
import { useArtworks } from '@/src/context/ArtworkContext'

export default function Home({ params }: { params: { id: string } }) {
  const id = params.id

  const { artworks } = useArtworks()
  const item = artworks.find((artwork) => artwork.tokenId == id)

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex justify-center items-center">
        {item ? (
          <ItemInfo item={item} />
        ) : (
          <div className=" flex justify-center items-center text-3xl pb-20 h-screen">
            <svg
              className="animate-spin -ml-1 mr-3 h-28 w-28 text-indigo-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  )
}
