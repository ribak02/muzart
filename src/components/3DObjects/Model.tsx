import { useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

import { Box3, Vector3, Object3D } from 'three'

// Define props type
interface ModelProps {
  modelPath: string
}

const Model: React.FC<ModelProps> = ({ modelPath }) => {
  // Convert IPFS URL to HTTP URL
  const httpModelPath = ipfsToHttpUrl(modelPath)

  // Set up the DRACOLoader instance
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/') // Set the path to your Draco decoder's directory
  // dracoLoader.setDecoderPath(new URL('path/to/draco/', import.meta.url).href)

  // Use GLTFLoader directly with DRACOLoader
  const gltf = useLoader(GLTFLoader, httpModelPath, (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })

  // Use useRef with a generic type for better type checking
  const modelRef = useRef<Object3D>(null)

  useEffect(() => {
    if (modelRef.current) {
      // Adjust scale and position
      const bbox = new Box3().setFromObject(modelRef.current)
      const size = new Vector3()
      bbox.getSize(size)
      const maxDimension = Math.max(size.x, size.y, size.z)
      modelRef.current.scale.multiplyScalar(1 / maxDimension) // Normalize scale
      const center = new Vector3()
      bbox.getCenter(center)
      modelRef.current.position.sub(center) // Center the model
    }
  }, [httpModelPath, gltf])

  return <primitive object={gltf.scene} ref={modelRef} />
}

export default Model

// Converts an IPFS URL to an HTTP URL using a public gateway
const ipfsToHttpUrl = (ipfsUrl: string) => {
  const ipfsPrefix = 'ipfs://'
  if (ipfsUrl.startsWith(ipfsPrefix)) {
    // Using the ipfs.io public gateway, but you can use any IPFS gateway
    const hash = ipfsUrl.slice(ipfsPrefix.length)
    return `https://ipfs.io/ipfs/${hash}`
  }
  return ipfsUrl // Return the original URL if it's not an IPFS URL
}
