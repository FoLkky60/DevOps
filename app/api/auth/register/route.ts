import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { hashPassword, generateToken } from "@/lib/auth";
import { UserModel } from "@/models/User";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RegisterBody {
  email?: string;
  password?: string;
  name?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RegisterBody;
    const email = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Email, password, and name are required." },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered." },
        { status: 409 },
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      name,
    });

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 },
    );

    response.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Failed to register user." },
      { status: 500 },
    );
  }
}
