"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { login } from "@/services/authAPI";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login(email, password);

      if (response.success) {
        router.push("/");
      } else {
        setError("Email hoặc mật khẩu không đúng");
      }
    } catch {
      setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-blue-500 mb-6 font-nunito">Đăng nhập</h1>

        {error && (
          <div className="mb-4 w-full bg-red-100 text-red-600 px-4 py-2 rounded text-center text-sm font-nunito">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition font-nunito"
            required
            autoComplete="email"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition font-nunito"
            required
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-gradient-to-r from-blue-500 to-blue-300 text-white font-semibold py-3 rounded-lg shadow hover:scale-105 transition-all duration-150 disabled:opacity-60"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2 font-nunito">
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Đang đăng nhập...
              </span>
            ) : (
              "Đăng nhập"
            )}
          </button>
        </form>

        <div className="mt-6 text-sm text-gray-500 font-nunito">
          Chưa có tài khoản?{" "}
          <Link 
            href="/register"
            className="text-blue-500 font-semibold hover:underline font-nunito"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
