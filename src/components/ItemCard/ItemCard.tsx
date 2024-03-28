import Link from 'next/link'
import Image from 'next/image'

export interface Item {
  tokenId: string
  name: string
  description: string
  author: string
  model: string
  tags: string[]
  source: string
}

function getThumbnail(tokenId: string) {
  return `/images/thumbnails/thumbnail${tokenId}.png`
}

export default function ItemCard({ item }: { item: Item }) {
  return (
    <div className="group relative mb-5">
      <div className="relative w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 aspect-w-1 aspect-h-1">
        <Link href={`/item/${item.tokenId}`} passHref>
          {/* <img
            src={getThumbnail(item.tokenId)}
            alt="thumbnail image"
            className="h-full w-full object-cover object-center"
          /> */}
          <Image
            src={getThumbnail(item.tokenId)}
            alt="thumbnail image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </Link>
      </div>
      <div className="pl-1">
        <h3 className="mt-6 text-lg font-semibold text-gray-900 truncate">
          <Link href={`/items/${item.tokenId}`}>{item.name}</Link>
        </h3>
        <p className=" text-m text-gray-800 truncate">{item.description}</p>
      </div>
    </div>
  )
}
