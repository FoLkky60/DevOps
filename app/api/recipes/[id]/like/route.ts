import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { normalizeConfig } from "@/lib/utils";
import { RecipeModel } from "@/models/Recipe";
import type { Recipe } from "@/types/recipe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function serializeRecipe(recipe: {
  _id: { toString(): string } | string;
  name: string;
  config: Recipe["config"];
  generatedCode: string;
  likes: number;
  createdAt: Date;
}): Recipe {
  return {
    _id: recipe._id.toString(),
    name: recipe.name,
    config: normalizeConfig(recipe.config),
    generatedCode: recipe.generatedCode,
    likes: recipe.likes ?? 0,
    createdAt: recipe.createdAt.toISOString(),
  };
}

export async function POST(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  await connectToDatabase();
  const recipe = await RecipeModel.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true },
  ).lean();

  if (!recipe) {
    return NextResponse.json({ error: "Recipe not found." }, { status: 404 });
  }

  return NextResponse.json({
    recipe: serializeRecipe({
      ...recipe,
      createdAt: new Date(recipe.createdAt),
    }),
  });
}
