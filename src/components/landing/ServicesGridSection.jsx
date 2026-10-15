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
    title: "Crop Doctor",
    hindiTitle: "फसल डॉक्टर / रोग निदान",
    description:
      "Upload or drag leaf photos for instant diagnostic matching. Get step-by-step organic neem solutions and chemical remedies.",
    icon: HiCamera,
    link: "/disease-detection",
    badge: "Instant AI Scan",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500",
  },
  {
    title: "Mandi Bhav",
    hindiTitle: "मंडी भाव एवं मूल्य पूर्वानुमान",
    description:
      "Track daily mandi prices across Wheat, Rice, Cotton, and Onion. 30-day directional forecasts with Hold or Sell signals.",
    icon: HiTrendingUp,
    link: "/price-prediction",
    badge: "Live Mandi Rates",
    badgeColor: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
    iconBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    hoverBorder: "hover:border-amber-500",
  },
  {
    title: "Mausam Salah",
    hindiTitle: "मौसम सलाह एवं छिड़काव समय",
    description:
      "Live microclimate data from OpenWeather. 7-day agricultural forecast with automated Gemini advice for irrigation and spraying.",
    icon: HiCloud,
    link: "/weather",
    badge: "7-Day Forecast",
    badgeColor: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
    iconBg: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
    hoverBorder: "hover:border-sky-500",
  },
  {
    title: "AI Krishi Salahkar",
    hindiTitle: "एआई कृषि सलाहकार (24/7)",
    description:
      "Conversational agronomy assistant powered by Google Gemini. Ask about soil testing, seed varieties, NPK ratios, and crop schedules.",
    icon: HiSparkles,
    link: "/ai-assistant",
    badge: "Gemini 1.5 AI",
    badgeColor: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300",
    iconBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
    hoverBorder: "hover:border-purple-500",
  },
  {
    title: "Kisan B2B Bazaar",
    hindiTitle: "किसान थोक बाज़ार (बिना बिचौलिया)",
    description:
      "Connect directly with wholesale buyers and FPOs. Create listings, calculate live lot values, and arrange sales with zero commissions.",
    icon: HiShoppingBag,
    link: "/marketplace",
    badge: "Zero Middlemen",
    badgeColor: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    iconBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    hoverBorder: "hover:border-emerald-500",
  },
  {
    title: "Meri Fasal",
    hindiTitle: "मेरी फसल एवं खेत प्रबंधन",
    description:
      "Complete farm inventory management. Track crop status (growing, harvested, stored, sold), quantities, and market values.",
    icon: HiClipboardList,
    link: "/crops",
    badge: "Farm Lifecycle",
    badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300",
    iconBg: "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20",
    hoverBorder: "hover:border-teal-500",
  },
];

export default function ServicesGridSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-b border-border/80">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-bold text-primary mb-3">
          <span>🌾 किसान सेवा केंद्र · Kisan Services Hub</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Core Agricultural Tools for India's Farmers
        </h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Inspired by top platforms like AgroStar and DeHaat — built to solve real daily farming challenges from sowing to mandi trade.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((item) => (
          <Link
            key={item.title}
            to={item.link}
            className={`group flex flex-col justify-between rounded-3xl border border-border/80 bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${item.hoverBorder}`}
          >
            <div>
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border transition group-hover:scale-105 ${item.iconBg}`}
                >
                  <item.icon className="h-6 w-6" />
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition flex items-center justify-between">
                  <span>{item.title}</span>
                </h3>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  {item.hindiTitle}
                </p>
                <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-1 text-xs font-bold text-primary group-hover:gap-2 transition-all">
              <span>Open Tool</span>
              <HiArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
