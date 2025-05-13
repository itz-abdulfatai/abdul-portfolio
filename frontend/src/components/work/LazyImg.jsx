function LazyImg({img}) {
  return (
    <img
    className=" tttq rounded-3xl min-h-[50vh] md:min-h-screen"
    src={img ||
      `https://picsum.photos/${window.innerWidth}/${window.innerHeight}?random=1`}
    alt=""
  />
  )
}

export default LazyImg