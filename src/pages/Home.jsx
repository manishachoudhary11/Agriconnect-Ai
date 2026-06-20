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
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      <Footer />
    </>
  );
}

export default Home;