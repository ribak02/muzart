import { useState, useEffect } from 'react'
import { useWallet } from '../../context/WalletContext' // Adjust the import path as needed
import { UserCircleIcon } from '@heroicons/react/24/solid' // Adjust import path based on your icon library

const WalletAddressDialogue: React.FC = () => {
  const { walletAddress } = useWallet()
  const [showDialogue, setShowDialogue] = useState(false)

  useEffect(() => {
    const toggleDialogue = (event: MouseEvent) => {
      // Check if the click is on the icon or dialogue itself
      if (
        (event.target as HTMLElement)?.closest('.dialogue-trigger') ||
        (event.target as HTMLElement)?.closest('.dialogue-content')
      ) {
        setShowDialogue((prev) => !prev)
      } else {
        setShowDialogue(false)
      }
    }

    // Listen for clicks to toggle dialogue visibility
    window.addEventListener('click', toggleDialogue)

    return () => {
      window.removeEventListener('click', toggleDialogue)
    }
  }, [])

  return (
    <div className="relative dialogue-trigger">
      <UserCircleIcon className="h-10 w-10 rounded-full cursor-pointer" />

      {showDialogue && (
        <div className="absolute top-full mt-2 right-0 bg-white shadow-lg rounded-md p-4 text-sm w-64 dialogue-content">
          <p className="font-semibold">Wallet Address:</p>
          <p className="break-words">{walletAddress || 'Not connected'}</p>
        </div>
      )}
    </div>
  )
}

export default WalletAddressDialogue
