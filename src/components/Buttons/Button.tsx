interface ButtonProps {
  text: string
  onClick: () => void
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="w-full justify-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
