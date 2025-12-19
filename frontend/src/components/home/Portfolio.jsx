import { useContext, useEffect } from "react"
import Button from "../global/Button"
import ProjectCard from "../global/ProjectCard"
import SettingContext from "../../contexts/settingContext"
import { useNavigate } from "react-router-dom"
import { shuffle } from "../../utils/helper"
import { scrollR } from "../../utils/scrollR"
// import Spinner from "../global/Spinner"
// import Error from "../global/Error"
import LittleSpinner from "../global/LittleSpinner"

function Portfolio({heading}) {
    const {settings, loading, error, fetchSettings} = useContext(SettingContext)
    const {projects} = settings;
    const navigate = useNavigate()

      useEffect(() => {
    scrollR('pppppppp', 'bottom', false)

  }, [])

  return (
    <section
      id="portfolio"
      className="pppppppp flex flex-col gap-10 py-14 min-h-0"
    >
      <div className=" flex flex-col md:flex-row justify-between gap-5">
        <h2 className="  text-[25px] lg:text-[40px] font-[600]">{heading}</h2>
        <Button
          onclick={() => {
            navigate("/works");
          }}
          text="View all works"
          icon={<i className="bx bx-chevron-right"></i>}
          className={
            "bg-highlight text-primary hover:bg-x hover:text-secondary max-md:py-3"
          }
        />
      </div>

      <div className=" flex flex-wrap gap-5 justify-center">
        {loading && (
          <div className="w-full  pt-9 h-14 ">
            <LittleSpinner />
          </div>
        )}
        {error && (
          <div className="w-full  pt-9 h-14 flex items-center gap-4 ">
            Error loading projects
            <Button
              onclick={fetchSettings}
              textColor="highlight"
              text="Retry"
              className="underline"
            />
          </div>
        )}
        {!loading && projects && (
          <>
            {shuffle(projects).map(
              (p, i) => i < 4 && <ProjectCard p={p} key={i} />
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Portfolio

