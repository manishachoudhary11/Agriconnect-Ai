import { HiClock, HiShoppingBag, HiPhotograph, HiPlusCircle, HiCheckCircle } from "react-icons/hi";
import { Card } from "../ui";

export default function RecentActivity({ activities }) {
  if (!activities || activities.length === 0) return null;

  const getActivityIcon = (type) => {
    switch (type) {
      case "crop":
        return <HiPlusCircle className="h-5 w-5 text-emerald-500" />;
      case "listing":
        return <HiShoppingBag className="h-5 w-5 text-blue-500" />;
      case "scan":
        return <HiPhotograph className="h-5 w-5 text-purple-500" />;
      default:
        return <HiCheckCircle className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <Card title="Recent Activity" description="Latest transactions and farm events" className="p-5">
      <div className="relative border-l border-border/80 pl-6 space-y-6 mt-4 ml-2">
        {activities.map((act) => (
          <div key={act.id} className="relative group">
            <div className="absolute -left-[31px] top-0 flex h-7 w-7 items-center justify-center rounded-full bg-background border border-border shadow-sm group-hover:scale-110 transition-transform">
              {getActivityIcon(act.type)}
            </div>
            <div>
              <p className="font-semibold text-sm">{act.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{act.description}</p>
              <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground/70 mt-1">
                <HiClock className="h-3 w-3" /> {act.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
