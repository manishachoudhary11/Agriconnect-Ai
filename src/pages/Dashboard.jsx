import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-12">
        <h1 className="text-4xl font-bold text-green-700">
          Farmer Dashboard
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          Manage crops, monitor prices, and access AI tools.
        </p>
      </main>

      <Footer />
    </>
  );
}

export default Dashboard;