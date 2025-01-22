import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import SettingContext from "../contexts/settingContext";
import Portfolio from "../components/home/Portfolio";
import Contact from "../components/home/Contact";
import { scrollR } from "../utils/scrollR";

function Work() {
  useEffect(() => {
    scrollR('tttq', 'bottom', false )
    scrollR('lllll', 'left', false )
    scrollR('rrrrr', 'right', false )

  }, [])


  const { slug } = useParams();
  const { settings } = useContext(SettingContext);
  const {portfolioHighlights, name} = settings
  const work = portfolioHighlights.find((p) => p.slug === slug);
  // console.log(slug)
  return (
    <>
      <section className="p-0 min-h-[50vh]">
        <div className="w-full bg-no-repeat bg-cover h-[60vh] md:h-screen py-14 text-center text-2xl md:text-5xl font-bold flex flex-col justify-between text-x2" style={{backgroundImage: `url(${work.images[0] ||
            `https://picsum.photos/${window.innerWidth}/${window.innerHeight}?random=1`})`}}>
              <h1 className="  work-heading p-3">
                {work.name}
              </h1>
              <p className="text-base text-secondary font-[500] primary-sh">by {name}</p>

        </div>
    
      </section>
      <section className="py-20 flex flex-col gap-5 min-h-[50vh]">
        <h2 className="text-[40px] font-[600]">About the project</h2>
        <div className=" flex flex-col items-start xl:flex-row gap-10 justify-between">
          <p className="flex-1 lllll">{work.description}</p>
          <div className=" rrrrr xl:w-[450px] w-full  flex flex-col xl:items-end gap-5 justify-between">
            <div className="w-80 flex gap-10 ">
              <h3 className="font-[600] capitalize text-lg">Client</h3> <span>{work.clientInfo.name}</span>
            </div>
            <div className="w-80 flex gap-10 ">
              <h3 className="font-[600] capitalize text-lg">services</h3>
              <div className="flex flex-col gap-3 max-h-40 overflow-auto items-start">

              {work.services.map((service) => (
                <span key={service} className="px-2 py-1 text-primary rounded-lg bg-highlight">{service}</span>
              ))}
              </div>
            </div>
            <div className="w-80 flex gap-10 ">
              <h3 className="font-[600] capitalize text-lg">sector</h3> <span>{work.clientInfo.sector}</span>
            </div>
          </div>
        </div>
      </section>
      <section className=" flex flex-col gap-7 py-16">
        {
          work.images.map((img, index) => (
            index > 0 &&
            <img
              key={index}
              className=" tttq rounded-3xl h-[50vh] md:h-screen"
              src={img ||
                `https://picsum.photos/${window.innerWidth}/${window.innerHeight}?random=1`}
              alt=""
            />
          ))
        }
      </section>

      <Portfolio heading='Next projects'/>
      <Contact/>
    </>
  );
}

export default Work;
