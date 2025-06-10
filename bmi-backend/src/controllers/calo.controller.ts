import { Request, Response, NextFunction } from 'express';
import { CaloService } from '../services/calo.service';
import { AppError } from '../middleware/errorHandler';
import { ICaloRequest } from '../models/calo.model';

export const calculateCalo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: ICaloRequest = req.body;
        const userId = (req as any).user?.id;

        // Validate input
        if (!data.gender || !data.age || !data.weight || !data.height || !data.activity || !data.goal) {
            throw new AppError('Missing required fields', 400);
        }

        // Validate ranges
        if (data.age < 10 || data.age > 100) {
            throw new AppError('Age must be between 10 and 100', 400);
        }
        if (data.weight < 30 || data.weight > 200) {
            throw new AppError('Weight must be between 30 and 200 kg', 400);
        }
        if (data.height < 120 || data.height > 220) {
            throw new AppError('Height must be between 120 and 220 cm', 400);
        }

        const result = await CaloService.calculateCalo(data, userId);

        res.json({
            success: true,
            message: 'Calories calculated successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const getCaloHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user?.id;
        if (!userId) {
            throw new AppError('Unauthorized', 401);
        }

        const history = await CaloService.getCaloHistory(userId);

        res.json({
            success: true,
            message: 'Calorie history retrieved successfully',
            data: history
        });
    } catch (error) {
        next(error);
    }
};