import { ethers } from 'ethers'

async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      console.log('Account:', await signer.getAddress())
      return signer
    } catch (error) {
      console.error(error)
    }
  } else {
    console.log('Ethereum object not found, install MetaMask.')
  }
}
