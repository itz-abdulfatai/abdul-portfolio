import { useEffect } from "react";
import { scrollR } from "../../utils/scrollR";
// import { type toolType } from "../../constants/tools";

// type t = {
//   tool: toolType;
//   i: number;
// };

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
      {tool.icon && tool.iconType === "boxicon" && (
        <i
          className={` bx ${tool.icon} group-hover:high-shadow transition-all text-3xl p-2 aspect-square bg-x2 duration-300 rounded-xl group-hover:bg-primary group-hover:text-highlight w-[45px] h-[45px] flex justify-center items-center`}
        ></i>
      )}
      {tool.icon && (tool.iconType === "img" || tool.iconType === "svg") && (
        <div className="flex justify-center items-center w-[45px] h-[45px] transition-all p-2 aspect-square bg-x2 duration-300 rounded-xl group-hover:bg-primary  ">
          <img src={tool.icon} alt={tool.name} loading="lazy" className="" />
        </div>
      )}

      <div>
        <h3 className=" font-[500] ">{tool.name}</h3>
        {tool.use && <span className=" text-tertiary">{tool.use}</span>}
      </div>
    </div>
  );
}

export default Tool;
