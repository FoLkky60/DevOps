"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </main>
    );
  }


  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(56, 189, 248, 0.24), transparent 28%), radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.16), transparent 30%), linear-gradient(180deg, rgba(2, 6, 23, 0.98), rgba(2, 6, 23, 0.9))",
        }}
      />
      <div className="absolute inset-0 lab-grid opacity-60" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <div className="absolute right-6 top-6 flex items-center gap-3 sm:right-10">
          {user ? (
            <>
              <span className="text-sm text-slate-400">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-rose-300/30 hover:bg-rose-400/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-300/30 hover:bg-white/10"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-full border border-transparent bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 shadow-[0_0_40px_rgba(34,211,238,0.18)] backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.9)]" />
              Chaos Lab is online
            </div>
            <div className="space-y-5">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Mix UI properties like volatile chemicals.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Chaos Lab is a production-ready interface generator where color,
                radius, shadow, motion, and typography combine into saved UI
                recipes. Build, preview, persist, and replay every experiment.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/lab"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-400 px-6 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                Enter the Lab
              </Link>
              <Link
                href="/recipes"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5 hover:border-violet-300/40 hover:bg-white/10"
              >
                Browse Recipes
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Real-time", "Live preview updates instantly as you mix"],
                ["Persistent", "MongoDB-backed recipes with likes"],
                ["Reusable", "Typed components and route handlers"],
              ].map(([title, copy]) => (
                <Card
                  key={title}
                  className="space-y-2 border-white/10 bg-white/5 p-5"
                >
                  <h2 className="text-base font-semibold text-white">{title}</h2>
                  <p className="text-sm leading-6 text-slate-300">{copy}</p>
                </Card>
              ))}
            </div>
          </div>

          <Card className="relative overflow-hidden border-cyan-300/15 bg-slate-950/70 p-6 shadow-[0_0_80px_rgba(56,189,248,0.12)] backdrop-blur-2xl">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at top, rgba(34, 211, 238, 0.18), transparent 35%), radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.18), transparent 32%)",
              }}
            />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>Chaos Lab / Interface Generator</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-cyan-100">
                  v1.0
                </span>
              </div>
              <div className="space-y-4 rounded-[28px] border border-cyan-300/20 bg-slate-950/80 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                      Experiment status
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      Neon resonance stable
                    </h2>
                  </div>
                  <div className="h-14 w-14 rounded-full border border-cyan-300/30 bg-cyan-400/15 shadow-[0_0_32px_rgba(34,211,238,0.4)] animate-lab-pulse" />
                </div>
                <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="text-slate-400">Route handlers</p>
                    <p className="mt-1 font-medium text-white">GET, POST, and like actions</p>
                  </div>
                  <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
                    <p className="text-slate-400">Preview engine</p>
                    <p className="mt-1 font-medium text-white">Motion-driven live rendering</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/8 bg-slate-900/80 p-4 font-mono text-xs leading-6 text-cyan-100">
                  <p>{`tailwind + framer-motion + mongoose`}</p>
                  <p>{`{ color: "cyan", borderRadius: 36, shadow: "neon" }`}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
