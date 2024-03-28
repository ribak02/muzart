import { Canvas } from 'react-three-fiber'
import { Suspense } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import BackButton from '../Buttons/BackButton'
import { Item } from '../ItemCard/ItemCard'

// Assuming you have a 3D Model component
import Model from '../3DObjects/Model' // Import your 3D model component
import TokenInfo from './TokenInfo'
import MintButton from '../Buttons/MintButton'

export function ItemInfo({ item }: { item: Item }) {
  return (
    <div className="flex flex-col md:flex-row w-screen h-full pt-6">
      <div className="flex flex-col justify-start items-center md:w-4/12">
        <BackButton />
      </div>
      <div className="flex justify-center items-center flex-col gap-6 md:6/12 p-4">
        <div className="flex justify-center items-center flex-col gap-6 w-full max-w-2xl">
          <div className="w-full h-[672px] overflow-hidden rounded-lg">
            <Canvas style={{ backgroundColor: 'black' }}>
              <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <spotLight
                  position={[10, 10, 10]}
                  angle={0.3}
                  penumbra={0.5}
                  castShadow
                  intensity={1.5}
                />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <Model modelPath={item.model} />
                <OrbitControls />
              </Suspense>
            </Canvas>
          </div>
          <div className="flex flex-col md:flex-row w-full justify-between mb-6">
            <div className="text-left pr-2 space-y-4">
              <div className="flex flex-row items-center space-x-2">
                <h3 className="text-2xl font-semibold text-indigo-600">
                  #{item.tokenId}
                </h3>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {item.name}
                </h3>
              </div>
              <p className="text-lg text-gray-900">By {item.author}</p>
              <p className="text-lg text-gray-500">{item.description}</p>
              <p className="text-lg text-black flex flex-wrap gap-2">
                Tags:
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-black text-sm px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </p>
              <p className="text-m italic text-black">
                Source:{' '}
                <a
                  href={item.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700"
                >
                  {item.source}
                </a>
              </p>{' '}
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-auto align-top">
              <MintButton itemId={item.tokenId} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center md:w-4/12 p-4">
        <TokenInfo item={item} />
      </div>
    </div>
  )
}
