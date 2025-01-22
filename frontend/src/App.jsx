import { Route, Routes, useLocation } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import DashLayout from "./layouts/DashLayout"
import Home from "./pages/Home"
import Works from "./pages/Works"
import Work from "./pages/Work"
import { useEffect } from "react"


function App() {

  const {pathname} = useLocation()

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "instant", block: "start" });
    }
  };

  useEffect(() => {
    scrollToSection('headd')

  }, [pathname])

  return (
    <>

    <Routes>

      {/* main layout */}

      <Route element={<MainLayout/>}>
      <Route element={<Home/>} path="/"/>
      <Route element={<Works/>} path="/works"/>
      <Route element={<Work/>} path="/works/:slug"/>



      </Route>



      {/* dash layout */}

      <Route element={<DashLayout/>}>

      </Route>



      {/* no layout */}

    </Routes>
    
    </>

  )
}

export default App
