"use client";

import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

interface ChemicalTubeProps {
  title: string;
  description: string;
  accent: string;
  children: ReactNode;
}

export function ChemicalTube({
  title,
  description,
  accent,
  children,
}: ChemicalTubeProps) {
  return (
    <Card className="relative overflow-hidden p-4">
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${accent}`} />
      <div className="space-y-4">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
            {title}
          </h3>
          <p className="text-sm leading-6 text-slate-400">{description}</p>
        </div>
        {children}
      </div>
    </Card>
  );
}
