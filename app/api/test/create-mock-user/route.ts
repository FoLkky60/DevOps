import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { UserModel } from "@/models/User";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/test/create-mock-user
 * Creates a mock user for testing (only in development mode)
 */
export async function POST() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 }
    );
  }

  try {
    await connectToDatabase();

    const mockEmail = `test${Date.now()}@example.com`;
    const mockPassword = "password123";
    const mockName = "Test User";

    // Check if user already exists
    const existing = await UserModel.findOne({ email: mockEmail });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Create new mock user
    const hashedPassword = await hashPassword(mockPassword);
    const user = await UserModel.create({
      email: mockEmail,
      password: hashedPassword,
      name: mockName,
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
        credentials: {
          email: mockEmail,
          password: mockPassword,
        },
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to create mock user" },
      { status: 500 }
    );
  }
}
