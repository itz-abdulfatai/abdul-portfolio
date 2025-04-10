import { useContext, useEffect, useState } from "react";
import SettingContext from "../../contexts/settingContext";
import { scrollR } from "../../utils/scrollR";
// import Spinner from "../global/Spinner";
// import Error from "../global/Error";
import LittleSpinner from "../global/LittleSpinner";
import Button from "../global/Button";

function Tools() {
  const { settings, loading, error, fetchSettings } = useContext(SettingContext);
  const { tools } = settings;
  const [full, setFull] = useState(false);

  useEffect(() => {
    scrollR("h22", "bottom", false);
    scrollR("ppp", "bottom", false);
    // scrollR('tttt', 'bottom', false)
  }, []);
  return (
    <section id="tools" className=" flex flex-col gap-10 justify-center min-h-0">
      <h2 className=" h22 text-secondary  text-2xl md:text-[40px] font-[600]">
        Essential tools I use
      </h2>
      <p className="ppp text-sm md:text-base text-tertiary max-w-[550px]">
        Discover the powerful tools and technologies I use to create
        exceptional, high-performing websites and applications.
      </p>
      <div className="  flex flex-wrap gap-4 ">
        {loading &&

        <div className="w-full  pt-9 h-14 ">
          <LittleSpinner className='' />

        </div>

}
        
        {error && 
        <div className="w-full  pt-9 h-14 flex items-center gap-4 ">
          Error loading tools
          <Button onclick={fetchSettings} text='Retry' className='underline'/>
        </div>
        }
        {!loading && tools && (
          <>
            {tools.map((tool, index) =>
              !full ? (
                index <= 7 && <Tool i={index} tool={tool} key={index} />
              ) : (
                <Tool tool={tool} i={index} key={index} />
              )
            )}

            {tools.length > 8 && (
              <div className="flex gap-2 items-center max-md:w-full">
                <button
                  className=" test-b border-x hover:bg-x2 hover:border-x2 px-3 py-6 rounded-xl transition-all duration-300 cursor-pointer text-xl w-full md:w-[265px] "
                  onClick={() => setFull(!full)}
                >
                  {full ? "See less" : "See more"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Tools;

function Tool({ tool, i }) {
  useEffect(() => {
    scrollR(
      `tttt-${tool.name.replace(/[^a-zA-Z0-9]/g, "")}-${i}`,
      "bottom",
      false
    );
    // console.log(`tttt-${tool.name}-${i}:`, i * 50)
  }, [tool.name, i]);

  return (
    <div
      className={`tttt-${tool.name.replace(
        /[^a-zA-Z0-9]/g,
        ""
      )}-${i} w-full sm:w-[250px] lg:w-[265px] test-b border-x hover:border-x2 flex gap-3 p-3 rounded-xl hover:bg-x2 duration-300 transition-all  group items-center cursor-pointer`}
    >
      {tool.icon && (
        <i
          className={` bx ${tool.icon} group-hover:high-shadow transition-all text-3xl p-2 aspect-square bg-x2 duration-300 rounded-xl group-hover:bg-primary group-hover:text-highlight`}
        ></i>
      )}

      <div>
        <h3 className=" font-[500] ">{tool.name}</h3>
        <span className=" text-tertiary">{tool.use}</span>
      </div>
    </div>
  );
}
