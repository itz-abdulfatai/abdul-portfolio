import Marquee from "react-fast-marquee"
import Testimonial from "./Testimonial"
import { useContext, useEffect } from "react"
import SettingContext from "../../contexts/settingContext"
import { scrollR } from "../../utils/scrollR"
import { shuffle } from "../../utils/helper"
// import Spinner from "../global/Spinner"
// import Error from "../global/Error"
import LittleSpinner from "../global/LittleSpinner"
import Button from "../global/Button"

function Testimonials() {
    const {settings, loading, error, fetchSettings} = useContext(SettingContext)
    const {testimonials} = settings;

    useEffect(() => {
        scrollR('tesii', 'bottom', false)
    }, [])

  return (
    <section id="testimonials" className=" tesii flex flex-col gap-10 min-h-0">
      <h2 className=" text-[25px] lg:text-[40px] font-[600]">
        What my customers say
      </h2>
      {loading && (
        <div className="w-full  pt-9 h-14 ">
          <LittleSpinner />
        </div>
      )}
      {error && (
        <div className="w-full  pt-9 h-14 flex items-center gap-4 ">
          Error loading testimonials
          <Button
            onclick={fetchSettings}
            text="Retry"
            textColor="highlight"
            className="underline"
          />
        </div>
      )}
      {testimonials && (
        <>
          <div className="flex-1 ">
            <Marquee
              autoFill
              gradient
              gradientColor="#161616"
              gradientWidth="100px"
            >
              {shuffle(testimonials).map((testimonial, i) => {
                return (
                  <>
                    <Testimonial key={i} testimonial={testimonial} />
                  </>
                );
              })}

              <Testimonial />
            </Marquee>

            <Marquee
              autoFill
              gradient
              gradientColor="#161616"
              gradientWidth="100px"
              direction="right"
              className=""
            >
              {shuffle(testimonials).map((testimonial, i) => {
                return (
                  <>
                    <Testimonial
                      key={Math.floor(Math.random() * i + i)}
                      testimonial={testimonial}
                    />
                  </>
                );
              })}

              <Testimonial />
            </Marquee>
          </div>
        </>
      )}
    </section>
  );
}

export default Testimonials