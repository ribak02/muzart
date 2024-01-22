import BackButton from '../Buttons/BackButton'
import Button from '../Buttons/Button'
import { Item } from '../ItemCard/ItemCard'

export function ItemInfo({ item }: { item: Item }) {
  return (
    <div className="flex justify-center items-center flex-col gap-6 w-full px-4">
      <BackButton />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-white">
        <img
          src={item.imageSrc}
          alt={item.imageAlt}
          className="object-cover object-center w-full h-full"
        />
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-2xl justify-between items-center">
        <div className="text-left">
          <h3 className="text-xl text-gray-500 truncate">{item.name}</h3>
          <p className="text-lg font-semibold text-gray-900 truncate">
            {item.description}
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <Button text="Mint" />
        </div>
      </div>
    </div>
  )
}
