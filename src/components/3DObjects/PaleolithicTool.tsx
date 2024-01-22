'use client'

import { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Mesh } from 'three'

function MeshComponent() {
  const fileUrl = '/3dmodels/nmbh_palaeolithic_tool/scene.gltf'
  const mesh = useRef<Mesh>(null!)
  const gltf = useLoader(GLTFLoader, fileUrl)

  gltf.scene.scale.set(20, 20, 20) // Adjust these values as needed
  gltf.scene.position.set(0, 0, 0) // Set the position to the origin

  useFrame(() => {
    // mesh.current.rotation.y += 0.01
  })

  return (
    <mesh ref={mesh}>
      <primitive object={gltf.scene} />
    </mesh>
  )
}

export function PaleolithicTool() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Canvas className="w-2xl h-2xl">
        <OrbitControls />
        <ambientLight />
        <pointLight position={[0, 0, 0]} />
        <PerspectiveCamera position={[0, 0, 5]} />
        <MeshComponent />
      </Canvas>
    </div>
  )
}
