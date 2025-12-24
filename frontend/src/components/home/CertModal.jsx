import { useState, useEffect } from "react";
import { getCertUrl } from "../../utils/helper";

function CertModal({
  cert,
  showModal,
  handleModalClose,
  onClose = () => {},
  onOpen = () => {},
}) {
  /** @type {import('../../types').CertificationType} */
  const certification = cert;

  const [showDescription, setShowDescription] = useState(false);
  const [shared, setShared] = useState(false);
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const copyUrlToClipboard = () => {
    if (!navigator.clipboard) {
      console.error("Clipboard API not available");
      return;
    }
    const url = `${window.location.origin}${
      window.location.pathname
    }${getCertUrl(certification.name)}`;
    navigator.clipboard.writeText(url).then(
      () => {
        setShared(true);

        setTimeout(() => {
          setShared(false);
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden"; // stop scrolling
      onOpen();
    } else {
      document.body.style.overflow = ""; // restore scrolling
      onClose();
    }

    return () => {
      document.body.style.overflow = ""; // cleanup
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const showDesc = () => {
    setShowDescription(true);
  };
  const hideDesc = () => {
    setShowDescription(false);
  };
  return (
    <>
      {certification && showModal && (
        <div
          className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-black/50 backdrop-blur-sm flex justify-center items-center padding-x animate-fadeIn"
          onClick={() => {
            // if (window.innerWidth >= 640)
            handleModalClose(certification);
          }}
        >
          <div
            className="w-full max-w-[500px] bg-primary  flex flex-col rounded-2xl max-h-[85vh] sm:max-h-[95vh] overflow-y-auto  animate-scaleIn relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full rounded-t-2xl overflow-hidden relative flex-none h-[260px] sm:h-96 ">
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center max-md:justify-end justify-between pointer-events-none">
                <a
                  href={certification.certLink}
                  title="open certificate link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto bg-secondary hover:bg-primary
               px-4 py-1.5 text-sm font-medium text-primary hover:text-secondary
               rounded-2xl transition-all duration-300 flex items-center gap-2
               border border-secondary group max-md:hidden"
                >
                  View Certificate
                  <i className="bx bx-right-top-arrow-circle group-hover:translate-x-1 transition-transform text-base"></i>
                </a>
                <div className="flex items-center gap-2">
                  <button
                    className="pointer-events-auto w-8 h-8 rounded-full bg-secondary hover:bg-primary
               flex items-center justify-center transition-colors duration-300 group active:opacity-50"
                    onClick={copyUrlToClipboard}
                    disabled={shared}
                    aria-label="copy cert link"
                    title="copy certificate link"
                  >
                    {shared ? (
                      <i className="bx bx-check text-primary group-hover:text-secondary transition-colors duration-300"></i>
                    ) : (
                      <i className="bx bx-copy text-primary group-hover:text-secondary transition-colors duration-300"></i>
                    )}
                  </button>
                  <button
                    title="close modal"
                    className="pointer-events-auto w-8 h-8 rounded-full bg-secondary hover:bg-primary
               flex items-center justify-center transition-colors duration-300 group"
                    onClick={() => handleModalClose(certification)}
                    aria-label="Close modal"
                  >
                    <i className="bx bx-x text-primary group-hover:text-secondary transition-colors duration-300"></i>
                  </button>
                </div>
              </div>

              <img
                src={certification.imageLink}
                alt={certification.name}
                className="w-full h-auto object-contain transition-transform duration-500 pointer-events-none select-none"
              />
            </div>

            <div className="p-6 flex flex-col gap-5 sm:gap-3 2xl:gap-5 flex-1 overflow-y-auto ">
              <div className="space-y-2">
                <h3 className="capitalize font-bold text-lg text-secondary leading-tight">
                  {certification.name}
                </h3>
                <p className="text-sm text-tertiary font-medium tracking-wide">
                  {certification.issuingOrganization}
                </p>
              </div>

              <div className="flex items-center gap-3 text-sm text-tertiary border-l-2 border-highlight/40 pl-3 py-2 md:py-1 2xl:py-2">
                <i className="bx bx-calendar text-highlight"></i>
                <div className="flex flex-wrap gap-1">
                  {certification.dateIssued && (
                    <span>Issued {formatDate(certification.dateIssued)}</span>
                  )}
                  {certification.expiryDate && (
                    <span className="before:content-['•'] before:mx-2">
                      Expires {formatDate(certification.expiryDate)}
                    </span>
                  )}
                </div>
              </div>

              {certification.description && showDescription ? (
                <div className="bg-x/30 rounded-lg p-4 text-sm text-secondary leading-relaxed border border-x/50 animate-fadeIn whitespace-pre-line">
                  <p>{certification.description}</p>
                  <button
                    className=" text-highlight  mt-5 text-right w-full hover:text-secondary transition-colors duration-300"
                    onClick={hideDesc}
                  >
                    Hide description
                  </button>
                </div>
              ) : (
                <button
                  className="self-start px-4 py-2 text-sm font-medium  bg-x/40 hover:bg-x/60 rounded-lg transition-all duration-300 flex items-center gap-2 group border border-secondary"
                  onClick={showDesc}
                >
                  <i className="bx bx-chevron-down text-highlight"></i>
                  <span className=" text-highlight group-hover:text-secondary transition-colors duration-300">
                    Show description
                  </span>
                </button>
              )}

              <a
                href={certification.certLink}
                title="open certificate link"
                className="self-start px-4 py-2 md:hidden text-sm font-medium text-highlight hover:text-secondary bg-x/40 hover:bg-x/60 rounded-lg transition-all duration-300 flex items-center gap-2 border border-secondary group"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Certificate
                <i className="bx bx-right-top-arrow-circle group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CertModal;
