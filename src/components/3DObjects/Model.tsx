import { useRef, useEffect } from 'react'
import { useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { Box3, Vector3, Object3D, PerspectiveCamera } from 'three'

interface ModelProps {
  modelPath: string
}

const Model: React.FC<ModelProps> = ({ modelPath }) => {
  const httpModelPath = ipfsToHttpUrl(modelPath)

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')

  const gltf = useLoader(GLTFLoader, httpModelPath, (loader) => {
    loader.setDRACOLoader(dracoLoader)
  })

  const modelRef = useRef<Object3D>(null)
  const { camera, scene } = useThree()

  useEffect(() => {
    if (modelRef.current) {
      const bbox = new Box3().setFromObject(modelRef.current)
      const size = new Vector3()
      bbox.getSize(size)
      const center = new Vector3()
      bbox.getCenter(center)

      // Normalize scale
      const maxDimension = Math.max(size.x, size.y, size.z)
      modelRef.current.scale.multiplyScalar(1 / maxDimension)

      // Center the model
      modelRef.current.position.sub(center)

      // Calculate the appropriate distance
      const cameraZ = calculateCameraZ(size, camera)

      // Update camera position to maintain the scaled model fully in view
      camera.position.set(center.x, center.y, center.z + cameraZ)
      camera.lookAt(center)

      // Update the scene's camera if necessary
      scene.updateMatrixWorld() // Ensure the world matrix is updated
    }
  }, [httpModelPath, gltf, camera, scene])

  return <primitive object={gltf.scene} ref={modelRef} />
}

export default Model

const ipfsToHttpUrl = (ipfsUrl: string) => {
  const ipfsPrefix = 'ipfs://'
  if (ipfsUrl.startsWith(ipfsPrefix)) {
    const hash = ipfsUrl.slice(ipfsPrefix.length)
    return `https://ipfs.io/ipfs/${hash}`
  }
  return ipfsUrl
}

// Calculates the Z position for the camera based on the model size
function calculateCameraZ(size: Vector3, camera: PerspectiveCamera) {
  // Desired field of view for the object (in degrees)
  const fov = camera.fov * (Math.PI / 180)
  // Calculate the distance from the model to fit in the view
  const distance = Math.max(size.x, size.y, size.z) / 2 / Math.tan(fov / 2)
  // Adjust the distance if you want the model to appear closer or further away
  const adjustedDistance = distance * 1.2 // 1.2 is an arbitrary scale factor for adjustment

  return adjustedDistance
}
