import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  HowItWorksSection,
  AIShowcaseSection,
  TestimonialsSection,
  FAQSection,
  CTASection,
} from "../components/landing";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AIShowcaseSection />
        <TestimonialsSection />
        <FAQSection />
        <CTASection />
      </main>

      <Footer />
    </>
  );
}
