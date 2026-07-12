import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiLogout, HiMenu, HiUser, HiX } from "react-icons/hi";
import { cn } from "../lib/utils";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import Button from "./ui/Button";
import { Badge } from "./ui";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/dashboard", label: "Dashboard" },
];

function NavItem({ to, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "text-sm font-medium transition-colors",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )
      }
    >
      {label}
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
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground">
            AC
          </span>
          <span>AgriConnect AI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {!loading && isAuthenticated ? (
            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5">
                <HiUser className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">{user?.full_name}</span>
                <Badge variant="primary" className="capitalize">
                  {user?.role}
                </Badge>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <HiLogout className="h-4 w-4" />
                Sign out
              </Button>
            </div>
          ) : (
            !loading && (
              <>
                <Link
                  to="/login"
                  className="hidden h-8 items-center rounded-lg border border-border px-3 text-xs font-medium text-foreground transition hover:bg-muted sm:inline-flex"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="hidden h-8 items-center rounded-lg bg-primary px-3 text-xs font-medium text-primary-foreground transition hover:bg-primary-hover sm:inline-flex"
                >
                  Get started
                </Link>
              </>
            )
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <HiX className="h-5 w-5" /> : <HiMenu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavItem
                key={link.to}
                {...link}
                onClick={() => setMobileOpen(false)}
              />
            ))}

            {isAuthenticated ? (
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <HiUser className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{user?.full_name}</span>
                  <Badge variant="primary" className="capitalize">
                    {user?.role}
                  </Badge>
                </div>
                <Button variant="outline" className="w-full" onClick={handleLogout}>
                  Sign out
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium transition hover:bg-muted"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
                >
                  Get started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
