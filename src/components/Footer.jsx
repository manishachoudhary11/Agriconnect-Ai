import { Link } from "react-router-dom";
import { HiMail, HiPhone, HiShieldCheck } from "react-icons/hi";

const footerLinks = {
  "Kisan Services": [
    { label: "Crop Doctor (रोग निदान)", to: "/disease-detection" },
    { label: "Mandi Bhav (मंडी भाव)", to: "/price-prediction" },
    { label: "Mausam Salah (मौसम सलाह)", to: "/weather" },
    { label: "Kisan Bazaar (थोक बाज़ार)", to: "/marketplace" },
    { label: "AI Krishi Salahkar", to: "/ai-assistant" },
    { label: "Meri Fasal (फसल प्रबंधन)", to: "/crops" },
  ],
  Platform: [
    { label: "Dashboard", to: "/dashboard" },
    { label: "About AgriConnect", to: "/about" },
    { label: "Features Overview", to: "/#features" },
    { label: "How It Works", to: "/#how-it-works" },
    { label: "FAQ", to: "/#faq" },
  ],
  Transparency: [
    { label: "Privacy Policy", to: "/privacy" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Mandi Data Disclaimer", to: "/terms" },
    { label: "Agronomy Advisory Notice", to: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      {/* Top Banner on Footer */}
      <div className="border-b border-border bg-emerald-950/10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2 text-foreground">
            <HiShieldCheck className="h-5 w-5 text-emerald-600" />
            <span>Built to support Indian farmers with data intelligence, market transparency, and disease control.</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
            <HiPhone className="h-4 w-4 text-amber-500" />
            <span>Kisan Sahayata Helpline: <strong>1800-120-4040</strong> (Toll-Free)</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 text-lg font-bold tracking-tight">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-[#05512c] text-white shadow-xs">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.5-4.5 10-10 10S2 17.5 2 12A10 10 0 0 1 12 2z" />
                  <path d="M12 18v-7" />
                  <path d="M9 14l3-3 3 3" />
                </svg>
              </div>
              <span className="text-foreground">
                AgriConnect <span className="text-primary font-black">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Empowering Annadata with real-time mandi prices, computer vision crop diagnostics, microclimate weather advisories, and direct B2B produce trading.
            </p>
            <div className="mt-6 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="Enter email for seasonal advisory"
                className="h-9 flex-1 rounded-xl border border-border bg-background px-3 text-xs outline-none focus:ring-2 focus:ring-ring"
                aria-label="Newsletter email"
              />
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-primary px-3 text-xs font-semibold text-primary-foreground transition hover:bg-primary-hover shadow-xs"
              >
                <HiMail className="h-4 w-4" />
                Subscribe
              </button>
            </div>
          </div>

          {/* Nav Categories */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                {title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs text-muted-foreground transition hover:text-primary hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} AgriConnect AI. Built for modern, data-driven smart agriculture.
          </p>
          <p>
            Designed & Developed by <a href="https://github.com/manishachoudhary11" target="_blank" rel="noreferrer" className="font-semibold text-foreground hover:underline">Manisha Choudhary</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
