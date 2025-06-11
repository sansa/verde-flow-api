import prisma from "../../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export async function registerUser({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already in use");

  const hashed = await bcrypt.hash(password, SALT_ROUNDS);

  return prisma.user.create({
    data: { name, email, password: hashed },
  });
}

export async function loginUser({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const payload = { id: user.id, email: user.email };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    tokens: {
      accessToken,
      refreshToken,
    },
    abilityRules: [{ action: "manage", subject: "all" }],
  };
}

export async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      projects: true,
      createdAt: true,
    },
  });
  if (!user) throw new Error("User not found");
  return user;
}
