import { configureStore } from "@reduxjs/toolkit";
import bmiReducer from "./features/BMI/bmiSlice";
import authReducer from "./features/Auth/authSlice";

export const store = configureStore({
    reducer: {
        bmi: bmiReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;