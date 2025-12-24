import {  Link, useLocation } from "react-router-dom"
import Logo from "./Logo"
import { useEffect, useState } from "react"

function Header() {
  const [navActive, setNavActive] = useState(false)

  const {hash, pathname} = useLocation()
  // console.log(pathname)
  // console.log(hash)

  const isHome = pathname == '/'


  useEffect(() => {
    setNavActive(false)

  }, [hash, pathname])

  return (
    <header
      id="headd"
      className="px-8 md:px-16 flex items-center justify-between py-5 relative"
    >
      <Link to="/">
        <Logo />
      </Link>
      <nav
        className={` absolute z-50
           max-md:-top-[500px] max-md:opacity-0
          right-0 left-0 max-md:pt-3 max-md:bg-primary flex-col md:flex-row  md:static flex items-center justify-center flex-1 lg:gap-4 transition-all duration-300 text-tertiary text-lg ${
            navActive && "active"
          }`}
      >
        {isHome ? (
          <>
            {/* <a href="#home" className="nav-link">
              Home
            </a> */}
            <a href="#about" className="nav-link">
              About
            </a>
            <Link to="/works" className="nav-link">
              Works
            </Link>
            <a href="#certs" className="nav-link">
              Certifications
            </a>
            <Link to="/quote?source=nav" className="nav-link">
              Quote
            </Link>
            <a href="#testimonials" className="nav-link">
              Reviews
            </a>
            <a href="#contact" className="nav-link md:hidden">
              Contact
            </a>
          </>
        ) : (
          <>
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/works" className="nav-link">
              Works
            </Link>
            <Link to="/quote?source=nav" className="nav-link">
              Quote
            </Link>
            <Link to="/contact" className="nav-link md:hidden">
              Contact
            </Link>

            {/* <Link to='#portfolio' className="nav-link">Work</Link> */}
            {/* <Link to='#testimonials' className="nav-link">Reviews</Link> */}
          </>
        )}
      </nav>

      {isHome ? (
        // <a
        //   href={`#contact`}
        //   className=" hidden md:block px-5 py-2 bg-[#d9d9d9] text-primary rounded-xl capitalize hover:bg-x hover:text-secondary transition-all font-[500] duration-500"
        // >
        //   contact <span className=" max-lg:hidden">Me</span>
        // </a>
        <Link
          to={`/contact`}
          className=" hidden md:block px-5 py-2 bg-[#d9d9d9] text-primary rounded-xl capitalize hover:bg-x hover:text-secondary transition-all font-[500] duration-500"
        >
          contact <span className=" max-lg:hidden">Me</span>
        </Link>
      ) : (
        <Link
          to={`/contact`}
          className=" hidden md:block px-5 py-2 bg-[#d9d9d9] text-primary rounded-xl capitalize hover:bg-x hover:text-secondary transition-all font-[500] duration-500"
        >
          contact <span className=" max-lg:hidden">Me</span>
        </Link>
      )}

      <button
        onClick={() => setNavActive(!navActive)}
        className="p-1 text-3xl md:hidden"
        aria-label="Toggle navigation menu"
        aria-expanded={navActive}
      >
        <i className="bx bx-menu"></i>
      </button>
    </header>
  );
}

export default Header