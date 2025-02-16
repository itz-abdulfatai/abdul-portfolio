import React, { Suspense, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import SettingContext from "../contexts/settingContext";
import Portfolio from "../components/home/Portfolio";
import Contact from "../components/home/Contact";
import { scrollR } from "../utils/scrollR";
import Spinner from "../components/global/Spinner";
import {Helmet} from 'react-helmet'

const LazyImg = React.lazy(() => import('../components/work/LazyImg')) 

function Work() {
  useEffect(() => {
    scrollR('tttq', 'bottom', false )
    scrollR('lllll', 'left', false )
    scrollR('rrrrr', 'right', false )

  }, [])


  const { slug } = useParams();
  const { settings } = useContext(SettingContext);
  const {projects, name} = settings
  const work = projects.find((p) => p.slug === slug);
  // console.log(slug)
  // console.log(work)
  return (
    <>

    <Helmet>
      <title>{work.name} | {settings.name}</title>
      <meta name="description" content={work.description} />
      <meta property="og:title" content={`${work.name} | ${settings.name}`} />
      <meta property="og:description" content={work.description} />
      <meta property="og:image" content={work.images[0] || `https://picsum.photos/${window.innerWidth}/${window.innerHeight}?random=1`} />
    </Helmet>
    
      <section className="p-0 min-h-[50vh]">
      <h1 className="text-center  text-secondary p-3 text-xl md:text-4xl font-bold">
                {work.name}
              </h1>
        <div className="w-full bg-no-repeat bg-cover h-[60vh] md:h-screen py-14 text-center  flex flex-col justify-between " style={{backgroundImage: `url(${work.images[0] ||
            `https://picsum.photos/${window.innerWidth}/${window.innerHeight}?random=1`})`}}>


        </div>
              <p className="text-base text-secondary font-[500] primary-sh text-center p-10">by {name}</p>
    
      </section>
      <section className="py-20 flex flex-col gap-5 min-h-[50vh]">
        <h2 className="text-[40px] font-[600]">About the project</h2>
        <div className=" flex flex-col items-start xl:flex-row gap-10 justify-between">
          <p className="flex-1 lllll first-letter:uppercase">{work.description}

          {
            work.github && 

            <Link to={work.github} target="blank" className="mt-5 flex gap-2 items-center hover:text-highlight transition-all">
              <i className='bx bxl-github text-2xl'></i>
              View on Github

            </Link>
            }

{
            work.link && 

            <Link to={work.link} target="blank" className="mt-5 flex gap-2 items-center hover:text-highlight transition-all">
              <i className='bx bx-link-alt'></i>
              Visit Live Site

            </Link>
            }
          </p>
          <div className=" rrrrr xl:w-[450px] w-full  flex flex-col xl:items-end gap-5 justify-between">
            <div className="w-80 flex gap-10 ">
              <h3 className="font-[600] capitalize text-lg">Client</h3> <span>{work.clientInfo.name}</span>
            </div>
            <div className="w-80 flex gap-10 ">
              <h3 className="font-[600] capitalize text-lg">services</h3>
              <div className="flex flex-col gap-3 max-h-52  overflow-auto items-start">

              {work.services.map((service) => (
                <span key={service} className="px-2 capitalize py-1 text-primary rounded-lg bg-highlight">{service}</span>
              ))}
              </div>
            </div>
            <div className="w-80 flex gap-10 ">
              <h3 className="font-[600] capitalize text-lg">sector</h3> <span>{work.clientInfo.sector}</span>
            </div>
          </div>
        </div>
      </section>
      {
        work.images.length > 1 && 
      <section className=" flex flex-col gap-7 py-16">
        {
          work.images.map((img, index) => (
            index > 0 && 
            <Suspense key={index} fallback={<Spinner/>}>
              <LazyImg img={img}/>
            </Suspense>
           
          ))
        }
      </section>
      }

      <Portfolio heading='Next projects'/>
      <Contact/>
      {/* <section>
        <Spinner/>
      </section> */}
    </>
  );
}

export default Work;
