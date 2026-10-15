import { Link } from "react-router-dom";
import {
  HiCamera,
  HiTrendingUp,
  HiCloud,
  HiSparkles,
  HiShoppingBag,
  HiClipboardList,
  HiArrowRight,
} from "react-icons/hi";

const services = [
  {
    title: "Crop Health Diagnosis",
    subtitle: "AI Computer Vision Diagnostics",
    description:
      "Upload or snap leaf photos for instant diagnostic matching. Receive structured organic neem solutions and chemical remedies.",
    icon: HiCamera,
    link: "/disease-detection",
    badge: "Computer Vision",
    image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Mandi Price Forecasting",
    subtitle: "Seasonal Trends & Projections",
    description:
      "Track daily mandi prices across Wheat, Rice, Cotton, and Onion. 30-day directional forecasts with Hold Stock or Sell signals.",
    icon: HiTrendingUp,
    link: "/price-prediction",
    badge: "Market Analytics",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Weather Intelligence",
    subtitle: "Microclimate & Spray Windows",
    description:
      "Live local temperature, humidity, and 7-day agricultural forecasts with automated Gemini AI irrigation and spraying advice.",
    icon: HiCloud,
    link: "/weather",
    badge: "OpenWeather API",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "AI Agronomy Advisor",
    subtitle: "24/7 Contextual Consultation",
    description:
      "Conversational agronomy assistant powered by Google Gemini. Ask about soil testing, seed varieties, NPK ratios, and crop schedules.",
    icon: HiSparkles,
    link: "/ai-assistant",
    badge: "Gemini 1.5 Flash",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "B2B Produce Marketplace",
    subtitle: "Direct Wholesale Trading",
    description:
      "Connect directly with wholesale buyers and FPOs. Create listings, calculate live lot values, and arrange sales with zero commissions.",
    icon: HiShoppingBag,
    link: "/marketplace",
    badge: "Zero Middlemen",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Crop Lifecycle Management",
    subtitle: "Farm Inventory & Stage Tracking",
    description:
      "Complete farm inventory management. Track crop status (growing, harvested, stored, sold), quantities, and market values.",
    icon: HiClipboardList,
    link: "/crops",
    badge: "Full CRUD",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=500&q=80",
  },
];

export default function ServicesGridSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-b border-border">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
          <span>🌿 Core Agricultural Services</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Everything You Need to Farm & Trade Smarter
        </h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          From computer vision disease diagnosis to predictive mandi analytics and direct B2B produce trading.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-emerald-500/50"
          >
            {/* Real Crop / Agriculture Photo Header */}
            <div className="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-700/60 px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                  {item.badge}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 shadow-md">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-bold text-white drop-shadow-sm">{item.subtitle}</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all">
                <span>Explore Feature</span>
                <HiArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
