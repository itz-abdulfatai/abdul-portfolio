// @ts-check
import { useEffect, useRef, useState } from "react";

/** @type {import('../../types').CertificationType[]} */
const baseCerts = [
  {
    name: "AWS Cloud Practitioner",
    imageLink: "https://picsum.photos/800/600?random=1",
    certLink: "https://example.com/certs/aws-cloud-practitioner",
    dateIssued: new Date("2024-01-15"),
    expiryDate: new Date("2027-01-15"),
    issuingOrganization: "Amazon Web Services",
    description: "Entry level cloud certification covering core AWS services",
  },
  {
    name: "Meta Frontend Developer",
    imageLink: "https://picsum.photos/800/600?random=2",
    certLink: "https://example.com/certs/meta-frontend",
    dateIssued: new Date("2023-11-10"),
    issuingOrganization: "Meta",
    description: "Covers modern frontend development with React and JavaScript",
  },
  {
    name: "Google UX Design",
    imageLink: "https://picsum.photos/800/600?random=3",
    certLink: "https://example.com/certs/google-ux",
    dateIssued: new Date("2024-03-05"),
    expiryDate: new Date("2026-03-05"),
    issuingOrganization: "Google",
    description: "User experience fundamentals and design thinking principles",
  },
  {
    name: "Microsoft Azure Fundamentals",
    imageLink: "https://picsum.photos/800/600?random=4",
    certLink: "https://example.com/certs/azure-fundamentals",
    dateIssued: new Date("2024-05-20"),
    issuingOrganization: "Microsoft",
    description: "Covers Azure core services, security, and cloud concepts",
  },
  {
    name: "Stripe Payments Specialist",
    imageLink: "https://picsum.photos/800/600?random=5",
    certLink: "https://example.com/certs/stripe-payments",
    dateIssued: new Date("2023-08-01"),
    expiryDate: new Date("2025-08-01"),
    issuingOrganization: "Stripe",
    description: "Training on integrating and managing online payments",
  },
];

function Certifications() {
  const [certs] = useState(baseCerts); // original array
  const n = certs.length;

  // build extended array: left copy, middle copy, right copy
  const extendedCerts = [...certs, ...certs, ...certs]; // length 3n

  // activeIndex remains within original 0..n-1
  const [activeIndex, setActiveIndex] = useState(0);

  // refs for containers and items (extended)
  const namesContainerRef = useRef(null);
  const imagesContainerRef = useRef(null);
  const nameRefs = useRef([]); // length 3n
  const imageRefs = useRef([]); // length 3n

  // programmatic scroll guard
  const programmaticScrollRef = useRef(false);
  const programmaticTimeoutRef = useRef(0);

  // visual constants
  const MAX_NAME_SCALE = 1.18;
  const MIN_NAME_SCALE = 0.85;
  const MAX_NAME_OPACITY = 1;
  const MIN_NAME_OPACITY = 0.45;

  const MAX_IMG_SCALE = 1;
  const MIN_IMG_SCALE = 0.8;
  const MAX_IMG_OPACITY = 1;
  const MIN_IMG_OPACITY = 0.5;

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // convert extended index -> original index
  const extToOriginal = (extIdx) => ((extIdx % n) + n) % n;

  // center an element in its container along an axis, smooth param true => smooth scroll
  const centerElement = (container, el, axis = "x", smooth = true) => {
    if (!container || !el) return;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    if (axis === "x") {
      // compute new scrollLeft so element is centered horizontally
      const offsetLeft = el.offsetLeft; // relative to container's content box
      const desired = offsetLeft - (container.clientWidth - el.offsetWidth) / 2;
      if (smooth) {
        programmaticScrollRef.current = true;
        container.scrollTo({ left: desired, behavior: "smooth" });
        window.clearTimeout(programmaticTimeoutRef.current);
        programmaticTimeoutRef.current = window.setTimeout(() => {
          programmaticScrollRef.current = false;
        }, 420);
      } else {
        // instant reposition used for snapping to middle copy
        programmaticScrollRef.current = true;
        container.scrollLeft = desired;
        window.clearTimeout(programmaticTimeoutRef.current);
        programmaticTimeoutRef.current = window.setTimeout(() => {
          programmaticScrollRef.current = false;
        }, 50);
      }
    } else {
      const offsetTop = el.offsetTop;
      const desired =
        offsetTop - (container.clientHeight - el.offsetHeight) / 2;
      if (smooth) {
        programmaticScrollRef.current = true;
        container.scrollTo({ top: desired, behavior: "smooth" });
        window.clearTimeout(programmaticTimeoutRef.current);
        programmaticTimeoutRef.current = window.setTimeout(() => {
          programmaticScrollRef.current = false;
        }, 420);
      } else {
        programmaticScrollRef.current = true;
        container.scrollTop = desired;
        window.clearTimeout(programmaticTimeoutRef.current);
        programmaticTimeoutRef.current = window.setTimeout(() => {
          programmaticScrollRef.current = false;
        }, 50);
      }
    }
  };

  // compute which extended index is closest to center of container
  const computeClosestExtIndex = (container, refsArray, axis = "y") => {
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

  // visual effects (names vertical, images horizontal)
  const applyVisuals = () => {
    const namesContainer = namesContainerRef.current;
    const imagesContainer = imagesContainerRef.current;
    if (namesContainer) {
      const cRect = namesContainer.getBoundingClientRect();
      const cCenterY = cRect.top + cRect.height / 2;
      nameRefs.current.forEach((el) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const itemCenter = r.top + r.height / 2;
        const distance = clamp(
          Math.abs(itemCenter - cCenterY) / (cRect.height / 2),
          0,
          1
        );
        const t = 1 - distance;
        const scale = MIN_NAME_SCALE + (MAX_NAME_SCALE - MIN_NAME_SCALE) * t;
        const opacity =
          MIN_NAME_OPACITY + (MAX_NAME_OPACITY - MIN_NAME_OPACITY) * t;
        el.style.transform = `translateX(${(1 - t) * 8}px) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.transition =
          "transform 150ms linear, opacity 150ms linear, color 150ms linear";
        el.style.color =
          t > 0.72
            ? "var(--highlight-color, #b7ff4a)"
            : `rgba(255,255,255,${0.65 + 0.35 * t})`;
        el.style.fontWeight = t > 0.72 ? "700" : "500";
      });
    }

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

  // reposition to middle copy if user scrolls into edges (creates infinite loop)
  const maybeRecenterIfEdge = (container, refsArray, extIndex, axis = "x") => {
    // if extIndex is within first copy (0..n-1) or last copy (2n .. 3n-1) then snap to middle copy
    if (extIndex < n || extIndex >= n * 2) {
      const targetExt = (extIndex % n) + n; // mapped into middle copy
      const targetEl = refsArray[targetExt];
      if (targetEl) {
        // instant reposition to middle copy (no smooth) to avoid visual stutter
        centerElement(container, targetEl, axis, false);
        // after reposition, visuals updated by scroll handlers; also ensure activeIndex maps correctly
        return targetExt;
      }
    }
    return extIndex;
  };

  // whenever activeIndex changes, center both containers to the middle copy item
  useEffect(() => {
    const namesContainer = namesContainerRef.current;
    const imagesContainer = imagesContainerRef.current;
    if (!namesContainer || !imagesContainer) return;
    const targetNameExt = activeIndex + n; // middle copy
    const targetImgExt = activeIndex + n;
    const targetNameEl = nameRefs.current[targetNameExt];
    const targetImgEl = imageRefs.current[targetImgExt];
    if (targetNameEl) centerElement(namesContainer, targetNameEl, "y", true);
    if (targetImgEl) centerElement(imagesContainer, targetImgEl, "x", true);
    applyVisuals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // set initial scroll to middle copy on mount
  useEffect(() => {
    const namesContainer = namesContainerRef.current;
    const imagesContainer = imagesContainerRef.current;
    if (!namesContainer || !imagesContainer) return;
    // small timeout to ensure DOM sizes are ready
    setTimeout(() => {
      const startExt = activeIndex + n;
      const startNameEl = nameRefs.current[startExt];
      const startImgEl = imageRefs.current[startExt];
      if (startNameEl) centerElement(namesContainer, startNameEl, "y", false);
      if (startImgEl) centerElement(imagesContainer, startImgEl, "x", false);
      applyVisuals();
    }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // scroll handlers for both containers
  useEffect(() => {
    const namesContainer = namesContainerRef.current;
    const imagesContainer = imagesContainerRef.current;
    if (!namesContainer || !imagesContainer) return;

    let rafId = 0;

    const onNamesScroll = () => {
      if (programmaticScrollRef.current) {
        applyVisuals();
        return;
      }
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        let extIndex = computeClosestExtIndex(
          namesContainer,
          nameRefs.current,
          "y"
        );
        // if edge, recenter instantly to middle copy
        const recentered = maybeRecenterIfEdge(
          namesContainer,
          nameRefs.current,
          extIndex,
          "y"
        );
        if (recentered !== extIndex) {
          // update extIndex to the recentered one for active mapping
          extIndex = recentered;
        }
        const original = extToOriginal(extIndex);
        if (original !== activeIndex) setActiveIndex(original);
        applyVisuals();
      });
    };

    const onImagesScroll = () => {
      if (programmaticScrollRef.current) {
        applyVisuals();
        return;
      }
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        let extIndex = computeClosestExtIndex(
          imagesContainer,
          imageRefs.current,
          "x"
        );
        const recentered = maybeRecenterIfEdge(
          imagesContainer,
          imageRefs.current,
          extIndex,
          "x"
        );
        if (recentered !== extIndex) {
          extIndex = recentered;
        }
        const original = extToOriginal(extIndex);
        if (original !== activeIndex) setActiveIndex(original);
        applyVisuals();
      });
    };

    // wheel handlers to avoid page scroll; vertical wheel on images should translate to horizontal
    const onNamesWheel = (e) => {
      e.preventDefault();
      namesContainer.scrollTop += e.deltaY;
    };
    const onImagesWheel = (e) => {
      e.preventDefault();
      imagesContainer.scrollLeft += e.deltaY;
    };

    // touchmove prevent to stop overscroll
    const onTouchMovePrevent = (e) => {
      e.stopPropagation();
    };

    namesContainer.addEventListener("scroll", onNamesScroll, { passive: true });
    imagesContainer.addEventListener("scroll", onImagesScroll, {
      passive: true,
    });

    namesContainer.addEventListener("wheel", onNamesWheel, { passive: false });
    imagesContainer.addEventListener("wheel", onImagesWheel, {
      passive: false,
    });

    namesContainer.addEventListener("touchmove", onTouchMovePrevent, {
      passive: false,
    });
    imagesContainer.addEventListener("touchmove", onTouchMovePrevent, {
      passive: false,
    });

    // cleanup
    return () => {
      namesContainer.removeEventListener("scroll", onNamesScroll);
      imagesContainer.removeEventListener("scroll", onImagesScroll);

      namesContainer.removeEventListener("wheel", onNamesWheel);
      imagesContainer.removeEventListener("wheel", onImagesWheel);

      namesContainer.removeEventListener("touchmove", onTouchMovePrevent);
      imagesContainer.removeEventListener("touchmove", onTouchMovePrevent);

      if (rafId) cancelAnimationFrame(rafId);
      window.clearTimeout(programmaticTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  // controls - increment original index and center to middle copy
  const goPrev = () => {
    setActiveIndex((i) => {
      const next = (i - 1 + n) % n;
      return next;
    });
  };
  const goNext = () => {
    setActiveIndex((i) => (i + 1) % n);
  };

  // click handler for items: when user clicks an item in any copy, map to original and center
  const onClickExtItem = (extIdx) => {
    const orig = extToOriginal(extIdx);
    setActiveIndex(orig);
  };

  return (
    <section id="certs" className="flex flex-col gap-10 justify-center">
      <h2 className="h22 text-secondary text-2xl md:text-[40px] font-[600]">
        My Certifications
      </h2>

      <div className="min-h-[420px] flex flex-col sm:flex-row items-center gap-6">
        {/* LEFT - names with top and bottom arrows */}
        <div className="flex-1 max-w-[420px] w-full flex flex-col items-start gap-3">
          <div className="flex flex-col items-center w-full">
            <button
              onClick={(e) => {
                e.preventDefault();
                goPrev();
              }}
              aria-label="previous"
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 mb-2"
              title="previous"
              style={{ alignSelf: "flex-start" }}
            >
              {/* up arrow */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path
                  d="M12 19V5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 12l7-7 7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <div
              ref={namesContainerRef}
              className="w-full overflow-y-auto py-2 no-scrollbar"
              style={{
                maxHeight: "320px",
                paddingTop: "8px",
                paddingBottom: "8px",
                width: "100%",
                scrollSnapType: "y mandatory",
              }}
            >
              <div className="flex flex-col items-start gap-4 px-3">
                {extendedCerts.map((cert, extIdx) => {
                  // compute visual mapping to active state based on original activeIndex
                  const isActiveOriginal =
                    extToOriginal(extIdx) === activeIndex;
                  return (
                    <div
                      key={`${cert.name}-name-${extIdx}`}
                      ref={(el) => (nameRefs.current[extIdx] = el)}
                      className="cursor-pointer select-none snap-center"
                      onClick={(e) => {
                        e.preventDefault();
                        onClickExtItem(extIdx);
                      }}
                      style={{
                        transformOrigin: "left center",
                        transition:
                          "transform 200ms linear, opacity 200ms linear, color 200ms linear",
                        padding: "6px 8px",
                        borderRadius: 6,
                        fontSize: 16,
                        color: isActiveOriginal
                          ? "var(--highlight-color, #b7ff4a)"
                          : "rgba(255,255,255,0.8)",
                        opacity: isActiveOriginal ? 1 : 0.85,
                      }}
                    >
                      {cert.name}
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                goNext();
              }}
              aria-label="next"
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 mt-2"
              title="next"
              style={{ alignSelf: "flex-start" }}
            >
              {/* down arrow */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
              >
                <path
                  d="M12 5v14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 12l-7 7-7-7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* RIGHT - images */}
        <div className="flex-1 w-full">
          <div className="relative">
            <div
              ref={imagesContainerRef}
              className="w-full overflow-x-auto snap-x snap-mandatory no-scrollbar"
              style={{
                display: "flex",
                gap: 12,
                padding: "24px 12px",
                scrollSnapType: "x mandatory",
                alignItems: "center",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {extendedCerts.map((cert, extIdx) => {
                const isActiveOriginal = extToOriginal(extIdx) === activeIndex;
                return (
                  <div
                    key={`${cert.name}-img-${extIdx}`}
                    ref={(el) => (imageRefs.current[extIdx] = el)}
                    onClick={(e) => {
                      e.preventDefault();
                      onClickExtItem(extIdx);
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
                      boxShadow: isActiveOriginal
                        ? "0 8px 30px rgba(0,0,0,0.6)"
                        : "0 4px 12px rgba(0,0,0,0.4)",
                      transition:
                        "transform 220ms linear, opacity 220ms linear, box-shadow 220ms linear",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={cert.imageLink}
                      alt={cert.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transformOrigin: "center center",
                      }}
                    />
                  </div>
                );
              })}
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
                  goPrev();
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
                  goNext();
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

      {/* hide scrollbar across browsers */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* ensure snap targets for names behave */
        .snap-center {
          scroll-snap-align: center;
        }
      `}</style>
    </section>
  );
}

export default Certifications;
