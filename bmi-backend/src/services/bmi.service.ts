import { IBmi } from "../models/bmi.model";
import { poolPromise } from "../config/db";
import { AppError } from "../middleware/errorHandler";

export class BmiService {
    static async calculateBmi(userId: number, height: number, weight: number): Promise<IBmi> {
        const bmiValue = (weight / (height * height)) * 10000;
        const category = this.getBmiCategory(bmiValue);

        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("userId", userId)
            .input("weight", weight)
            .input("height", height)
            .input("bmiValue", bmiValue)
            .input("category", category)
            .input("date", new Date())
            .query(`
                INSERT INTO bmi (userId, weight, height, bmiValue, category, date)
                VALUES (@userId, @weight, @height, @bmiValue, @category, @date);

                SELECT TOP 1 id, userId, weight, height, bmiValue, category, date
                FROM bmi
                WHERE userId = @userId
                ORDER BY date DESC;
            `); 

        if (!result.recordset[0]) {
            throw new AppError("Failed to insert BMI data", 500);
        }

        return {
            id: result.recordset[0].id,
            userId,
            weight,
            height,
            bmiValue,
            category,
            date: new Date()
        };
    }

    static getBmiCategory(bmiValue: number): string {
        if (bmiValue < 18.5) return "Underweight";
        if (bmiValue >= 18.5 && bmiValue < 24.9) return "Normal weight";
        if (bmiValue >= 25 && bmiValue < 29.9) return "Overweight";
        if (bmiValue >= 30 && bmiValue < 34.9) return "Obesity (Class I)";
        if (bmiValue >= 35 && bmiValue < 39.9) return "Obesity (Class II)";
        if (bmiValue >= 40) return "Obesity (Class III)";
        throw new AppError("Invalid BMI value", 400);
    }

    // Hàm này chỉ lấy lịch sử BMI theo userId, không lọc thêm điều kiện nào khác
    static async getBmiHistory(userId: number): Promise<IBmi[]> {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("userId", userId)
            .query(`
                SELECT id, userId, weight, height, bmiValue, category, date
                FROM bmi
                WHERE userId = @userId
                ORDER BY date DESC
            `);

        // Nếu không có dữ liệu nào cho userId này thì trả về mảng rỗng thay vì báo lỗi
        if (!result.recordset || result.recordset.length === 0) {
            return [];
        }

        // Trả về toàn bộ lịch sử BMI của userId
        return result.recordset.map((record) => ({
            id: record.id,
            userId: record.userId,
            weight: record.weight,
            height: record.height,
            bmiValue: record.bmiValue,
            category: record.category,
            date: record.date
        }));
    }

    static async deleteBmi(id: number): Promise<{ message: string }> {
        const pool = await poolPromise;
        const result = await pool
            .request()
            .input("id", id)
            .query(`
                DELETE FROM bmi
                WHERE id = @id
            `);

        if (!result.rowsAffected[0]) {
            throw new AppError("Failed to delete BMI data", 500);
        }

        return {
            message: "BMI data deleted successfully"
        };
    }
}
