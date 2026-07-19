import {
  HiCamera,
  HiChartBar,
  HiCloud,
  HiShoppingCart,
  HiSparkles,
  HiTrendingUp,
} from "react-icons/hi";
import { Card } from "../ui";

const features = [
  {
    icon: HiSparkles,
    title: "AI Crop Advisor",
    description:
      "Get personalized recommendations for crops, fertilizers, harvest timing, and disease treatment.",
  },
  {
    icon: HiCloud,
    title: "Weather Intelligence",
    description:
      "Real-time forecasts, rain alerts, and AI-generated farming advice based on local weather.",
  },
  {
    icon: HiChartBar,
    title: "Analytics Dashboard",
    description:
      "Track production, revenue, sales trends, and marketplace activity with interactive charts.",
  },
  {
    icon: HiShoppingCart,
    title: "Farmer Marketplace",
    description:
      "List crops, connect with verified buyers, and manage orders — no middlemen required.",
  },
  {
    icon: HiCamera,
    title: "Disease Detection",
    description:
      "Upload leaf images for instant AI-powered disease identification with treatment plans.",
  },
  {
    icon: HiTrendingUp,
    title: "Price Prediction",
    description:
      "Historical trends and AI-predicted future prices to help you sell at the right time.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to farm smarter
        </h2>
        <p className="mt-4 text-muted-foreground">
          From crop health to market prices — one platform combining CropIn, ChatGPT,
          and marketplace capabilities.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="group">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary transition group-hover:scale-105">
              <feature.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
