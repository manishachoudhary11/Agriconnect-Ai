import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold text-green-700">
            Farmer Dashboard
          </h1>

          <p className="text-gray-600 mt-4 text-lg">
            Monitor crops, weather and AI recommendations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold">🌤 Weather</h2>
              <p className="mt-4 text-3xl font-bold">
                28°C
              </p>
              <p>Sunny</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold">🌾 Wheat Price</h2>
              <p className="mt-4 text-3xl font-bold">
                ₹2200
              </p>
              <p>Per Quintal</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold">🤖 AI Suggestion</h2>
              <p className="mt-4 text-3xl font-bold">
                Rice
              </p>
              <p>Recommended Crop</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold">📈 Crop Health</h2>
              <p className="mt-4 text-3xl font-bold">
                85%
              </p>
              <p>Healthy</p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;