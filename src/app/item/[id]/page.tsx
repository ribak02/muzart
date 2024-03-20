'use client'
import { ItemInfo } from '@/src/components/ItemInfo/ItemInfo'
import Navbar from '@/src/components/NavBar/NavBar'

import { useArtworks } from '@/src/context/ArtworkContext'

export default function Home({ params }: { params: { id: string } }) {
  const id = params.id
  // const [item, setItem] = useState<any>(null)
  // const [isLoading, setIsLoading] = useState<boolean>(false)

  const { artworks } = useArtworks()
  console.log(artworks)
  const item = artworks.find((artwork) => artwork.tokenId == id)
  console.log(item)

  // useEffect(() => {
  //   setIsLoading(true)
  //   axios
  //     .get(`/api/item/${id}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         setItem(response.data)
  //       } else {
  //         console.error(`Request failed with status code ${response.status}`)
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     })
  // }, [id])

  const handleSearch = (value: string) => {
    console.log(value) // Perform search operation
  }

  return (
    <div className="flex flex-col h-screen">
      <Navbar onSearch={handleSearch} />
      <div className="flex justify-center items-center flex-1">
        {/* {isLoading ? ( */}
        {/* <div>Loading...</div>
        ) : item ? ( // Check if item is not null */}
        <div className="flex justify-center items-center flex-1">
          {item ? (
            <ItemInfo item={item} />
          ) : (
            <div>Loading or item not found</div>
          )}
        </div>
        {/* ) : ( */}
        {/* <div>Item not found or error loading item</div> // Displayed if item is null
        )} */}
      </div>
    </div>
  )
}
