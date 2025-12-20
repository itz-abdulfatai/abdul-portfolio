import Marquee from "react-fast-marquee"
import { sliderimages } from "../../constants"

function ImageSlider() {
  const shuffledImages = [...sliderimages].sort(() => Math.random() - 0.5);
  const shuffledImages2 = [...sliderimages].sort(() => Math.random() - 0.5);
  return (
    <>
      <div className=" hidden  h-screen w-full items-center overflow-hidden lg:flex flex-col gap-5 rotate-90 justify-center ">
        <Marquee
          className=" h-40 overflow-hidden border-red-600"
          gradient
          speed={10}
          gradientColor="#161616"
          autoFill
          gradientWidth="100px"
        >
          {shuffledImages2.map((img) => (
            //  <div key={img} className='   flex justify-stretch items-stretch '>
            <div
              key={img}
              className="py-3 overflow-hidden  h-[200px] rotate-[-90deg]  flex justify-center items-center w-44 "
            >
              <img
                src={img}
                alt=""
                className="h-[95%] rotate-[0deg] object-cover w-full select-none"
                draggable={false}
                key={img}
              />
            </div>
            //  </div>
          ))}
        </Marquee>

        <Marquee
          direction="right"
          className=" h-40 overflow-hidden border-red-600"
          gradient
          speed={10}
          gradientColor="#161616"
          autoFill
          gradientWidth="100px"
        >
          {shuffledImages.map((img) => (
            //  <div key={img} className='   flex justify-stretch items-stretch '>
            <div
              key={img}
              className="py-3 overflow-hidden  h-[200px] rotate-[-90deg]  flex justify-center items-center w-44 "
            >
              <img
                src={img}
                alt=""
                className="h-[95%] rotate-[0deg] object-cover w-full select-none"
                draggable={false}
                key={img}
              />
            </div>
            //  </div>
          ))}
        </Marquee>
      </div>

      {/* mobile */}
      <div className="lg:hidden w-full items-center overflow-hidden flex flex-col lg:rotate-90 justify-center ">
        <Marquee
          className=" h-40 overflow-hidden border-red-600"
          gradient
          speed={40}
          gradientColor="#161616"
          autoFill
          gradientWidth="100px"
        >
          {shuffledImages2.map((img) => (
            //  <div key={img} className='   flex justify-stretch items-stretch '>
            <div
              key={img}
              className="py-3 px-3 md:overflow-hidden  h-[140px]  flex justify-center items-center w-44 "
            >
              <img
                src={img}
                alt=""
                className="h-full rotate-[0deg] object-cover w-full rounded-3xl select-none"
                draggable={false}
                key={img}
              />
            </div>
            //  </div>
          ))}
        </Marquee>

        <Marquee
          direction="right"
          className=" h-40 overflow-hidden border-red-600"
          gradient
          speed={40}
          gradientColor="#161616"
          autoFill
          gradientWidth="100px"
        >
          {shuffledImages.map((img) => (
            //  <div key={img} className='   flex justify-stretch items-stretch '>
            <div
              key={img}
              className="py-3 px-3 overflow-hidden  h-[140px] flex justify-center items-center w-44 "
            >
              <img
                src={img}
                alt=""
                className="h-full rotate-[0deg] object-cover w-full rounded-3xl select-none"
                draggable={false}
                key={img}
              />
            </div>
            //  </div>
          ))}
        </Marquee>
      </div>
    </>
  );
}

export default ImageSlider