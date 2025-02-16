import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InfoProps } from "@/types";

export const fetchCoinCartData = createAsyncThunk("coinCart/fetchCoinCartData", async () => {
    const response = await fetch("https://api.hkma.gov.hk/public/coin-cart-schedule?lang=en");
    const data = await response.json();
    return data.result.records as InfoProps[];
});

const coinCartSlice = createSlice({
    name: "coinCart",
    initialState: {
        data: [] as InfoProps[],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCoinCartData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCoinCartData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchCoinCartData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as any;
            });
    },
});

export default coinCartSlice.reducer;
