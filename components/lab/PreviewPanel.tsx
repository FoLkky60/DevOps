"use client";

import type { LabConfig } from "@/types/recipe";
import { Card } from "@/components/ui/Card";
import { getConfigLabel, getPreviewClasses } from "@/lib/utils";

interface PreviewPanelProps {
  config: LabConfig;
}

export function PreviewPanel({ config }: PreviewPanelProps) {
  const labels = getConfigLabel(config);

  return (
    <Card className="relative overflow-hidden p-4 sm:p-5">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top, rgba(56, 189, 248, 0.16), transparent 32%), radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.12), transparent 30%)",
        }}
      />
      <div className="relative space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Live preview
            </p>
            <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">
              Reaction chamber
            </h2>
          </div>
          <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">
            React + Tailwind
          </span>
        </div>

        <div className="min-h-[320px] rounded-[24px] border border-white/8 bg-slate-950/80 p-3 sm:p-4">
          <div className={`${getPreviewClasses(config)} p-5 sm:p-6`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/70">
                <span>Lab signal</span>
                <span>{labels.color}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white sm:text-2xl">
                  Chaos Interface
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/75">
                  A real-time UI preview reacts to the current mix of properties.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {[
                  labels.borderRadius,
                  labels.shadow,
                  labels.animation,
                  labels.typography,
                ].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-white/80"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
