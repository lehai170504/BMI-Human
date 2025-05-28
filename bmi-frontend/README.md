# BMI Calculator AI

Đây là dự án tính chỉ số BMI (Body Mass Index) kết hợp AI để phân tích và đưa ra lời khuyên sức khỏe cá nhân hóa. Ứng dụng được xây dựng với [Next.js](https://nextjs.org), sử dụng API AI (OpenAI hoặc Google Gemini) để giải thích kết quả BMI.

## 🚀 Bắt đầu nhanh

### 1. Cài đặt

Clone dự án về máy:
```bash
git clone https://github.com/tenban/BMI-Human.git
cd BMI-Human
```

Cài đặt các package:
```bash
npm install
# hoặc
yarn install
```

### 2. Thiết lập API Key

- Nếu dùng OpenAI: tạo file `.env.local` và thêm:
  ```
  OPENAI_API_KEY=your_openai_api_key
  ```
- Nếu dùng Google Gemini: tạo file `.env.local` và thêm:
  ```
  GOOGLE_AI_API_KEY=your_google_ai_api_key
  ```

### 3. Chạy ứng dụng

```bash
npm run dev
# hoặc
yarn dev
```

Truy cập [http://localhost:3000](http://localhost:3000) để sử dụng ứng dụng.

---

## 📝 Tính năng

- **Tính toán BMI**: Nhập cân nặng, chiều cao để tính chỉ số BMI.
- **Phân loại sức khỏe**: Tự động phân loại (Gầy, Bình thường, Thừa cân, Béo phì).
- **Nguy cơ sức khỏe**: Đưa ra cảnh báo nguy cơ dựa trên BMI.
- **Giải thích AI**: Sử dụng AI để giải thích chi tiết tình trạng sức khỏe, gợi ý chế độ ăn uống, sinh hoạt, tập luyện phù hợp.
- **Đăng nhập/Đăng ký**: Quản lý tài khoản người dùng (nếu có).
- **Giao diện đẹp, dễ sử dụng**: Responsive, hỗ trợ cả mobile và desktop.

---

## 🛠️ Công nghệ sử dụng

- [Next.js 13+ App Router](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/) (tùy chỉnh giao diện)
- [OpenAI API](https://platform.openai.com/) hoặc [Google Gemini API](https://ai.google.dev/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Cấu trúc thư mục
src/
├── app/ # Các route và layout chính
│ ├── layout.tsx
│ ├── page.tsx
│ └── login/ # Trang đăng nhập với layout riêng
├── components/ # Các component giao diện
├── utils/ # Hàm tiện ích (tính BMI, phân loại...)
├── types/ # Định nghĩa type TypeScript


---

## 💡 Hướng dẫn sử dụng

1. Nhập cân nặng (kg) và chiều cao (cm) vào form.
2. Nhấn "Tính BMI" để xem kết quả.
3. Xem phân loại, nguy cơ sức khỏe và giải thích chi tiết từ AI.
4. Đăng nhập để lưu lại lịch sử (nếu có chức năng này).

---

## 📦 Triển khai

Bạn có thể triển khai ứng dụng dễ dàng trên [Vercel](https://vercel.com/) hoặc các nền tảng cloud khác.

---

## 📚 Tham khảo

- [Tài liệu Next.js](https://nextjs.org/docs)
- [Tài liệu OpenAI API](https://platform.openai.com/docs)
- [Tài liệu Google Gemini API](https://ai.google.dev/)
- [Tài liệu Tailwind CSS](https://tailwindcss.com/docs)
