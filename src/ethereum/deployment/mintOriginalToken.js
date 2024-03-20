// Import ethers from Hardhat package
const { ethers } = require('hardhat')

// Define the smart contract ABI and address
const contractABI = require('./ABI.json')
const contractAddress = '0xB4d287F47D7a27D575033328e5975c1a4Fc46AD3'

// Define the metadata.json IPFS URL
// Update this based on each token's metadata ipfs url
const tokenURI =
  'ipfs://bafkreifxsjyfclfyp6mdul5h43qp5kbjec6nbublkt3trg222zge4s452u'

// Async function to mint original token
async function mintOriginal() {
  // Retrieve signer object from the first account
  const [signer] = await ethers.getSigners()

  // Create a new contract instance with signer
  const muzartArtifact = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  )

  // Define the amount of the token to mint, e.g., 1
  const amount = 1

  // Call the mintOriginal function from the smart contract
  try {
    const transaction = await muzartArtifact.mintOriginal(amount, tokenURI)
    console.log('Minting in progress...')

    // Wait for the transaction to be mined
    await transaction.wait()
    console.log('Original token minted successfully!')
  } catch (error) {
    console.error('Minting failed:', error)
  }
}

// Call the function
mintOriginal().catch(console.error)
