"use client"
import { useState } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import { calculateCalo } from "@/services/caloAPI";
import { ICaloRequest } from "@/types/calo"; // Tạo type này tương tự như BE

const activityLevels = [
    { value: 1.2, label: "Ít vận động (ngồi nhiều)" },
    { value: 1.375, label: "Vận động nhẹ (1-3 ngày/tuần)" },
    { value: 1.55, label: "Vận động vừa (3-5 ngày/tuần)" },
    { value: 1.725, label: "Vận động nhiều (6-7 ngày/tuần)" },
    { value: 1.9, label: "Rất nhiều (vận động viên, lao động nặng)" },
];

export default function CaloCalculator() {
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [age, setAge] = useState(25);
    const [weight, setWeight] = useState(65);
    const [height, setHeight] = useState(170);
    const [activity, setActivity] = useState(1.375);
    const [goal, setGoal] = useState<'maintain' | 'lose' | 'gain'>('maintain');
    const [result, setResult] = useState<{bmr: number, tdee: number, caloSuggest: number} | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data: ICaloRequest = {
                gender,
                age,
                weight,
                height,
                activity,
                goal
            };

            const response = await calculateCalo(data);
            
            if (response.success) {
                setResult(response.data);
            } else {
                setError(response.message || 'Có lỗi xảy ra khi tính toán');
            }
        } catch (error: any) {
            setError(error.response?.data?.message || 'Có lỗi xảy ra khi tính toán');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 py-8 px-2">
                <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl p-8 flex flex-col gap-8 border border-blue-200">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2 text-center font-nunito">🧬 Calo Calculator</h1>
                    <p className="text-gray-500 text-center mb-4 font-nunito">
                        Tính toán nhu cầu calo hàng ngày (BMR, TDEE) và nhận khuyến nghị phù hợp với mục tiêu của bạn.
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col gap-1 w-full">
                                <label className="font-nunito font-semibold">Giới tính</label>
                                <select 
                                    value={gender} 
                                    onChange={e => setGender(e.target.value as 'male' | 'female')} 
                                    className="border rounded px-2 py-1"
                                    disabled={loading}
                                >
                                    <option value="male">Nam</option>
                                    <option value="female">Nữ</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="font-nunito font-semibold">Tuổi</label>
                                <input 
                                    type="number" 
                                    min={10} 
                                    max={100} 
                                    value={age} 
                                    onChange={e => setAge(Number(e.target.value))} 
                                    className="border rounded px-2 py-1"
                                    disabled={loading}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex flex-col gap-1 w-full">
                                <label className="font-nunito font-semibold">Cân nặng (kg)</label>
                                <input type="number" min={30} max={200} value={weight} onChange={e => setWeight(Number(e.target.value))} className="border rounded px-2 py-1" disabled={loading} />
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <label className="font-nunito font-semibold">Chiều cao (cm)</label>
                                <input type="number" min={120} max={220} value={height} onChange={e => setHeight(Number(e.target.value))} className="border rounded px-2 py-1" disabled={loading} />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-nunito font-semibold">Mức độ vận động</label>
                            <select value={activity} onChange={e => setActivity(Number(e.target.value))} className="border rounded px-2 py-1" disabled={loading}>
                                {activityLevels.map(lv => (
                                    <option key={lv.value} value={lv.value}>{lv.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="font-nunito font-semibold">Mục tiêu</label>
                            <select value={goal} onChange={e => setGoal(e.target.value as any)} className="border rounded px-2 py-1" disabled={loading}>
                                <option value="maintain">Giữ cân</option>
                                <option value="lose">Giảm cân</option>
                                <option value="gain">Tăng cân</option>
                            </select>
                        </div>
                        <button 
                            type="submit" 
                            className={`bg-blue-500 text-white px-4 py-2 rounded font-semibold font-nunito transition
                                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                            disabled={loading}
                        >
                            {loading ? 'Đang tính toán...' : 'Tính toán'}
                        </button>
                    </form>

                    {/* Kết quả */}
                    {result && (
                        <div className="w-full bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col gap-2 text-center font-nunito">
                            <div><span className="font-semibold text-blue-700">BMR:</span> {result.bmr} kcal/ngày</div>
                            <div><span className="font-semibold text-blue-700">TDEE:</span> {result.tdee} kcal/ngày</div>
                            <div>
                                <span className="font-semibold text-blue-700">Khuyến nghị calo/ngày:</span> 
                                <span className="text-green-600 font-bold"> {result.caloSuggest} kcal</span>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                * Nếu muốn giảm cân, nên giảm 300-500 kcal/ngày so với TDEE. 
                                Nếu muốn tăng cân, nên tăng 300-500 kcal/ngày.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}