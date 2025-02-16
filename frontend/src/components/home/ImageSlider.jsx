import Marquee from "react-fast-marquee"
import { sliderimages } from "../../constants"

function ImageSlider() {
  const shuffledImages = [...sliderimages].sort(() => Math.random() - 0.5);
  const shuffledImages2 = [...sliderimages].sort(() => Math.random() - 0.5);
  return (
    <div className=" hidden  h-screen w-full items-center overflow-hidden lg:flex flex-col gap-5 rotate-90 justify-center ">

<Marquee  className=" h-40 overflow-hidden border-red-600" gradient speed={10} gradientColor="#161616" autoFill gradientWidth='100px' >

{
    shuffledImages2.map(img => (
    //  <div key={img} className='   flex justify-stretch items-stretch '>
    <div key={img} className="py-3 overflow-hidden  h-[200px] rotate-[-90deg]  flex justify-center items-center w-44 ">

         <img src={img} alt=""  className="h-[95%] rotate-[0deg] object-cover w-full" key={img}/>
    </div>
    //  </div>
    ))
 }

 </Marquee>

    <Marquee direction="right" className=" h-40 overflow-hidden border-red-600" gradient speed={10} gradientColor="#161616" autoFill gradientWidth='100px' >

{
    shuffledImages.map(img => (
    //  <div key={img} className='   flex justify-stretch items-stretch '>
    <div key={img} className="py-3 overflow-hidden  h-[200px] rotate-[-90deg]  flex justify-center items-center w-44 ">

         <img src={img} alt=""  className="h-[95%] rotate-[0deg] object-cover w-full" key={img}/>
    </div>
    //  </div>
    ))
 }

 </Marquee>
    </div>
  )
}

export default ImageSlider