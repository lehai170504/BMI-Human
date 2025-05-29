import { BMI } from "@/types/bmi";

export default function BMIResult({ bmi }: { bmi: BMI | null }) {
  if (!bmi) {
    return (
      <div className="text-center text-gray-500 font-nunito mt-6">
        Chưa có kết quả BMI nào.
      </div>
    );
  }

  return (
    <div className="mt-6 text-center bg-gradient-to-br from-blue-50 via-white to-pink-50 border-2 border-blue-200 rounded-3xl shadow-2xl p-6 flex flex-col items-center gap-4">
      <div className="flex items-center justify-center mb-2">
        <svg className="w-12 h-12 text-pink-400 drop-shadow" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="#f9a8d4"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 018 0v2M12 7v.01" />
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-blue-500 mb-2 drop-shadow font-nunito">Kết quả BMI của bạn</h2>
      <div className="flex flex-col gap-2 w-full max-w-xs mx-auto">
        <div className="flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-xl shadow">
            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v.01" />
            </svg>
            BMI: {bmi.bmiValue}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-xl shadow font-nunito">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Phân loại: {bmi.category}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 font-semibold px-4 py-2 rounded-xl shadow font-nunito">
            <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            Ngày tính: {new Date(bmi.date).toLocaleString("vi-VN", { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
}
