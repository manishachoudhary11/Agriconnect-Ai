import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-700 text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">AgriConnect AI</h1>

        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;