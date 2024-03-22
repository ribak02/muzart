'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getOriginalNFTMetadata } from '../ethereum/deployment/muzartArtifactService'
import { Item } from '../components/ItemCard/ItemCard'

interface ArtworkContextType {
  artworks: Item[]
  setArtworks: React.Dispatch<React.SetStateAction<Item[]>>
}

// Providing initial context value with a type assertion
const ArtworkContext = createContext<ArtworkContextType>(
  {} as ArtworkContextType
)

interface ArtworkProviderProps {
  children: React.ReactNode
}

export const ArtworkProvider: React.FC<ArtworkProviderProps> = ({
  children,
}) => {
  const [artworks, setArtworks] = useState<Item[]>([])

  useEffect(() => {
    const loadArtworks = async () => {
      const cachedArtworks = localStorage.getItem('artworks')
      if (cachedArtworks) {
        setArtworks(JSON.parse(cachedArtworks))
      } else {
        const fetchedArtworks = await getOriginalNFTMetadata()
        setArtworks(fetchedArtworks)
        localStorage.setItem('artworks', JSON.stringify(fetchedArtworks))
      }
    }

    loadArtworks()
  }, [])

  return (
    <ArtworkContext.Provider value={{ artworks, setArtworks }}>
      {children}
    </ArtworkContext.Provider>
  )
}

export const useArtworks = (): ArtworkContextType => useContext(ArtworkContext)
