import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header className="bg-blue-600 sticky z-40 top-0 py-4">
      <nav className="text-white mx-5 flex items-center gap-3">
        <Link className="text-lg tracking-wide" to='/'>Gallery</Link>
        <Link className="text-lg tracking-wide" to='/tours'>Tour</Link>
      </nav>
    </header>
  )
}