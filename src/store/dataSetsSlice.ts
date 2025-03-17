import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataName, DataProps } from "@/types";

export const fetchData = createAsyncThunk(
    "datasets/fetchData",
    async ({ type, lang, all }: { type: string; lang: string; all: boolean }) => {
        const response = await fetch(`/api/${type}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ lang, all }),
        });
        const data = await response.json();
        return data as DataProps[];
    }
);

const dataSetsSlice = createSlice({
    name: "datasets",
    initialState: {
        data: [] as DataProps[],
        type: "coincart" as DataName,
        currentLocation: null as DataProps | null,
        status: "idle",
        error: null,
        showAll: false,
    },
    reducers: {
        toggleShowAll: (state) => {
            state.showAll = !state.showAll;
        },
        updateCurrentLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        changeType: (state, action) => {
            state.type = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message as any;
            });
    },
});

export const { toggleShowAll, updateCurrentLocation } = dataSetsSlice.actions;

export default dataSetsSlice.reducer;
