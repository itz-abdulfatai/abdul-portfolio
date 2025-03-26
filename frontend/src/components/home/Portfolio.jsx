import { useContext, useEffect } from "react"
import Button from "../global/Button"
import ProjectCard from "../global/ProjectCard"
import SettingContext from "../../contexts/settingContext"
import { useNavigate } from "react-router-dom"
import { shuffle } from "../../utils/helper"
import { scrollR } from "../../utils/scrollR"

function Portfolio({heading}) {
    const {settings} = useContext(SettingContext)
    const {projects} = settings;
    const navigate = useNavigate()

      useEffect(() => {
    scrollR('pppppppp', 'bottom', false)

  }, [])

  return (
    <section id="portfolio" className="pppppppp flex flex-col gap-10 py-14">
        <div className=" flex flex-col md:flex-row justify-between gap-5">
            <h2 className="  text-[25px] lg:text-[40px] font-[600]">{heading}</h2>
            <Button onclick={() => {navigate('/works')}} text='View all works' icon={ <i className='bx bx-chevron-right' ></i>} className={'bg-highlight text-primary hover:bg-x hover:text-secondary'} />
        </div>

        <div className=" flex flex-wrap gap-5 justify-center">
            {
                shuffle(projects).map((p, i) => (
                  i < 4 &&  <ProjectCard p={p} key={i}/>

                ))

            }
            
        </div>
    </section>
  )
}

export default Portfolio

