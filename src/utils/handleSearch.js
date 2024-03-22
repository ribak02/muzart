// handleSearch.js
import { useArtworks } from './ArtworkContext' // Adjust the import path as needed

const useArtworkSearch = () => {
  const { artworks } = useArtworks()

  const searchArtworks = (query) => {
    if (!query.trim()) return []

    const lowerCaseQuery = query.toLowerCase()
    return artworks.filter(
      (artwork) =>
        artwork.name.toLowerCase().includes(lowerCaseQuery) ||
        artwork.author.toLowerCase().includes(lowerCaseQuery) ||
        artwork.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
    )
  }

  return { searchArtworks }
}

export default useArtworkSearch
