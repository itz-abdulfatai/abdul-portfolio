import { useContext, useState } from "react"
import SettingContext from "../contexts/settingContext"
import ProjectCard from "../components/global/ProjectCard"
import Contact from "../components/home/Contact"
import { Helmet } from "react-helmet"
import LittleSpinner from "../components/global/LittleSpinner"
import Button from "../components/global/Button"
import { scrollToSection } from "../utils/scrollIn"

function Works() {
  const {settings, loading, error, fetchSettings} = useContext(SettingContext)
  const { projects } = settings
  const [activeTab, setActiveTab] = useState('jobs')

  const jobs = projects?.filter(p => p.type === "job").sort((a, b) => b.priority - a.priority) || [];
  const portfolio = projects?.filter(p => p.type !== "job").sort((a, b) => b.priority - a.priority) || [];

  return (
    <>
      <Helmet>
        <title>Works | {settings.name ?? 'Abdulfatai Aliyu'}</title>
        <meta name="description" content="Browse through my diverse portfolio to see the creative projects I’ve crafted for satisfied clients." />
        <meta property="og:title" content={`Portfolio | ${settings.name ?? 'Abdulfatai Aliyu'}`} />
        <meta property="og:description" content="Browse through my diverse portfolio to see the creative projects I’ve crafted for satisfied clients." />
      </Helmet>
      <section id="portfolio" className="flex flex-col gap-10 py-14">
        <div className="flex flex-col md:flex-row justify-between gap-5">
          <h2 className="text-[25px] lg:text-[40px] font-[600]" id="works-heading">My portfolio highlights</h2>
        </div>
        <p className="max-w-[500px]">
          Browse through my diverse portfolio to see the creative projects I’ve crafted for satisfied clients.
        </p>

        <div className="flex flex-col gap-10">
          {/* Sticky Tabs Navigation */}
          <div className="sm:sticky sm:top-0 -mx-8 sm:bg-primary/95 sm:backdrop-blur-sm sm:shadow-md sm:z-40">
            <div className="flex gap-4 justify-center items-center py-4">
              <button 
                onClick={() => {setActiveTab('jobs'); scrollToSection('works-heading', "smooth")}}
                className={`px-5 py-2 text-lg rounded font-medium transition-all duration-300 flex justify-center items-center ${
                  activeTab === 'jobs' 
                  ? 'bg-highlight text-tertiary'  
                  : 'text-gray-500 md:hover:text-tertiary bg-x2'
                }`}
              >
                Jobs
              </button>
              <button 
                onClick={() => {setActiveTab('portfolio'); scrollToSection('works-heading', "smooth")}}
                className={`px-5 py-2 text-lg rounded font-medium transition-all duration-300 flex justify-center items-center ${
                  activeTab === 'portfolio' 
                  ? 'bg-highlight text-tertiary' 
                  : 'text-gray-500 hover:text-tertiary bg-x2'
                }`}
              >
                Portfolio Projects
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div id="tab-content">
            {activeTab === 'jobs' && (
              <div className="flex flex-wrap gap-5 justify-center">
                {loading && (
                  <div className="w-full pt-9 h-14">
                    <LittleSpinner />
                  </div>
                )}
                {error && (
                  <div className="w-full pt-9 h-14 flex items-center gap-4">
                    Error loading projects
                    <Button onclick={fetchSettings} text="Retry" className="underline" />
                  </div>
                )}
                {!loading && jobs.map((p, i) => (
                  <ProjectCard p={p} key={i} />
                ))}
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div className="flex flex-wrap gap-5 justify-center">
                {loading && (
                  <div className="w-full pt-9 h-14">
                    <LittleSpinner />
                  </div>
                )}
                {error && (
                  <div className="w-full pt-9 h-14 flex items-center gap-4">
                    Error loading projects
                    <Button onclick={fetchSettings} text="Retry" className="underline" />
                  </div>
                )}
                {!loading && portfolio.map((p, i) => (
                  <ProjectCard p={p} key={i} />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className=" sm:hidden text-center">
          <button 
            onClick={() => {
              setActiveTab(activeTab === 'jobs' ? 'portfolio' : 'jobs')
              scrollToSection('works-heading')
            }
            }
            className="text-lg underline text-highlight hover:text-tertiary transition-all duration-300"
          >
            {activeTab === 'jobs' ? 'See Portfolio Projects' : 'See Client Jobs'}
          </button>
        </div>
      </section>

      <Contact />
    </>
  );
}

export default Works