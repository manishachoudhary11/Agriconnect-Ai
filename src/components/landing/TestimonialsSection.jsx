import { Card } from "../ui";
import { HiShieldCheck, HiStar } from "react-icons/hi";

const testimonials = [
  {
    name: "Ramesh Patel",
    role: "Progressive Wheat & Tomato Farmer",
    location: "Nashik, Maharashtra",
    quote:
      "Crop Doctor identified early blight on my tomato crop in seconds. Following the neem oil schedule saved 3 acres of harvest and helped me achieve +22% higher marketable yield this season.",
    cropTag: "🌾 Wheat & Tomato",
    stat: "+22% Yield Saved",
    initials: "RP",
  },
  {
    name: "Gurpreet Singh",
    role: "Basmati Rice Producer",
    location: "Karnal, Haryana",
    quote:
      "Checking Mandi Bhav before loading my tractor trolley earned me ₹160 more per quintal. Connecting directly with export buyers on the marketplace eliminated commission agent cuts completely.",
    cropTag: "🌾 Basmati 1121",
    stat: "₹160/Q Extra Profit",
    initials: "GS",
  },
  {
    name: "Sunita Deshmukh",
    role: "FPO Director & Pomegranate Grower",
    location: "Solapur, Maharashtra",
    quote:
      "Mausam Salah's morning spray alerts helped our 40-member FPO avoid chemical washouts before unseasonal rainfall. The Gemini AI agronomist is now trusted across our entire cluster.",
    cropTag: "🍎 Pomegranate & Grapes",
    stat: "15% Cost Reduction",
    initials: "SD",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-muted/20 via-background to-muted/20 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-3">
            <span>🤝 Farmer Success Stories</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Trusted by Growers & FPOs Across India
          </h2>
          <p className="mt-3 text-base text-muted-foreground leading-relaxed">
            Real outcomes from progressive growers who use AgriConnect AI for disease control, mandi rate tracking, and direct sales.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="flex flex-col justify-between p-6 rounded-3xl border-border shadow-md hover:shadow-xl transition-all duration-200"
            >
              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <HiStar key={i} className="h-4 w-4" />
                  ))}
                  <span className="ml-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <HiShieldCheck className="h-3.5 w-3.5" /> Verified Grower
                  </span>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-sm font-bold text-white shadow-xs">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-extrabold text-sm text-foreground">
                      {t.name}
                    </p>
                    <p className="text-[11px] font-medium text-muted-foreground">
                      {t.role} · {t.location}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2 flex items-center justify-between text-[11px] font-bold">
                <span className="text-muted-foreground">{t.cropTag}</span>
                <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                  {t.stat}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
