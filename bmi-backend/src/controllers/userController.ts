import { Request, Response } from 'express';
import { poolPromise } from '../config/db';
import jwt from 'jsonwebtoken';

export const getUser = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', userId)
      .query('SELECT * FROM Users WHERE id = @id');
    const user = result.recordset[0];
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const { name, age, gender, height, weight } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', userId)
      .input('name', name)
      .input('age', age)
      .input('gender', gender)
      .input('height', height)
      .input('weight', weight)
      .query('UPDATE Users SET name = @name, age = @age, gender = @gender, height = @height, weight = @weight WHERE id = @id');
    // Lấy lại user sau khi update
    const result = await pool.request()
      .input('id', userId)
      .query('SELECT * FROM Users WHERE id = @id');
    const user = result.recordset[0];
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', email)
      .query('SELECT * FROM Users WHERE email = @email');
    const existingUser = result.recordset[0];

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

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




