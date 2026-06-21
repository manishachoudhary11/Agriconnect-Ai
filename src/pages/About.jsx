import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-12 bg-green-50 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 dark:text-green-400">
            About AgriConnect AI
          </h1>

          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            AgriConnect AI is an AI-Powered Agricultural Coordination and
            Market Information Platform designed to help farmers make
            data-driven decisions. Our platform bridges the gap between
            farmers, buyers, and agricultural experts by providing
            intelligent insights and real-time information.
          </p>

          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-10">
            Our Mission
          </h2>

          <p className="mt-3 text-gray-700 dark:text-gray-300">
            To empower farmers with technology, improve agricultural
            productivity, and create a transparent marketplace where
            farmers can directly connect with buyers and access
            valuable farming resources.
          </p>

          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-10">
            Key Features
          </h2>

          <ul className="mt-4 space-y-3 text-gray-700 dark:text-gray-300 list-disc pl-6">
            <li>AI-based Crop Recommendation System</li>
            <li>Real-Time Market Price Updates</li>
            <li>Weather Intelligence and Farming Alerts</li>
            <li>Farmer & Buyer Marketplace</li>
            <li>Agricultural News and Guidance</li>
            <li>Smart Decision Support for Farmers</li>
          </ul>

          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mt-10">
            Technology Stack
          </h2>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg">Frontend</h3>
              <p className="text-gray-700 dark:text-gray-300">
                React + Tailwind CSS
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg">Backend</h3>
              <p className="text-gray-700 dark:text-gray-300">
                FastAPI (Python)
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h3 className="font-bold text-lg">Database</h3>
              <p className="text-gray-700 dark:text-gray-300">
                PostgreSQL (Supabase)
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default About;