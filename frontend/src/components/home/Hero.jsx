import { useContext, useEffect } from "react";
import Button from "../global/Button";
import SettingContext from "../../contexts/settingContext";
import ImageSlider from "./ImageSlider";
import { scrollR } from "../../utils/scrollR";
import { scrollToSection } from "../../utils/scrollIn";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate()

  const { settings } =
    useContext(SettingContext);
    const {avatar, isAvaliableForFreelancing, heading} = settings
  // console.log(name)

  useEffect(() => {
    scrollR("homme", "bottom", false);
  }, []);

  return (
    <section
      id="home"
      className="homme overflow-hidden items-stretch flex justify-between min-h-[30vh] lg:min-h-[80vh] "
    >
      <div className=" flex py-8 lg:py-28 justify-end items-center md:items-start text-center md:text-left w-full flex-col gap-8 ">
        <div className="flex items-center gap-3">
          <img
            src={avatar || "noavatar.jpeg"}
            alt=""
            className="w-9 aspect-square rounded-md"
          />
          <span className=" dot"></span>
          <p className="text-tertiary">
            {" "}
            {isAvaliableForFreelancing
              ? "Available for freelancing"
              : "Currently Unavailable"}{" "}
          </p>
        </div>
        <h1 className=" text-[40px] lg:text-[55px] font-[600]">{heading}</h1>
        <div className=" flex gap-5 flex-col md:flex-row max-md:items-center ">
          <Button
            className={
              "max-md:w-full hover:bg-x bg-highlight hover:text-secondary"
            }
            bg={"highlight"}
            icon={<i className="bx bx-chevron-right"></i>}
            text="Order the service"
            onclick={() => {
              navigate("/quote?source=hero");
            }}
            textColor={"primary"}
          />

          <Button
            className={
              "max-md:w-full hover:border-secondary border border-[#363636] bg-[#252525]  text-secondary"
            }
            bg={"highlight"}
            icon={<i className="bx bx-down-arrow-alt"></i>}
            text="scroll down"
            onclick={() => {
              scrollToSection("about");
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
