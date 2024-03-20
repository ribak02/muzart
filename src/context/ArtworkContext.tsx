// context/ArtworkContext.js
'use client'
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react'
import { Item } from '../components/ItemCard/ItemCard'
import { getOriginalNFTMetadata } from '../ethereum/deployment/muzartArtifactService'

// Define the context type
interface ArtworkContextType {
  artworks: Item[] // Replace 'any' with your artwork data type
  setArtworks: React.Dispatch<React.SetStateAction<any[]>>
}

// Create the context with an undefined initial value
const ArtworkContext = createContext<ArtworkContextType | undefined>(undefined)

// Create a provider component
export const ArtworkProvider = ({ children }: { children: ReactNode }) => {
  const [artworks, setArtworks] = useState<Item[]>([]) // Again, replace 'any' with your actual data type

  // In your ArtworkContext provider
  useEffect(() => {
    // Attempt to load cached artworks
    const cachedArtworks = localStorage.getItem('artworks')
    if (cachedArtworks) {
      setArtworks(JSON.parse(cachedArtworks))
    } else {
      getOriginalNFTMetadata().then((data) => {
        setArtworks(data)
        localStorage.setItem('artworks', JSON.stringify(data))
      })
    }
  }, [])

  return (
    <ArtworkContext.Provider value={{ artworks, setArtworks }}>
      {children}
    </ArtworkContext.Provider>
  )
}

// Custom hook for easy context consumption
export const useArtworks = () => {
  const context = useContext(ArtworkContext)
  if (context === undefined) {
    throw new Error('useArtworks must be used within an ArtworkProvider')
  }
  return context
}

// Exporting ArtworkContext directly if needed for TypeScript interfaces
export { ArtworkContext }
