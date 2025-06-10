import { Router } from 'express';
import { auth } from '../middleware/auth.middleware';
import { calculateCalo, getCaloHistory } from '../controllers/calo.controller';

const router = Router();

/**
 * @swagger
 * /api/calo/calculate:
 *   post:
 *     summary: Tính toán nhu cầu calo
 *     tags: [Calories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - gender
 *               - age
 *               - weight
 *               - height
 *               - activity
 *               - goal
 *             properties:
 *               gender:
 *                 type: string
 *                 enum: [male, female]
 *               age:
 *                 type: number
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               activity:
 *                 type: number
 *               goal:
 *                 type: string
 *                 enum: [maintain, lose, gain]
 *     responses:
 *       200:
 *         description: Calories calculated successfully
 */
router.post('/calculate', calculateCalo);

/**
 * @swagger
 * /api/calo/history:
 *   get:
 *     summary: Lấy lịch sử tính toán calo
 *     tags: [Calories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Calorie history retrieved successfully
 */
router.get('/history', auth, getCaloHistory);

export default router;