import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, Card, Input } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const from = location.state?.from || "/dashboard";

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});

    try {
      await login(form.email, form.password);
      toast("Welcome back!", "success");
      navigate(from, { replace: true });
    } catch (error) {
      toast(error.message || "Login failed", "error");
      setErrors({ form: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to your AgriConnect account
              </p>
            </div>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
              <Input
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
                error={errors.email}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
                error={errors.password}
              />

              {errors.form && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.form}
                </p>
              )}

              <Button type="submit" className="w-full" size="lg" isLoading={submitting}>
                Sign in
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                Create one
              </Link>
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
