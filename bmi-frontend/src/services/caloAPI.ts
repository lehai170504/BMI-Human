import axiosInstance from "@/config/axiosInstance";
import { ICaloRequest, ICaloResponse } from "@/types/calo";

const endpoint = "/calo";

export const calculateCalo = async (data: ICaloRequest): Promise<ICaloResponse> => {
    try {
        const response = await axiosInstance.post<ICaloResponse>(`${endpoint}/calculate`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi tính toán");
    }
};

export const getCaloHistory = async (): Promise<ICaloResponse[]> => {
    try {
        const response = await axiosInstance.get<ICaloResponse[]>(`${endpoint}/history`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Có lỗi xảy ra khi lấy lịch sử");
    }
};
