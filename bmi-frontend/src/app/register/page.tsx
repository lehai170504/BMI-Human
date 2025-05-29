"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { register } from "@/services/authAPI";
import Swal from "sweetalert2";


export default function Register() {
    // Khai báo state cho email, password, lỗi và trạng thái loading
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    // Hàm xử lý submit form đăng ký
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSuccess(false);
        setIsError(false);
        setError("");

        // Validate mật khẩu nhập lại
        if (password !== confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Mật khẩu nhập lại không khớp!",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6"
            });
            setIsError(true);
            return;
        }

        // Validate các trường số
        if (
            !age || isNaN(Number(age)) || Number(age) <= 0 ||
            !height || isNaN(Number(height)) || Number(height) <= 0 ||
            !weight || isNaN(Number(weight)) || Number(weight) <= 0
        ) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Vui lòng nhập đúng tuổi, chiều cao, cân nặng!",
                confirmButtonText: "OK",
                confirmButtonColor: "#3085d6"
            });
            setIsError(true);
            return;
        }

        try {
            const response = await register(
                email,
                password,
                name,
                Number(age),
                gender,
                Number(height),
                Number(weight)
            );
            if (response && (response.message === "User registered successfully" || response.success)) {
                setIsSuccess(true);
                router.push("/login");
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.message || "Đăng ký thất bại. Vui lòng thử lại.",
                    confirmButtonText: "OK",
                    confirmButtonColor: "#3085d6"
                });
                setIsError(true);
            }
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Đã xảy ra lỗi. Vui lòng thử lại sau."
            );
            setIsError(true);
        } finally {
            setIsSuccess(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200">
            <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 font-nunito">Đăng ký</h1>
                {(isError || error) && (
                    <div className="mb-4 w-full bg-red-100 text-red-600 px-4 py-2 rounded text-center text-sm font-nunito">
                        {error || "Đã xảy ra lỗi. Vui lòng thử lại sau."}
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
                    <input
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition font-nunito"
                        required
                        autoComplete="new-password"
                    />
                    <input
                        type="text"
                        placeholder="Tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}   
                        className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition font-nunito"  
                        required
                    />
                    <input
                        type="number"
                        placeholder="Tuổi"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition font-nunito"
                        required
                    />
                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition font-nunito"
                        required
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Chiều cao (cm)"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition font-nunito"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Cân nặng (kg)"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-pink-400 transition font-nunito"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-blue-400 text-white font-semibold py-3 rounded-lg shadow hover:scale-105 transition-all duration-150 disabled:opacity-60"
                        disabled={isSuccess}
                    >
                        {isSuccess ? (
                            <span className="flex items-center justify-center gap-2 font-nunito">
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                                Đang đăng ký...
                            </span>
                        ) : (
                            "Đăng ký"
                        )}
                    </button>
                </form>
                <div className="mt-6 text-sm text-gray-500 font-nunito">
                    Đã có tài khoản?{" "}
                    <Link href="/login" className="text-blue-500 font-semibold hover:underline font-nunito">
                        Đăng nhập ngay
                    </Link>
                </div>
            </div>
        </div>
    );
}
