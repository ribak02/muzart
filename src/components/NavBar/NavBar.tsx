import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import ConnectWallet from '../Web3/ConnectWallet'

interface NavbarProps {
  onSearch: (value: string) => void // Function to handle search input
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
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

          <div className="flex items-center">
            <div className="hidden md:flex items-center border-2 border-gray-200 rounded-full">
              <input
                className="px-4 py-2 w-80 focus:outline-none rounded-full"
                type="search"
                placeholder="Search"
                onChange={(e) => onSearch(e.target.value)}
              />
              <button className="flex items-center justify-center px-4 ">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
              </button>
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
                  <UserCircleIcon className="h-10 w-10 rounded-full" />
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <ConnectWallet />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
