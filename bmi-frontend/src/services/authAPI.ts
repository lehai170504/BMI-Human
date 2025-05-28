import axiosInstance from "@/config/axiosInstance";

const endpoint = '/auth';

export const register = async (
    email: string,
    password: string,
    name: string,
    age: number,
    gender: string,
    height: number,
    weight: number
) => {
    const response = await axiosInstance.post(`${endpoint}/register`, {
        email,
        password,
        name,
        age,
        gender,
        height,
        weight
    });
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axiosInstance.post(`${endpoint}/login`, { email, password });
    return response.data;
};

export const logout = async () => {
    const response = await axiosInstance.post(`${endpoint}/logout`);
    return response.data;
};





