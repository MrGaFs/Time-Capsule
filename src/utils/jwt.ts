import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m"
  });
};
export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });
};
export const verifyAccessToken = (token: string): string => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as string;
};
export const verifyRefreshToken = (token: string): string => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as string;
};