// @ts-checkk
import { useEffect, useRef, useState } from "react";

/** @type {import('../../types').CertificationType[]} */
const dummyCertifications = [
  {
    name: "AWS Cloud Practitioner",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/aws-cloud-practitioner",
    dateIssued: new Date("2024-01-15"),
    expiryDate: new Date("2027-01-15"),
    issuingOrganization: "Amazon Web Services",
    description: "Entry level cloud certification covering core AWS services",
  },
  {
    name: "Meta Frontend Developer",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/meta-frontend",
    dateIssued: new Date("2023-11-10"),
    issuingOrganization: "Meta",
    description: "Covers modern frontend development with React and JavaScript",
  },
  {
    name: "Google UX Design",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/google-ux",
    dateIssued: new Date("2024-03-05"),
    expiryDate: new Date("2026-03-05"),
    issuingOrganization: "Google",
    description: "User experience fundamentals and design thinking principles",
  },
  {
    name: "Microsoft Azure Fundamentals",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/azure-fundamentals",
    dateIssued: new Date("2024-05-20"),
    issuingOrganization: "Microsoft",
    description: "Covers Azure core services, security, and cloud concepts",
  },
  {
    name: "Stripe Payments Specialist",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/stripe-payments",
    dateIssued: new Date("2023-08-01"),
    expiryDate: new Date("2025-08-01"),
    issuingOrganization: "Stripe",
    description: "Training on integrating and managing online payments",
  },
  {
    name: "AWS Cloud Practitioner",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/aws-cloud-practitioner",
    dateIssued: new Date("2024-01-15"),
    expiryDate: new Date("2027-01-15"),
    issuingOrganization: "Amazon Web Services",
    description: "Entry level cloud certification covering core AWS services",
  },
  {
    name: "Meta Frontend Developer",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/meta-frontend",
    dateIssued: new Date("2023-11-10"),
    issuingOrganization: "Meta",
    description: "Covers modern frontend development with React and JavaScript",
  },
  {
    name: "Google UX Design",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/google-ux",
    dateIssued: new Date("2024-03-05"),
    expiryDate: new Date("2026-03-05"),
    issuingOrganization: "Google",
    description: "User experience fundamentals and design thinking principles",
  },
  {
    name: "Microsoft Azure Fundamentals",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/azure-fundamentals",
    dateIssued: new Date("2024-05-20"),
    issuingOrganization: "Microsoft",
    description: "Covers Azure core services, security, and cloud concepts",
  },
  {
    name: "Stripe Payments Specialist",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/stripe-payments",
    dateIssued: new Date("2023-08-01"),
    expiryDate: new Date("2025-08-01"),
    issuingOrganization: "Stripe",
    description: "Training on integrating and managing online payments",
  },
];

function Certifications() {
  const [certs] = useState(dummyCertifications);
  const [activeIndex, setActiveIndex] = useState(0);

  // const namesContainerRef = useRef(null);
  const imagesContainerRef = useRef(null);
  // const nameRefs = useRef([]);
  const imageRefs = useRef([]);

  // programmatic scroll guard to avoid feedback loops
  const programmaticScrollRef = useRef(false);
  const programmaticTimeoutRef = useRef(0);

  // visual constants

  const MAX_IMG_SCALE = 1;
  const MIN_IMG_SCALE = 0.8;
  const MAX_IMG_OPACITY = 1;
  const MIN_IMG_OPACITY = 0.5;

  // helpers
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  const computeClosestIndex = (container, refsArray, axis = "y") => {
    if (!container) return 0;
    const cRect = container.getBoundingClientRect();
    const center =
      axis === "y"
        ? cRect.top + cRect.height / 2
        : cRect.left + cRect.width / 2;

    let bestIndex = 0;
    let bestDistance = Infinity;
    refsArray.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const itemCenter =
        axis === "y" ? r.top + r.height / 2 : r.left + r.width / 2;
      const dist = Math.abs(itemCenter - center);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestIndex = i;
      }
    });
    return bestIndex;
  };

  const applyVisuals = () => {
    const imagesContainer = imagesContainerRef.current;

    if (imagesContainer) {
      const iRect = imagesContainer.getBoundingClientRect();
      const iCenterX = iRect.left + iRect.width / 2;
      imageRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const itemCenterX = r.left + r.width / 2;
        const distance = clamp(
          Math.abs(itemCenterX - iCenterX) / (iRect.width / 2),
          0,
          1
        );
        const t = 1 - distance;
        const scale = MIN_IMG_SCALE + (MAX_IMG_SCALE - MIN_IMG_SCALE) * t;
        const opacity =
          MIN_IMG_OPACITY + (MAX_IMG_OPACITY - MIN_IMG_OPACITY) * t;
        el.style.transform = `scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.transition =
          "transform 180ms linear, opacity 180ms linear, box-shadow 180ms linear";
        el.style.boxShadow = `${
          t > 0.85 ? "0 8px 30px rgba(0,0,0,0.6)" : "0 4px 12px rgba(0,0,0,0.4)"
        }`;
      });
    }
  };

  // scroll active item into center of its container
  const scrollItemToCenter = (container, el, axis = "y") => {
    if (!container || !el) return;
    // mark programmatic so scroll handler does not override activeIndex
    programmaticScrollRef.current = true;
    window.clearTimeout(programmaticTimeoutRef.current);
    // use scrollIntoView with axis specific options
    if (axis === "y") {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    } else {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
    // keep guard active for a short while while scroll finishes
    programmaticTimeoutRef.current = window.setTimeout(() => {
      programmaticScrollRef.current = false;
      applyVisuals();
    }, 420);
  };

  // when activeIndex changes we programmatically center both lists
  useEffect(() => {
    // const targetName = nameRefs.current[activeIndex];
    const targetImg = imageRefs.current[activeIndex];
    // scrollItemToCenter(namesContainerRef.current, targetName, "y");
    scrollItemToCenter(imagesContainerRef.current, targetImg, "x");
    // also update visuals immediately
    applyVisuals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // attach scroll, wheel, and touch handlers
  useEffect(() => {
    // const namesContainer = namesContainerRef.current;
    const imagesContainer = imagesContainerRef.current;
    if (!imagesContainer) return;

    let raf = 0;

    
    const onImagesScroll = () => {
      if (programmaticScrollRef.current) {
        applyVisuals();
        return;
      }
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const newIndex = computeClosestIndex(
          imagesContainer,
          imageRefs.current,
          "x"
        );
        if (newIndex !== activeIndex) setActiveIndex(newIndex);
        applyVisuals();
      });
    };

    // prevent entire page from scrolling when wheel is used on the containers
    // const onNamesWheel = (e) => {
    //   // vertical scroll belongs to names container so let it scroll there but prevent page
    //   e.preventDefault();
    //   namesContainer.scrollTop += e.deltaY;
    // };
    const onImagesWheel = (e) => {
      // horizontal scroll for images: translate vertical wheel into horizontal scroll
      e.preventDefault();
      imagesContainer.scrollLeft += e.deltaY;
    };

    // for touchmove: prevent overscroll on page while user interacts with containers
    const onTouchMovePrevent = (e) => {
      // only prevent when touch is inside the container to avoid blocking whole page gestures
      // do nothing else here. Browsers require passive:false for preventDefault to work
      e.stopPropagation();
    };

    // namesContainer.addEventListener("scroll", onNamesScroll, { passive: true });
    imagesContainer.addEventListener("scroll", onImagesScroll, {
      passive: true,
    });

    // namesContainer.addEventListener("wheel", onNamesWheel, { passive: false });
    imagesContainer.addEventListener("wheel", onImagesWheel, {
      passive: false,
    });

    // namesContainer.addEventListener("touchmove", onTouchMovePrevent, {
    //   passive: false,
    // });
    imagesContainer.addEventListener("touchmove", onTouchMovePrevent, {
      passive: false,
    });

    // initial visuals
    applyVisuals();

    return () => {
      // namesContainer.removeEventListener("scroll", onNamesScroll);
      imagesContainer.removeEventListener("scroll", onImagesScroll);
      // namesContainer.removeEventListener("wheel", onNamesWheel);
      imagesContainer.removeEventListener("wheel", onImagesWheel);
      // namesContainer.removeEventListener("touchmove", onTouchMovePrevent);
      imagesContainer.removeEventListener("touchmove", onTouchMovePrevent);
      if (raf) cancelAnimationFrame(raf);
      window.clearTimeout(programmaticTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // arrow controls for names list, arrows placed top and bottom
  // const goPrev = () => {
  //   setActiveIndex((i) => Math.max(0, i - 1));
  // };
  // const goNext = () => {
  //   setActiveIndex((i) => Math.min(certs.length - 1, i + 1));
  // };

  return (
    <section id="certs" className="flex flex-col gap-10 justify-center">
      <h2 className="h22 text-secondary text-2xl md:text-[40px] font-[600]">
        My Certifications
      </h2>

      <div className="min-h-[420px] flex flex-col sm:flex-row items-center gap-6">
        {/* LEFT - names with top and bottom arrows */}
        <div className=" flex flex-col items-start gap-3 ">
          <div className="flex flex-col items-center w-full">
            <div
              className="w-full overflow-y-auto py-4 no-scrollbar  "
              style={{
                paddingTop: "12px",
                paddingBottom: "12px",
                width: "100%",
              }}
            >
              <div className="flex max-sm:flex-rowW  flex-col items-start gap-2 2xl:gap-4 px-3">
                {certs.map((cert, idx) => (
                  <div
                    key={cert.name}
                    className={`cursor-pointer select-none text-[13px] 2xl:text-sm ${
                      idx === activeIndex
                        ? "text-highlight font-semibold"
                        : "text-x font-medium"
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }}
                    style={{
                      transformOrigin: "left center",
                      transition:
                        "transform 200ms linear, opacity 200ms linear, color 200ms linear, fontSize 200ms linear",
                      padding: "6px 8px",
                      borderRadius: 6,
                      color:
                        idx === activeIndex
                          ? "var(--highlight-color, #b7ff4a)"
                          : "rgba(255,255,255,0.75)",
                      opacity: idx === activeIndex ? 1 : 0.8,
                    }}
                  >
                    {cert.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT - images */}
        <div className="flex-1 w-full">
          <div className="relative">
            <div
              ref={imagesContainerRef}
              className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar gap-1 sm:gap-3 py-6 sm:px-3"
              style={{
                display: "flex",
                // gap: 12,
                // padding: "24px 12px",
                scrollSnapType: "x mandatory",
                alignItems: "center",
                // disable native visible scrollbar
                WebkitOverflowScrolling: "touch",
              }}
            >
              {certs.map((cert, idx) => (
                <div
                  key={cert.name}
                  ref={(el) => (imageRefs.current[idx] = el)}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(idx);
                  }}
                  className="snap-center flex-shrink-0 rounded-xl overflow-hidden"
                  style={{
                    flex: "0 0 62%",
                    minWidth: "62%",
                    height: 320,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      "linear-gradient(180deg, #111 0%, #0b0b0b 100%)",
                    borderRadius: 12,
                    boxShadow:
                      idx === activeIndex
                        ? "0 8px 30px rgba(0,0,0,0.6)"
                        : "0 4px 12px rgba(0,0,0,0.4)",
                    transition:
                      "transform 220ms linear, opacity 220ms linear, box-shadow 220ms linear",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={cert.imageLink}
                    draggable={false}
                    className=" select-none w-full h-full object-cover block"
                    alt={cert.name}
                    style={{
                      transformOrigin: "center center",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* left image arrow */}
            <div
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex((i) => Math.max(0, i - 1));
                }}
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"
                aria-label="prev image"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path
                    d="M15 18l-6-6 6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* right image arrow */}
            <div
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex((i) => Math.min(certs.length - 1, i + 1));
                }}
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"
                aria-label="next image"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path
                    d="M9 18l6-6-6-6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certifications;


//  <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 goNext();
//               }}
//               aria-label="next"
//               className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 mt-2"
//               title="next"
//               style={{ alignSelf: "flex-start" }}
//             >
//               {/* down arrow */}
//               <svg
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="white"
//                 strokeWidth="2"
//               >
//                 <path
//                   d="M12 5v14"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//                 <path
//                   d="M19 12l-7 7-7-7"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </button>