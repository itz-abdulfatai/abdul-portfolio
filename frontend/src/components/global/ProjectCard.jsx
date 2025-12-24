// import { useEffect } from "react"
import { Link } from "react-router-dom"
// import { scrollR } from "../../utils/scrollR"

function ProjectCard({p}) {

  // useEffect(() => {
  //   scrollR(p.slug, 'bottom', false)

  // }, [p.slug])
  return (
    <Link
      to={"/works/" + p.slug}
      className={` ${p.slug} w-full inline-flex max-w-[400px] xl:max-w-[480px] flex-col p-5  rounded-3xl aspect-square bg-x2 gap-8 group`}
    >
      <div className=" overflow-hidden rounded-2xl fles justify-center items-center h-56 md:h-80 ">
        <img
          src={p.images?.[0] || "https://picsum.photos/200/300?random=1"}
          alt=""
          className=" w-full group-hover:scale-105 transition-all duration-500 ease-linear h-full"
        />
      </div>
      <div className=" flex flex-col md:flex-row md:items-center max-md:gap-5 justify-between">
        <div className=" flex flex-col gap-3">
          <h3 className=" text-lg md:text-2xl font-[500]">{p.name}</h3>
          <div className=" flex gap-3 flex-wrap">
            {p.services?.slice(0, 2).map((service) => (
              <div key={service} className=" p-2 rounded-lg bg-[#282828]">
                {service}
              </div>
            ))}
          </div>
        </div>
        <span className=" flex justify-center items-center p-3 bg-highlight text-2xl text-primary rounded-xl hover:bg-[#282828] hover:text-secondary transition-all duration-300 gap-5">
          <span className="md:hidden text-base">Learn more</span>

          <i className=" max-sm:text-lg bx bx-arrow-back rotate-[135deg] "></i>
        </span>
      </div>
    </Link>
  );
}

export default ProjectCard