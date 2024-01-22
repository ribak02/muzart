import { ethers } from 'ethers'
import contractABI from './path_to_your_ABI.json'

const contractAddress = 'your_contract_address_here'

async function mintToken(tokenId, amount) {
  const signer = await connectWallet()
  const contract = new ethers.Contract(contractAddress, contractABI, signer)

  try {
    const transaction = await contract.mint(
      signer.getAddress(),
      tokenId,
      amount
    )
    await transaction.wait()
    console.log('Token minted!')
  } catch (error) {
    console.error('Error minting token:', error)
  }
}
