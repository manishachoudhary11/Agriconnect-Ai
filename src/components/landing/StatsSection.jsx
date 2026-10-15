import {
  HiUserGroup,
  HiTrendingUp,
  HiShieldCheck,
  HiCurrencyRupee,
} from "react-icons/hi";

const stats = [
  {
    value: "50,000+",
    label: "Farmers & Growers Assisted",
    subtext: "Across major agricultural belts",
    icon: HiUserGroup,
  },
  {
    value: "120+",
    label: "APMC Mandis Monitored Daily",
    subtext: "Real-time spot price telemetry",
    icon: HiTrendingUp,
  },
  {
    value: "95%",
    label: "Diagnostic Match Precision",
    subtext: "Validated crop pathology dataset",
    icon: HiShieldCheck,
  },
  {
    value: "₹4.8 Cr+",
    label: "Direct Wholesale Produce Traded",
    subtext: "Zero commission middleman cuts",
    icon: HiCurrencyRupee,
  },
];

export default function StatsSection() {
  return (
    <section className="border-b border-border bg-muted/30 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-5 rounded-2xl bg-card border border-border shadow-xs hover:shadow-sm transition"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-3 border border-emerald-500/20">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-bold text-foreground">
                {stat.label}
              </p>
              <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{stat.subtext}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
