"use client";

import BMIForm from "@/components/BMI/BMIForm";
import BMIResult from "@/components/BMI/BMIResult";
import { useState } from "react";
import { BMI } from "@/types/bmi";

export default function Home() {
    const [bmi, setBmi] = useState<BMI | null>(null);

    // Hàm nhận object BMI từ form
    const handleCalculateBmiFromForm = (result: BMI) => {
        setBmi(result);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-2xl md:text-4xl font-nunito">
                        <span className="block">BMI Calculator</span>
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 font-nunito">
                        Tính toán chỉ số BMI, nhận phân tích sức khỏe và lời khuyên cá nhân hóa từ AI
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-6 sm:p-8">
                        {/* BMI Form Section */}
                        <div className="mb-8">
                            <BMIForm onCalculate={handleCalculateBmiFromForm} />
                        </div>

                        {/* Results Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* BMI Result Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm border border-blue-100">
                                <BMIResult bmi={bmi} />
                            </div>
                            {/* Nếu muốn giữ AI Explanation, bạn có thể truyền thêm props hoặc xử lý riêng */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
