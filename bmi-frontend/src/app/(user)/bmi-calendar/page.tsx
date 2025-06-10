"use client";

import DashboardLayout from "../../../components/layout/DashboardLayout";
import { useEffect, useState } from "react";
import BMIResult from "@/components/BMI/BMIResult";
import { getBmiHistory, deleteBmi } from "@/services/bmiAPI";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function History() {
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [bmiGoal, setBmiGoal] = useState<number | null>(null);
    const [goalInput, setGoalInput] = useState(22);
    const [showGoalInput, setShowGoalInput] = useState(false);
    const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch();

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

    // --- BMI Goal ---
    const latestBmi = history.length > 0 ? history[history.length - 1].bmi : null;
    const progress = bmiGoal && latestBmi ? Math.min(100, Math.round((100 - Math.abs(latestBmi - bmiGoal) / bmiGoal * 100))) : 0;

    // --- Reminder for today ---
    const today = new Date().toISOString().slice(0, 10);
    const hasToday = history.some(item => item.date && item.date.slice(0, 10) === today);

    // --- Chart Data ---
    const chartData = {
        labels: history.map(item => item.date ? item.date.slice(0, 10) : ""),
        datasets: [
            {
                label: "BMI",
                data: history.map(item => item.bmi),
                backgroundColor: "#3b82f6",
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: "Biểu đồ lịch sử BMI" },
        },
        scales: {
            y: {
                title: { display: true, text: "BMI" },
                min: 10,
                max: 40,
            },
            x: {
                title: { display: true, text: "Ngày" },
            },
        },
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

                    {/* --- BMI Goal Section --- */}
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex flex-col gap-2">
                            <span className="font-semibold text-blue-700 font-nunito">🎯 Mục tiêu BMI lý tưởng:</span>
                            {bmiGoal ? (
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-bold text-blue-600">{bmiGoal}</span>
                                    <button onClick={() => setShowGoalInput(true)} className="text-xs text-blue-500 underline">Thay đổi</button>
                                </div>
                            ) : (
                                <button onClick={() => setShowGoalInput(true)} className="text-blue-500 underline text-sm">Đặt mục tiêu</button>
                            )}
                            {showGoalInput && (
                                <form onSubmit={e => { e.preventDefault(); setBmiGoal(goalInput); setShowGoalInput(false); }} className="flex items-center gap-2 mt-2">
                                    <input
                                        type="number"
                                        step="0.1"
                                        min={10}
                                        max={40}
                                        value={goalInput}
                                        onChange={e => setGoalInput(Number(e.target.value))}
                                        className="border rounded px-2 py-1 w-20"
                                    />
                                    <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded">Lưu</button>
                                    <button type="button" onClick={() => setShowGoalInput(false)} className="text-gray-400 ml-2">Hủy</button>
                                </form>
                            )}
                        </div>
                        {bmiGoal && latestBmi && (
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-sm text-gray-500 font-nunito">Tiến trình đạt mục tiêu</span>
                                <div className="w-40 bg-gray-200 rounded-full h-4 overflow-hidden">
                                    <div className="bg-blue-500 h-4 rounded-full transition-all" style={{ width: `${progress}%` }} />
                                </div>
                                <span className="text-xs text-blue-700 font-nunito mt-1">{progress}%</span>
                            </div>
                        )}
                    </div>

                    {/* --- Reminder Section --- */}
                    {!hasToday && (
                        <div className="w-full bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg p-3 text-center font-nunito">
                            Bạn chưa ghi nhận BMI cho hôm nay. Hãy cập nhật để theo dõi tiến trình sức khỏe!
                        </div>
                    )}

                    {/* --- Chart Section --- */}
                    {history.length > 1 && (
                        <div className="w-full bg-white rounded-xl shadow border border-blue-100 p-4">
                            <Bar data={chartData} options={chartOptions} height={120} />
                        </div>
                    )}

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
