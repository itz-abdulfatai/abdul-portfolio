import { useEffect, useState } from "react"
import ReactGA from 'react-ga4';

const preloadImages = (urls) => {
  return urls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
  });
};

function Popup() {
    const [active, setActive] = useState(false)
    const [smallActive, setSmallActive] = useState(true)
    const [activeImg, setActiveImg] = useState(0)

    const images = [
      "/website-gif-1.gif",
      "/website-gif-2.gif",
      "/website-gif-3.gif",
      "/website-gif-4.gif"
  ];
  const preloadedImages = preloadImages(images);

    useEffect(()=> {
        const interval = setInterval(() => {
            setActiveImg((prev) => (prev === 3 ? 0 : prev + 1))
        }, 8000)
        // console.log('active image is ' + activeImg);
        return () => clearInterval(interval)

        

    }, [activeImg])
    
    const [isVisible, setIsVisible] = useState(false);
    const closePopup = () => {
        setActive(false)
        sessionStorage.setItem('seen', JSON.stringify(true))

        ReactGA.event({
          category: 'event-popup',
          action: 'seen popup',
        });
    }

    useEffect(() => {
        if (active) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "";
        }
    
        return () => {
          document.body.style.overflow = "";
        };
      }, [active]);

      useEffect(() => {
        if (active) {
          setTimeout(() => setIsVisible(true), 10); // Delay to allow transition to take effect
        } else {
          setIsVisible(false);
        }
      }, [active]);


      const submitted = JSON.parse((localStorage.getItem('submitted'))) == true;
    useEffect(() => {
        const seen = JSON.parse((sessionStorage.getItem('seen'))) == true;
        // console.log(submitted)
        // console.log(seen)

        if (!seen && !submitted) {
            setTimeout(() => setActive(true), 1000); // Show after 1s if conditions match
          } else {
            closePopup();
          }

    }, [submitted]) 
  return (

    <>
    {

    active &&
    <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50" 
    // onClick={(e)=> {if (e.target == e.currentTarget) {closePopup()}}}
    >
        <div className={` ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        duration-300 transition-all relative bg-white w-full max-w-[90%] sm:max-w-[550px] sm:h-[350px]  flex justify-stretch flex-col-reverse sm:flex-row rounded-lg shadow-lg overflow-hidden `}>
            <div className="w-full flex flex-col gap-5 p-5 text-primary max-sm:items-center max-sm:text-center">
                {/* <h2 className="text-sm font-bold">Dont miss out!</h2> */}
                <img src="/dark-logo.png" className="w-24" alt="" />
            <p className="text-[26px] font-bold">1 Year FREE Hosting + WordPress or Shopify Site - Starting at $199! </p>
            <a onClick={closePopup} href="#contact" className=" text-center w-full p-3 bg-primary text-white hover:bg-x transition-colors rounded-lg">Claim  Deal Now!</a>
            </div>
        
            <div className={` transition-colors duration-1000 w-full flex justify-center items-center overflow-hidden  ${activeImg == 0 && 'bg-[#466880]'}  ${activeImg == 2 && 'bg-[#142938]'} ${activeImg == 1 && 'bg-[#3eb8de]'} ${activeImg == 3 && 'bg-[#dcdbdc]'} `}>

                <img src={preloadedImages[activeImg].src} alt="cover image"  className={` ${
                  activeImg == 0 ? 'h-full sm:h-[63%] max-sm:scale-[1.4]. sm:hover:scale-105 sm:hover:brightness-75.' : activeImg == 1 ? 'h-full sm:h-[60%] max-sm:scale-[1.4]. sm:hover:scale-105.' : activeImg == 2 ? ' sm:h-[48%] max-sm:scale-[1.2] sm:hover:scale-105.' : activeImg == 3 ? ' sm:h-[63%] max-sm:scale-[1.1] sm:hover:scale-105.' : ''} object-cover transition-all  duration-500 ease-in `}/>
            </div>


{/* <div className={`transition-colors duration-1000 w-full flex justify-center items-center overflow-hidden bg-primary 
  ${activeImg == 2 && 'bg-[#466880]'}  
  ${activeImg == 3 && 'bg-[#142938]'} 
  ${activeImg == 1 && 'bg-[#3eb8de]'}`}
>
  <img
    key={activeImg}  // Key forces re-render when activeImg changes
    src={`/website-gif-${activeImg}.gif`}
    alt="cover image"
    className="object-cover transition-opacity duration-1000 opacity-0 fade-in"
    onLoad={(e) => e.target.style.opacity = 1} // Fade in when loaded
  />
</div> */}
            <button onClick={() => {closePopup();}} className=" flex p-1 justify-center items-center rounded bg-secondary text-primary absolute top-3 right-3 text-xl"><i className='bx bx-x'></i></button>

        </div>
    </div>
    }

{
  !submitted &&  !active && smallActive && 

<div onClick={(e) => {if (e.target == e.currentTarget) setActive(true)}}  className="fixed max-sm:top-5 left-5 max-sm:right-5 h-10 rounded p-2 bg-x text-white text-center flex items-center max-sm:opacity-95  transition-all hover:scale-[1.03] max-sm:hover:opacity-100 sm:bottom-5 sm:gap-5 cursor-pointer z-50 ">
    <span onClick={(e) => {if (e.target == e.currentTarget) setActive(true)}} className="flex-1">
        
    Great deal for you!
    </span>

    <button onClick={() => {setSmallActive(false)}} className=" flex justify-center items-center rounded bg-secondary text-primary text-xl"><i className='bx bx-x'></i></button>

</div>
}


</>
  )
}

export default Popup