
interface ExplanationAIProps {
  explanationAI: string;
}

export default function ExplanationAI({ explanationAI }: ExplanationAIProps) {
  return (
    <div className="mt-8 p-8 border-2 border-blue-300 rounded-3xl shadow-2xl max-w-4xl mx-auto bg-gradient-to-br from-blue-50 via-white to-blue-100 transition-transform">
      <div className="flex items-center gap-3 mb-5">
        <h2 className="text-2xl font-bold text-blue-500 drop-shadow font-nunito">Phân tích từ AI</h2>
      </div>
      <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-line max-h-64 overflow-y-auto pr-2 font-nunito">
        {explanationAI}
      </div>
    </div>
  );
}