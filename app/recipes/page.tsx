"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAuth } from "@/hooks/useAuth";
import { LAB_CONFIG_STORAGE_KEY, formatRecipeDate, getPreviewClasses } from "@/lib/utils";
import type { Recipe } from "@/types/recipe";

export default function RecipesPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likingId, setLikingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (!isLoading && !user) {
      return;
    }

    const controller = new AbortController();

    async function loadRecipes() {
      try {
        setIsLoadingRecipes(true);
        const response = await fetch("/api/recipes", {
          signal: controller.signal,
        });
        const payload = (await response.json()) as { recipes?: Recipe[]; error?: string };

        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to load recipes.");
        }

        setRecipes(payload.recipes ?? []);
      } catch (loadError) {
        if ((loadError as Error).name !== "AbortError") {
          setError(loadError instanceof Error ? loadError.message : "Unable to load recipes.");
        }
      } finally {
        setIsLoadingRecipes(false);
      }
    }

    loadRecipes();

    return () => controller.abort();
  }, [isLoading, user]);

  if (isLoading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </main>
    );
  }

  const openInLab = (recipe: Recipe) => {
    window.localStorage.setItem(LAB_CONFIG_STORAGE_KEY, JSON.stringify(recipe));
    router.push("/lab");
  };

  const likeRecipe = async (id: string) => {
    setLikingId(id);

    try {
      const response = await fetch(`/api/recipes/${id}/like`, {
        method: "POST",
      });
      const payload = (await response.json()) as {
        recipe?: Recipe;
        error?: string;
      };

      if (!response.ok || !payload.recipe) {
        throw new Error(payload.error ?? "Unable to like recipe.");
      }

      setRecipes((current) =>
        current.map((recipe) => (recipe._id === id ? payload.recipe! : recipe)),
      );
    } catch {
      setError("Unable to like the selected recipe.");
    } finally {
      setLikingId(null);
    }
  };

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <section className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <header className="rounded-[30px] border border-white/10 bg-white/5 p-5 backdrop-blur-2xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-violet-200/80">
                Saved recipes
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
                Replay the best lab experiments.
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Every saved configuration is persisted in MongoDB. Open a recipe in
                the lab, inspect the generated code, or boost its likes.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => router.push("/lab")}>
                Back to lab
              </Button>
            </div>
          </div>
        </header>

        {isLoadingRecipes ? (
          <Card className="p-6 text-slate-300">Loading recipes from the archive...</Card>
        ) : error ? (
          <Card className="p-6 text-rose-100">{error}</Card>
        ) : recipes.length === 0 ? (
          <Card className="space-y-3 p-6">
            <h2 className="text-xl font-semibold text-white">No recipes yet</h2>
            <p className="text-sm leading-6 text-slate-300">
              Save a mix from the lab to populate this archive. If MongoDB is not
              configured yet, the API will stay idle until you add your connection
              string.
            </p>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe) => (
              <Card key={recipe._id} className="space-y-4 p-4">
                <div className={`${getPreviewClasses(recipe.config)} p-4`}>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/70">
                      <span>{recipe.name}</span>
                      <span>{recipe.likes} likes</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-white">Chaos Recipe</h2>
                      <p className="mt-2 text-sm leading-6 text-white/75">
                        Saved on {formatRecipeDate(recipe)}.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      {recipe.config.color}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      {recipe.config.borderRadius}px
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      {recipe.config.shadow}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => openInLab(recipe)}>
                      Use in lab
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => likeRecipe(recipe._id)}
                      disabled={likingId === recipe._id}
                    >
                      {likingId === recipe._id ? "Liking..." : "Like"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
