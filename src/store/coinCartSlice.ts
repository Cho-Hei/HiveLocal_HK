import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { InfoProps } from "@/types";

export const fetchCoinCartData = createAsyncThunk(
    "coinCart/fetchCoinCartData",
    async ({ lang, all }: { lang: string; all: boolean }) => {
        const response = await fetch(`/api/coincart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ lang, all }),
        });
        const data = await response.json();
        return data as InfoProps[];
    }
);

const coinCartSlice = createSlice({
    name: "coinCart",
    initialState: {
        data: [] as InfoProps[],
        status: "idle",
        error: null,
        showAll: false,
    },
    reducers: {
        toggleShowAll: (state) => {
            state.showAll = !state.showAll;
        },
    },
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

export const { toggleShowAll } = coinCartSlice.actions;

export default coinCartSlice.reducer;
