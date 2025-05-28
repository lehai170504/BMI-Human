"use client";

import BMIForm from "@/components/BMIForm";
import BMIResult from "@/components/BMIResult";
import ExplanationAI from "@/components/ExplanationAI";
import { useState, useEffect } from "react";

export default function Home() {
    const [bmi, setBmi] = useState<number>(0);
    const [category, setCategory] = useState<string>("");
    const [healthRisk, setHealthRisk] = useState<string>("");
    const [explanation, setExplanation] = useState<string>("");
    const [explanationAI, setExplanationAI] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchAIExplanation = async () => {
            if (category) {
                setIsLoading(true);
                try {
                    const res = await fetch("/api/explain", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ bmi, category, healthRisk }),
                    });

                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await res.json();
                    setExplanationAI(data.explanation);
                } catch (error) {
                    console.error("Error fetching AI explanation:", error);
                    setExplanationAI("Không thể tải giải thích AI. Vui lòng thử lại sau.");
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchAIExplanation();
    }, [category, bmi, healthRisk]);

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
                            <BMIForm
                                setBmi={setBmi}
                                setCategory={setCategory}
                                setHealthRisk={setHealthRisk}
                                setExplanation={setExplanation}
                            />
                        </div>

                        {/* Results Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* BMI Result Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-6 shadow-sm border border-blue-100">
                                <BMIResult
                                    bmi={bmi}
                                    category={category}
                                    healthRisk={healthRisk}
                                    explanation={explanation}
                                />
                            </div>

                            {/* AI Explanation Card */}
                            <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-6 shadow-sm border border-pink-100">
                                <div className="flex items-center gap-2 mb-4">
                                    <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20.5C6.201 20.5 1 15.299 1 9.5S6.201-1.5 12-1.5 23 4.701 23 10.5 17.799 20.5 12 20.5z" />
                                    </svg>
                                    <h2 className="text-xl font-semibold text-gray-900 font-nunito">Phân tích AI</h2>
                                </div>

                                {isLoading ? (
                                    <div className="flex items-center justify-center h-40">
                                        <div className="flex items-center gap-2 text-blue-500">
                                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg>
                                            <span className="font-nunito">Đang phân tích...</span>
                                        </div>
                                    </div>
                                ) : (
                                    explanationAI && <ExplanationAI explanationAI={explanationAI} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
