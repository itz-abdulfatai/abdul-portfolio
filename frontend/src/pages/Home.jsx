import { Helmet } from "react-helmet"
import About from "../components/home/About"
import Contact from "../components/home/Contact"
import Hero from "../components/home/Hero"
import Portfolio from "../components/home/Portfolio"
import Testimonials from "../components/home/Testimonials"
import Tools from "../components/home/Tools"
import SettingContext from "../contexts/settingContext"
import { useContext } from "react"
// import Popup from "../components/global/Popup"
import FreePopup from "../components/global/FreePopup"
// import ClickSpark from "../components/global/ClickSpark"

function Home() {
  const {settings} = useContext(SettingContext)
  return (
  //   <ClickSpark 
  //   sparkColor='#dcf763'

  //   sparkSize={10}
  
  //   sparkRadius={15}
  
  //   sparkCount={8}
  
  //   duration={400}
  // >
    <>
    <Helmet>
      <title>Home | {settings.name}</title>
      <meta name="description" content="I am a full-stack developer with a passion for creating responsive, user-friendly websites." />
      <meta property="og:title" content={`Home | ${Portfolio}`} />
      <meta property="og:description" content="I am a full-stack developer with a passion for creating responsive, user-friendly websites." />
    </Helmet>
    <Hero/>
    <About/>
    <Tools/>
    <Portfolio heading='My portfolio highlights'/>
    <Testimonials/>
    <Contact/>
    {/* <Popup/> */}
    <FreePopup/>
    </>

    // {/* </ClickSpark> */}
  )
}

export default Home