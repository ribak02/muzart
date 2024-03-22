import { useWallet } from '../../context/WalletContext' // Adjust the import path as needed

declare global {
  interface Window {
    ethereum: any
  }
}

const ConnectWalletButton: React.FC = () => {
  // Use `useWallet` to access walletAddress and setWalletAddress
  const { walletAddress, setWalletAddress } = useWallet()

  // Determine connection state based on whether walletAddress is non-empty
  const isConnected = Boolean(walletAddress)

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts: string[] = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        // Update the wallet address in context based on the first account
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error)
      }
    } else {
      console.log('MetaMask is not installed')
    }
  }

  return (
    <button
      className={`w-full justify-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
        isConnected
          ? 'bg-gray-600 hover:bg-gray-700'
          : 'bg-indigo-600 hover:bg-indigo-700'
      } focus:outline-none`}
      onClick={connectWalletHandler}
      disabled={isConnected}
    >
      {isConnected ? 'Connected' : 'Connect'}
    </button>
  )
}

export default ConnectWalletButton
