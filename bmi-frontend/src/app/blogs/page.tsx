"use client";

import { motion } from "framer-motion";

const blogs = [
  {
    id: 1,
    title: "Tại sao BMI quan trọng trong chăm sóc sức khỏe?",
    description: "Khám phá vai trò của chỉ số BMI và cách nó ảnh hưởng đến kế hoạch ăn uống và tập luyện.",
    date: "28/05/2025",
    image: "/bmi-y-nghia.jpg",  
    author: "Bác sĩ Minh",
  },
  {
    id: 2,
    title: "Cách duy trì cân nặng lý tưởng sau khi giảm cân",
    description: "Các nguyên tắc đơn giản giúp bạn duy trì vóc dáng sau khi đạt mục tiêu giảm cân.",
    date: "25/05/2025",
    author: "HLV Lan Anh",  
    image: "/tap-the-duc-de-duy-tri-bmi-ly-tuong.jpg",
  },
  {
    id: 3,
    title: "Thực đơn lành mạnh cho người có BMI cao",
    description: "Gợi ý chế độ ăn uống phù hợp để giảm BMI và cải thiện sức khỏe tổng thể.",
    date: "20/05/2025",
    author: "Chuyên gia dinh dưỡng Tú",
    image: "/thuc-don-hanh-chinh-cho-nguoi-co-bmi-cao.jpg",
  },
  {
    id: 4,
    title: "Cách tính BMI chính xác nhất",
    description: "Hướng dẫn cách tính BMI chính xác nhất để đánh giá tình trạng cơ thể và tỷ lệ phân bố mỡ trong cơ thể.",
    date: "15/05/2025",
    author: "Bác sĩ Minh",
    image: "/cach-tinh-bmi-chinh-xac-nhat.jpg",
  },
  {
    id: 5,
    title: "Cách tính BMI chính xác nhất",
    description: "Hướng dẫn cách tính BMI chính xác nhất để đánh giá tình trạng cơ thể và tỷ lệ phân bố mỡ trong cơ thể.",
    date: "15/05/2025",
    author: "Bác sĩ Minh",
    image: "/cach-tinh-bmi-chinh-xac-nhat.jpg",
  },
  {
    id: 6,
    title: "Cách tính BMI chính xác nhất",
    description: "Hướng dẫn cách tính BMI chính xác nhất để đánh giá tình trạng cơ thể và tỷ lệ phân bố mỡ trong cơ thể.",
    date: "15/05/2025",
    author: "Bác sĩ Minh",
  },
];

export default function Blogs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-16 px-6 sm:px-12 lg:px-32">
      <h1 className="text-4xl font-bold text-blue-700 text-center mb-12 drop-shadow-md font-nunito">
        Blog Sức Khỏe & Dinh Dưỡng
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-blue-400 hover:border-pink-400 transition-all duration-300"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2 font-nunito">{blog.title}</h2>
            <p className="text-gray-600 text-sm mb-4 font-nunito">{blog.description}</p>
            <div className="flex justify-between text-gray-400 text-xs">
              <span>📅 {blog.date}</span>
              <span>✍️ {blog.author}</span>
            </div>
            <img src={blog.image} alt={blog.title} className="w-full h-40 object-cover rounded-lg mt-4" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
