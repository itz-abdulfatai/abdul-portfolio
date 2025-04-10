import { useContext } from "react"
import SettingContext from "../contexts/settingContext"
import ProjectCard from "../components/global/ProjectCard"
import Contact from "../components/home/Contact"
import { Helmet } from "react-helmet"
import { shuffle } from "../utils/helper"
// import Spinner from "../components/global/Spinner"
// import Error from "../components/global/Error"
import LittleSpinner from "../components/global/LittleSpinner"
import Button from "../components/global/Button"

function Works() {
  const {settings, loading, error, fetchSettings} = useContext(SettingContext)
  const { projects } = settings

  return (
    <>

    <Helmet>
      <title>Works | {settings.name ?? 'Abdulfatai Aliyu'}</title>
      <meta name="description" content="Browse through my diverse portfolio to see the creative projects I’ve crafted for satisfied clients." />
      <meta property="og:title" content={`Portfolio | ${settings.name ?? 'Abdulfatai Aliyu'}`} />
      <meta property="og:description" content="Browse through my diverse portfolio to see the creative projects I’ve crafted for satisfied clients." />
    </Helmet>
    <section id="portfolio" className=" flex flex-col gap-10 py-14">
    <div className=" flex flex-col md:flex-row justify-between gap-5">
        <h2 className="  text-[25px] lg:text-[40px] font-[600]">My portfolio highlights</h2>
        
    </div>
    <p className="max-w-[500px]">

    Browse through my diverse portfolio to see the creative projects I’ve crafted for satisfied clients.
    </p>

    <div className=" flex flex-wrap gap-5 justify-center">
      {loading && 
      <div className="w-full  pt-9 h-14 ">
        <LittleSpinner />
      </div>
      }
      {error && 
      <div className="w-full  pt-9 h-14 flex items-center gap-4 ">
        Error loading projects
        <Button onclick={fetchSettings} text='Retry' className='underline'/>
      </div>
      }
      {!loading && projects &&
      <>
       {
            shuffle(projects).map((p, i) => (
               <ProjectCard p={p} key={i}/>

            ))

        }
      </>
      
      
      } 
       
        
    </div>
</section>

<Contact/>

</>

  )
}

export default Works