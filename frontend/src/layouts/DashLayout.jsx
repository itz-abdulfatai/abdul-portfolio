import { Outlet } from "react-router-dom"

function DashLayout() {
  return (
    <>

    <main>
        <Outlet/>
        
    </main>
    </>
  )
}

export default DashLayout