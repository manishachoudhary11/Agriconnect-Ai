import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Badge, Button, Card, Input } from "../components/ui";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { cn } from "../lib/utils";

const roles = [
  {
    id: "farmer",
    label: "Farmer",
    description: "Manage crops, track prices, and get AI farming advice.",
  },
  {
    id: "buyer",
    label: "Buyer",
    description: "Browse marketplace listings and connect with farmers.",
  },
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { toast } = useToast();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "farmer",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.full_name.trim()) {
      nextErrors.full_name = "Full name is required";
    }
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    }
    if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      await register({
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      toast("Account created successfully!", "success");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      toast(error.message || "Registration failed", "error");
      setErrors({ form: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg animate-fade-in">
          <Card className="p-8">
            <div className="text-center">
              <Badge variant="primary">Get started</Badge>
              <h1 className="mt-4 text-2xl font-bold tracking-tight">Create your account</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Join AgriConnect AI and start farming smarter
              </p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <Input
                label="Full name"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
                error={errors.full_name}
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                error={errors.email}
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                autoComplete="new-password"
                hint="Must be at least 8 characters"
                error={errors.password}
              />

              <div>
                <p className="mb-3 text-sm font-medium">I am a</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setForm((current) => ({ ...current, role: role.id }))}
                      className={cn(
                        "rounded-xl border p-4 text-left transition",
                        form.role === role.id
                          ? "border-primary bg-accent"
                          : "border-border hover:border-primary/40"
                      )}
                    >
                      <p className="font-medium">{role.label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{role.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {errors.form && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.form}
                </p>
              )}

              <Button type="submit" className="w-full" size="lg" isLoading={submitting}>
                Create account
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </>
  );
}
