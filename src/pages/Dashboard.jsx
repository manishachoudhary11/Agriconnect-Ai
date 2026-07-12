import { useEffect, useState } from "react";
import { HiCloud, HiSparkles, HiTrendingUp } from "react-icons/hi";
import api from "../lib/api";
import { formatCurrency } from "../lib/utils";
import Navbar from "../components/Navbar";
import { Badge, Card, EmptyState, Loader, SkeletonCard } from "../components/ui";

export default function Dashboard() {
  const [crops, setCrops] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [cropsRes, statsRes] = await Promise.all([
          api.get("/api/crops"),
          api.get("/api/dashboard"),
        ]);
        setCrops(cropsRes.data);
        setStats(statsRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge variant="primary">Dashboard</Badge>
              <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Farmer Dashboard
              </h1>
              <p className="mt-2 text-muted-foreground">
                Monitor crops, weather, and AI recommendations in one place.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : error ? (
            <div className="mt-8">
              <EmptyState
                icon={HiCloud}
                title="Unable to load dashboard"
                description={error}
              />
            </div>
          ) : (
            <>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Total Crops" padding>
                  <p className="text-3xl font-bold">{stats?.total_crops ?? 0}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Active crop records</p>
                </Card>
                <Card title="Total Quantity" padding>
                  <p className="text-3xl font-bold">{stats?.total_quantity ?? 0}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Units across all crops</p>
                </Card>
                <Card title="Avg. Market Price" padding>
                  <p className="text-3xl font-bold">
                    {formatCurrency(stats?.average_market_price ?? 0)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">Per unit average</p>
                </Card>
                <Card title="Crop Health" padding>
                  <p className="text-3xl font-bold text-success">85%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Overall health score</p>
                </Card>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                <Card
                  className="lg:col-span-2"
                  title="Crop Market Prices"
                  description="Live prices from your registered crops"
                >
                  {crops.length === 0 ? (
                    <EmptyState
                      icon={HiTrendingUp}
                      title="No crops yet"
                      description="Add your first crop to start tracking market prices."
                    />
                  ) : (
                    <div className="space-y-3">
                      {crops.map((crop) => (
                        <div
                          key={crop.id}
                          className="flex flex-col gap-2 rounded-xl border border-border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div>
                            <p className="font-semibold">{crop.name}</p>
                            <p className="text-sm text-muted-foreground">{crop.location}</p>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span>{crop.quantity} units</span>
                            <Badge variant="success">{formatCurrency(crop.market_price)}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                <div className="space-y-6">
                  <Card title="Weather" description="Current conditions">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
                        <HiCloud className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">28°C</p>
                        <p className="text-sm text-muted-foreground">Sunny · Nashik</p>
                      </div>
                    </div>
                  </Card>

                  <Card title="AI Insight" description="Today's recommendation">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                        <HiSparkles className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Rice</p>
                        <p className="text-sm text-muted-foreground">
                          Best performing crop in your portfolio today.
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )}

          {loading && (
            <div className="mt-8 flex justify-center">
              <Loader label="Loading dashboard data" />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
