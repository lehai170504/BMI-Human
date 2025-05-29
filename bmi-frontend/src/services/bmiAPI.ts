import axiosInstance from "@/config/axiosInstance";

const endpoint = "/bmi";

export const calculateBmi = async (height: number, weight: number) => {
  const response = await axiosInstance.post(`${endpoint}/calculate`, { height, weight });
  return response.data;
};

export const getBmiHistory = async () => {
  const response = await axiosInstance.get(`${endpoint}/history`);
  return response.data;
};

export const deleteBmi = async (id: number) => {
  const response = await axiosInstance.delete(`${endpoint}/${id}`);
  return response.data;
};

