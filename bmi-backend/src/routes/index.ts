import { Router } from 'express';
import authRoutes from './auth';
import bmiRoutes from './bmi';
import userRoutes from './user';

const router = Router();

router.use('/auth', authRoutes);
router.use('/bmi', bmiRoutes);
router.use('/user', userRoutes);

export default router; 