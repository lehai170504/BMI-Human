import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { poolPromise } from '../config/db';

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const pool = await poolPromise;

    // Find user
    const userResult = await pool.request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');
    const user = userResult.recordset[0];
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, age, gender, height, weight } = req.body;
    const pool = await poolPromise;

    // Check if user already exists
    const checkUser = await pool.request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');
    if (checkUser.recordset.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add new user
    await pool.request()
      .input('email', email)
      .input('password', hashedPassword)
      .input('name', name)
      .input('age', age)
      .input('gender', gender)
      .input('height', height)
      .input('weight', weight)
      .query(`INSERT INTO Users (email, password, name, age, gender, height, weight)
          VALUES (@email, @password, @name, @age, @gender, @height, @weight)`);

    // Lấy lại user vừa tạo
    const newUserResult = await pool.request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');
    const newUser = newUserResult.recordset[0];

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};
