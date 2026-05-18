"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/hooks/useAuth";

interface RegisterResponse {
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/lab");
    }
  }, [user, isLoading, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // ตรวจสอบ validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsSubmitting(true);

    try {
      // Log request payload for debugging
      console.log('[auth] register request', { email, name });

      // เรียก fetch ตรง ๆ ไปที่ backend
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ส่ง cookie ไปกับคำขอ
        body: JSON.stringify({ email, password, name }),
      });

      const data: RegisterResponse = await response.json();
      console.log('[auth] register response', { status: response.status, data });

      if (!response.ok) {
        setError(data.error ?? "Registration failed");
        setIsSubmitting(false);
        return;
      }

      // Register สำเร็จ ไปที่ /lab
      router.push("/lab");
    } catch (err) {
      console.error('[auth] register error', err);
      setError(err instanceof Error ? err.message : "Registration failed");
      setIsSubmitting(false);
    }
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
          <p className="mt-2 text-slate-400">Create an account to get started</p>
        </div>

        <Card className="space-y-5 p-6">
          <div>
            <h2 className="text-xl font-semibold text-white">Create account</h2>
            <p className="mt-1 text-sm text-slate-400">Join the lab and start mixing</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-200">
                Full name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-200">
                Confirm password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="rounded-full border border-rose-300/30 bg-rose-400/10 p-3 text-sm text-rose-100">
                {error}
              </div>
            )}

            <Button 
              type="submit"
              className="w-full cursor-pointer" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="border-t border-white/10 pt-4 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-300 hover:text-cyan-200">
              Log in
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
