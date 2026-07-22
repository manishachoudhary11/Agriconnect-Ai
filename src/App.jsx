import { BrowserRouter, Routes, Route } from "react-router-dom";
  import AppProviders from "./providers/AppProviders";
  import ProtectedRoute from "./components/ProtectedRoute";

  import Home from "./pages/Home";
  import About from "./pages/About";
  import Dashboard from "./pages/Dashboard";
  import Crops from "./pages/Crops";
  import Marketplace from "./pages/Marketplace";
  import AIAssistant from "./pages/AIAssistant";
  import DiseaseDetection from "./pages/DiseaseDetection";
  import WeatherIntelligence from "./pages/WeatherIntelligence";
  import PricePrediction from "./pages/PricePrediction";
  import Profile from "./pages/Profile";
  import Notifications from "./pages/Notifications";
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
              <Route
                path="/crops"
                element={
                  <ProtectedRoute>
                    <Crops />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/marketplace"
                element={
                  <ProtectedRoute>
                    <Marketplace />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ai-assistant"
                element={
                  <ProtectedRoute>
                    <AIAssistant />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/disease-detection"
                element={
                  <ProtectedRoute>
                    <DiseaseDetection />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/weather"
                element={
                  <ProtectedRoute>
                    <WeatherIntelligence />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/price-prediction"
                element={
                  <ProtectedRoute>
                    <PricePrediction />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
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
