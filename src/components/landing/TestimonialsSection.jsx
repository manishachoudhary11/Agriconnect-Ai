import { Card } from "../ui";

const testimonials = [
  {
    name: "Rajesh Patil",
    role: "Farmer",
    location: "Nashik, MH",
    quote:
      "AgriConnect AI helped me detect tomato blight early and connected me with buyers at better prices. My yield increased 20% this season.",
    initials: "RP",
  },
  {
    name: "Priya Sharma",
    role: "Buyer",
    location: "Pune, MH",
    quote:
      "I source fresh produce directly from farmers. The marketplace is easy to use and the quality listings save me hours every week.",
    initials: "PS",
  },
  {
    name: "Amit Kumar",
    role: "Farmer",
    location: "Lucknow, UP",
    quote:
      "The AI assistant answers my questions in Hindi-friendly terms. Weather alerts and price predictions have changed how I plan my harvest.",
    initials: "AK",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="border-y border-border bg-muted/20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by farmers & buyers
          </h2>
          <p className="mt-4 text-muted-foreground">
            See what our community says about farming smarter with AgriConnect AI.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.role} · {t.location}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
