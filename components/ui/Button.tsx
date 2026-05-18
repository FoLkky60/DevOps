"use client";

import type { ButtonHTMLAttributes } from "react";

const variantClasses = {
  primary:
    "border-cyan-300/30 bg-cyan-400 text-slate-950 shadow-[0_0_25px_rgba(34,211,238,0.24)] hover:bg-cyan-300",
  secondary:
    "border-white/10 bg-white/5 text-white hover:border-violet-300/40 hover:bg-white/10",
  ghost: "border-transparent bg-transparent text-slate-300 hover:bg-white/5 hover:text-white",
  danger:
    "border-rose-300/30 bg-rose-400/10 text-rose-100 hover:bg-rose-400/20",
} as const;

type ButtonVariant = keyof typeof variantClasses;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  className = "",
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        className,
      ].join(" ")}
      {...props}
    />
  );
}
