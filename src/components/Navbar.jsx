import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HiLogout,
  HiMenu,
  HiUser,
  HiX,
  HiBell,
  HiPhone,
  HiSparkles,
} from "react-icons/hi";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";
import { Badge } from "./ui";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/crops", label: "My Crops" },
  { to: "/marketplace", label: "Kisan Bazaar", badge: "B2B" },
  { to: "/disease-detection", label: "Crop Doctor", badge: "AI" },
  { to: "/price-prediction", label: "Mandi Bhav" },
  { to: "/weather", label: "Mausam" },
  { to: "/ai-assistant", label: "AI Advisor" },
  { to: "/dashboard", label: "Dashboard" },
];

function NavItem({ to, label, badge, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "relative inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors py-1 px-1.5 rounded-lg",
          isActive
            ? "text-primary font-bold bg-accent"
            : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
        )
      }
    >
      <span>{label}</span>
      {badge && (
        <span
          className={cn(
            "rounded-md px-1 py-0.2 text-[9px] font-extrabold uppercase tracking-wider",
            badge === "AI"
              ? "bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300"
              : "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
          )}
        >
          {badge}
        </span>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout, loading } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      {/* Top Kisan Announcement & Helpline Bar */}
      <div className="bg-[#05512c] text-emerald-50 text-[11px] sm:text-xs py-1.5 px-4 font-medium border-b border-emerald-800/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="inline-flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 font-bold text-amber-300 text-[10px] uppercase tracking-wider shrink-0">
              🌾 Rabi Season 2026
            </span>
            <p className="truncate text-emerald-100/90 hidden sm:inline text-xs">
              Wheat (HD-2967) & Mustard sowing guidelines live · Real-time Mandi Bhav updated daily
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0 text-emerald-100 text-xs">
            <a
              href="tel:18001204040"
              className="inline-flex items-center gap-1.5 font-medium hover:text-white transition"
              title="Kisan Sahayata Helpline"
            >
              <HiPhone className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden md:inline text-emerald-200">Kisan Helpline:</span>
              <span className="font-bold text-white tracking-wide">1800-120-4040</span>
            </a>
            <span className="text-emerald-600 hidden sm:inline">|</span>
            <span className="text-[11px] font-semibold text-emerald-200 hidden sm:inline">
              🇮🇳 EN · हिन्दी
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-foreground group shrink-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-[#05512c] text-white shadow-sm shadow-emerald-950/20 group-hover:scale-105 transition">
            <svg
              className="h-6 w-6 text-emerald-100"
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
          <div className="flex flex-col">
            <span className="leading-tight text-base sm:text-lg font-extrabold text-foreground flex items-center gap-1">
              AgriConnect <span className="text-primary font-black">AI</span>
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden sm:block">
              Smart Agri Platform
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-1.5 lg:gap-2.5 xl:gap-3 lg:flex">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {isAuthenticated && (
            <Link
              to="/notifications"
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition"
              title="Notifications"
            >
              <HiBell className="h-5 w-5" />
            </Link>
          )}

          {!loading && isAuthenticated ? (
            <div className="hidden items-center gap-2.5 sm:flex">
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 hover:bg-muted transition shadow-sm"
              >
                <HiUser className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-semibold">{user?.full_name}</span>
                <Badge variant="primary" className="capitalize text-[10px] py-0 px-1.5">
                  {user?.role}
                </Badge>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout} className="rounded-xl">
                <HiLogout className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          ) : (
            !loading && (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/login"
                  className="inline-flex h-9 items-center rounded-xl border border-border bg-card px-3.5 text-xs font-semibold text-foreground transition hover:bg-muted shadow-sm"
                >
                  Kisan Sign In
                </Link>
                <Link
                  to="/register"
                  className="inline-flex h-9 items-center gap-1 rounded-xl bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-sm transition hover:bg-primary-hover"
                >
                  <HiSparkles className="h-3.5 w-3.5" />
                  Join Free
                </Link>
              </div>
            )
          )}

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-xl"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-5 lg:hidden animate-fade-in shadow-xl">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavItem
                key={link.to}
                {...link}
                onClick={() => setMobileOpen(false)}
              />
            ))}

            {isAuthenticated ? (
              <div className="space-y-3 border-t border-border pt-4 mt-2">
                <div className="flex items-center gap-2 px-1">
                  <HiUser className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-semibold">{user?.full_name}</span>
                  <Badge variant="primary" className="capitalize text-xs">
                    {user?.role}
                  </Badge>
                </div>
                <Button variant="outline" className="w-full rounded-xl" onClick={handleLogout}>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2.5 pt-3 border-t border-border mt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold transition hover:bg-muted"
                >
                  Kisan Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary-hover shadow-sm"
                >
                  <HiSparkles className="h-4 w-4" />
                  Join as Farmer / Buyer
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
