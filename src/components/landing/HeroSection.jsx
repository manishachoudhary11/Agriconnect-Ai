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
import { Badge } from "../ui";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-accent/40 via-background to-background">
      {/* Background radial glows */}
      <div
        className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Mission, Value Props & Actions */}
          <div className="animate-slide-up lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>भारत का अग्रणी एआई कृषि मंच · India's Smart Agri Platform</span>
            </div>

            <h1 className="text-balance text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl text-foreground leading-[1.15]">
              Empowering Annadata with{" "}
              <span className="text-primary underline decoration-amber-500/60 decoration-wavy decoration-2">
                AI-Driven Farming
              </span>
              , Live Mandi Rates & Direct Trade
            </h1>

            <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              From instant leaf disease detection to 30-day mandi price forecasts, microclimate weather advisories, and zero-middleman wholesale trading — everything Indian farmers and buyers need to thrive.
            </p>

            {/* Trust checkmarks */}
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-muted-foreground">
              <span className="flex items-center gap-1.5 text-foreground">
                <HiShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                100% Free for Farmers
              </span>
              <span className="flex items-center gap-1.5 text-foreground">
                <HiShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Instant Plant Doctor Scan
              </span>
              <span className="flex items-center gap-1.5 text-foreground">
                <HiShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Daily Mandi Bhav Updates
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/disease-detection"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-md transition hover:bg-primary-hover hover:shadow-lg"
              >
                <HiCamera className="h-5 w-5 text-amber-300" />
                Diagnose Crop Free (Crop Doctor)
              </Link>
              <Link
                to="/price-prediction"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 text-sm font-bold text-foreground transition hover:bg-muted shadow-sm hover:border-emerald-600/40"
              >
                <HiTrendingUp className="h-5 w-5 text-emerald-600" />
                Check Live Mandi Bhav
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-transparent px-4 text-sm font-semibold text-muted-foreground hover:text-foreground transition"
              >
                <HiShoppingBag className="h-4 w-4" />
                Kisan Bazaar
                <HiArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Agri Telemetry Cockpit (AgroStar / DeHaat Style) */}
          <div className="animate-fade-in lg:col-span-5">
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-xl shadow-emerald-950/5 relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                  <div>
                    <p className="text-sm font-extrabold text-foreground">Krishi Live Intelligence</p>
                    <p className="text-xs text-muted-foreground">Nashik APMC & Maharashtra Hub</p>
                  </div>
                </div>
                <Badge variant="success" className="text-[10px] uppercase font-bold tracking-wider">
                  Live Sync
                </Badge>
              </div>

              {/* Mandi Bhav Ticker Box */}
              <div className="mt-4 rounded-2xl bg-muted/40 p-3.5 border border-border/60">
                <div className="flex items-center justify-between text-xs font-bold text-muted-foreground mb-2 px-1">
                  <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                    <HiTrendingUp className="h-4 w-4" /> Live Mandi Rates (प्रति क्विंटल)
                  </span>
                  <Link to="/price-prediction" className="text-primary hover:underline text-[11px]">
                    View all 50+ mandis →
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between rounded-xl bg-card p-2.5 text-xs shadow-xs border border-border/40">
                    <div>
                      <span className="font-bold text-foreground">Wheat (गेहूं - Sharbati)</span>
                      <p className="text-[10px] text-muted-foreground">Nashik Mandi · Arrival 450 Q</p>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-foreground">₹2,450/Q</span>
                      <span className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        ▲ +4.5% (Hold Signal)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between rounded-xl bg-card p-2.5 text-xs shadow-xs border border-border/40">
                    <div>
                      <span className="font-bold text-foreground">Basmati Rice (चावल)</span>
                      <p className="text-[10px] text-muted-foreground">Punjab / Haryana Mandi</p>
                    </div>
                    <div className="text-right">
                      <span className="font-extrabold text-foreground">₹3,500/Q</span>
                      <span className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                        ▲ +2.8% (Export Demand)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weather & Spray Alert + Crop Doctor Snippet */}
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Weather advisory */}
                <div className="rounded-2xl bg-emerald-500/10 p-3.5 border border-emerald-500/20">
                  <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    <HiCloud className="h-4 w-4" /> Mausam Salah
                  </div>
                  <p className="mt-1 text-lg font-black text-foreground">28°C · 62% Hum</p>
                  <p className="mt-0.5 text-[11px] font-medium text-emerald-800 dark:text-emerald-200">
                    Foliar spray window: Safe before 11 AM
                  </p>
                </div>

                {/* Crop Doctor scan card */}
                <div className="rounded-2xl bg-amber-500/10 p-3.5 border border-amber-500/20">
                  <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold text-xs">
                    <HiSparkles className="h-4 w-4" /> Crop Doctor
                  </div>
                  <p className="mt-1 text-xs font-extrabold text-foreground truncate">
                    Tomato Early Blight
                  </p>
                  <p className="mt-0.5 text-[11px] font-medium text-amber-800 dark:text-amber-200">
                    Organic Neem Solution · 94% Match
                  </p>
                </div>
              </div>

              {/* Action Banner */}
              <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-xs text-muted-foreground">
                <span>Have an infected leaf photo?</span>
                <Link
                  to="/disease-detection"
                  className="font-bold text-primary hover:underline flex items-center gap-1"
                >
                  Upload & Scan Now <HiArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
