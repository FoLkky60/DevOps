import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "chaos-lab-dev-secret-key-change-in-production";

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export function generateToken(payload: Omit<JWTPayload, "iat" | "exp">) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

export async function hashPassword(password: string) {
  const salt = await bcryptjs.genSalt(10);
  return bcryptjs.hash(password, salt);
}

export async function comparePasswords(password: string, hashedPassword: string) {
  return bcryptjs.compare(password, hashedPassword);
}
