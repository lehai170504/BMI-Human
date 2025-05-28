"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! (Gửi form thành công giả lập)");
    // Xử lý gửi email hoặc API ở đây
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 py-12 px-6 sm:px-12 lg:px-32">
      <div className="flex justify-between items-center flex-col lg:flex-row gap-12">
        {/* Hình minh hoạ bên trái */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2"
        >
          <img
            src="/BMI_LogoRemove.png"
            alt="Liên hệ"
            className="w-full h-auto rounded-3xl shadow-lg"
          />
        </motion.div>

        {/* Form liên hệ bên phải */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-1/2 bg-white shadow-2xl rounded-3xl p-10 border border-blue-200"
        >
          <h1 className="text-4xl font-bold text-blue-700 mb-4 text-center font-nunito">
            Liên hệ với chúng tôi
          </h1>
          <p className="text-gray-600 text-center mb-10 font-nunito">
            Gửi cho chúng tôi thắc mắc hoặc góp ý của bạn. Chúng tôi sẽ phản hồi sớm nhất!
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1 font-nunito">Họ và tên</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-blue-300 bg-white/80 p-3 rounded-xl text-lg focus:ring-4 focus:ring-blue-200 focus:outline-none shadow-inner"
                placeholder="Nhập họ tên"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1 font-nunito">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-blue-300 bg-white/80 p-3 rounded-xl text-lg focus:ring-4 focus:ring-blue-200 focus:outline-none shadow-inner"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1 font-nunito">Tin nhắn</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                className="w-full border border-blue-300 bg-white/80 p-3 rounded-xl text-lg focus:ring-4 focus:ring-blue-200 focus:outline-none shadow-inner"
                placeholder="Nhập nội dung cần liên hệ"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-lg px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition-all font-nunito"
            >
              Gửi tin nhắn
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
