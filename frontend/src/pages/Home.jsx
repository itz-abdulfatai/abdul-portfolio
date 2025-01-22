import About from "../components/home/About"
import Contact from "../components/home/Contact"
import Hero from "../components/home/Hero"
import Portfolio from "../components/home/Portfolio"
import Testimonials from "../components/home/Testimonials"
import Tools from "../components/home/Tools"

function Home() {
  return (
    <>
    <Hero/>
    <About/>
    <Tools/>
    <Portfolio heading='My portfolio highlights'/>
    <Testimonials/>
    <Contact/>
    </>
  )
}

export default Home