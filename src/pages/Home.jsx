import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            title="Market Prices"
            description="View latest crop prices from nearby markets."
          />

          <Card
            title="AI Assistant"
            description="Get crop and farming recommendations."
          />

          <Card
            title="Buyer Network"
            description="Connect directly with verified buyers."
          />
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;