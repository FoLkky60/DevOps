"use client";

import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className = "", ...props }: CardProps) {
  return (
    <div
      className={[
        "glass-panel rounded-[28px] border border-white/10 text-slate-100",
        className,
      ].join(" ")}
      {...props}
    />
  );
}
