import { poolPromise } from '../config/db';
import { IUser } from '../models/User';

export async function getUserByEmail(email: string): Promise<IUser | null> {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('email', email)
    .query('SELECT * FROM Users WHERE email = @email');
  return result.recordset[0] || null;
}

export async function createUser(
    email: string,
    password: string,
    name: string,
    age: number,
    gender: string,
    height: number,
    weight: number
): Promise<IUser> {
    const pool = await poolPromise;
    await pool.request()
        .input('email', email)
        .input('password', password)
        .input('name', name)
        .input('age', age)
        .input('gender', gender)
        .input('height', height)
        .input('weight', weight)
        .query(`INSERT INTO Users (email, password, name, age, gender, height, weight)
                VALUES (@email, @password, @name, @age, @gender, @height, @weight)`);

    // Lấy lại user vừa tạo
    return getUserByEmail(email) as Promise<IUser>;
}

export class UserService {
    async getUser(userId: string) {
        const user = await getUserByEmail(userId);
        return user;
    }   

    async updateUser(userId: string, userData: IUser) {
        const user = await getUserByEmail(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const pool = await poolPromise;
        const updatedUser = await pool.request()
            .input('id', user.id)
            .input('name', userData.name)
            .input('email', userData.email)
            .input('password', userData.password)
            .input('age', userData.age)
            .input('gender', userData.gender)
            .input('height', userData.height)
            .input('weight', userData.weight)
            .query('UPDATE Users SET name = @name, email = @email, password = @password, age = @age, gender = @gender, height = @height, weight = @weight WHERE id = @id');
        return updatedUser.recordset[0] || null;
    }   
}      
