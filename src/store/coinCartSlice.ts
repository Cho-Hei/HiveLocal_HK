import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InfoProps } from "@/types";

export const fetchCoinCartData = createAsyncThunk(
    "coinCart/fetchCoinCartData",
    async (lang: string) => {
        const response = await fetch(
            `https://api.hkma.gov.hk/public/coin-cart-schedule?lang=${lang}`
        );
        const data = await response.json();

        // Filter out the data that has already started
        const currentDate = new Date();
        data.result.records = data.result.records.filter(
            (record: InfoProps) =>
                new Date(record.start_date) < currentDate && new Date(record.end_date) > currentDate
        );

        return data.result.records as InfoProps[];
    }
);

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
