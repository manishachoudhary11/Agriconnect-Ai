import { Link } from "react-router-dom";
import { HiArrowRight, HiChartBar, HiCloud, HiShoppingCart, HiSparkles } from "react-icons/hi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Card } from "../components/ui";

const features = [
  {
    icon: HiCloud,
    title: "Weather Intelligence",
    description: "Real-time forecasts and farming alerts tailored to your location.",
  },
  {
    icon: HiSparkles,
    title: "AI Crop Advisor",
    description: "Personalized recommendations for disease, fertilizer, and harvest timing.",
  },
  {
    icon: HiChartBar,
    title: "Live Market Prices",
    description: "Track crop prices from nearby markets and make data-driven decisions.",
  },
  {
    icon: HiShoppingCart,
    title: "Buyer Marketplace",
    description: "Connect directly with verified buyers and sell your harvest faster.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/50 to-background" />
          <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center animate-slide-up">
              <p className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm text-muted-foreground">
                AgriConnect AI 2.0 — Now in development
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Smart farming,
                <span className="text-primary"> powered by AI</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                Empowering farmers with crop recommendations, weather intelligence,
                market insights, and AI-driven agricultural decisions.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary-hover"
                >
                  Get started free
                  <HiArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to farm smarter
            </h2>
            <p className="mt-4 text-muted-foreground">
              From crop health to market prices — one platform for modern agriculture.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="group">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary transition group-hover:scale-105">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
