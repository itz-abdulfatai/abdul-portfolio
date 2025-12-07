// @ts-check
import { useEffect, useRef, useState } from "react";

/** @type {import('../../types').CertificationType[]} */
const dummyCertifications = [
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
  const [certs] = useState(dummyCertifications);
  const [activeIndex, setActiveIndex] = useState(0);

  const namesContainerRef = useRef(/** @type {HTMLDivElement|null} */ (null));
  const imagesContainerRef = useRef(/** @type {HTMLDivElement|null} */ (null));
  const nameRefs = useRef([]);
  const imageRefs = useRef([]);

  // constants to tweak visuals
  const MAX_NAME_SCALE = 1.15;
  const MIN_NAME_SCALE = 0.85;
  const MAX_NAME_OPACITY = 1;
  const MIN_NAME_OPACITY = 0.45;

  const MAX_IMG_SCALE = 1;
  const MIN_IMG_SCALE = 0.8;
  const MAX_IMG_OPACITY = 1;
  const MIN_IMG_OPACITY = 0.5;

  // scroll active item into view (center) for a container
  const scrollItemToCenter = (container, el) => {
    if (!container || !el) return;
    el.scrollIntoView({
      behavior: "smooth",
      block: container === namesContainerRef.current ? "center" : undefined,
      inline: container === imagesContainerRef.current ? "center" : undefined,
    });
  };

  // When activeIndex changes (from arrows or clicks), scroll both lists to center
  useEffect(() => {
    const targetName = nameRefs.current[activeIndex];
    const targetImg = imageRefs.current[activeIndex];
    scrollItemToCenter(namesContainerRef.current, targetName);
    scrollItemToCenter(imagesContainerRef.current, targetImg);
  }, [activeIndex]);

  // compute active index based on proximity to center for a container
  const computeClosestIndex = (container, refsArray) => {
    if (!container) return 0;
    const containerRect = container.getBoundingClientRect();
    const centerY = containerRect.top + containerRect.height / 2;
    const centerX = containerRect.left + containerRect.width / 2;

    let bestIndex = 0;
    let bestDistance = Infinity;
    refsArray.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      // choose vertical distance if container scrolls vertically else horizontal
      const dist = Math.hypot(
        container === namesContainerRef.current
          ? 0
          : r.left + r.width / 2 - centerX,
        container === namesContainerRef.current
          ? r.top + r.height / 2 - centerY
          : 0
      );
      if (dist < bestDistance) {
        bestDistance = dist;
        bestIndex = i;
      }
    });
    return bestIndex;
  };

  // update styles on scroll (names)
  useEffect(() => {
    const namesContainer = namesContainerRef.current;
    const imagesContainer = imagesContainerRef.current;
    if (!namesContainer || !imagesContainer) return;

    let rafId = 0;

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // update active based on which item is closest to center
        const newActiveFromNames = computeClosestIndex(
          namesContainer,
          nameRefs.current
        );
        const newActiveFromImages = computeClosestIndex(
          imagesContainer,
          imageRefs.current
        );
        // prefer whichever is closer to center at the moment (names scroll or images scroll)
        // we'll set active to names' computed index if names were scrolled; but both listeners call this
        // set to average logic: if image scroll is happening it will set accordingly
        // for simplicity: set to one detected by the element that triggered the event
        // but we don't know which triggered; set to the one with smallest rect distance
        // compute distances
        const nameRect =
          nameRefs.current[newActiveFromNames]?.getBoundingClientRect();
        const imgRect =
          imageRefs.current[newActiveFromImages]?.getBoundingClientRect();

        const namesCenter =
          namesContainer.getBoundingClientRect().top +
          namesContainer.getBoundingClientRect().height / 2;
        const imagesCenter =
          imagesContainer.getBoundingClientRect().left +
          imagesContainer.getBoundingClientRect().width / 2;

        const nameDist = nameRect
          ? Math.abs(nameRect.top + nameRect.height / 2 - namesCenter)
          : Number.POSITIVE_INFINITY;
        const imgDist = imgRect
          ? Math.abs(imgRect.left + imgRect.width / 2 - imagesCenter)
          : Number.POSITIVE_INFINITY;

        const newActive =
          nameDist <= imgDist ? newActiveFromNames : newActiveFromImages;
        setActiveIndex((prev) => (prev === newActive ? prev : newActive));

        // apply distance-based visual updates for names
        const cRect = namesContainer.getBoundingClientRect();
        const cCenterY = cRect.top + cRect.height / 2;
        nameRefs.current.forEach((el) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const itemCenter = r.top + r.height / 2;
          const distance = Math.min(
            1,
            Math.abs(itemCenter - cCenterY) / (cRect.height / 2)
          ); // 0..1
          const t = 1 - distance; // 1 when center, 0 when far
          const scale = MIN_NAME_SCALE + (MAX_NAME_SCALE - MIN_NAME_SCALE) * t;
          const opacity =
            MIN_NAME_OPACITY + (MAX_NAME_OPACITY - MIN_NAME_OPACITY) * t;
          // color interpolation: use CSS variable to let tailwind handle actual color classes; we'll set color via rgba
          el.style.transform = `scale(${scale})`;
          el.style.opacity = `${opacity}`;
          el.style.transition =
            "transform 150ms linear, opacity 150ms linear, color 150ms linear";
          // slightly nudge x so center stands out
          const translateX = `${(1 - t) * 6}px`;
          el.style.transform = `translateX(${translateX}) scale(${scale})`;
          // font weight/color: if nearly center, use highlight color
          el.style.color =
            t > 0.7
              ? "var(--highlight-color, #b7ff4a)"
              : "rgba(255,255,255," + (0.65 + 0.35 * t) + ")";
        });

        // apply distance based updates for images (horizontal)
        const iRect = imagesContainer.getBoundingClientRect();
        const iCenterX = iRect.left + iRect.width / 2;
        imageRefs.current.forEach((el) => {
          if (!el) return;
          const r = el.getBoundingClientRect();
          const itemCenterX = r.left + r.width / 2;
          const distance = Math.min(
            1,
            Math.abs(itemCenterX - iCenterX) / (iRect.width / 2)
          ); // 0..1
          const t = 1 - distance;
          const scale = MIN_IMG_SCALE + (MAX_IMG_SCALE - MIN_IMG_SCALE) * t;
          const opacity =
            MIN_IMG_OPACITY + (MAX_IMG_OPACITY - MIN_IMG_OPACITY) * t;
          el.style.transform = `scale(${scale})`;
          el.style.opacity = `${opacity}`;
          el.style.transition = "transform 150ms linear, opacity 150ms linear";
        });
      });
    };

    // attach listeners (both containers)
    namesContainer.addEventListener("scroll", onScroll, { passive: true });
    imagesContainer.addEventListener("scroll", onScroll, { passive: true });

    // initial run to set styles
    onScroll();

    return () => {
      namesContainer.removeEventListener("scroll", onScroll);
      imagesContainer.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // helper for arrow controls
  const goPrev = () => {
    setActiveIndex((i) => Math.max(0, i - 1));
  };
  const goNext = () => {
    setActiveIndex((i) => Math.min(certs.length - 1, i + 1));
  };

  return (
    <section id="certs" className="flex flex-col gap-10 justify-center">
      <h2 className="h22 text-secondary text-2xl md:text-[40px] font-[600]">
        My Certifications
      </h2>

      <div className="min-h-[420px] flex flex-col sm:flex-row items-center gap-6">
        {/* LEFT - names */}
        <div className="flex-1 max-w-[420px] w-full flex flex-col items-start gap-3">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={goPrev}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"
              aria-label="previous"
            >
              {/* simple up arrow */}
              <svg
                width="16"
                height="16"
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
            <button
              onClick={goNext}
              className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"
              aria-label="next"
            >
              {/* down arrow */}
              <svg
                width="16"
                height="16"
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
            <div className="text-sm text-gray-400 ml-2">
              scroll names or use arrows
            </div>
          </div>

          <div
            ref={namesContainerRef}
            className="w-full overflow-y-auto py-4"
            style={{
              maxHeight: "320px",
              // show some breathing room to better center items
              paddingTop: "24px",
              paddingBottom: "24px",
            }}
          >
            <div className="flex flex-col items-start gap-4 px-3">
              {certs.map((cert, idx) => (
                <div
                  key={cert.name}
                  ref={(el) => (nameRefs.current[idx] = el)}
                  className="cursor-pointer select-none"
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    // baseline styles; dynamic styles are applied by scroll listener
                    transformOrigin: "left center",
                    transition:
                      "transform 200ms linear, opacity 200ms linear, color 200ms linear",
                    padding: "6px 8px",
                    borderRadius: 6,
                    fontSize: 16,
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

        {/* RIGHT - images */}
        <div className="flex-1 w-full">
          <div className="relative">
            <div
              ref={imagesContainerRef}
              className="w-full overflow-x-auto snap-x snap-mandatory"
              style={{
                display: "flex",
                gap: 12,
                padding: "24px 12px",
                scrollSnapType: "x mandatory",
                alignItems: "center",
                // hide scrollbar but keep scroll
                scrollbarWidth: "thin",
              }}
            >
              {certs.map((cert, idx) => (
                <div
                  key={cert.name}
                  ref={(el) => (imageRefs.current[idx] = el)}
                  onClick={() => setActiveIndex(idx)}
                  className="snap-center flex-shrink-0 rounded-xl overflow-hidden"
                  style={{
                    // width less than full to show partial next / prev
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
                    alt={cert.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transformOrigin: "center center",
                      // transform/opacity manipulated by scroll listener
                    }}
                  />
                </div>
              ))}
            </div>
            {/* optional overlay arrows for images */}
            <div
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <button
                onClick={() => {
                  setActiveIndex((i) => Math.max(0, i - 1));
                }}
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"
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
            <div
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <button
                onClick={() => {
                  setActiveIndex((i) => Math.min(certs.length - 1, i + 1));
                }}
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700"
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
