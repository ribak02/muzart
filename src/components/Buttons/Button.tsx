const Button = (props: { text: String }) => {
  return (
    <button
      type="button"
      className="w-full justify-center inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none"
    >
      {props.text}
    </button>
  )
}

export default Button
