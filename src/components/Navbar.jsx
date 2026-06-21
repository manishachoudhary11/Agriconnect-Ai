import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-green-700">
          🌾 AgriConnect AI
        </h1>

        <div className="flex flex-wrap gap-6 mt-4 md:mt-0 font-medium">
          <Link className="hover:text-green-600 transition" to="/">
            Home
          </Link>

          <Link className="hover:text-green-600 transition" to="/about">
            About
          </Link>

          <Link className="hover:text-green-600 transition" to="/dashboard">
            Dashboard
          </Link>

          <Link className="hover:text-green-600 transition" to="/login">
            Login
          </Link>

          <Link className="hover:text-green-600 transition" to="/components">
            UI Library
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;