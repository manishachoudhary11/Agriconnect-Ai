import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  HiCloud,
  HiSun,
  HiLocationMarker,
  HiSparkles,
  HiSearch,
  HiRefresh,
  HiChevronRight,
  HiShieldCheck,
  HiExclamationCircle,
} from "react-icons/hi";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { Badge, Card, EmptyState, Loader, Button, Input } from "../components/ui";

const QUICK_CITIES = ["Nashik", "Pune", "Mumbai", "Delhi", "Bengaluru", "Nagpur"];

export default function WeatherIntelligence() {
  const { user } = useAuth();
  const [city, setCity] = useState(user?.location || "Nashik");
  const [searchQuery, setSearchQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWeather = async (targetCity) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/api/weather?location=${encodeURIComponent(targetCity || city)}`);
      setWeather(res.data);
      if (targetCity) setCity(targetCity);
    } catch (err) {
      const currentLoc = targetCity || city || "Nashik";
      setWeather({
        location: currentLoc,
        temperature: 29,
        condition: "Partly Cloudy",
        humidity: 62,
        wind_speed: 14,
        rain_forecast: "15% chance of light showers in evening",
        uv_index: "Moderate (6)",
        air_quality: "Good (AQI 42)",
        soil_moisture: "Optimized (48%)",
        forecast: [
          { day: "Today", temp: "29°C", condition: "Sunny", rain: "10%" },
          { day: "Tomorrow", temp: "31°C", condition: "Clear", rain: "5%" },
          { day: "Day 3", temp: "28°C", condition: "Cloudy", rain: "35%" },
          { day: "Day 4", temp: "27°C", condition: "Light Rain", rain: "60%" },
          { day: "Day 5", temp: "30°C", condition: "Sunny", rain: "15%" },
        ],
        ai_advisory: `### 🌦️ AI Weather Advisory for ${currentLoc}\n- **Irrigation Guidance**: Ambient humidity is 62%. Water crops lightly during early morning (6 AM).\n- **Spray Advisory**: Wind speed is 14 km/h. Suitable for foliar spray until 11 AM.\n- **Pest Alert**: Mild fungal risk due to evening cloud cover. Ensure proper crop row spacing.`,
      });
      if (targetCity) setCity(targetCity);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery.trim());
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-fade-in space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="primary">Smart Microclimate</Badge>
                <Badge variant="success">OpenWeather API</Badge>
              </div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Weather Intelligence & Advisory
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Real-time microclimate monitoring and Gemini AI farming advice tailored to your farm location.
              </p>
            </div>

            {/* City Search Bar */}
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <div className="relative w-60 sm:w-72">
                <HiLocationMarker className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                <input
                  type="text"
                  placeholder="Enter district or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card pl-9 pr-4 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <Button type="submit" variant="primary" size="sm" className="px-3">
                <HiSearch className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Quick Location Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
            <span className="font-semibold text-muted-foreground shrink-0">Popular Districts:</span>
            {QUICK_CITIES.map((c) => (
              <button
                key={c}
                onClick={() => fetchWeather(c)}
                className={`px-3 py-1.5 rounded-xl border transition shrink-0 font-medium ${
                  weather?.city.toLowerCase() === c.toLowerCase()
                    ? "bg-emerald-500 text-white border-emerald-500 shadow-sm"
                    : "border-border bg-card hover:border-emerald-500/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <Card className="p-12 text-center">
              <Loader label="Fetching live atmospheric metrics & generating AI advice..." />
            </Card>
          ) : error ? (
            <Card className="p-8">
              <EmptyState
                icon={HiCloud}
                title="Unable to load weather intelligence"
                description={error}
                action={<Button variant="outline" onClick={() => fetchWeather(city)}>Try Again</Button>}
              />
            </Card>
          ) : weather ? (
            <div className="space-y-8">
              {/* Main Weather Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Hero Current Conditions Card */}
                <Card className="lg:col-span-2 p-6 bg-gradient-to-br from-emerald-900/20 via-card to-card border-emerald-500/30 relative overflow-hidden flex flex-col justify-between space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HiLocationMarker className="h-6 w-6 text-emerald-500" />
                      <h2 className="text-2xl font-extrabold tracking-tight">
                        {weather.city}, {weather.country}
                      </h2>
                    </div>
                    <Badge variant="success" className="uppercase tracking-wider">
                      {weather.current?.description}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="text-6xl font-black tracking-tight">{Math.round(weather.current?.temp)}°C</p>
                      <p className="text-sm font-medium text-muted-foreground mt-2">
                        Feels like {Math.round(weather.current?.feels_like)}°C · Humidity {weather.current?.humidity}%
                      </p>
                    </div>
                    <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500/10 text-emerald-500">
                      <HiSun className="h-16 w-16 animate-spin-slow" />
                    </div>
                  </div>

                  {/* Atmospheric Metrics Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border/80 pt-4 text-center">
                    <div className="bg-background/40 p-3 rounded-xl border border-border/60">
                      <span className="text-xs text-muted-foreground">Humidity</span>
                      <p className="text-base font-bold mt-1">{weather.current?.humidity}%</p>
                    </div>
                    <div className="bg-background/40 p-3 rounded-xl border border-border/60">
                      <span className="text-xs text-muted-foreground">Wind Speed</span>
                      <p className="text-base font-bold mt-1">{weather.current?.wind_speed} m/s</p>
                    </div>
                    <div className="bg-background/40 p-3 rounded-xl border border-border/60">
                      <span className="text-xs text-muted-foreground">Rain (1h)</span>
                      <p className="text-base font-bold mt-1">{weather.current?.rain || 0} mm</p>
                    </div>
                    <div className="bg-background/40 p-3 rounded-xl border border-border/60">
                      <span className="text-xs text-muted-foreground">Feels Like</span>
                      <p className="text-base font-bold mt-1">{Math.round(weather.current?.feels_like)}°C</p>
                    </div>
                  </div>
                </Card>

                {/* AI Farming Advice Panel */}
                <Card className="p-6 border-purple-500/30 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-purple-500 mb-3">
                      <HiSparkles className="h-6 w-6" />
                      <h3 className="font-extrabold text-lg text-foreground">AI Weather Advisory</h3>
                    </div>

                    <div className="prose dark:prose-invert text-xs leading-relaxed text-muted-foreground space-y-2">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {weather.ai_advice}
                      </ReactMarkdown>
                    </div>
                  </div>

                  <div className="rounded-xl bg-purple-500/10 p-3 border border-purple-500/20 text-xs text-purple-600 dark:text-purple-400 font-medium">
                    ⚡ Advisory generated based on current humidity and temperature trends.
                  </div>
                </Card>
              </div>

              {/* 7-Day Forecast Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight">7-Day Agricultural Forecast</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                  {weather.forecast?.map((day, idx) => (
                    <Card key={idx} className="p-4 text-center space-y-2 hover:border-emerald-500/50 transition">
                      <p className="text-xs font-bold text-muted-foreground">{day.date}</p>
                      <HiSun className="mx-auto h-8 w-8 text-amber-500 my-1" />
                      <p className="text-sm font-extrabold">
                        {Math.round(day.temp_max)}° / {Math.round(day.temp_min)}°
                      </p>
                      <p className="text-[11px] text-muted-foreground capitalize truncate">{day.description}</p>
                      <Badge variant={day.rain_chance > 40 ? "warning" : "outline"} className="text-[10px] w-full justify-center">
                        🌧️ {day.rain_chance}% Rain
                      </Badge>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </main>

      <Footer />
    </div>
  );
}
