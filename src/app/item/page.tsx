'use client'
import Navbar from '@/src/components/NavBar/NavBar'
import BackButton from '@/src/components/Buttons/BackButton'
import { PaleolithicTool } from '@/src/components/3DObjects/PaleolithicTool'

export default function Home() {
  const handleSearch = (value: string) => {
    console.log(value) // Perform search operation
  }

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center items-center h-screen flex-col gap-6">
          <BackButton />
          <div className="rounded-lg bg-gray-400 w-full h-full">
            <PaleolithicTool />
          </div>
          <div className="">
            <h3 className="text-sm text-gray-500 truncate">PaleolithicTool</h3>
            <p className="text-base font-semibold text-gray-900 truncate">
              Ancient Tool
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
