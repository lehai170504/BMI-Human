import { getUserByEmail, createUser } from './userService';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

export class AuthService {

    async register(userData: IUser): Promise<IUser> {
        const { email, password, name, age, gender, height, weight } = userData;

        // Kiểm tra user đã tồn tại chưa
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const user = await createUser(email, hashedPassword, name, age, gender, height, weight);

        return user;
    }   

    async login(email: string, password: string): Promise<{ token: string, user: IUser }> {
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // Kiểm tra password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Tạo JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });

        return { token, user };
    }   

    async generateToken(userId: number): Promise<string> {
        return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '24h' });
    }

}       
