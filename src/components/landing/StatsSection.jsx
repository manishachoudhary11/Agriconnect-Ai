import {
  HiUserGroup,
  HiTrendingUp,
  HiShieldCheck,
  HiCurrencyRupee,
} from "react-icons/hi";

const stats = [
  {
    value: "50,000+",
    hindiLabel: "किसान जुड़े हुए हैं",
    label: "Progressive Farmers Assisted",
    icon: HiUserGroup,
  },
  {
    value: "120+",
    hindiLabel: "मंडियों के दैनिक भाव",
    label: "APMC Mandis Monitored Daily",
    icon: HiTrendingUp,
  },
  {
    value: "95%",
    hindiLabel: "सटीक रोग पहचान",
    label: "Disease Diagnostic Precision",
    icon: HiShieldCheck,
  },
  {
    value: "₹4.8 Cr+",
    hindiLabel: "सीधा व्यापार मूल्य",
    label: "Direct B2B Produce Traded",
    icon: HiCurrencyRupee,
  },
];

export default function StatsSection() {
  return (
    <section className="border-b border-border bg-gradient-to-r from-emerald-900/10 via-muted/30 to-emerald-900/10 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-card/60 border border-border/60 shadow-xs"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
                {stat.value}
              </p>
              <p className="mt-1 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                {stat.hindiLabel}
              </p>
              <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
