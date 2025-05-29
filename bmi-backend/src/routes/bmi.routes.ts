import { Router, Request, Response } from "express";
import { BmiService } from "../services/bmi.service";
import { auth } from "../middleware/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: BMI
 *   description: BMI tracking and management
 */

/**
 * @swagger
 * /api/bmi/calculate:
 *   components:
 *     schemas:
 *       BMI:
 *         type: object
 *         properties:
 *           height:
 *             type: number
 *           weight:
 *             type: number
 *           bmiValue:
 *             type: number
 *           category:
 *             type: string
 *           date:
 *             type: string
 *             format: date
 *   post:
 *     summary: Calculate BMI
 *     tags: [BMI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               height:
 *                 type: number
 *                 description: Height in centimeters
 *               weight:
 *                 type: number
 *                 description: Weight in kilograms
 *                 example: 70
 *             required:
 *               - height
 *               - weight
 *     responses:
 *       200:
 *         description: BMI calculation successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bmiValue:
 *                   type: number
 *                   description: BMI value
 *                 category:
 *                   type: string
 *                   description: BMI category
 *                 date:
 *                   type: string
 *                   format: date
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */ 

router.post("/calculate", auth, async (req: any, res: Response) => {
  const { height, weight } = req.body;
  try {
    if (!height || !weight) {
      return res.status(400).json({ message: "Height and weight are required" });
    }
    const bmi = await BmiService.calculateBmi(req.user.id, height, weight);
    res.status(200).json(bmi);
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Failed to calculate BMI" });
  }
});

/**
 * @swagger
 * /api/bmi/history:
 *   components:
 *     schemas:
 *       BMI:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *           userId:
 *             type: number
 *           weight:
 *             type: number
 *           height:
 *             type: number
 *           bmiValue:
 *             type: number
 *           category:
 *             type: string
 *           date:
 *             type: string
 *             format: date
 *   get:
 *     summary: Get BMI history 
 *     tags: [BMI]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: BMI history retrieved successfully  
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BMI'
 *       404:
 *         description: No BMI data found
 */
router.get("/history", auth, async (req: any, res: Response) => {
  try {
    const history = await BmiService.getBmiHistory(req.user.id);
    res.status(200).json(history);
  } catch (error) {
    res.status(404).json({ message: error instanceof Error ? error.message : "No BMI data found" });
  }
});

/**
 * @swagger
 * /api/bmi/{id}:
 *   components:
 *     schemas:
 *       BMI:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *           userId:    
 *             type: number
 *           weight:
 *             type: number
 *           height:
 *             type: number
 *           bmiValue:
 *             type: number
 *           category:
 *             type: string
 *           date:
 *             type: string
 *             format: date
 *   delete:
 *     summary: Delete a BMI record
 *     tags: [BMI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: BMI record ID
 *     responses:
 *       200:
 *         description: BMI data deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: BMI data deleted successfully
 *       400:
 *         description: Failed to delete BMI data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to delete BMI data
 */

// Xoá một bản ghi BMI
router.delete("/:id", auth, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await BmiService.deleteBmi(Number(id));
    res.status(200).json({ message: "BMI data deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Failed to delete BMI" });
  }
});

export default router;



