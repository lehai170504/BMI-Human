import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { calculateCalo, getCaloHistory } from "@/services/caloAPI";
import { ICaloRequest, ICaloResponse, ICaloHistoryResponse } from "@/types/calo";

// Async thunks
export const calculateCaloAsync = createAsyncThunk(
    "calo/calculate",
    async (data: ICaloRequest, { rejectWithValue }) => {
        try {
            const response = await calculateCalo(data);
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Có lỗi xảy ra khi tính toán");
        }
    }
);

export const getCaloHistoryAsync = createAsyncThunk(
    "calo/getHistory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getCaloHistory();
            return response;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Có lỗi xảy ra khi lấy lịch sử");
        }
    }
);

export interface CaloState {
    calo: ICaloResponse | null;
    caloHistory: ICaloHistoryResponse | null;
    loading: boolean;
    error: string | null;
}

const initialState: CaloState = {
    calo: null,
    caloHistory: null,
    loading: false,
    error: null
};

const caloSlice = createSlice({
    name: "calo",
    initialState,
    reducers: {
        clearCaloError: (state) => {
            state.error = null;
        },
        clearCaloResult: (state) => {
            state.calo = null;
        },
        clearCaloHistory: (state) => {
            state.caloHistory = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Calculate Calo
            .addCase(calculateCaloAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(calculateCaloAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.calo = action.payload;
            })
            .addCase(calculateCaloAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Có lỗi xảy ra khi tính toán";
            })
            // Get History
            .addCase(getCaloHistoryAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCaloHistoryAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.caloHistory = action.payload as unknown as ICaloHistoryResponse;
            })
            .addCase(getCaloHistoryAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || "Có lỗi xảy ra khi lấy lịch sử";
            });
    }
});

export const { clearCaloError, clearCaloResult, clearCaloHistory } = caloSlice.actions;
export default caloSlice.reducer;


