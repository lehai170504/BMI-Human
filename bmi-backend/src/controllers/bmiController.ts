import { Request, Response } from 'express';
import { poolPromise } from '../config/db';

const calculateBMI = (weight: number, height: number): number => {
  // Convert height from cm to m and calculate BMI
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
};

const getBMICategory = (bmi: number): string => {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

export const calculateAndSaveBMI = async (req: Request, res: Response) => {
  try {
    const { weight, height } = req.body;
    const userId = (req as any).user.userId; // From auth middleware

    const bmiValue = calculateBMI(weight, height);
    const category = getBMICategory(bmiValue);

    const pool = await poolPromise;
    await pool.request()
      .input('userId', userId)
      .input('weight', weight)
      .input('height', height)
      .input('bmiValue', bmiValue)
      .input('category', category)
      .query(`INSERT INTO BMI (userId, weight, height, bmiValue, category)
              VALUES (@userId, @weight, @height, @bmiValue, @category)`);

    res.status(201).json({
      message: 'BMI calculated and saved successfully',
      bmi: { userId, weight, height, bmiValue, category }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating BMI', error });
  }
};

export const getBMIHistory = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('userId', userId)
      .query('SELECT TOP 10 * FROM BMI WHERE userId = @userId ORDER BY date DESC');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching BMI history', error });
  }
};

export const getLatestBMI = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('userId', userId)
      .query('SELECT TOP 1 * FROM BMI WHERE userId = @userId ORDER BY date DESC');
    if (!result.recordset[0]) {
      return res.status(404).json({ message: 'No BMI records found' });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest BMI', error });
  }
};
