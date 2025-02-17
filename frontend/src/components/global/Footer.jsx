
import { Link } from 'react-router-dom'
import Button from './Button'
import { useContext, useEffect } from 'react'
import SettingContext from '../../contexts/settingContext'
import Logo from './Logo'
import { scrollR } from '../../utils/scrollR'
import { scrollToSection } from '../../utils/scrollIn'
function Footer() {

  useEffect(() => {
    scrollR('lll', 'left', false)
    scrollR('rrr', 'right', false)
    scrollR('ttt', 'bottom', false, 10)

}, [])

  
  const {settings} = useContext(SettingContext)
  const {socials, name} = settings
  return (
    <footer className="min-h-[50vh] max-md:py-10 py-5  padding-x flex flex-col gap-5 ">
      <div className='  flex flex-col gap-10 md:flex-row justify-between  items-start'>

      <div className=' rrr flex flex-col gap-8 max-sm:text-center items-start w-full'>
        <h2 className=' text-[40px] md:text-[56px] max-w-[450px] leading-tight  font-[600]'>Let&apos;s work together today!</h2>
        <Button text='Start project' onclick={() => {scrollToSection('contact')}} className=' max-md:w-full  bg-highlight text-lg text-primary py-3 hover:bg-x hover:text-secondary'  icon={<i className='bx bx-chevron-right'></i>}/>
        


      </div>
      <div className=' lll flex justify-between w-full md:w-[40%] '>
        <div className='flex flex-col gap-1'>
          <h3 className='font-[600] mb-1 capitalize'>usefull links</h3>
          <a href='#home' className="">Home</a>
            <a href='#about' className="">About</a>
            <a href='#portfolio' className="">Work</a>
            <a href='#testimonials' className="">Reviews</a>
            <a target='blank' href='https://itz-abdulfatai.github.io/portfolio/smma-abdul' className="">My Startup agency</a>
            

        </div>

        <div className='flex flex-col gap-1'>
          <h3 className='font-[600] mb-1 capitalize'>socials</h3>
          {
            socials.map((social, i) => ( i < 4 &&
              <Link key={social.name} to={social.link} target='_blank' >
                {social.name}
              </Link>
            ))
            
          }

        </div>

      </div>
      </div>
      <div className=' ttt flex justify-between flex-wrap items-center mt-10'>
        <Logo/>
        <p>
        Built <span className='hidden sm:inline-block'>with <i className='bx bx-heart text-highlight'></i></span>  by <Link className='text-highlight hover:text-tertiary transition' to={socials[Math.floor(Math.random() * socials.length)].link} target='blank'> {name}</Link> 
        </p>
      </div>
    </footer>
  )
}

export default Footer