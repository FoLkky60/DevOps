import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { generateChaosCode, normalizeConfig } from "@/lib/utils";
import { RecipeModel } from "@/models/Recipe";
import type { Recipe, RecipeInput } from "@/types/recipe";

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

export async function GET() {
  await connectToDatabase();

  const recipes = await RecipeModel.find().sort({ createdAt: -1 }).lean();

  return NextResponse.json({
    recipes: recipes.map((recipe) =>
      serializeRecipe({
        ...recipe,
        createdAt: new Date(recipe.createdAt),
      }),
    ),
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<RecipeInput>;
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!name) {
      return NextResponse.json(
        { error: "Recipe name is required." },
        { status: 400 },
      );
    }

    if (!body.config) {
      return NextResponse.json(
        { error: "Recipe config is required." },
        { status: 400 },
      );
    }

    const config = normalizeConfig(body.config);
    const generatedCode =
      typeof body.generatedCode === "string" && body.generatedCode.trim()
        ? body.generatedCode.trim()
        : generateChaosCode(config);

    await connectToDatabase();
    const createdRecipe = await RecipeModel.create({
      name,
      config,
      generatedCode,
    });

    return NextResponse.json(
      { recipe: serializeRecipe(createdRecipe.toObject()) },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create recipe." },
      { status: 500 },
    );
  }
}
