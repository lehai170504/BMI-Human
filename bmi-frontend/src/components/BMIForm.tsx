import { useState } from "react";
import { calculateBMI, getBMICategory, calculateAge } from "@/utils/bmiUtils";

interface BMIFormProps {
  setBmi: (bmi: number) => void;
  setCategory: (category: string) => void;
  setHealthRisk: (healthRisk: string) => void;
  setExplanation: (explanation: string) => void;
}

export default function BMIForm({
  setBmi,
  setCategory,
  setHealthRisk,
  setExplanation,
}: BMIFormProps) {
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [gender, setGender] = useState<string>("male");
  const [birthday, setBirthday] = useState<string>("");

  const handleCalculate = () => {
    if (weight <= 0 || height <= 0) {
      alert("Vui lòng nhập cân nặng và chiều cao hợp lệ");
      return;
    }

    const age = calculateAge(birthday);
    if (age < 18) {
      alert("Vui lòng nhập ngày sinh hợp lệ");
      return;
    }

    const bmiValue = calculateBMI(weight, height, gender, birthday);
    const { category, healthRisk, explanation } = getBMICategory(bmiValue);

    setBmi(bmiValue);
    setCategory(category);
    setHealthRisk(healthRisk);
    setExplanation(explanation);
  };

  return (
    <div className="w-full px-6 py-10 sm:px-12 lg:px-24">
      <div className="bg-white/90 backdrop-blur rounded-3xl border border-blue-200 shadow-2xl p-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
          Máy tính chỉ số BMI
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cân nặng */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 font-nunito">Cân nặng (kg)</label>
            <input
              type="number"
              value={weight || ""}
              onChange={(e) => setWeight(Number(e.target.value))}
              className="w-full border-2 border-blue-300 bg-white/80 p-3 rounded-xl text-lg focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-inner"
              min="0"
              step="0.1"
              placeholder="Nhập cân nặng của bạn"
            />
          </div>

          {/* Chiều cao */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 font-nunito">Chiều cao (cm)</label>
            <input
              type="number"
              value={height || ""}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full border-2 border-pink-300 bg-white/80 p-3 rounded-xl text-lg focus:ring-4 focus:ring-pink-300 focus:outline-none shadow-inner"
              min="0"
              step="0.1"
              placeholder="Nhập chiều cao của bạn"
            />
          </div>

          {/* Giới tính */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 font-nunito">Giới tính</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border-2 border-violet-300 bg-white/80 p-3 rounded-xl text-lg focus:ring-4 focus:ring-violet-300 focus:outline-none shadow-inner"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </select>
          </div>

          {/* Ngày sinh */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 font-nunito">Ngày sinh</label>
            <input
              type="date"
              value={birthday || ""}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full border-2 border-yellow-300 bg-white/80 p-3 rounded-xl text-lg focus:ring-4 focus:ring-yellow-300 focus:outline-none shadow-inner"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleCalculate}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 font-nunito"
          >
            Tính BMI ngay
          </button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-4 font-nunito">
          Kết quả sẽ được AI giải thích chi tiết bằng tiếng Việt.
        </p>
      </div>
    </div>
  );
}
