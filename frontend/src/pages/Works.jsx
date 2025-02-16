import { useContext } from "react"
import SettingContext from "../contexts/settingContext"
import ProjectCard from "../components/global/ProjectCard"
import Contact from "../components/home/Contact"
import { Helmet } from "react-helmet"
import { shuffle } from "../utils/helper"

function Works() {
  const {settings} = useContext(SettingContext)
  const { projects } = settings

  return (
    <>

    <Helmet>
      <title>Works | {settings.name}</title>
      <meta name="description" content="Browse through my diverse portfolio to see the creative projects I’ve crafted for satisfied clients." />
      <meta property="og:title" content={`Portfolio | ${settings.name}`} />
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
        {
            shuffle(projects).map((p, i) => (
               <ProjectCard p={p} key={i}/>

            ))

        }
        
    </div>
</section>

<Contact/>

</>

  )
}

export default Works