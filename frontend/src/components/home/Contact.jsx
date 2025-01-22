import { useContext, useEffect } from "react"
import SettingContext from "../../contexts/settingContext"
import { Link } from "react-router-dom"
import { scrollR } from "../../utils/scrollR"

function Contact() {
    const {socials} = useContext(SettingContext)

    useEffect(() => {
        scrollR('lll', 'left', false)
        scrollR('rrr', 'right', false)
    }, [])
  return (
    <section id="contact" className=" flex justify-between flex-col md:flex-row items-center">
        <div className=" lll w-full  flex flex-col gap-5">
            <h2 className="text-[40px] font-[600] max-w-[400px] leading-tight">Contact me for collaboration</h2>
            <p className=" max-w-[350px] text-tertiary ">Reach out today to discuss your project needs and start collaborating on something amazing!</p>
            <div className=" h-40  flex md:max-w-[80%] items-end flex-wrap gap-2" >
                {
                    socials.map((social, index) => (
                        <Icon social={social} key={index}/>

                    ))

                }

            </div>
        </div>
        <form className="rrr w-full flex flex-col gap-3">
            <fieldset className=" flex gap-3 ">
                <div className=" form-row">
                    <label htmlFor="name">Name</label>
                    <input required placeholder="Abdulfatai Aliyu" className="form-input" type="text" id="name" name="name" />
                </div>
                <div className=" form-row">
                    <label htmlFor="email" >Email</label>
                    <input required className="form-input" placeholder="abdulfataialiyu4@gmail.com" type="text" id="email" name="email" />
                </div>
            </fieldset>

            <fieldset className=" form-row">
                <label htmlFor="message">Message</label>
                <textarea required placeholder="Message" className="form-input " id="message" name="message" rows="6" />

            </fieldset>
            <button className=" bg-highlight py-3 rounded-xl text-primary font-[500] capitalize hover:bg-x transition-all hover:text-secondary mt-3">submit</button>

        </form>
    </section>
  )
}

export default Contact

function Icon({social}) {
    return (

        <Link to={social.link} target="_blank" title={social.name} className=" inline-flex justify-center items-center" >
         {
            social.name == 'Fiverr' ?
            <i className={` font-extrabold not-italic  text-3xl  p-2 test-b  rounded-xl border-x2 hover:border-transparent hover:text-primary hover:bg-secondary transition-all duration-200 w-[52px]   h-[52px] flex justify-center items-center overflow-hidden hover:primary-sh  `}>fi</i>

            :

        <i className={`bx ${social.icon} overflow-hidden text-3xl  p-2 test-b  rounded-xl border-x2 hover:border-transparent hover:text-primary hover:bg-secondary transition-all duration-200 w-[50px]   h-[50px] flex justify-center items-center hover:primary-sh `}></i>
         }

    </Link>
    )
}