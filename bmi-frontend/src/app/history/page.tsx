"use client";

import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState, useContext } from "react";
import BMIResult from "@/components/BMIResult";
import { getBmiHistory, deleteBmi } from "@/services/bmiAPI";  
import Swal from "sweetalert2";
import { AuthContext } from "@/context/authcontext";


export default function History() {
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const historyData = await getBmiHistory();
                setHistory(historyData);
                setIsLoading(false);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Lỗi khi tải lịch sử!",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6"
                });
                setIsLoading(false);
            }
        };
        fetchHistory();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            await deleteBmi(id);
            setHistory(history.filter((item) => item.id !== id));   
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Lỗi khi xóa!",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6"
            });
        }   
    };

    const handleClearHistory = async () => {
        Swal.fire({
            icon: "warning",
            title: "Xác nhận",
            text: "Bạn có chắc chắn muốn xóa toàn bộ lịch sử không?",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            confirmButtonColor: "#3085d6"
        }).then(async (result) => {
            if (result.isConfirmed) {
                for (const item of history) {
                    await deleteBmi(item.id);
                }
                setHistory([]);
            }
        });
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center py-8 px-2">
                <div className="w-full max-w-5xl min-h-[600px] bg-white/90 rounded-3xl shadow-2xl p-8 md:p-14 flex flex-col items-center gap-8 border border-blue-200">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-600 drop-shadow mb-2 text-center tracking-tight font-nunito">
                        Lịch sử tính BMI của bạn
                    </h1>
                    <p className="text-gray-500 text-center mb-4 font-nunito">
                        Xem lại các lần tính BMI trước đây. Bạn có thể xóa từng mục hoặc xóa toàn bộ lịch sử.
                    </p>
                    {isLoading && (
                        <div className="text-center text-blue-600 animate-pulse font-nunito">Đang tải lịch sử...</div>
                    )}
                    {!isLoading && history.length === 0 && (
                        <div className="text-center text-gray-400 text-lg font-nunito">
                            Chưa có dữ liệu lịch sử. Hãy tính BMI để lưu lại kết quả!
                        </div>
                    )}
                    {!isLoading && history.length > 0 && (
                        <>
                            <div className="flex justify-end w-full mb-4">
                                <button
                                    onClick={handleClearHistory}
                                    className="bg-gradient-to-r from-pink-400 to-blue-400 text-white px-5 py-2 rounded-xl font-semibold shadow hover:scale-105 transition-all duration-150 font-nunito"
                                >
                                    Xóa toàn bộ lịch sử
                                </button>
                            </div>
                            <div className="flex flex-col gap-8 w-full">
                                {history
                                    .slice()
                                    .reverse()
                                    .map((item: any, idx) => (
                                        <div key={item.id || idx} className="relative group">
                                            <BMIResult bmi={item} />
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="absolute top-4 right-4 bg-red-100 text-red-600 rounded-full p-2 shadow hover:bg-red-200 transition-all opacity-0 group-hover:opacity-100 font-nunito"
                                                title="Xóa mục này"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))} 
                            </div>
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
