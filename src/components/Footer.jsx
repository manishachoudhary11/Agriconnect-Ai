import { Link } from "react-router-dom";
import { HiMail } from "react-icons/hi";

const footerLinks = {
  Product: [
    { label: "Features", to: "/#features" },
    { label: "How it works", to: "/#how-it-works" },
    { label: "AI Assistant", to: "/#ai" },
    { label: "Dashboard", to: "/dashboard" },
    { label: "Marketplace", to: "/marketplace" },
  ],
  Company: [
    { label: "About", to: "/about" },
    { label: "FAQ", to: "/#faq" },
  ],
  Legal: [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground">
                AC
              </span>
              AgriConnect AI
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Empowering farmers with AI-driven insights, market intelligence, weather
              alerts, and smart crop management — built for modern agriculture.
            </p>
            <div className="mt-6 flex max-w-sm gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                aria-label="Newsletter email"
              />
              <button
                type="button"
                className="inline-flex h-10 items-center gap-1 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
              >
                <HiMail className="h-4 w-4" />
                Subscribe
              </button>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AgriConnect AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built for smart agriculture · Open Source
          </p>
        </div>
      </div>
    </footer>
  );
}
