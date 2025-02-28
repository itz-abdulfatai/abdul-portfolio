import { useEffect, useState } from "react"

function Popup() {
    const [active, setActive] = useState(false)
    const [smallActive, setSmallActive] = useState(true)
    
    const [isVisible, setIsVisible] = useState(false);
    const closePopup = () => {
        setActive(false)
        sessionStorage.setItem('seen', JSON.stringify(true))
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
        console.log(submitted)
        console.log(seen)

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
    <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50" onClick={(e)=> {if (e.target == e.currentTarget) {closePopup()}}}>
        <div className={` ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        duration-300 transition-all relative bg-white w-full max-w-[90%] sm:max-w-[550px] sm:h-[350px]  flex justify-stretch flex-col-reverse sm:flex-row rounded-lg shadow-lg overflow-hidden `}>
            <div className="w-full flex flex-col gap-5 p-5 text-primary max-sm:items-center max-sm:text-center">
                {/* <h2 className="text-sm font-bold">Dont miss out!</h2> */}
                <img src="/dark-logo.png" className="w-24" alt="" />
            <p className="text-[26px] font-bold">1 Year FREE Hosting + WordPress or Shopify Site - Starting at $199! </p>
            <a onClick={closePopup} href="#contact" className=" text-center w-full p-3 bg-primary text-white hover:bg-x transition-colors rounded-lg">Claim  Deal Now!</a>
            </div>
        
            <div className="w-full flex justify-center items-center overflow-hidden bg-primary">
                <img src="/website-gif-1.gif" alt="cover image"  className=" h-[142%] max-sm:scale-[1.4] object-cover transition-all sm:hover:scale-105 duration-500 ease-in sm:hover:brightness-50"/>
            </div>
            <button onClick={() => {closePopup();}} className=" flex p-1 justify-center items-center rounded bg-secondary text-primary absolute top-3 right-3 text-xl"><i className='bx bx-x'></i></button>

        </div>
    </div>
    }

{
  !submitted &&  !active && smallActive && 

<div onClick={(e) => {if (e.target == e.currentTarget) setActive(true)}}  className="fixed max-sm:top-5 left-5 max-sm:right-5 h-10 rounded p-2 bg-x text-white text-center flex items-center opacity-95 sm:bottom-5 sm:gap-5 cursor-pointer">
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