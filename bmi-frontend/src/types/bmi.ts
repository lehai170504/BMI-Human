//Định nghĩa type cho dữ liệu ( bmi, category, healthRisk)
export type BMI = {
    id: number;
    userId: number;
    weight: number;
    height: number;
    bmiValue: number;
    category: string;
    date: string;
    // Thêm các trường khác nếu backend trả về
}

export type BMICategory = {
    category: string;
    healthRisk: string;
    explanation: string;
}






