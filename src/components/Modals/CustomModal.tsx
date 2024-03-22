import Button from '../Buttons/Button'

interface CustomModalProps {
  isOpen: boolean
  onClose: () => void
  message: string
}

const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
      onClick={onClose}
    >
      <div className="relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <p className="text-lg leading-6 font-medium text-gray-900">
            {message}
          </p>
          <div className="mt-2 px-32 py-3 flex items-center">
            <Button text="Close" onClick={onClose}></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomModal
