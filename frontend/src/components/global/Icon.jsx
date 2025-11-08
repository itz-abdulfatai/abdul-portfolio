import { Link } from "react-router-dom";

function Icon({ social }) {
    return (
      <Link
        to={social.link}
        target="_blank"
        title={social.name}
        className=" inline-flex justify-center items-center"
      >
        {social.name == "Fiverr" ? (
          <i
            className={` font-extrabold not-italic  text-3xl  p-2 test-b  rounded-xl border-x2 hover:border-transparent hhover:text-primary hhover:bg-secondary transition-all duration-200 w-[52px]   h-[52px] flex justify-center items-center overflow-hidden hover:secondary-sh  `}
          >
            fi
          </i>
        ) : (
          <i
            className={`bx ${social.icon} overflow-hidden text-3xl  p-2 test-b  rounded-xl border-x2 hover:border-transparent hhover:text-primary hhover:bg-secondary transition-all duration-200 w-[50px]   h-[50px] flex justify-center items-center hover:secondary-sh `}
          ></i>
        )}
      </Link>
    );
  }

  export default Icon;