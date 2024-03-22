import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import ConnectWalletButton from '../Buttons/ConnectWalletButton'
import WalletAddressDialogue from './WalletAddressDialogue'
import { useEffect, useState, Fragment } from 'react'
import { useArtworks } from '@/src/context/ArtworkContext'
import { Item } from '../ItemCard/ItemCard'

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<Item[]>([])
  const { artworks } = useArtworks() // Assuming your context provides the artworks array

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([])
      return
    }

    const results = artworks.filter(
      (artwork) =>
        artwork.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artwork.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        )
    )
    setSearchResults(results)
  }, [searchQuery, artworks])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Implement navigation logic as per your application's setup
  const handleResultClick = (artworkId: string) => {
    window.location.href = `/item/${artworkId}`
  }

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-4">
            <a href="/">
              <img
                className="block lg:block h-8 w-auto"
                src="/images/logo/logo-black - Copy.png"
                alt="Your Logo"
              />
            </a>
            <a href="/" className="hidden md:block text-2xl">
              Muzart
            </a>
          </div>

          <div className="flex items-center relative">
            <div className="hidden md:flex items-center border-2 border-gray-200 rounded-full">
              <input
                className="px-4 py-2 w-80 focus:outline-none rounded-full"
                type="search"
                placeholder="Search"
                onChange={handleSearchChange}
              />
              <button className="flex items-center justify-center px-4 ">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
              </button>
              {searchResults.length > 0 && (
                <div className="absolute text-black top-full mt-1 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  {searchResults.map((result) => (
                    <Fragment key={result.tokenId}>
                      <div
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleResultClick(result.tokenId)}
                      >
                        <p className="text-sm font-semibold">{result.name}</p>
                      </div>
                    </Fragment>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <button className="flex items-center justify-center">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            <div className="flex items-center">
              {/* Profile dropdown */}
              <div className="relative">
                <button
                  type="button"
                  className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <WalletAddressDialogue />
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <ConnectWalletButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
