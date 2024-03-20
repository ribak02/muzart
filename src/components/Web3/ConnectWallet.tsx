// components/ConnectWallet.tsx

import React, { useState } from 'react'

declare global {
  interface Window {
    ethereum: any
  }
}

const ConnectWallet: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false)

  const connectWalletHandler = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts: string[] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (accounts.length > 0) {
          setIsConnected(true) // Update the connection state
          const account: string = accounts[0]
          console.log('Connected account:', account)
          // Optionally, you can use this account info in your app
        } else {
          console.log('No accounts found')
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      console.log('MetaMask is not installed')
    }
  }

  return (
    <button
      className={`w-full justify-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
        isConnected
          ? 'bg-green-600 hover:bg-green-700'
          : 'bg-indigo-600 hover:bg-indigo-700'
      } focus:outline-none`}
      onClick={() => {
        if (!isConnected) {
          connectWalletHandler()
        }
      }}
    >
      {isConnected ? 'Connected' : 'Connect'}
    </button>
  )
}

export default ConnectWallet
