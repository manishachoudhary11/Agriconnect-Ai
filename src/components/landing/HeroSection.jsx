import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiCamera,
  HiCloud,
  HiSparkles,
  HiTrendingUp,
  HiShieldCheck,
  HiShoppingBag,
} from "react-icons/hi";

const featuredCrops = [
  {
    name: "Wheat (Sharbati)",
    mandi: "Nashik APMC",
    price: "₹2,450 / Q",
    trend: "+4.5%",
    trendUp: true,
    signal: "Strong Hold",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Basmati Rice",
    mandi: "Karnal APMC",
    price: "₹3,500 / Q",
    trend: "+2.8%",
    trendUp: true,
    signal: "High Export Demand",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Vine Tomatoes",
    mandi: "Pune Market",
    price: "₹1,850 / Q",
    trend: "-1.2%",
    trendUp: false,
    signal: "Optimal Sell",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Cotton (Fiber)",
    mandi: "Rajkot APMC",
    price: "₹6,800 / Q",
    trend: "+3.9%",
    trendUp: true,
    signal: "Hold Inventory",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=500&q=80",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border min-h-[640px] flex items-center">
      {/* Background Farm Landscape Image with Rich Dark Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      {/* High-Contrast Gradient Backdrop Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-900/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

      {/* Decorative ambient glow */}
      <div
        className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading, Value Props & CTAs */}
          <div className="animate-slide-up lg:col-span-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-1 text-xs font-semibold text-emerald-300 mb-6 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>AI-Powered Smart Agriculture Platform</span>
            </div>

            <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl leading-[1.15]">
              Intelligent Farm Care,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Market Analysis
              </span>{" "}
              & Direct Crop Trade
            </h1>

            <p className="mt-5 max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Empowering farmers and buyers with AI-driven crop diagnostics, real-time market price forecasting, microclimate weather advisories, and direct wholesale trade.
            </p>

            {/* Trust checkmarks */}
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 text-white">
                <HiShieldCheck className="h-4 w-4 text-emerald-400" />
                Plant Disease Diagnostics
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <HiShieldCheck className="h-4 w-4 text-emerald-400" />
                30-Day Mandi Price Forecasts
              </span>
              <span className="flex items-center gap-1.5 text-white">
                <HiShieldCheck className="h-4 w-4 text-emerald-400" />
                Zero-Middleman Marketplace
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/disease-detection"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:bg-emerald-400 hover:scale-[1.02]"
              >
                <HiCamera className="h-5 w-5" />
                Diagnose Crop Health
              </Link>
              <Link
                to="/price-prediction"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 backdrop-blur-md px-5 text-sm font-bold text-white transition hover:bg-slate-800 hover:border-slate-600"
              >
                <HiTrendingUp className="h-5 w-5 text-emerald-400" />
                Live Mandi Prices
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold text-slate-300 hover:text-white transition"
              >
                <HiShoppingBag className="h-4 w-4 text-emerald-400" />
                Marketplace
                <HiArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Crop Photo Cards (Rice, Wheat, Tomato, Cotton) */}
          <div className="animate-fade-in lg:col-span-6">
            <div className="rounded-3xl border border-slate-800/80 bg-slate-900/85 backdrop-blur-xl p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <HiTrendingUp className="h-4 w-4 text-emerald-400" />
                    Live Commodity Market Rates
                  </h3>
                  <p className="text-[11px] text-slate-400">APMC Mandi spot prices & directional projections</p>
                </div>
                <Link
                  to="/price-prediction"
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  View All <HiArrowRight className="h-3 w-3" />
                </Link>
              </div>

              {/* 2x2 Grid of Real Crop Photo Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {featuredCrops.map((crop) => (
                  <div
                    key={crop.name}
                    className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/70 p-3 transition hover:border-emerald-500/50 hover:shadow-lg"
                  >
                    {/* Crop Image Thumbnail */}
                    <div className="relative h-28 w-full overflow-hidden rounded-xl">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                      <div className="absolute top-2 right-2">
                        <span
                          className={`rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md ${
                            crop.trendUp
                              ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/30"
                              : "bg-red-500/25 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {crop.trend}
                        </span>
                      </div>
                      <div className="absolute bottom-1.5 left-2">
                        <span className="text-[10px] font-semibold text-slate-300">{crop.mandi}</span>
                      </div>
                    </div>

                    {/* Crop Details */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white">{crop.name}</p>
                        <p className="text-sm font-extrabold text-emerald-400 mt-0.5">{crop.price}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block rounded-md bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                          {crop.signal}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live telemetry footer */}
              <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <HiCloud className="h-4 w-4 text-emerald-400" />
                  Nashik: 28°C · Spray Window: Before 11 AM
                </span>
                <Link
                  to="/disease-detection"
                  className="font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                >
                  <HiSparkles className="h-3.5 w-3.5" />
                  AI Crop Doctor →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
