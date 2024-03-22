import React, { useState } from 'react'
import { useWallet } from '../../context/WalletContext' // Adjust the import path as needed
import mintCopyToken from '../../ethereum/deployment/mintCopyToken'
import CustomModal from '../Modals/CustomModal'

interface ItemInfoProps {
  itemId: string // Assuming your item has an ID represented as a string
}

const MintButton: React.FC<ItemInfoProps> = ({ itemId }) => {
  const { walletAddress } = useWallet()
  const [isMinting, setIsMinting] = useState<boolean>(false)
  const [isMinted, setIsMinted] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleMint = async () => {
    if (!walletAddress) {
      alert('You need to connect your wallet first.')
      return
    }

    // Confirm before minting
    const isConfirmed = window.confirm('Do you want to mint this NFT?')
    if (!isConfirmed) {
      return // Exit if the user cancels the confirmation
    }

    setIsMinting(true)
    try {
      // Assuming mintCopyToken is your function to mint tokens
      await mintCopyToken(itemId)
      setIsMinted(true)
      setShowModal(true) // Show the custom modal on successful mint
    } catch (error) {
      console.error('Minting failed:', error)
      alert('Minting failed, please try again.')
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <>
      <button
        className={`w-full justify-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${
          isMinting || isMinted
            ? 'bg-green-500'
            : 'bg-indigo-600 hover:bg-indigo-700'
        } flex items-center justify-center`}
        onClick={handleMint}
        disabled={isMinting || isMinted}
      >
        {isMinting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Minting...
          </>
        ) : isMinted ? (
          'Minted'
        ) : (
          'Mint'
        )}
      </button>
      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message="Successfully minted this token to your wallet."
      />
    </>
  )
}

export default MintButton
