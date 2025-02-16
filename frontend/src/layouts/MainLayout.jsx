import { Outlet } from "react-router-dom"
import Header from "../components/global/Header"
import Footer from "../components/global/Footer"

function MainLayout() {
  return (
   
    <>
    <Header/>

    <main>
        <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default MainLayout