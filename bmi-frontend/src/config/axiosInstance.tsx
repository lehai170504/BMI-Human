import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 5000,
    validateStatus: function (status: number) {
        return status >= 200 && status < 303;
    },
});

export default axiosInstance;
