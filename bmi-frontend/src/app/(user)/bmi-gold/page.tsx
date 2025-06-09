"use client"
import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";

export default function BmiGold() {
    // Giả lập số liệu hiện tại
    const currentWeight = 70; // kg
    const currentBmi = 24;
    const height = 1.7; // m

    // State mục tiêu
    const [goalType, setGoalType] = useState<'bmi' | 'weight'>('weight');
    const [goalWeight, setGoalWeight] = useState(65);
    const [goalBmi, setGoalBmi] = useState(22);
    const [plan, setPlan] = useState('Giảm 2kg/tháng');
    const [progress, setProgress] = useState(30); // %
    const [message, setMessage] = useState('Bạn đang tiến gần tới mục tiêu! Hãy kiên trì nhé!');

    // Tính BMI từ cân nặng và chiều cao
    const calcBmi = (weight: number) => (weight / (height * height)).toFixed(1);
    // Tính cân nặng từ BMI và chiều cao
    const calcWeight = (bmi: number) => (bmi * height * height).toFixed(1);

    // Xử lý khi đổi loại mục tiêu
    const handleGoalTypeChange = (type: 'bmi' | 'weight') => {
        setGoalType(type);
        if (type === 'bmi') {
            setGoalWeight(Number(calcWeight(goalBmi)));
        } else {
            setGoalBmi(Number(calcBmi(goalWeight)));
        }
    };

    // Xử lý khi đặt mục tiêu mới
    const handleSetGoal = (e: any) => {
        e.preventDefault();
        setPlan(goalWeight < currentWeight ? 'Giảm 2kg/tháng' : 'Tăng 1kg/tháng');
        setProgress(Math.min(100, Math.round(100 - Math.abs(currentWeight - goalWeight) / currentWeight * 100)));
        setMessage('Mục tiêu đã được cập nhật! Hãy cố gắng mỗi ngày nhé!');
    };

    return (
        <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 py-8 px-2">
            <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col gap-8 border border-blue-200">
                <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center font-nunito">🎯 BMI Goals</h1>
                <p className="text-gray-500 text-center mb-4 font-nunito">
                    Đặt mục tiêu BMI hoặc cân nặng, theo dõi tiến độ và nhận lộ trình phù hợp!
                </p>
                {/* Form đặt mục tiêu */}
                <form onSubmit={handleSetGoal} className="flex flex-col md:flex-row items-center gap-4 justify-center">
                    <div className="flex items-center gap-2">
                        <label className="font-nunito font-semibold">Mục tiêu:</label>
                        <select value={goalType} onChange={e => handleGoalTypeChange(e.target.value as any)} className="border rounded px-2 py-1">
                            <option value="weight">Cân nặng (kg)</option>
                            <option value="bmi">BMI</option>
                        </select>
                    </div>
                    {goalType === 'weight' ? (
                        <input
                            type="number"
                            min={40}
                            max={150}
                            value={goalWeight}
                            onChange={e => { setGoalWeight(Number(e.target.value)); setGoalBmi(Number(calcBmi(Number(e.target.value)))); }}
                            className="border rounded px-2 py-1 w-24"
                        />
                    ) : (
                        <input
                            type="number"
                            min={10}
                            max={40}
                            step={0.1}
                            value={goalBmi}
                            onChange={e => { setGoalBmi(Number(e.target.value)); setGoalWeight(Number(calcWeight(Number(e.target.value)))); }}
                            className="border rounded px-2 py-1 w-24"
                        />
                    )}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded font-semibold font-nunito hover:bg-blue-600 transition">Đặt mục tiêu</button>
                </form>
                {/* Hiển thị tiến độ và lộ trình */}
                <div className="flex flex-col gap-4 items-center">
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <span className="font-nunito text-gray-500 text-sm">Cân nặng hiện tại: <span className="font-bold text-blue-700">{currentWeight} kg</span></span>
                            <span className="font-nunito text-gray-500 text-sm">BMI hiện tại: <span className="font-bold text-blue-700">{currentBmi}</span></span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-nunito text-gray-500 text-sm">Mục tiêu: <span className="font-bold text-blue-700">{goalType === 'weight' ? `${goalWeight} kg` : `${goalBmi}`}</span></span>
                            <span className="font-nunito text-gray-500 text-sm">Lộ trình gợi ý: <span className="font-bold text-green-600">{plan}</span></span>
                        </div>
                    </div>
                    <div className="w-full">
                        <span className="font-nunito text-gray-500 text-sm">Tiến độ đạt mục tiêu</span>
                        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mt-1">
                            <div className="bg-blue-500 h-4 rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs text-blue-700 font-nunito mt-1">{progress}%</span>
                    </div>
                </div>
                {/* Động viên */}
                <div className="w-full bg-green-50 border border-green-200 rounded-xl p-4 text-center font-nunito text-green-700 text-lg shadow">
                    {message}
                </div>
            </div>
        </div>
        </DashboardLayout>
    );
}