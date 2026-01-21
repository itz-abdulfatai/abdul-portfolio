import { useContext, useEffect } from "react";
import Button from "../global/Button";
import SettingContext from "../../contexts/settingContext";
import ImageSlider from "./ImageSlider";
import { scrollR } from "../../utils/scrollR";
// import { scrollToSection } from "../../utils/scrollIn";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const { settings, loading } = useContext(SettingContext);
  const { avatar, isAvaliableForFreelancing } = settings;
  // console.log(name)

  useEffect(() => {
    scrollR("homme", "bottom", false);
  }, []);

  return (
    <section
      id="home"
      className="homme overflow-hidden items-stretch lg:items-center flex flex-col lg:flex-row justify-between min-h-[30vh] lg:min-h-[80vh] "
    >
      <div className="flex py-8 sm:py-16 md:py-20 lg:py-28 justify-end items-center md:items-start text-center md:text-left w-full flex-col gap-8">
        <div className="flex items-center gap-3">
          <img
            src={avatar || "noavatar.jpeg"}
            alt=""
            className="w-9 aspect-square rounded-md"
          />
          <span className={"dot"}></span>
          <p className="text-tertiary">Abdulfatai Aliyu</p>
          <a
            href="#contact"
            className=" cursor-pointer text-tertiary text-xs px-2 py-1 rounded-full bg-x2 border border-x transition-all hover:bg-secondary hover:text-primary"
          >
            {loading
              ? "loading Availability..."
              : isAvaliableForFreelancing
              ? "Available now"
              : "Not Available"}
          </a>
        </div>
        <h1 className=" text-[30px] sm:text-[35px] md:text-[42px] xl:text-[50px] font-[600]">
          {/* {heading} */}
          Web, Mobile, and Digital Marketing Solutions that Drive Revenue.
        </h1>
        <small className=" text-sm max-w-[500px] font-normal text-tertiary md:-mt-5">
          I Specialize in{" "}
          <strong className="text-sm font-semibold">
            MERN stack development
          </strong>
          , cross-platform{" "}
          <strong className="text-sm font-semibold">mobile apps</strong>,
          <strong className="text-sm font-semibold"> digital marketing</strong>{" "}
          and custom{" "}
          <strong className="text-sm font-semibold">AI integrations</strong>{" "}
          that save you 20+ hours a week.
        </small>
        <div className=" flex gap-5 flex-col sm:flex-row max-md:items-center max-sm:w-[90%] w-full">
          <Button
            className={
              "max-md:w-full hover:bg-x bg-highlight max-md:py-3 hover:text-secondary"
            }
            bg={"highlight"}
            icon={<i className="text-xl ml-5 bx bx-chevron-right"></i>}
            text="Get a Free Quote"
            onclick={() => {
              navigate("/quote?source=hero-cta");
            }}
            textColor={"primary"}
          />

          <Button
            className={
              "max-md:w-full hover:border-secondary border border-[#363636] max-md:py-3  bg-[#252525]  text-secondary"
            }
            bg={"highlight"}
            icon={<i className="text-xl ml-5 bx bx-right-arrow-alt"></i>}
            text="View recent work"
            onclick={() => {
              // scrollToSection("about");
              navigate("/works");
            }}
            textColor={"primary"}
          />
        </div>
      </div>
      <ImageSlider />
    </section>
  );
}
 
export default Hero;
