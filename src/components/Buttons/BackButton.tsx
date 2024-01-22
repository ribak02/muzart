import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const BackButton = () => {
  return (
    <div className="absolute top-24 left-10 p-4">
      <Link href="/">
        <button
          //   onClick={handleBackClick}
          className="flex items-center justify-center w-10 h-10 text-white bg-black rounded-full hover:bg-gray-600"
          aria-label="Back"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </Link>
    </div>
  )
}

export default BackButton
