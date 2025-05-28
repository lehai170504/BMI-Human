import { poolPromise } from "../config/db";
import bcrypt from "bcryptjs";
import { IUser } from "../models/user.model";
import { AppError } from "../middleware/errorHandler";

export class UserService {
  static async findByEmail(email: string): Promise<IUser | null> {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("email", email)
        .query(`
          SELECT id, email, password, name, age, gender, height, weight, 
                 created_at, updated_at
          FROM users 
          WHERE email = @email
        `);
      return result.recordset[0] || null;
    } catch (error) {
      throw new AppError(
        `Database error while finding user: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500
      );
    }
  }

  static async createUser(user: IUser): Promise<IUser> {
    try {
      const pool = await poolPromise;
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const result = await pool
        .request()
        .input("email", user.email)
        .input("password", hashedPassword)
        .input("name", user.name)
        .input("age", user.age)
        .input("gender", user.gender)
        .input("height", user.height)
        .input("weight", user.weight)
        .query(`
          INSERT INTO users (
            email, password, name, age, gender, height, weight, 
            created_at, updated_at
          )
          OUTPUT 
            INSERTED.id,
            INSERTED.email,
            INSERTED.name,
            INSERTED.age,
            INSERTED.gender,
            INSERTED.height,
            INSERTED.weight,
            INSERTED.created_at,
            INSERTED.updated_at
          VALUES (
            @email, @password, @name, @age, @gender, @height, @weight,
            GETDATE(), GETDATE()
          )
        `);

      if (!result.recordset[0]) {
        throw new AppError("Failed to create user", 500);
      }

      return result.recordset[0];
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        `Failed to create user: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500
      );
    }
  }

  static async updateUser(id: number, userData: Partial<IUser>): Promise<IUser> {
    try {
      const pool = await poolPromise;
      const updates: string[] = [];
      const request = pool.request();

      // Xây dựng câu query động dựa trên các trường được cập nhật
      Object.entries(userData).forEach(([key, value]) => {
        if (value !== undefined && key !== 'id' && key !== 'email') {
          updates.push(`${key} = @${key}`);
          request.input(key, value);
        }
      });

      if (updates.length === 0) {
        throw new AppError("No valid fields to update", 400);
      }

      updates.push("updated_at = GETDATE()");
      request.input("id", id);

      const result = await request.query(`
        UPDATE users 
        SET ${updates.join(", ")}
        OUTPUT 
          INSERTED.id,
          INSERTED.email,
          INSERTED.name,
          INSERTED.age,
          INSERTED.gender,
          INSERTED.height,
          INSERTED.weight,
          INSERTED.created_at,
          INSERTED.updated_at
        WHERE id = @id
      `);

      if (!result.recordset[0]) {
        throw new AppError("User not found", 404);
      }

      return result.recordset[0];
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        `Failed to update user: ${error instanceof Error ? error.message : 'Unknown error'}`,
        500
      );
    }
  }
}
