import { Link } from "react-router-dom"

function NotFound() {
  return (
    <section className="flex flex-col justify-center gap-10 items-center">
        <h1 className="font-extrabold text-9xl">4<span className="text-highlight text-[200px]">0</span>4</h1>
        <span className="text-highlight text-sm">Page Not Found</span>
        <Link to='/' className="px-5 py-1 test-b">Home</Link>
        
    </section>
  )
}

export default NotFound