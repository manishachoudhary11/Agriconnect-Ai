import { Link } from "react-router-dom";
import {
  HiArrowRight,
  HiChartBar,
  HiCloud,
  HiSparkles,
  HiTrendingUp,
} from "react-icons/hi";
import { Badge } from "../ui";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/60 via-background to-background" />
      <div
        className="absolute -right-32 top-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-slide-up">
            <Badge variant="primary" className="mb-6">
              AgriConnect AI 2.0 — Smart Agriculture Platform
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Smart farming,
              <span className="text-primary"> powered by AI</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Crop management, AI recommendations, marketplace, weather intelligence,
              and disease detection — everything farmers and buyers need in one platform.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Trusted by 10,000+ farmers across India
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/register"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary-hover"
              >
                Get started free
                <HiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/#how-it-works"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-6 text-sm font-medium text-foreground transition hover:bg-muted"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="animate-fade-in lg:pl-4">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div>
                  <p className="text-sm font-medium">Farm Overview</p>
                  <p className="text-xs text-muted-foreground">Nashik, Maharashtra</p>
                </div>
                <Badge variant="success">Live</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-muted/50 p-4">
                  <HiCloud className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-2xl font-bold">28°C</p>
                  <p className="text-xs text-muted-foreground">Partly cloudy</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4">
                  <HiTrendingUp className="h-5 w-5 text-success" />
                  <p className="mt-2 text-2xl font-bold">₹2,450</p>
                  <p className="text-xs text-muted-foreground">Wheat price/unit</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4">
                  <HiSparkles className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-sm font-semibold">AI Insight</p>
                  <p className="text-xs text-muted-foreground">Irrigate tomorrow AM</p>
                </div>
                <div className="rounded-xl bg-muted/50 p-4">
                  <HiChartBar className="h-5 w-5 text-primary" />
                  <p className="mt-2 text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Active crops</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
