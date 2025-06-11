import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET || "supersecret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh-secret";

export function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: "15d" });
}

export function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: "17d" });
}
