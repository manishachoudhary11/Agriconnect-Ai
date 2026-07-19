import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

export default function CTASection() {
  return (
    <section className="border-t border-border">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/30 to-background py-20">
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start farming smarter today
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of farmers and buyers already using AgriConnect AI to grow,
            sell, and succeed.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-sm font-medium text-primary-foreground shadow-md transition hover:bg-primary-hover"
            >
              Create free account
              <HiArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-card px-8 text-sm font-medium transition hover:bg-muted"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
