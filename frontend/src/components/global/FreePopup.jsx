import { useEffect, useState } from "react"
import ReactGA from 'react-ga4';
import { Link } from "react-router-dom";

const preloadImages = (urls) => {
  return urls.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
  });
};

function FreePopup() {
    const [active, setActive] = useState(false)
    const [smallActive, setSmallActive] = useState(true)
    const [activeImg, setActiveImg] = useState(0)

    const images = [
      "/website-gif-1.png",
      "/website-gif-2.png",
      "/website-gif-3.png",
      "/website-gif-4.png"
  ];
  const preloadedImages = preloadImages(images);

    useEffect(()=> {
        const interval = setInterval(() => {
            setActiveImg((prev) => (prev === 3 ? 0 : prev + 1))
        }, 5000)
        // console.log('active image is ' + activeImg);
        return () => clearInterval(interval)

        

    }, [activeImg])
    
    const [isVisible, setIsVisible] = useState(false);
    const closePopup = () => {
        setActive(false)
        sessionStorage.setItem('free_wordpress_popup_seen', JSON.stringify(true))

        ReactGA.event({
          category: 'wordpress-popup',
          action: 'free_wordpress_popup_closed',
          label: 'free_wordpress_promo'
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
          setTimeout(() => setIsVisible(true), 10);
          ReactGA.event({
            category: 'wordpress-popup',
            action: 'free_wordpress_popup_opened',
            label: 'free_wordpress_promo'
          });
        } else {
          setIsVisible(false);
        }
      }, [active]);

      const submitted = JSON.parse((localStorage.getItem('free_wordpress_popup_submitted'))) == true;
    useEffect(() => {
        const seen = JSON.parse((sessionStorage.getItem('free_wordpress_popup_seen'))) == true;
        // console.log(submitted)
        // console.log(seen)

        if (!seen && !submitted) {
            setTimeout(() => setActive(true), 10000); // Show after 1s if conditions match
          } else {
            closePopup();
          }

    }, [submitted]) 
  return (
    <>
      {active && (
        <div
          className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-labelledby="popup-title"
        >
          <div
            className={` ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }
        duration-300 transition-all relative bg-white w-full max-w-[90%] sm:max-w-[550px] sm:h-[410px]  flex justify-stretch flex-col-reverse sm:flex-row rounded-lg shadow-lg overflow-hidden `}
          >
            <div className="w-full flex flex-col gap-5 p-5 text-primary max-sm:items-center justify-around max-sm:text-center">
              {/* <h2 className="text-sm font-bold">Dont miss out!</h2> */}
              <img src="/dark-logo.png" className="w-24" alt="Company Logo" />
              <p id="popup-title" className="text-[26px] font-bold">
                I&apos;m Giving Away Free Custom WordPress Websites - Limited
                Time Offer!
              </p>
              <Link
                onClick={() => {
                  closePopup();
                  ReactGA.event({
                    category: "wordpress-popup",
                    action: "free_wordpress_cta_clicked",
                    label: "free_wordpress_promo",
                  });
                }}
                to="/quote?source=free-wordpress-popup"
                className="text-center w-full p-3 bg-primary text-white hover:bg-x transition-colors rounded-lg"
              >
                Claim Free Website Now!
              </Link>
            </div>

            <div
              className={` transition-colors duration-1000 w-full flex justify-center items-center overflow-hidden  ${
                activeImg == 0 && "bg-[#466880]"
              }  ${activeImg == 2 && "bg-[#142938]"} ${
                activeImg == 1 && "bg-[#3eb8de]"
              } ${activeImg == 3 && "bg-[#dcdbdc]"} `}
            >
              <img
                src={preloadedImages[activeImg].src}
                alt="cover image"
                className={` ${
                  activeImg == 0
                    ? "h-full sm:h-[63%] scale-[0.98] max-sm:scale-[1.4]. sm:hover:scale-105 sm:hover:brightness-75."
                    : activeImg == 1
                    ? "h-full sm:h-[60%] scale-[0.98] max-sm:scale-[1.4]. sm:hover:scale-105."
                    : activeImg == 2
                    ? " sm:h-[48%] scale-[0.98] max-sm:scale-[1.2] sm:hover:scale-105."
                    : activeImg == 3
                    ? " sm:h-[63%] scale-[0.98] max-sm:scale-[1.1] sm:hover:scale-105."
                    : ""
                } object-cover transition-all  duration-500 ease-in select-none `}
                draggable="false"
              />
            </div>

            <button
              onClick={() => {
                closePopup();
              }}
              className=" flex p-1 justify-center items-center rounded bg-secondary text-primary absolute top-3 right-3 text-xl"
              aria-label="Close popup"
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        </div>
      )}

      {!submitted && !active && smallActive && (
        <div
          onClick={(e) => {
            if (e.target == e.currentTarget) setActive(true);
          }}
          className="fixed max-sm:top-5 left-5 max-sm:right-5 h-10 rounded p-2 bg-x text-white text-center flex items-center max-sm:opacity-95  transition-all hover:scale-[1.03] max-sm:hover:opacity-100 sm:bottom-5 sm:gap-5 cursor-pointer z-40 "
          role="button"
          tabIndex="0"
          aria-label="Free WordPress Site Offer"
        >
          <span
            onClick={(e) => {
              if (e.target == e.currentTarget) setActive(true);
            }}
            className="flex-1"
          >
            Free WordPress Site - Act Now!
          </span>

          <button
            onClick={() => {
              setSmallActive(false);
            }}
            className=" flex justify-center items-center rounded bg-secondary text-primary text-xl"
            aria-label="Close small popup"
          >
            <i className="bx bx-x"></i>
          </button>
        </div>
      )}
    </>
  );
}

export default FreePopup