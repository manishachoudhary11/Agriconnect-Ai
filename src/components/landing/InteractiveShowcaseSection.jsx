import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiCamera,
  HiTrendingUp,
  HiCloud,
  HiSparkles,
  HiCheckCircle,
  HiArrowRight,
  HiSun,
} from "react-icons/hi";
import { Badge } from "../ui";

export default function InteractiveShowcaseSection() {
  const [activeTab, setActiveTab] = useState("doctor");

  // State for interactive Mandi Tab
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const cropData = {
    wheat: {
      name: "Wheat (Sharbati Grade 1)",
      mandi: "Nashik APMC",
      current: 2450,
      predicted: 2560,
      change: "+4.5%",
      trend: "up",
      advice: "Demand is strong across flour mills. Hold 40% of inventory for peak season pricing.",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    },
    rice: {
      name: "Basmati Rice (1121)",
      mandi: "Karnal APMC",
      current: 3500,
      predicted: 3600,
      change: "+2.8%",
      trend: "up",
      advice: "Export demand to Gulf countries holding prices firm. Ideal time to enter pre-season contracts.",
      image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=600&q=80",
    },
    cotton: {
      name: "Cotton (Medium Staple)",
      mandi: "Rajkot APMC",
      current: 6800,
      predicted: 7100,
      change: "+4.4%",
      trend: "up",
      advice: "Textile mill procurement active. Quality fiber commands high premium over MSP.",
      image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80",
    },
    onion: {
      name: "Red Onion (Nashik Special)",
      mandi: "Lasalgaon Mandi",
      current: 2200,
      predicted: 2450,
      change: "+11.4%",
      trend: "up",
      advice: "Arrivals stabilizing. Grade 1 quality onions expected to appreciate over next 15 days.",
      image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    },
  };

  // State for interactive Weather Tab
  const [selectedCity, setSelectedCity] = useState("Nashik");
  const weatherData = {
    Nashik: { temp: "28°C", condition: "Partly Cloudy", humidity: "62%", wind: "14 km/h", advice: "High humidity may trigger mild fungal spore germination. Complete foliar spray before 11 AM." },
    Pune: { temp: "30°C", condition: "Sunny", humidity: "54%", wind: "12 km/h", advice: "Ideal weather for soil preparation and CRI stage irrigation for wheat." },
    Nagpur: { temp: "31°C", condition: "Clear Sky", humidity: "48%", wind: "10 km/h", advice: "Dry conditions. Cotton harvesting can proceed without moisture risk." },
    Indore: { temp: "27°C", condition: "Sunny", humidity: "56%", wind: "11 km/h", advice: "Optimal morning temperatures for seed treatment and field maintenance." },
  };

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 border-b border-border">
      <div className="mx-auto max-w-3xl text-center">
        <Badge variant="primary" className="mb-3 text-xs font-bold">
          ⚡ Interactive Simulator
        </Badge>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
          Experience AgriConnect AI in Action
        </h2>
        <p className="mt-3 text-base text-muted-foreground leading-relaxed">
          Switch tabs below to test live simulations of our diagnostic scanner, market price forecaster, microclimate advisories, and AI agronomist.
        </p>
      </div>

      {/* Tab Switcher Pills */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        <button
          onClick={() => setActiveTab("doctor")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shadow-xs ${
            activeTab === "doctor"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <HiCamera className="h-4 w-4" />
          <span>Crop Diagnosis</span>
        </button>

        <button
          onClick={() => setActiveTab("mandi")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shadow-xs ${
            activeTab === "mandi"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <HiTrendingUp className="h-4 w-4" />
          <span>Mandi Prices</span>
        </button>

        <button
          onClick={() => setActiveTab("weather")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shadow-xs ${
            activeTab === "weather"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <HiCloud className="h-4 w-4" />
          <span>Weather Intelligence</span>
        </button>

        <button
          onClick={() => setActiveTab("chat")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shadow-xs ${
            activeTab === "chat"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <HiSparkles className="h-4 w-4" />
          <span>AI Agronomy Advisor</span>
        </button>
      </div>

      {/* Tab Content Display Container */}
      <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-xl">
        {/* TAB 1: CROP DOCTOR */}
        {activeTab === "doctor" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                AI Leaf Diagnosis Simulation
              </span>
              <h3 className="text-2xl font-extrabold text-foreground">
                Tomato Early Blight (Alternaria solani)
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Our computer vision pipeline maps uploaded leaf lesions against verified diagnostic databases, generating separate organic and chemical remedies in seconds.
              </p>

              <div className="space-y-2.5 pt-2">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs">
                  <strong className="text-emerald-700 dark:text-emerald-300 block mb-0.5">
                    🌱 Organic Treatment:
                  </strong>
                  Apply Neem oil spray (5ml per liter water) every 7 days. Prune lower foliage close to soil line.
                </div>
                <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3 text-xs">
                  <strong className="text-blue-700 dark:text-blue-300 block mb-0.5">
                    🧪 Chemical Treatment:
                  </strong>
                  Foliar spray of Chlorothalonil 75 WP (2g/L) or Mancozeb (2.5g/L).
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/disease-detection"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary-hover transition"
                >
                  <HiCamera className="h-4 w-4" />
                  Try Real Scan with Your Photo
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 bg-muted/40 rounded-2xl p-6 border border-border">
              <div className="relative h-48 w-full overflow-hidden rounded-xl mb-4">
                <img
                  src="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80"
                  alt="Infected Leaf Analysis"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/80 backdrop-blur-md px-2 py-0.5 rounded text-slate-950">
                    Active Computer Vision Detection
                  </span>
                  <p className="text-xs font-extrabold mt-1">Lesion pattern matched with 94% confidence</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-card rounded-xl border border-border">
                  <span className="text-muted-foreground block text-[11px]">Crop Identified</span>
                  <span className="font-bold text-sm">Tomato (Solanum lycopersicum)</span>
                </div>
                <div className="p-3 bg-card rounded-xl border border-border">
                  <span className="text-muted-foreground block text-[11px]">Severity Level</span>
                  <span className="font-bold text-sm text-amber-600">Moderate (Stage 2)</span>
                </div>
                <div className="p-3 bg-card rounded-xl border border-border">
                  <span className="text-muted-foreground block text-[11px]">Spread Risk</span>
                  <span className="font-bold text-sm">Elevated due to humidity</span>
                </div>
                <div className="p-3 bg-card rounded-xl border border-border">
                  <span className="text-muted-foreground block text-[11px]">Estimated Yield Saved</span>
                  <span className="font-bold text-sm text-emerald-600">+18% with early treatment</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANDI PRICES WITH REAL CROP PHOTOS */}
        {activeTab === "mandi" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-foreground">
                  Commodity Market Prices & 30-Day Directional Forecast
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select a commodity to view spot market pricing and inventory recommendations.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {Object.keys(cropData).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCrop(key)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                      selectedCrop === key
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Crop Image Showcase */}
              <div className="md:col-span-5 relative h-56 rounded-2xl overflow-hidden border border-border shadow-md">
                <img
                  src={cropData[selectedCrop].image}
                  alt={cropData[selectedCrop].name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <p className="text-lg font-black">{cropData[selectedCrop].name}</p>
                  <p className="text-xs text-slate-300">{cropData[selectedCrop].mandi}</p>
                </div>
              </div>

              {/* Data & Forecast */}
              <div className="md:col-span-7 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-muted/40 p-4 border border-border">
                    <span className="text-xs text-muted-foreground font-semibold">Current Mandi Rate</span>
                    <p className="text-2xl font-black text-foreground mt-1">₹{cropData[selectedCrop].current} / Q</p>
                    <span className="text-xs font-bold text-emerald-600">▲ {cropData[selectedCrop].change} (Trending Up)</span>
                  </div>

                  <div className="rounded-2xl bg-emerald-500/10 p-4 border border-emerald-500/20">
                    <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">30-Day AI Projection</span>
                    <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                      ₹{cropData[selectedCrop].predicted} / Q
                    </p>
                    <Badge variant="success" className="text-[10px] mt-1 font-bold">
                      Recommended: HOLD INVENTORY
                    </Badge>
                  </div>
                </div>

                <div className="rounded-xl bg-card p-4 border border-border text-xs leading-relaxed flex items-center justify-between flex-wrap gap-3">
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Market Commentary: </strong>
                    {cropData[selectedCrop].advice}
                  </p>
                  <Link
                    to="/price-prediction"
                    className="text-xs font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
                  >
                    View Historical Charts <HiArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MAUSAM SALAH */}
        {activeTab === "weather" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-foreground">
                  Agricultural Microclimate Advisory
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Select key agricultural districts to see live weather metrics and Gemini spray recommendations.
                </p>
              </div>
              <div className="flex items-center gap-2">
                {Object.keys(weatherData).map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      selectedCity === city
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="rounded-2xl bg-muted/40 p-4 border border-border">
                <span className="text-xs text-muted-foreground font-semibold">Temperature</span>
                <p className="text-2xl font-black text-foreground mt-1 flex items-center gap-2">
                  <HiSun className="h-6 w-6 text-amber-500" />
                  {weatherData[selectedCity].temp}
                </p>
                <span className="text-xs text-muted-foreground">{weatherData[selectedCity].condition}</span>
              </div>

              <div className="rounded-2xl bg-muted/40 p-4 border border-border">
                <span className="text-xs text-muted-foreground font-semibold">Relative Humidity</span>
                <p className="text-2xl font-black text-foreground mt-1">{weatherData[selectedCity].humidity}</p>
                <span className="text-xs text-muted-foreground">Atmospheric moisture</span>
              </div>

              <div className="rounded-2xl bg-muted/40 p-4 border border-border">
                <span className="text-xs text-muted-foreground font-semibold">Wind Velocity</span>
                <p className="text-2xl font-black text-foreground mt-1">{weatherData[selectedCity].wind}</p>
                <span className="text-xs text-muted-foreground">Optimal for spraying</span>
              </div>

              <div className="rounded-2xl bg-emerald-500/10 p-4 border border-emerald-500/20">
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">Precipitation Risk</span>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">Normal</p>
                <span className="text-xs text-emerald-700 dark:text-emerald-300">10% Rain chance today</span>
              </div>
            </div>

            <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4 text-xs">
              <strong className="text-purple-700 dark:text-purple-300 block mb-1 font-bold flex items-center gap-1.5">
                <HiSparkles className="h-4 w-4" /> Gemini AI Agronomy Advisory for {selectedCity}:
              </strong>
              <p className="text-muted-foreground">{weatherData[selectedCity].advice}</p>
            </div>
          </div>
        )}

        {/* TAB 4: CHATBOT */}
        {activeTab === "chat" && (
          <div className="space-y-5 animate-fade-in">
            <div className="border-b border-border pb-4">
              <h3 className="text-xl font-extrabold text-foreground">
                24/7 AI Agricultural Advisor
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Farmers can ask specific crop, fertilizer, and pest questions for real-time recommendations.
              </p>
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              {/* Farmer message */}
              <div className="flex justify-end">
                <div className="rounded-2xl bg-primary text-primary-foreground p-3 text-xs max-w-md shadow-xs font-medium">
                  🌾 My wheat crop is 25 days old. When should I apply the first irrigation and what fertilizer is needed?
                </div>
              </div>

              {/* AI response */}
              <div className="flex justify-start">
                <div className="rounded-2xl bg-muted/60 border border-border p-3.5 text-xs max-w-lg leading-relaxed space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <HiSparkles className="h-4 w-4" />
                    <span>AgriConnect AI Agronomist</span>
                  </div>
                  <p className="text-foreground">
                    <strong>1. Crown Root Initiation (CRI Stage):</strong> First irrigation is critical at 21–25 days after sowing to stimulate vigorous root anchoring.
                  </p>
                  <p className="text-foreground">
                    <strong>2. Fertilizer Dosage:</strong> Top dress with 45 kg Urea and 5 kg Zinc Sulphate (33%) per acre immediately following the irrigation cycle.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <Link
                to="/ai-assistant"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-sm hover:bg-primary-hover transition"
              >
                <HiSparkles className="h-4 w-4" />
                Start Live Conversation with AI Advisor
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
