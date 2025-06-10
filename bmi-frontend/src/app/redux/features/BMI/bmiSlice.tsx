import { createSlice } from "@reduxjs/toolkit";

export type BMI = {
    id: number;
    userId: number;
    weight: number;
    height: number;
    bmiValue: number;
    category: string;
    date: string;
}

const initialState: BMI = {
    id: 0,
    userId: 0,
    weight: 0,
    height: 0,
    bmiValue: 0,
    category: "",
    date: "",
}

export const bmiSlice = createSlice({
    name: "bmi",
    initialState,  
    reducers: {
        setBmi: (state, action) => {
            state.id = action.payload.id;
            state.userId = action.payload.userId;
            state.weight = action.payload.weight;
            state.height = action.payload.height;
            state.bmiValue = action.payload.bmiValue;
            state.category = action.payload.category;
            state.date = action.payload.date;
        },
        clearBmi: (state) => {
            state.id = 0;
            state.userId = 0;
            state.weight = 0;
            state.height = 0;
            state.bmiValue = 0;
        },
        setBmiCategory: (state, action) => {
            state.category = action.payload.category;
        },
        setBmiDate: (state, action) => {
            state.date = action.payload.date;
        },
        setBmiBmiValue: (state, action) => {
            state.bmiValue = action.payload.bmiValue;
        },
        setBmiUserId: (state, action) => {
            state.userId = action.payload.userId;
        },
        setBmiWeight: (state, action) => {
            state.weight = action.payload.weight;
        },
        setBmiHeight: (state, action) => {
            state.height = action.payload.height;
        },
        },
});

export const { setBmi, clearBmi, setBmiCategory, setBmiDate, setBmiBmiValue, setBmiUserId, setBmiWeight, setBmiHeight } = bmiSlice.actions;
export default bmiSlice.reducer;