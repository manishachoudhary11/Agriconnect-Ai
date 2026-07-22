import { HiCloud, HiSun, HiSparkles, HiLocationMarker } from "react-icons/hi";
import { Card, Badge } from "../ui";

export default function WeatherWidget({ weather }) {
  if (!weather) return null;

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-900/20 via-background to-background border-border p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HiLocationMarker className="h-5 w-5 text-emerald-500" />
          <span className="font-semibold text-sm">{weather.location}</span>
        </div>
        <Badge variant="success">Live Weather</Badge>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-4xl font-extrabold tracking-tight">{weather.temperature}°C</p>
          <p className="text-sm font-medium text-muted-foreground mt-1">{weather.condition}</p>
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
          {weather.condition.toLowerCase().includes("sun") ? (
            <HiSun className="h-10 w-10 animate-spin-slow" />
          ) : (
            <HiCloud className="h-10 w-10" />
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border/60 pt-4 text-center">
        <div>
          <p className="text-xs text-muted-foreground">Humidity</p>
          <p className="text-sm font-bold mt-1">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Wind</p>
          <p className="text-sm font-bold mt-1">{weather.wind_speed} km/h</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Rain Risk</p>
          <p className="text-sm font-bold mt-1">{weather.rain_forecast}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-muted/40 p-2.5 text-xs text-muted-foreground">
        <HiSparkles className="h-4 w-4 text-amber-500 shrink-0" />
        <span>Weather-based irrigation advice: Maintain standard watering schedules today.</span>
      </div>
    </Card>
  );
}
