import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-12">
        <h1 className="text-4xl font-bold text-green-700">
          About AgriConnect AI
        </h1>

        <p className="mt-4 text-lg text-gray-700">
          AgriConnect AI helps farmers access market information,
          AI-powered recommendations, and connect with buyers.
        </p>
      </main>

      <Footer />
    </>
  );
}

export default About;