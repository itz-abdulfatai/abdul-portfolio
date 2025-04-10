import Marquee from "react-fast-marquee"
import Testimonial from "./Testimonial"
import { useContext, useEffect } from "react"
import SettingContext from "../../contexts/settingContext"
import { scrollR } from "../../utils/scrollR"
import { shuffle } from "../../utils/helper"
import Spinner from "../global/Spinner"
import Error from "../global/Error"

function Testimonials() {
    const {settings, loading, error} = useContext(SettingContext)
    const {testimonials} = settings;

    useEffect(() => {
        scrollR('tesii', 'bottom', false)
    }, [])

  return (
    <section id="testimonials" className=" tesii flex flex-col gap-10">
     

<h2 className=" text-[40px] font-[600] text-tertiary">What our customers say</h2>
{loading && <Spinner/>}
      {error && <Error error={error}/>}
      {testimonials && 

      <>
        <div className="flex-1 ">
          <Marquee autoFill gradient gradientColor="#161616" gradientWidth='100px'>
            {
              shuffle(testimonials).map((testimonial, i) => {
                return (
                <>
           
                <Testimonial key={i} testimonial={testimonial}/>
                </>
                )
              })
            }

          <Testimonial/>
          </Marquee>


          <Marquee autoFill gradient gradientColor="#161616" gradientWidth='100px' direction="right" className="" >
            {
              shuffle(testimonials).map((testimonial, i) => {
                return (
                <>
           
                <Testimonial key={Math.floor(Math.random() * i + i)} testimonial={testimonial}/>
                </>
                )
              })
            }

          <Testimonial/>
          </Marquee>
        </div>
      </>
      }
      
    </section>
  )
}

export default Testimonials