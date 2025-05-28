"use client";

import { createContext, useState, ReactNode, useEffect } from "react";

// Định nghĩa kiểu User đồng bộ với backend
type User = {
  id: number | string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  // Có thể bổ sung các trường khác nếu backend trả về
};

// Định nghĩa kiểu dữ liệu cho Context
type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
};

// Tạo context với giá trị mặc định
export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

// Provider để bao bọc app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Khi load lại trang, đọc user/token từ localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (user: User, token: string) => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
