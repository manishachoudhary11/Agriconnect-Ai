import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import ComponentsDemo from "./pages/ComponentsDemo";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen transition-colors duration-300 bg-white text-black dark:bg-gray-900 dark:text-white">
        
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-lg transition"
          >
            {darkMode ? "🌙 Dark" : "☀ Light"}
          </button>
        </div>

        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<Home darkMode={darkMode} />}
            />

            <Route
              path="/about"
              element={<About darkMode={darkMode} />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard darkMode={darkMode} />}
            />

            <Route
              path="/login"
              element={<Login darkMode={darkMode} />}
            />

            <Route
              path="/components"
              element={<ComponentsDemo darkMode={darkMode} />}
            />
          </Routes>
        </BrowserRouter>

      </div>
    </div>
  );
}

export default App;