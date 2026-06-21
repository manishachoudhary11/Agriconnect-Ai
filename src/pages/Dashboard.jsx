import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-12 bg-white dark:bg-gray-900 dark:text-white">
        <h1 className="text-4xl font-bold text-green-700 dark:text-green-400">
          Farmer Dashboard
        </h1>

        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Manage crops, monitor prices, and access AI tools.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-green-100 dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="font-bold text-xl">Weather</h2>
            <p>28°C • Sunny</p>
          </div>

          <div className="bg-green-100 dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="font-bold text-xl">Market Prices</h2>
            <p>Wheat: ₹2200/q</p>
          </div>

          <div className="bg-green-100 dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="font-bold text-xl">AI Suggestions</h2>
            <p>Recommended Crop: Rice</p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;