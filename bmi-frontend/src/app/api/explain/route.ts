// pages/api/explain.ts
import { NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { bmi, category, healthRisk } = await request.json();

    const prompt = `
      Tôi vừa làm bài test BMI và có kết quả sau:
      - BMI: ${bmi}
      - Phân loại: ${category}
      - Nguy cơ sức khỏe: ${healthRisk}
      
      Hãy giải thích cụ thể tình trạng sức khỏe của tôi, lời khuyên về chế độ ăn uống, sinh hoạt, và tập luyện phù hợp. Trình bày ngắn gọn, dễ hiểu.
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    const explanation = response.choices[0]?.message?.content || "";

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { explanation: "Không thể lấy dữ liệu từ AI. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
