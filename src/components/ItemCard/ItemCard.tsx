import Link from 'next/link'

export interface Item {
  tokenId: string
  name: string
  description: string
  model: string
  tags: string[]
  source: string
}

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="group relative mb-5">
      <div className="relative w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 aspect-w-1 aspect-h-1">
        <Link href={`/item/${item.tokenId}`} passHref>
          <img
            // src={}
            alt="item image"
            className="h-full w-full object-cover object-center"
          />
        </Link>
      </div>
      <div className="pl-1">
        <h3 className="mt-6 text-sm text-gray-500 truncate">
          <Link href={`/items/${item.tokenId}`}>{item.name}</Link>
        </h3>
        <p className="text-base font-semibold text-gray-900 truncate">
          {item.description}
        </p>
      </div>
    </div>
  )
}
