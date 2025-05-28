//Hàm tính toán BMI và phân loại

import { BMICategory } from "@/types/bmi";

export function calculateBMI(weight: number, height: number, gender: string, birthday: string): number {
  if (weight <= 0 || height <= 0) return 0;
  return parseFloat((weight / ((height / 100) ** 2)).toFixed(2));
}

export function calculateAge(birthday: string): number {
  const today = new Date();
  const birthDate = new Date(birthday);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}




export function getBMICategory(bmi: number): BMICategory {
  if (bmi <= 0) {
    return {
      category: "Không hợp lệ",
      healthRisk: "Vui lòng nhập lại thông tin",
      explanation: "Cân nặng và chiều cao phải lớn hơn 0"
    };
  }
  
  if (bmi < 18.5) {
    return {
      category: "Gầy",
      healthRisk: "Thiếu cân",
      explanation: "Bạn cần tăng cường dinh dưỡng và tập luyện để tăng cân một cách lành mạnh."
    };
  }
  if (bmi < 24.9) {
    return {
      category: "Bình thường",
      healthRisk: "Khỏe mạnh",
      explanation: "Chỉ số BMI của bạn đang ở mức tốt. Hãy duy trì chế độ ăn uống và tập luyện hiện tại."
    };
  }
  if (bmi < 29.9) {
    return {
      category: "Thừa cân",
      healthRisk: "Cao",
      explanation: "Bạn nên điều chỉnh chế độ ăn uống và tăng cường vận động để giảm cân."
    };
  }
  return {
    category: "Béo phì",
    healthRisk: "Rất cao",
    explanation: "Bạn cần tham khảo ý kiến bác sĩ và có kế hoạch giảm cân khoa học."
  };
}

export function getHealthRisk(category: string): BMICategory {
    switch (category) {
        case "Gầy":
            return { category: "Gầy", healthRisk: "Rủi ro cao về sức khỏe", explanation: "Bạn có nguy cơ mắc bệnh tim mạch, đái tháo đường và ung thư." };
        case "Bình thường":
            return { category: "Bình thường", healthRisk: "Rủi ro trung bình về sức khỏe", explanation: "Bạn có nguy cơ mắc bệnh tim mạch, đái tháo đường và ung thư." };
        case "Thừa cân":
            return { category: "Thừa cân", healthRisk: "Rủi ro cao về sức khỏe", explanation: "Bạn có nguy cơ mắc bệnh tim mạch, đái tháo đường và ung thư." };
        case "Béo phì":
            return { category: "Béo phì", healthRisk: "Rủi ro cao về sức khỏe", explanation: "Bạn có nguy cơ mắc bệnh tim mạch, đái tháo đường và ung thư." };
        default:
            return { category: "Không xác định", healthRisk: "Không xác định", explanation: "Bạn có nguy cơ mắc bệnh tim mạch, đái tháo đường và ung thư." };
    }
  }