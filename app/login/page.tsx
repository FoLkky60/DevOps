"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoading, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/lab");
    }
  }, [user, isLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const result = await login(email, password);

    if (result.success) {
      router.push("/lab");
    } else {
      setError(result.error ?? "Login failed");
    }

    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="text-slate-400">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-white">Chaos Lab</h1>
          <p className="mt-2 text-slate-400">Mix UI properties, save recipes</p>
        </div>

        <Card className="space-y-5 p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Log in</h2>
            <p className="mt-1 text-sm text-slate-400">
              Enter your credentials to access the lab
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-200">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-200">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="rounded-full border border-rose-300/30 bg-rose-400/10 p-3 text-sm text-rose-100">{error}</div>}

            <Button className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <div className="border-t border-white/10 pt-4 text-center text-sm text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-cyan-300 hover:text-cyan-200">
              Create one
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
