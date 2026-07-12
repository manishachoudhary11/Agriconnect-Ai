import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge, Card } from "../components/ui";

const stack = [
  { title: "Frontend", value: "React + Vite + Tailwind CSS" },
  { title: "Backend", value: "FastAPI + SQLAlchemy" },
  { title: "Database", value: "PostgreSQL" },
];

const features = [
  "AI-based crop recommendation system",
  "Real-time market price updates",
  "Weather intelligence and farming alerts",
  "Farmer and buyer marketplace",
  "Agricultural news and guidance",
  "Smart decision support for farmers",
];

export default function About() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <Badge variant="primary">About</Badge>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            About AgriConnect AI
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            AgriConnect AI is an AI-powered agricultural coordination and market
            information platform designed to help farmers make data-driven decisions.
            Our platform bridges the gap between farmers, buyers, and agricultural
            experts by providing intelligent insights and real-time information.
          </p>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              To empower farmers with technology, improve agricultural productivity,
              and create a transparent marketplace where farmers can directly connect
              with buyers and access valuable farming resources.
            </p>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">Key Features</h2>
            <ul className="mt-4 space-y-3">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold">Technology Stack</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stack.map((item) => (
                <Card key={item.title} title={item.title}>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
