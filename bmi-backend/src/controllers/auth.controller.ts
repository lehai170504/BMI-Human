import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt";
import { AppError } from "../middleware/errorHandler";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, age, gender, height, weight } = req.body;

    // Validate required fields
    const requiredFields = ['email', 'password', 'name', 'age', 'gender', 'height', 'weight'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      throw new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError("Invalid email format", 400);
    }

    const userExists = await UserService.findByEmail(email);
    if (userExists) {
      throw new AppError("Email already exists", 400);
    }

    const newUser = await UserService.createUser({ 
      email, 
      password, 
      name, 
      age, 
      gender, 
      height, 
      weight 
    });

    return res.status(201).json({ 
      message: "User registered successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.error("Register error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Missing email or password", 400);
    }

    const user = await UserService.findByEmail(email);
    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    if (!user.id) {
      throw new AppError("User ID is missing", 500);
    }

    const token = generateToken(
      { id: user.id, email: user.email, name: user.name },
      "1h"
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      },
      message: "Login successful"
    });
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
