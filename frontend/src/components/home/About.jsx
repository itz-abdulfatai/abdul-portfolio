import {  useEffect } from "react"
// import SettingContext from "../../contexts/settingContext"
import Count from "../global/Count"
import Logo from "../global/Logo"
import { scrollR } from "../../utils/scrollR"
import CountUp from "../global/CountUp"

function About() {
    // const {settings} = useContext(SettingContext)
    // const { about, projectsDone, yearsOfExperience, clientSatisfaction } = settings;

    useEffect(() => {
      scrollR("aaaa", "bottom")

    }, [])
  return (
    <section id="about" className=" flex items-center justify-center">
        <div className=" aaaa relative w-[90%] rounded-3xl p-4 md:p-16 text-2xl h-[90%] bg-x2 flex flex-col gap-10">
            <p className=" md:max-w-[90%] text-sm lg:text-lg  first-letter:text-4xl first-letter:text-highlight">
              {/* {about} */}
              Hi, I&apos;m Abdulfatai! I specialize in crafting nice UIs and turning ideas into engaging online experiences. As a seasoned full-stack developer and digital marketer, I build dynamic websites using Mern stack, React.js, Next.js, Node.js, Express.js, MongoDB, Firebase, Supabase, Tailwind CSS, and more. I also excel in WordPress development, creating landing pages, blogs, and e-commerce stores with Elementor, WooCommerce, Jetpack, Tutor LMS and many more to enhance functionality and UX.  Beyond coding, I leverage Klaviyo, Facebook & Instagram Ads, Go High Level, Google Analytics, Email marketing and more to optimize conversion rates, sales, and website traffic. Partner with me for fast, high-quality project delivery at an unbeatable price. Let&apos;s connect!
              </p>
            <div className=" flex md:items-center flex-col md:flex-row gap-10">
              <div className=" flex flex-col gap-2">
                <Count count={46}/>
                <span className=" text-base">Projects done</span>
              </div>
              <div className=" flex flex-col gap-2">
                <Count count={3}/>
                <span className=" text-base">Years of experience</span>
              </div>

              <div className=" flex flex-col gap-2">
                <div className=" flex items-center">
                  {/* <p  className=" text-[40px] font-[600]">{clientSatisfaction}</p> */}
                  <CountUp   from={0} to={100} separator="," direction="up" duration={1}
 className="count-up-text text-[40px] font-[600]" />
                  <span className=" text-[40px] font-[600] text-highlight">%</span></div>
                <span className=" text-base">Client satisfaction</span>
              </div>
<div className=" absolute bottom-20 right-14 hidden lg:block ">

              <Logo/>
</div>
            </div>
        </div>
    </section>
  )
}

export default About

