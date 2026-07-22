import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Card } from "../ui";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

export function PriceTrendChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <Card
      title="Crop Market Price Trends (₹/Quintal)"
      description="6-Month historical price movements for major crops"
      className="p-4"
    >
      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWheat" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="currentColor" className="text-xs text-muted-foreground" />
            <YAxis stroke="currentColor" className="text-xs text-muted-foreground" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "#fff",
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
            />
            <Area
              type="monotone"
              dataKey="Wheat"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWheat)"
            />
            <Area
              type="monotone"
              dataKey="Rice"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRice)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export function CropDistributionChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <Card
      title="Crop Inventory Distribution"
      description="Breakdown of registered produce by volume"
      className="p-4"
    >
      <div className="h-72 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(15, 23, 42, 0.9)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
