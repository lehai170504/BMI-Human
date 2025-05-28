"use client";

import { createContext, useState, ReactNode } from "react";
import { login as loginAPI, logout as logoutAPI } from "@/services/authAPI";

// Định nghĩa kiểu User (tùy thuộc vào backend trả về)
type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

// Định nghĩa kiểu dữ liệu cho Context
type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Tạo context với giá trị mặc định (dummy)
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: async () => {},
  logout: async () => {},
});

// Provider để bao bọc app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginAPI(email, password);
      if (response.success) {
        setIsLoggedIn(true);
        setUser(response.user);
      } else {
        console.error("Đăng nhập thất bại:", response.message);
      }
    } catch (error) {
      console.error("Lỗi khi đăng nhập:", error);
    }
  };

  const logout = async () => {
    try {
      const response = await logoutAPI();
      if (response.success) {
        setIsLoggedIn(false);
        setUser(null);
      } else {
        console.error("Đăng xuất thất bại:", response.message);
      }
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
