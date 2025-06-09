import { configureStore } from "@reduxjs/toolkit";
import { bmiSlice } from "./features/BMI/bmiSlice";

export const store = configureStore({
    reducer: {
        bmi: bmiSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;