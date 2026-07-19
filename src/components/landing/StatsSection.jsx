const stats = [
  { value: "10K+", label: "Farmers onboarded" },
  { value: "50+", label: "Crop varieties tracked" },
  { value: "1M+", label: "AI queries answered" },
  { value: "500+", label: "Marketplace listings" },
];

export default function StatsSection() {
  return (
    <section className="border-b border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
