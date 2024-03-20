import { ethers } from 'ethers'

// Define the smart contract ABI and address
const contractABI = require('./ABI.json')
const contractAddress = '0xB4d287F47D7a27D575033328e5975c1a4Fc46AD3'

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

// Initialize ethers with the provider for the Sepolia testnet
const provider = new ethers.providers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
)

// Create a contract instance
const muzartArtifactContract = new ethers.Contract(
  contractAddress,
  contractABI,
  provider
)

// Function to fetch metadata from IPFS
async function fetchMetadata(uri) {
  try {
    // Replace "ipfs://" with the URL for an IPFS gateway
    const ipfsGateway = 'https://ipfs.io/ipfs/'
    const normalizedUri = uri.replace('ipfs://', ipfsGateway)

    const response = await fetch(normalizedUri)
    if (!response.ok) throw new Error('Network response was not ok')
    const metadata = await response.json()
    console.log('Fetched metadata using contract')
    return metadata
  } catch (error) {
    console.error('Error fetching metadata:', error)
    throw error
  }
}

export async function getOriginalNFTMetadata() {
  const totalSupply = await muzartArtifactContract.getCurrentTokenId()
  const metadataPromises = []

  for (let tokenId = 0; tokenId < totalSupply; tokenId++) {
    metadataPromises.push(
      muzartArtifactContract
        .uri(tokenId)
        .then((uri) => fetchMetadata(uri))
        .then((metadata) => ({ tokenId, ...metadata }))
        .catch((error) =>
          console.error(
            `Failed to fetch metadata for token ID ${tokenId}:`,
            error
          )
        )
    )
  }

  // Use Promise.all to wait for all the metadata to be fetched
  const nftMetadata = await Promise.all(metadataPromises)
  return nftMetadata.filter((metadata) => metadata) // Filter out any undefined results from errors
}
