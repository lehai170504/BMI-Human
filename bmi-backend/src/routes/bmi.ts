import { Router } from 'express';
import { calculateAndSaveBMI, getBMIHistory, getLatestBMI } from '../controllers/bmiController';
import { auth } from '../middleware/auth';

const router = Router();

// All BMI routes require authentication
router.use(auth);

router.post('/calculate', calculateAndSaveBMI);
router.get('/history', getBMIHistory);
router.get('/latest', getLatestBMI);

export default router;
