function Error({error = 'an eror occured', onclick = () => {location.reload()}}) {
  return (
    <div className="mx-auto flex flex-col gap-10 justify-center items-center w-full h-full pt-10">



    <h1 className="text-secondary text-2xl text-center">Error: {
      error.includes(500) ? 'Oops! Something went wrong on our end. Please try again later.': error
  }</h1>

    <button className="bg-[#ff0000] font-bold px-5 py-2 rounded hover:bg-highlight transition-all duration-200 hover:text-primary"  onClick={onclick}>retry</button>
    </div>
  )
}

export default Error