import { createSlice } from "@reduxjs/toolkit";

// Định nghĩa kiểu User đồng bộ với backend
export type User = {
  id: number | string;
  name: string;
  email: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
};

const storedUser = typeof window !== 'undefined' ? localStorage.getItem("user") : null;
const storedToken = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

const initialState = {
  isAuthenticated: !!storedToken,
  user: storedUser ? JSON.parse(storedUser) : null,
  token: storedToken || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { login, logout, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;