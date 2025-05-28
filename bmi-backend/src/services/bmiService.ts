import { poolPromise } from "../config/db";
import { AIService } from "./aiService";

export class BMIService {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  calculateBMI = async (weight: number, height: number, userId: number) => {
    const bmi = weight / (height / 100) ** 2;
    const category = this.getBMICategory(bmi);

    // Lưu record vào SQL Server
    const pool = await poolPromise;
    await pool.request()
      .input('userId', userId)
      .input('bmiValue', bmi)
      .input('weight', weight)
      .input('height', height)
      .input('category', category)
      .query(`INSERT INTO BMI (userId, bmiValue, weight, height, category)
              VALUES (@userId, @bmiValue, @weight, @height, @category)`);

    // Lấy record vừa lưu (lấy bản ghi mới nhất của user)
    const result = await pool.request()
      .input('userId', userId)
      .query('SELECT TOP 1 * FROM BMI WHERE userId = @userId ORDER BY date DESC');
    const record = result.recordset[0];

    // Lấy giải thích từ AI
    const aiExplanation = await this.aiService.getExplanation(bmi, category);

    return {
      bmi,
      category,
      explanation: aiExplanation,
      record,
    };
  };

  private getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Gầy";
    if (bmi < 24.9) return "Bình thường";
    if (bmi < 29.9) return "Thừa cân";
    return "Béo phì";
  };
}
