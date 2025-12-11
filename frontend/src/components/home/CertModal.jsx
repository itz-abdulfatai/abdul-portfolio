import { useState } from "react";
import { useEffect } from "react";

function CertModal({ cert, showModal, onClose = () => {}, onOpen = () => {} }) {
  /** @type {import('../../types').CertificationType} */
  const certification = cert;

  const [showDescription, setShowDescription] = useState(false);
  const formatDate = (date) => {
    return date.toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  useEffect(() => {
    if (showModal) {
      onOpen();
    } else {
      onClose();
    }
  }, [showModal, onClose, onOpen]);

  const showDesc = () => {
    setShowDescription(true);
  };
  return (
    <>
      {certification && showModal && (
        <div className=" fixed z-50 top-0 left-0 right-0 bottom-0 bg-black/40 flex justify-center items-center padding-x ">
          <div className=" w-full max-w-[500px] bg-primary overflow-hidden flex flex-col rounded-md max-h-[95vh] overflow-y-auto">
            <div className=" w-full rounded-t-md test-b overflow-hidden h-96 flex justify-stretch">
              <img
                src={certification.imageLink}
                alt={certification.name}
                className=" object-cover w-[101%] h-[101%] "
              />
            </div>
            <div className=" p-4 flex flex-col gap-4">
              <h3 className=" capitalize font-semibold">
                {certification.name}
              </h3>
              <p className=" text-sm -mt-2">
                provider: {certification.issuingOrganization}
              </p>
              <p>
                {certification.dateIssued && (
                  <> Issued: {formatDate(certification.dateIssued)} </>
                )}
                {certification.expiryDate && (
                  <>- Expires: {formatDate(certification.expiryDate)} </>
                )}
              </p>
              {certification.description && showDescription ? (
                <p>{certification.description}</p>
              ) : (
                <button
                  className=" self-start text-highlight hover:text-secondary"
                  onClick={showDesc}
                >
                  Show description
                </button>
              )}
              <a
                href={certification.certLink}
                className=" self-start text-highlight hover:text-secondary flex items-center gap-2"
                target="_blank"
              >
                View Certificate
                <i className="bx bx-right-top-arrow-circle"></i>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CertModal;
