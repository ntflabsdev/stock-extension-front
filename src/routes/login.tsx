import { createFileRoute, useNavigate, redirect, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { login } from "@/lib/option-chain-api";
import { apiFetch, ApiError } from "@/lib/api";
import { clearAuth, isAdmin, isLoggedIn } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "User Login — Alpha Terminal" },
      { name: "description", content: "Sign in to view live option chain data." },
    ],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && isLoggedIn()) {
      if (isAdmin()) throw redirect({ to: "/admin" });
      throw redirect({ to: "/option-chain" });
    }
  },
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);
    try {
      if (mode === "signup") {
        const data = await apiFetch<{ msg: string; activationId?: string }>("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({ name: name.trim(), email: email.trim(), password }),
        });
        setInfo(
          `${data.msg}${data.activationId ? ` Activation ID: ${data.activationId}` : ""}`,
        );
        setMode("login");
        setPassword("");
      } else {
        const data = await login(email.trim(), password);
        const staff = data.role === "admin" || data.role === "superadmin";
        if (staff) {
          clearAuth();
          setError("Admin accounts use the Admin Portal.");
          return;
        }
        navigate({ to: "/option-chain" });
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Request failed. Is backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-info/15 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card relative w-full max-w-md rounded-3xl p-8"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-info shadow-lg shadow-primary/30">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight">User Login</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              {mode === "login" ? "Sign in to your desk" : "Create account"}
            </div>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-white/5 p-1">
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setError("");
                setInfo("");
              }}
              className={cn(
                "rounded-lg py-2 text-sm font-medium capitalize",
                mode === m ? "bg-primary/20 text-primary" : "text-muted-foreground",
              )}
            >
              {m}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:bg-white/10"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:bg-white/10"
              placeholder="you@example.com"
              autoComplete="username"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm outline-none transition focus:border-primary/40 focus:bg-white/10"
              placeholder="••••••••"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </div>

          {error && (
            <div className="rounded-xl border border-bear/30 bg-bear/10 px-3 py-2 text-sm text-bear">
              {error}
            </div>
          )}
          {info && (
            <div className="rounded-xl border border-bull/30 bg-bull/10 px-3 py-2 text-sm text-bull">
              {info}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-info py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Sign up"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Admin?{" "}
          <Link to="/admin-login" className="text-primary hover:underline">
            Admin login
          </Link>
          {" · "}
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
