import {
  HiCamera,
  HiChartBar,
  HiCloud,
  HiShoppingBag,
  HiSparkles,
  HiTrendingUp,
} from "react-icons/hi";
import { Card } from "../ui";

const features = [
  {
    icon: HiCamera,
    title: "Computer Vision Disease Diagnosis",
    category: "Plant Pathology & Diagnosis",
    description:
      "Instant leaf spot and blight detection from uploaded photos, generating tailored organic neem remedies and chemical fungicides.",
  },
  {
    icon: HiTrendingUp,
    title: "Mandi Price Forecasting",
    category: "Predictive Market Analytics",
    description:
      "Daily APMC mandi rates across major commodities with 30-day directional trends and clear Hold Stock or Sell Now signals.",
  },
  {
    icon: HiCloud,
    title: "Microclimate Weather Intelligence",
    category: "Meteorological Spray Windows",
    description:
      "Live local temperature, humidity, and 7-day agricultural forecasts with automated Gemini AI irrigation and foliar spray windows.",
  },
  {
    icon: HiSparkles,
    title: "AI Agronomy Chatbot (Gemini)",
    category: "24/7 Contextual Consultation",
    description:
      "Multi-turn conversational assistant answering specific questions regarding soil health, NPK fertilizer ratios, and crop rotation schedules.",
  },
  {
    icon: HiShoppingBag,
    title: "B2B Produce Marketplace",
    category: "Direct Wholesale Trading",
    description:
      "Direct trading channel enabling farmers to list wholesale lots and verified buyers to place purchase inquiries with zero middlemen cuts.",
  },
  {
    icon: HiChartBar,
    title: "Crop Lifecycle Management",
    category: "Field Inventory Tracking",
    description:
      "End-to-end inventory tracking across growing, harvested, stored, and sold stages with yield statistics and server-side filtering.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 border-b border-border">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-accent px-3.5 py-1 text-xs font-semibold text-primary mb-3">
          <span>🌿 Comprehensive Capabilities</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Built for Farmers, Agronomists & Wholesale Buyers
        </h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Integrated tools combining data intelligence, machine vision, and market access in one accessible platform.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group p-6 rounded-3xl border-border shadow-sm hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-105 border border-primary/20">
              <feature.icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-base font-bold text-foreground group-hover:text-primary transition">
              {feature.title}
            </h3>
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {feature.category}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
