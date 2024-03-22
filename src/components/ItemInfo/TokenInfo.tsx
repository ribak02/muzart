import { Item } from '../ItemCard/ItemCard'

const TokenInfo = ({ item }: { item: Item }) => {
  const etherscanUrl = `https://sepolia.etherscan.io/nft/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${item.tokenId}`

  return (
    <div className="md:max-w-full w-full p-4 border-2 border-gray-200 rounded-lg shadow space-y-2 bg-white">
      <h1 className="text-xl font-semibold text-gray-800 truncate">
        Token Info
      </h1>
      <hr className="border-t border-gray-300" />
      <p className="font-semibold break-words text-sm md:text-base">
        Token ID:{' '}
        <span className="text-gray-500 font-normal">{item.tokenId}</span>
      </p>
      <p className="font-semibold break-words text-sm md:text-base">
        Token Standard:{' '}
        <span className="text-gray-500 font-normal">ERC-1155</span>
      </p>
      <p className="font-semibold break-words text-sm md:text-base">
        Amount: <span className="text-gray-500 font-normal">1</span>
      </p>
      <p className="break-words text-sm md:text-base">
        <span className="font-semibold">Contract Address:</span>{' '}
        <span className="text-gray-500">
          {process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}
        </span>
      </p>
      <p className="break-words text-sm md:text-base">
        <a
          href={etherscanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          View on Etherscan
        </a>
      </p>
    </div>
  )
}

export default TokenInfo
