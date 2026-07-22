import { useEffect, useState } from "react";
import {
  HiBell,
  HiCloud,
  HiShoppingBag,
  HiSparkles,
  HiCheckCircle,
  HiTrash,
  HiCheck,
  HiOutlineLightningBolt,
  HiClock,
} from "react-icons/hi";
import api from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge, Card, EmptyState, Loader, Button } from "../components/ui";

const CATEGORY_FILTERS = ["All", "weather", "marketplace", "ai", "crop"];

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/notifications");
      setNotifications(res.data.items || []);
      setUnreadCount(res.data.unread_count || 0);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await api.post(`/api/notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.post("/api/notifications/read-all");
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSeedDemoAlerts = async () => {
    try {
      await api.post("/api/notifications/seed");
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.type === filter);

  const getNotifIcon = (type) => {
    switch (type) {
      case "weather":
        return <HiCloud className="h-5 w-5 text-blue-500" />;
      case "marketplace":
        return <HiShoppingBag className="h-5 w-5 text-emerald-500" />;
      case "ai":
        return <HiSparkles className="h-5 w-5 text-purple-500" />;
      default:
        return <HiCheckCircle className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />

      <main className="flex-1 mx-auto max-w-5xl w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-fade-in space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="primary">Notification Center</Badge>
                {unreadCount > 0 && (
                  <Badge variant="warning">{unreadCount} Unread Alerts</Badge>
                )}
              </div>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Alerts & Updates
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Stay updated on weather risks, marketplace trade inquiries, and AI farming tips.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAllRead}
                  className="inline-flex items-center gap-1 text-xs"
                >
                  <HiCheck className="h-4 w-4" /> Mark All as Read
                </Button>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={handleSeedDemoAlerts}
                className="inline-flex items-center gap-1 text-xs"
              >
                <HiOutlineLightningBolt className="h-4 w-4" /> Seed Demo Alerts
              </Button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
            <span className="font-semibold text-muted-foreground shrink-0">Filter Category:</span>
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`capitalize px-3.5 py-1.5 rounded-xl border font-semibold transition shrink-0 ${
                  filter === cat
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                    : "border-border bg-card hover:border-emerald-500/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Notifications List */}
          {loading ? (
            <Card className="p-12 text-center">
              <Loader label="Loading notifications..." />
            </Card>
          ) : error ? (
            <Card className="p-8">
              <EmptyState
                icon={HiBell}
                title="Unable to load notifications"
                description={error}
                action={<Button variant="outline" onClick={fetchNotifications}>Try Again</Button>}
              />
            </Card>
          ) : filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <EmptyState
                icon={HiBell}
                title="No notifications in this category"
                description="Click 'Seed Demo Alerts' above to generate sample notifications for testing."
                action={
                  <Button variant="primary" onClick={handleSeedDemoAlerts}>
                    Generate Demo Alerts
                  </Button>
                }
              />
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((n) => (
                <Card
                  key={n.id}
                  className={`p-4 transition-all hover:border-emerald-500/40 flex items-start justify-between gap-4 ${
                    !n.is_read ? "bg-emerald-500/5 border-emerald-500/30" : "bg-card"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background border border-border shadow-sm mt-0.5">
                      {getNotifIcon(n.type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm">{n.title}</h4>
                        <Badge variant="outline" className="capitalize text-[10px]">
                          {n.type}
                        </Badge>
                        {!n.is_read && (
                          <span className="h-2 w-2 rounded-full bg-emerald-500" title="Unread" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{n.message}</p>
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/70">
                        <HiClock className="h-3 w-3" /> {new Date(n.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {!n.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(n.id)}
                      className="p-1.5 rounded-lg border border-border text-xs font-semibold text-muted-foreground hover:text-emerald-500 hover:border-emerald-500/50 transition shrink-0"
                      title="Mark as read"
                    >
                      <HiCheck className="h-4 w-4" />
                    </button>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
