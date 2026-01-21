import { useContext, useEffect, useState } from "react";
import SettingContext from "../../contexts/settingContext";
import { scrollR } from "../../utils/scrollR";
// import Spinner from "../global/Spinner";
// import Error from "../global/Error";
import LittleSpinner from "../global/LittleSpinner";
import Button from "../global/Button";
// import { t } from "../../constants/tools";
import Tool from "./Tool";

const tabs = [
  { name: "Web Dev", key: "web" },
  { name: "App Dev", key: "app" },
  { name: "Marketing", key: "marketing" },
  { key: "automation", name: "Automation" },
  { key: "others", name: "Others" },
];

function Tools() {
  const { settings, loading, error, fetchSettings } =
    useContext(SettingContext);
  const { tools } = settings;
  // const tools = t.sort((a, b) => b.priority - a.priority);

  const [full, setFull] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);

const nonOtherKeys = tabs
  .filter(tab => tab.key !== "others")
  .map(tab => tab.key);

const filteredTools =
  tools &&
  tools.filter(tool => {
    const category = tool.category.toLowerCase();

    if (activeTab.key === "others") {
      return !nonOtherKeys.some(key => category.includes(key));
    }

    return category.includes(activeTab.key);
  });


  useEffect(() => {
    scrollR("h22", "bottom", false);
    // scrollR('tttt', 'bottom', false)
  }, []);
  return (
    <section
      id="tools"
      className=" flex flex-col gap-10 justify-center min-h-0"
    >
      <div className="flex gap-10 flex-col h22">
      <h2 className="  text-secondary  text-2xl md:text-[40px] font-[600]">
        My Creative Stack
      </h2>
      <p className=" text-sm md:text-base text-tertiary max-w-[700px]">
        Discover the tools, and technologies I use across web and app development, marketing, and automation to create exceptional, high performing digital experiences.
      </p>
      {!loading && tools && (
        <div className="">
          <div className=" flex items-center  flex-wrap gap-4 ">
            {tabs.map((tab) => (
              <button
                onClick={() => {
                  setActiveTab(tab);
                  setFull(false);
                }}
                key={tab.key}
                className={`ms:py-2.5 py-1 px-2 sm:px-3 rounded-xl font-[500] transition-all flex flex-col items-center gap-2 duration-300 ${
                  tab === activeTab
                    ? "bg-highlight text-primary border border-highlight"
                    : "bg-x2 text-secondary border border-transparent hover:border-highlight"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      )}
      </div>
      <div className="  flex flex-wrap gap-4 ">
        {loading && (
          <div className="w-full  pt-9 h-14 ">
            <LittleSpinner className="" />
          </div>
        )}

        {error && (
          <div className="w-full  pt-9 h-14 flex items-center gap-4 ">
            Error loading tools
            <Button
              onclick={fetchSettings}
              text="Retry"
              textColor="highlight"
              className="underline"
            />
          </div>
        )}
        {!loading && tools && (
          <>
            {filteredTools.map((tool, index) =>
              !full ? (
                index <= 7 && <Tool i={index} tool={tool} key={index} />
              ) : (
                <Tool tool={tool} i={index} key={index} />
              )
            )}

            {filteredTools.length > 8 && (
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