import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BMI } from '@/types/bmi';

interface BMIState {
    currentBMI: BMI | null;
    bmiHistory: BMI[];
    bmiGoal: {
        target: number;
        deadline: string;
    } | null;
    loading: boolean;
    error: string | null;
}

const initialState: BMIState = {
    currentBMI: null,
    bmiHistory: [],
    bmiGoal: null,
    loading: false,
    error: null
};

const bmiSlice = createSlice({
    name: 'bmi',
    initialState,
    reducers: {
        setCurrentBMI: (state, action: PayloadAction<BMI>) => {
            state.currentBMI = action.payload;
        },
        setBMIHistory: (state, action: PayloadAction<BMI[]>) => {
            state.bmiHistory = action.payload;
        },
        setBmiGoal: (state, action: PayloadAction<{ target: number; deadline: string }>) => {
            state.bmiGoal = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearBMIState: (state) => {
            state.currentBMI = null;
            state.bmiHistory = [];
            state.bmiGoal = null;
            state.error = null;
        }
    }
});

export const {
    setCurrentBMI,
    setBMIHistory,
    setBmiGoal,
    setLoading,
    setError,
    clearBMIState
} = bmiSlice.actions;

export default bmiSlice.reducer;