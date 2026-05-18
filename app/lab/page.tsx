"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ChemicalTube } from "@/components/lab/ChemicalTube";
import { ChaosButton } from "@/components/lab/ChaosButton";
import { MixingPanel } from "@/components/lab/MixingPanel";
import { PreviewPanel } from "@/components/lab/PreviewPanel";
import { useChaosMixer } from "@/hooks/useChaosMixer";
import { useAuth } from "@/hooks/useAuth";
import {
  ANIMATION_OPTIONS,
  COLOR_OPTIONS,
  LAB_CONFIG_STORAGE_KEY,
  RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  TYPOGRAPHY_OPTIONS,
  recipeFromStorage,
} from "@/lib/utils";

function optionButtonClasses(active: boolean) {
  return [
    "rounded-full border px-3 py-2 text-xs font-medium transition duration-200",
    active
      ? "border-cyan-300/40 bg-cyan-400 text-slate-950"
      : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/30 hover:bg-white/10 hover:text-white",
  ].join(" ");
}

export default function LabPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const {
    config,
    recipeName,
    setRecipeName,
    burstKey,
    generatedCode,
    setColor,
    setBorderRadius,
    setShadow,
    setAnimation,
    setTypography,
    randomizeChaos,
    resetChaos,
    applyConfig,
  } = useChaosMixer();

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | undefined>();
  const [saveError, setSaveError] = useState<string | undefined>();

  useEffect(() => {
    const storedRecipe = recipeFromStorage(
      window.localStorage.getItem(LAB_CONFIG_STORAGE_KEY),
    );

    if (storedRecipe) {
      applyConfig(storedRecipe.config);
      setRecipeName(storedRecipe.name);
      window.localStorage.removeItem(LAB_CONFIG_STORAGE_KEY);
    }
  }, [applyConfig, setRecipeName]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </main>
    );
  }

  const saveRecipe = async () => {
    setIsSaving(true);
    setSaveError(undefined);
    setSaveStatus(undefined);

    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: recipeName,
          config,
          generatedCode,
        }),
      });

      const payload = (await response.json()) as { recipe?: { _id: string } } & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to save recipe.");
      }

      setSaveStatus("Recipe saved to MongoDB.");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Unable to save recipe.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen px-3 py-4 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
        <header className="flex flex-col gap-4 rounded-[30px] border border-white/10 bg-white/5 p-4 backdrop-blur-2xl sm:p-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
              Chaos Lab
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white sm:text-4xl">
              Mix the interface, then save the reaction.
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
              Tweak the five lab tubes on the left, inspect the live output on the
              right, and save any successful configuration as a recipe.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button
              variant="secondary"
              onClick={() => router.push("/recipes")}
              className="w-full sm:w-auto"
            >
              Browse recipes
            </Button>
            <div className="w-full sm:w-auto">
              <ChaosButton burstKey={burstKey} onClick={randomizeChaos} />
            </div>
          </div>
        </header>

        <div className="grid gap-4 lg:gap-6 xl:grid-cols-[0.92fr_1.08fr_1fr]">
          <Card className="space-y-4 p-4 sm:p-5">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Chemical tubes
              </p>
              <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">
                Property controls
              </h2>
            </div>

            <ChemicalTube
              title="Color"
              description="Pick the dominant glow tone of the current experiment."
              accent="from-cyan-400 via-sky-400 to-violet-500"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {COLOR_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setColor(option.value)}
                    className={optionButtonClasses(config.color === option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </ChemicalTube>

            <ChemicalTube
              title="Border Radius"
              description="Smooth the silhouette from sharp panel to soft capsule."
              accent="from-violet-400 via-fuchsia-400 to-cyan-400"
            >
              <div className="space-y-3">
                <input
                  type="range"
                  min={0}
                  max={RADIUS_OPTIONS.length - 1}
                  step={1}
                  value={RADIUS_OPTIONS.indexOf(config.borderRadius)}
                  onChange={(event) =>
                    setBorderRadius(
                      RADIUS_OPTIONS[Number.parseInt(event.target.value, 10)],
                    )
                  }
                  className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-300"
                />
                <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                  {RADIUS_OPTIONS.map((radius) => (
                    <span
                      key={radius}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                    >
                      {radius}px
                    </span>
                  ))}
                </div>
              </div>
            </ChemicalTube>

            <ChemicalTube
              title="Shadow"
              description="Decide how much the element glows above the chamber floor."
              accent="from-emerald-400 via-cyan-400 to-sky-500"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SHADOW_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setShadow(option.value)}
                    className={optionButtonClasses(config.shadow === option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </ChemicalTube>

            <ChemicalTube
              title="Animation"
              description="Introduce motion for the live preview and generated snippet."
              accent="from-amber-400 via-rose-400 to-fuchsia-500"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {ANIMATION_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setAnimation(option.value)}
                    className={optionButtonClasses(config.animation === option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </ChemicalTube>

            <ChemicalTube
              title="Typography"
              description="Switch the visual voice of the generated UI text."
              accent="from-fuchsia-400 via-violet-400 to-cyan-400"
            >
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {TYPOGRAPHY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTypography(option.value)}
                    className={optionButtonClasses(config.typography === option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </ChemicalTube>
          </Card>

          <MixingPanel
            config={config}
            generatedCode={generatedCode}
            recipeName={recipeName}
            onRecipeNameChange={setRecipeName}
            onSave={saveRecipe}
            onReset={resetChaos}
            isSaving={isSaving}
            saveStatus={saveStatus}
            saveError={saveError}
          />

          <div className="xl:sticky xl:top-6 xl:self-start">
            <PreviewPanel config={config} />
          </div>
        </div>
      </section>
    </main>
  );
}
