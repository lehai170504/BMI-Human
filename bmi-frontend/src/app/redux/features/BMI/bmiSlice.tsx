import { createSlice } from "@reduxjs/toolkit";

export const bmiSlice = createSlice({
    name: "bmi",
    initialState: {
        bmi: 0,
    },  
    reducers: {
        setBmi: (state, action) => {
            state.bmi = action.payload;
        },
    },
});

export const { setBmi } = bmiSlice.actions;
export default bmiSlice.reducer;