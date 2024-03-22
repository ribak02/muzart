import { ethers } from 'ethers'

// Define the smart contract ABI and address
const contractABI = require('./ABI.json')
const contractAddress = '0xB4d287F47D7a27D575033328e5975c1a4Fc46AD3'

// Async function to mint a copy of a token
export default async function mintCopyToken(tokenId) {
  // Make sure MetaMask or another Ethereum provider is available
  if (typeof window.ethereum === 'undefined') {
    console.error('Please install MetaMask to use this feature.')
    return
  }

  try {
    // Create a provider and request access to the user's wallet
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send('eth_requestAccounts', []) // Request account access if necessary
    const signer = provider.getSigner() // Get the signer to sign transactions

    // Create a new contract instance with the signer
    const contract = new ethers.Contract(contractAddress, contractABI, signer)

    // Define the amount of the token copy to mint, e.g., 1
    const amount = 1

    // Call the mintCopy function from the smart contract
    const transaction = await contract.mintCopy(tokenId, amount)
    console.log('Minting copy in progress...')

    // Wait for the transaction to be mined
    await transaction.wait()
    console.log('Copy of the token minted successfully!')
  } catch (error) {
    console.error('Minting copy failed:', error)
  }
}
