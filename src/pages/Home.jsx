import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  HeroSection,
  StatsSection,
  ServicesGridSection,
  InteractiveShowcaseSection,
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
        <ServicesGridSection />
        <InteractiveShowcaseSection />
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
