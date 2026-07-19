  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import AppProviders from "./providers/AppProviders";
  import ProtectedRoute from "./components/ProtectedRoute";

  import Home from "./pages/Home";
  import About from "./pages/About";
  import Dashboard from "./pages/Dashboard";
  import Login from "./pages/Login";
  import Register from "./pages/Register";
  import ComponentsDemo from "./pages/ComponentsDemo";

  function App() {
    return (
      <AppProviders>
        <div className="min-h-screen bg-background text-foreground">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/components" element={<ComponentsDemo />} />
            </Routes>
          </BrowserRouter>
        </div>
      </AppProviders>
    );
  }

  export default App;
