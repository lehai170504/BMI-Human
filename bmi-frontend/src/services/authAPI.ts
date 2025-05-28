import axiosInstance from "@/config/axiosInstance";

const endpoint = '/auth';

export const register = async (name: string, phone: string, address: string) => {
    const response = await axiosInstance.post(`${endpoint}/register`, { name, phone, address });
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





