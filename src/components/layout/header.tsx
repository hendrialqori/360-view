import { Link } from "react-router-dom"

export const Header = () => {
  return (
    <header className="bg-blue-500 sticky z-40 top-0 py-4">
      <nav className="text-white w-10/12 mx-auto flex items-center gap-4 ">
        <Link className="font-medium text-lg tracking-wide" to='/'>Gallery</Link>
        <Link className="font-medium text-lg tracking-wide" to='/tour'>Tour</Link>
      </nav>
    </header>
  )
}