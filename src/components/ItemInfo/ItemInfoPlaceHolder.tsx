const ItemInfoPlaceHolder = () => {
  return (
    <div className="flex flex-col md:flex-row w-screen h-full pt-6">
      <div className="flex flex-col justify-start items-center md:w-4/12">
        {/* <BackButton /> */}
      </div>
      <div className="flex justify-center items-center flex-col gap-6 md:6/12 p-4">
        <div className="flex justify-center items-center flex-col gap-6 w-full max-w-2xl">
          <div className="w-full h-[672px] overflow-hidden rounded-lg"></div>
          <div className="flex flex-col md:flex-row w-full justify-between mb-6">
            <div className="text-left pr-2 space-y-4">
              <div className="flex flex-row items-center space-x-2"></div>
            </div>
            <div className="mt-4 md:mt-0 w-full md:w-auto align-top">
              {/* <Button
                text="Mint"
                onClick={function () {
                  return
                }}
              />
            </div> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-center md:w-4/12 p-4">
          {/* <TokenInfo item={item} /> */}
        </div>
      </div>
    </div>
  )
}

export default ItemInfoPlaceHolder
