import { Canvas } from 'react-three-fiber'
import { Suspense } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import BackButton from '../Buttons/BackButton'
import Button from '../Buttons/Button'
import { Item } from '../ItemCard/ItemCard'

// Assuming you have a 3D Model component
import Model from '../3DObjects/Model' // Import your 3D model component

export function ItemInfo({ item }: { item: Item }) {
  return (
    <div className="flex justify-center items-center flex-col gap-6 w-full px-4 h-3/4">
      <BackButton />
      <div className="relative w-full max-w-2xl h-full max-h-2xl overflow-hidden rounded-lg bg-white">
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
            {/* Removed Environment to use a solid black background */}
          </Suspense>
        </Canvas>
      </div>
      <div className="flex flex-col md:flex-row w-full max-w-2xl justify-between items-center">
        <div className="text-left">
          <h3 className="text-xl text-gray-500 truncate">{item.name}</h3>
          <p className="text-lg font-semibold text-gray-900 truncate">
            {item.description}
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <Button
            text="Mint"
            onClick={function () {
              return
            }}
          />
        </div>
      </div>
    </div>
  )
}
