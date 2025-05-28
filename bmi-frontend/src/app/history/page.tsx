"use client";

import DashboardLayout from "../components/DashboardLayout";
// Trang lịch sử BMI nâng cao (hard mode) - giải thích bằng tiếng Việt ở dưới

import { useEffect, useState } from "react";
import BMIResult from "@/components/BMIResult";


export default function History() {
    // State lưu lịch sử, trạng thái loading và lỗi
    const [history, setHistory] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Lấy dữ liệu lịch sử từ localStorage khi component mount
    useEffect(() => {
        // Tạm hardcode dữ liệu demo để xem giao diện
        const sampleHistory = [
          {
            id: "1",
            bmi: 22.5,
            category: "Bình thường",
            healthRisk: "Nguy cơ thấp",
            explanation: "BMI của bạn nằm trong khoảng bình thường (18.5–24.9). Hãy tiếp tục duy trì lối sống lành mạnh.",
          },
          {
            id: "2",
            bmi: 27.3,
            category: "Thừa cân",
            healthRisk: "Nguy cơ trung bình",
            explanation: "BMI trên mức bình thường. Bạn nên xem xét cải thiện chế độ ăn và tập luyện đều đặn.",
          },
          {
            id: "3",
            bmi: 17.8,
            category: "Thiếu cân",
            healthRisk: "Nguy cơ thấp",
            explanation: "BMI dưới mức bình thường. Bạn nên tham khảo ý kiến chuyên gia dinh dưỡng.",
          },
        ];
      
        setHistory(sampleHistory);   // gán dữ liệu mẫu
        setIsLoading(false);         // tắt trạng thái loading
      }, []);
      
    // Hàm xóa toàn bộ lịch sử
    const handleClearHistory = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử không?")) {
            localStorage.removeItem("history");
            setHistory([]);
        }
    };

    // Hàm xóa một mục lịch sử theo id
    const handleDeleteItem = (id: string) => {
        const newHistory = history.filter((item) => item.id !== id);
        setHistory(newHistory);
        localStorage.setItem("history", JSON.stringify(newHistory));
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
                {error && (
                    <div className="text-center text-red-600 font-nunito">{error}</div>
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
                                .slice() // copy mảng để không ảnh hưởng gốc
                                .reverse() // hiển thị mới nhất lên trên
                                .map((item: any, idx) => (
                                <div key={item.id || idx} className="relative group">
                                    <BMIResult
                                        bmi={item.bmi}
                                        category={item.category}
                                        healthRisk={item.healthRisk}
                                        explanation={item.explanation}
                                    />
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
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

/*
Giải thích (bằng tiếng Việt):

- Trang này hiển thị lịch sử các lần tính BMI của người dùng, lấy từ localStorage.
- Có nút "Xóa toàn bộ lịch sử" để xóa sạch dữ liệu.
- Mỗi mục lịch sử có nút xóa riêng (hiện khi hover), cho phép xóa từng kết quả.
- Hiển thị loading, lỗi, và thông báo khi không có dữ liệu.
- Giao diện đẹp, responsive, dùng gradient, shadow, bo góc lớn, nút nổi bật.
- Kết quả mới nhất sẽ hiển thị ở trên cùng.
*/
