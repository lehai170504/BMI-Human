import { ICaloRequest, ICaloResponse, ICaloHistory } from '../models/calo.model';
import { poolPromise } from '../config/db';
import { AppError } from '../middleware/errorHandler';

export class CaloService {
    static async calculateCalo(data: ICaloRequest, userId?: number): Promise<ICaloResponse> {
        try {
            // Tính BMR (Mifflin-St Jeor)
            const bmr = data.gender === 'male'
                ? 10 * data.weight + 6.25 * data.height - 5 * data.age + 5
                : 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;

            // Tính TDEE
            const tdee = bmr * data.activity;

            // Tính calo khuyến nghị
            let caloSuggest = tdee;
            if (data.goal === 'lose') caloSuggest -= 300;
            if (data.goal === 'gain') caloSuggest += 300;

            // Làm tròn các giá trị
            const result: ICaloResponse = {
                bmr: Math.round(bmr),
                tdee: Math.round(tdee),
                caloSuggest: Math.round(caloSuggest)
            };

            // Nếu có userId, lưu vào lịch sử
            if (userId) {
                await this.saveCaloHistory({
                    userId,
                    bmr: result.bmr,
                    tdee: result.tdee,
                    caloSuggest: result.caloSuggest,
                    createdAt: new Date()
                });
            }

            return result;
        } catch (error) {
            throw new AppError('Failed to calculate calories', 500);
        }
    }

    static async saveCaloHistory(history: ICaloHistory): Promise<void> {
        try {
            const pool = await poolPromise;
            await pool.request()
                .input('userId', history.userId)
                .input('bmr', history.bmr)
                .input('tdee', history.tdee)
                .input('caloSuggest', history.caloSuggest)
                .input('createdAt', history.createdAt)
                .query(`
                    INSERT INTO calo_history (userId, bmr, tdee, caloSuggest, createdAt)
                    VALUES (@userId, @bmr, @tdee, @caloSuggest, @createdAt)
                `);
        } catch (error) {
            throw new AppError('Failed to save calorie history', 500);
        }
    }

    static async getCaloHistory(userId: number): Promise<ICaloHistory[]> {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('userId', userId)
                .query(`
                    SELECT * FROM calo_history
                    WHERE userId = @userId
                    ORDER BY createdAt DESC
                `);
            return result.recordset;
        } catch (error) {
            throw new AppError('Failed to get calorie history', 500);
        }
    }
}