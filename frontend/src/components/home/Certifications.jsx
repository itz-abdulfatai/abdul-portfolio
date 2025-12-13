// @ts-checkk
import { useEffect, useRef, useState } from "react";
import CertModal from "./CertModal";

/** @type {import('../../types').CertificationType[]} */
const dummyCertifications = [
  {
    name: "AWS Cloud Practitioner",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/aws-cloud-practitioner",
    dateIssued: new Date("2024-01-15"),
    expiryDate: new Date("2027-01-15"),
    issuingOrganization: "Amazon Web Services",
    description:
      "Entry level cloud certification covering core AWS services.\nThis program introduces foundational cloud concepts such as elasticity, scalability, fault tolerance, and cost optimization.\nYou also gain exposure to IAM roles and policies, global infrastructure, storage options, networking basics, shared responsibility model, and billing tools.\nThe exam is designed for beginners and helps prepare individuals transitioning into cloud engineering, DevOps, or security roles.\nIt provides a broad but meaningful understanding of how modern cloud environments work at a practical level.\nIdeal as a starting point before progressing into more specialized certifications or hands-on cloud projects.",
  },
  {
    name: "Meta Frontend Developer",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/meta-frontend",
    dateIssued: new Date("2023-11-10"),
    issuingOrganization: "Meta",
    description:
      "Covers modern frontend development with React and JavaScript.\nThe program emphasizes practical problem solving through interactive coding exercises, real-world UI challenges, and iterative code improvement.\nStudents learn component architecture, prop drilling vs state lifting, responsive design systems, async data flows, modular CSS, and rendering optimization.\nThe curriculum blends theory with hands-on projects that replicate real production workflows.\nGreat for developers who want to strengthen their UI engineering foundation and build polished, scalable React applications.",
  },
  {
    name: "Google UX Design",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/google-ux",
    dateIssued: new Date("2024-03-05"),
    expiryDate: new Date("2026-03-05"),
    issuingOrganization: "Google",
    description:
      "User experience fundamentals and design thinking principles.\nThis certificate guides learners from early-stage research to final high-fidelity prototypes.\nTopics include persona creation, journey mapping, accessibility guidelines, low-fidelity wireframing, user testing, iterative design, heuristic evaluation, and responsive design strategies.\nThe program encourages building thoughtful user-first products with clarity, consistency, and empathy.\nCompleting it helps designers communicate decisions effectively, collaborate with product teams, and refine solutions based on validated user insights.\nGreat for product designers, UI designers, and full-stack developers wanting to understand UX deeply.",
  },
  {
    name: "Microsoft Azure Fundamentals",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/azure-fundamentals",
    dateIssued: new Date("2024-05-20"),
    issuingOrganization: "Microsoft",
    description:
      "Covers Azure core services, security, and cloud concepts.\nLearners explore compute services such as VMs, serverless functions, containers, and App Services.\nIt also dives into identity management through Azure AD, governance controls through management groups and policy, and monitoring tools like Azure Monitor.\nThe course provides a strong introduction to cloud security, networking basics, hybrid solutions, and cost management.\nPerfect foundation for enterprise IT roles and cloud path beginners.",
  },
  {
    name: "Stripe Payments Specialist",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/stripe-payments",
    dateIssued: new Date("2023-08-01"),
    expiryDate: new Date("2025-08-01"),
    issuingOrganization: "Stripe",
    description:
      "Training on integrating and managing online payments.\nThe course includes in-depth coverage of checkout flows, subscription billing, customer portals, invoicing systems, fraud detection tools, and webhook-driven automation.\nLearners gain familiarity with secure API usage, PCI compliance requirements, webhook signing, dispute handling, and multi-currency workflows.\nThis certification suits developers building ecommerce applications, SaaS billing engines, or any product requiring reliable financial transactions at scale.",
  },
  {
    name: "AWS Cloud Practitioner",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/aws-cloud-practitioner",
    dateIssued: new Date("2024-01-15"),
    expiryDate: new Date("2027-01-15"),
    issuingOrganization: "Amazon Web Services",
    description:
      "Entry level cloud certification covering core AWS services.\nThis curriculum includes detailed learning paths involving compute engines, scaling strategies, networking layers, edge locations, and encryption fundamentals.\nIt prepares learners to communicate cloud concepts confidently and collaborate effectively with engineering teams.\nThe exam emphasizes conceptual clarity rather than deep architecture, making it accessible to newcomers but still valuable for professionals.",
  },
  {
    name: "Meta Frontend Developer",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/meta-frontend",
    dateIssued: new Date("2023-11-10"),
    issuingOrganization: "Meta",
    description:
      "Covers modern frontend development with React and JavaScript.\nThis includes advanced rendering patterns, component composition, DOM reconciliation logic, virtual DOM diffing, event delegation, and debugging performance bottlenecks.\nThe hands-on projects simulate workplace tasks involving real UI architecture decisions.\nAn excellent track for developers leveling up their frontend engineering expertise.",
  },
  {
    name: "Google UX Design",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/google-ux",
    dateIssued: new Date("2024-03-05"),
    expiryDate: new Date("2026-03-05"),
    issuingOrganization: "Google",
    description:
      "User experience fundamentals and design thinking principles.\nLearners explore visual hierarchy, typography choices, color psychology, grid systems, and how these influence user perception.\nThe coursework encourages structured thought by merging user research with creative prototyping.\nBy the end, students can design informed solutions backed by real user insights and test outcomes.",
  },
  {
    name: "Microsoft Azure Fundamentals",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/azure-fundamentals",
    dateIssued: new Date("2024-05-20"),
    issuingOrganization: "Microsoft",
    description:
      "Covers Azure core services, security, and cloud concepts.\nThe curriculum walks learners through container orchestration, virtual networks, hybrid identity, encryption models, and cost governance.\nThis certification acts as a stepping stone into more advanced Azure paths like Solutions Architect or DevOps Engineer.",
  },
  {
    name: "Stripe Payments Specialist",
    imageLink: "/placeholder-cert1.png",
    certLink: "https://example.com/certs/stripe-payments",
    dateIssued: new Date("2023-08-01"),
    expiryDate: new Date("2025-08-01"),
    issuingOrganization: "Stripe",
    description:
      "Training on integrating and managing online payments.\nDevelopers gain real-world understanding of secure token handling, fraud scoring, identity verification, bank payouts, and cross-border payment flows.\nThis certification is practical and heavily API-driven, giving you tools to implement payment logic with confidence.",
  },
];

function Certifications() {
  const [certs] = useState(dummyCertifications);
  const [activeIndex, setActiveIndex] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const [itemPct, setItemPct] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 640 ? 0.8 : 0.62
  );

  // auto rotate timer
  // const autoRotateIntervalRef = useRef(null);

  // function autorotateActiveIndex() {
  //   setActiveIndex((i) => (i + 1) % certs.length);
  // }

  // const isMobileScreen = () =>
  //   typeof window !== "undefined" && window.innerWidth < 640;

  // const startAutoRotate = () => {
  //   if (isMobileScreen()) return; // disable on mobile
  //   if (autoRotateIntervalRef.current) return; // already running
  //   autoRotateIntervalRef.current = window.setInterval(
  //     autorotateActiveIndex,
  //     5000
  //   );
  // };

  // const pauseAutoRotate = () => {
  //   if (autoRotateIntervalRef.current) {
  //     window.clearInterval(autoRotateIntervalRef.current);
  //     autoRotateIntervalRef.current = null;
  //   }
  // };

  // useEffect(() => {
  //   startAutoRotate();

  //   // Pause when page loses focus, resume when it regains focus
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       pauseAutoRotate();
  //     } else {
  //       startAutoRotate();
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     pauseAutoRotate();
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [certs.length]);

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
  }, [activeIndex, itemPct]);

  // arrow controls for names list, arrows placed top and bottom
  // const goPrev = () => {
  //   setActiveIndex((i) => Math.max(0, i - 1));
  // };
  // const goNext = () => {
  //   setActiveIndex((i) => Math.min(certs.length - 1, i + 1));
  // };

  // responsive resize: update itemPct, re-run visuals and re-center
  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeout = 0;
    const handleResize = () => {
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        const isSmall = window.innerWidth < 640;
        const newPct = isSmall ? 0.8 : 0.62;
        setItemPct((prev) => {
          if (Math.abs(prev - newPct) < 0.001) return prev;
          return newPct;
        });

        // rerun visuals and re-center after layout updates
        requestAnimationFrame(() => {
          applyVisuals();
          const el = imageRefs.current[activeIndex];
          scrollItemToCenter(imagesContainerRef.current, el, "x");
        });
      }, 120);
    };

    // initial run + listen
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <>
      {showModal && (
        <CertModal
          cert={certs[activeIndex]}
          // onOpen={pauseAutoRotate}
          showModal={showModal}
          setShowModal={setShowModal}
          // onClose={startAutoRotate}
        />
      )}

      <section
        id="certs"
        className="flex flex-col gap-10 justify-center"
        // onMouseEnter={pauseAutoRotate}
        // onMouseLeave={startAutoRotate}
      >
        <h2 className="h22 text-secondary text-2xl md:text-[40px] font-[600]">
          My Certifications ({certs.length}) <br />
          <span className="text-xs font-normal">
            tap certification to view details
          </span>
        </h2>

        <div className="min-h-[420px] flex flex-col lg:flex-row items-center gap-6">
          {/* LEFT - names with top and bottom arrows */}
          <div className=" flex flex-col items-start gap-3 max-lg:hidden ">
            <div className="flex flex-col items-center w-full">
              <div className="w-full overflow-y-auto py-4 no-scrollbar pt-3 pb-3 ">
                <div className="flex  flex-col items-start gap-2 2xl:gap-4 px-3">
                  {certs.map((cert, idx) => (
                    <div
                      key={`${cert.name}-${idx}`}
                      className={`cursor-pointer select-none text-[13px] px-2 py-1.5 2xl:text-sm rounded-md ${
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
          {/* mobile single active name (non-scrollable) */}
          <div
            className="flex lg:hidden w-full overflow-hidden  justify-center items-center py-2 px-3"
            style={{
              touchAction: "none", // disable browser touch gestures on this element
            }}
          >
            <div
              // key={`${certs[activeIndex].name}-${activeIndex}`}
              className="w-full text-center select-none text-highlight whitespace-nowrap truncate overflow-hidden font-semibold"
              aria-hidden={false}
            >
              {certs[activeIndex].name}
            </div>
          </div>

          {/* RIGHT - images */}
          <div className="flex-1 w-full">
            <div className="relative">
              <div
                ref={imagesContainerRef}
                className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar gap-1 sm:gap-3 py-6 sm:px-3 flex items-center"
                style={{
                  scrollSnapType: "x mandatory",
                  // disable native visible scrollbar
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {certs.map((cert, idx) => (
                  <div
                    key={`${cert.name}-${idx}`}
                    ref={(el) => (imageRefs.current[idx] = el)}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveIndex(idx);
                    }}
                    className="snap-center flex-shrink-0 rounded-xl overflow-hidden h-[320px] flex items-center justify-center cursor-pointer relative group"
                    style={{
                      flex: `0 0 ${itemPct * 100}%`,
                      minWidth: `${itemPct * 100}%`,

                      background:
                        "linear-gradient(180deg, #111 0%, #0b0b0b 100%)",
                      boxShadow:
                        idx === activeIndex
                          ? "0 8px 30px rgba(0,0,0,0.6)"
                          : "0 4px 12px rgba(0,0,0,0.4)",
                      transition:
                        "transform 220ms linear, opacity 220ms linear, box-shadow 220ms linear",
                    }}
                  >
                    {/* overlay */}

                    {idx === activeIndex && (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          setShowModal(true);
                        }}
                        className={`group-hover:bg-blackb group-hover:bg-opacity-20  absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center transition-all duration-300 custom-cursor`}
                        role="button"
                        aria-label={`View ${cert.name} certification details`}
                        tabIndex={0}
                      ></div>
                    )}
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
              <div className=" absolute left-2 top-1/2 -translate-y-1/2">
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
              <div className=" absolute right-2 top-1/2 -translate-y-1/2">
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
    </>
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