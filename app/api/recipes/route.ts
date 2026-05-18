import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { generateChaosCode, normalizeConfig } from "@/lib/utils";
import { RecipeModel } from "@/models/Recipe";
import type { Recipe, RecipeInput } from "@/types/recipe";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

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

export async function GET(request: Request) {
  await connectToDatabase();

  const url = new URL(request.url);
  const mine = url.searchParams.get("mine");

  let filter: Record<string, unknown> = {};

  if (mine === "true") {
    // try to read token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const payload = token ? verifyToken(token) : null;
    if (payload) {
      filter = { createdBy: payload.userId };
    } else {
      // not authenticated, return empty
      return NextResponse.json({ recipes: [] });
    }
  }

  const recipes = await RecipeModel.find(filter).sort({ createdAt: -1 }).lean();

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

    // Attach current user if available
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;
    const payload = token ? verifyToken(token) : null;

    const createdRecipe = await RecipeModel.create({
      name,
      config,
      generatedCode,
      createdBy: payload ? payload.userId : undefined,
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
