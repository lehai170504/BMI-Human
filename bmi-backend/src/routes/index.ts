import { Router } from 'express';
import authRoutes from './auth.routes';
import caloRoutes from './calo.routes';
import bmiRoutes from './bmi.routes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/calo', caloRoutes);    
router.use('/bmi', bmiRoutes);

export default router; 