import { Route, Routes, useLocation } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import DashLayout from "./layouts/DashLayout"
import Home from "./pages/Home"
import Works from "./pages/Works"
import Work from "./pages/Work"
import {  useEffect } from "react"
// import SettingContext from "./contexts/settingContext"
// import Spinner from "./components/global/Spinner"
// import Error from "./components/global/Error"
import { scrollToSection } from "./utils/scrollIn"
import NotFound from "./pages/NotFound"
import ReactGA from 'react-ga4';
import Quote from "./pages/Quote"
import Contact from "./components/home/Contact"


function App() {

  useEffect(() => {
    ReactGA.initialize('G-GE32E0X9MH');
    ReactGA.send('pageview');
  }, []);



  const {pathname} = useLocation()
  // const {loading, error} = useContext(SettingContext)


  useEffect(() => {
    scrollToSection('headd')

  }, [pathname])

  // if (loading) return <section className="h-screen"><Spinner/></section>
  // if (error) { 
  // console.log(error)
    
  //   return <section className="h-screen"><Error error={error}/></section> }

  return (
    <>

    <Routes>

      {/* main layout */}

      <Route element={<MainLayout/>}>
      <Route element={<Home/>} path="/"/>
      <Route element={<Works/>} path="/works"/>
      <Route element={<Work/>} path="/works/:slug"/>
      <Route element={<Quote/>} path="/quote"/>
      <Route element={<Contact/>} path="/contact"/>



      </Route>



      {/* dash layout */}

      <Route element={<DashLayout/>}>

      </Route>



      {/* no layout */}
      <Route path="*" element={<NotFound/>}/>

    </Routes>
    {/* preload needed images */}
    <div className="hidden w-0 h-0">
      <img src="/website-gif-1.gif" alt="" />
      <img src="/website-gif-2.gif" alt="" />
      <img src="/website-gif-3.gif" alt="" />
      <img src="/website-gif-4.gif" alt="" />
    </div>
    </>

  )
}

export default App
