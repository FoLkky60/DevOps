"use client";

import type { LabConfig } from "@/types/recipe";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { summarizeConfig } from "@/lib/utils";

interface MixingPanelProps {
  config: LabConfig;
  generatedCode: string;
  recipeName: string;
  onRecipeNameChange: (value: string) => void;
  onSave: () => void;
  onReset: () => void;
  isSaving?: boolean;
  saveStatus?: string;
  saveError?: string;
}

export function MixingPanel({
  config,
  generatedCode,
  recipeName,
  onRecipeNameChange,
  onSave,
  onReset,
  isSaving,
  saveStatus,
  saveError,
}: MixingPanelProps) {
  const summary = summarizeConfig(config);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedCode);
  };

  return (
    <Card className="w-full max-w-none space-y-5 p-4 sm:p-5 xl:max-w-[560px]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
            Mixing panel
          </p>
          <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">
            Current recipe
          </h2>
        </div>
        <Button variant="ghost" onClick={onReset}>
          Reset lab
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {summary.map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
              {item.label}
            </p>
            <p className="mt-2 text-sm font-medium text-white">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-200" htmlFor="recipe-name">
          Recipe name
        </label>
        <Input
          id="recipe-name"
          value={recipeName}
          onChange={(event) => onRecipeNameChange(event.target.value)}
          placeholder="Enter a recipe name"
        />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
            Generated code
          </h3>
          <Button variant="secondary" onClick={handleCopy}>
            Copy
          </Button>
        </div>
        <pre className="max-h-[320px] overflow-auto rounded-[24px] border border-white/10 bg-slate-950/80 p-4 text-xs leading-6 text-cyan-100">
          <code>{generatedCode}</code>
        </pre>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button className="w-full sm:w-auto" onClick={onSave} disabled={isSaving || !recipeName.trim()}>
          {isSaving ? "Saving..." : "Save recipe"}
        </Button>
        <div className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm leading-6 text-slate-300">
          {saveError ?? saveStatus ?? "Recipes persist when MongoDB is connected."}
        </div>
      </div>
    </Card>
  );
}
