import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home({ darkMode }) {
  return (
    <>
      <Navbar />

      <main className="bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <Hero />

        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-green-700 dark:text-green-400">
            Smart Farming Features
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              title="Weather Intelligence"
              description="Receive weather forecasts and farming alerts."
            />

            <Card
              title="AI Crop Recommendation"
              description="Get personalized crop suggestions using AI."
            />

            <Card
              title="Live Market Prices"
              description="Track crop prices from nearby markets."
            />

            <Card
              title="Buyer Marketplace"
              description="Connect directly with verified buyers."
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;