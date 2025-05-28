import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppError } from "../middleware/errorHandler";

dotenv.config();

// Thêm kiểm tra SECRET_KEY
if (!process.env.JWT_SECRET) {
  throw new AppError("JWT_SECRET is not defined in environment variables", 500);
}

const SECRET_KEY = process.env.JWT_SECRET;
const TOKEN_EXPIRY = process.env.JWT_EXPIRY || "1h";
const REFRESH_TOKEN_EXPIRY = process.env.JWT_REFRESH_EXPIRY || "7d";

export interface JWTPayload {
  id: number;
  email: string;
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
}

export const generateToken = (
  payload: JWTPayload,
  expiresIn: string | number = TOKEN_EXPIRY
): string => {
  try {
    return jwt.sign(payload, SECRET_KEY, { 
      expiresIn: expiresIn as jwt.SignOptions["expiresIn"]
    });
  } catch (error) {
    throw new AppError(
      `Failed to generate token: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    );
  }
};

export const generateRefreshToken = (payload: JWTPayload): string => {
  try {
    return jwt.sign(payload, SECRET_KEY, {
      expiresIn: REFRESH_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"]
    });
  } catch (error) {
    throw new AppError(
      `Failed to generate refresh token: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500
    );
  }
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, SECRET_KEY) as JWTPayload;
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError("Invalid token", 401);
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError("Token has expired", 401);
    }
    throw new AppError(
      `Token verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      401
    );
  }
};
