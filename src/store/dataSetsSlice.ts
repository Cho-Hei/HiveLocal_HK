import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataName, DataProps } from "@/types";
import { cacheData, getCachedData } from "@/utils/indexDB";

export const fetchData = createAsyncThunk(
    "datasets/fetchData",
    async ({ type, lang }: { type: string; lang: string }) => {
        const cacheKey = `${type}-${lang}`;

        // Check IndexedDB for cached data
        const cachedData = await getCachedData(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        // Fetch data from API if not cached or expired
        let data;
        if (type === "coincart") {
            const response = await fetch(`/api/${type}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lang }),
            });
            data = await response.json();
        } else {
            const response = await fetch(`/api/facilities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ lang, facilitiesType: type }),
            });
            data = await response.json();
        }

        // Cache the fetched data with a timestamp
        cacheData(cacheKey, data);

        return data as DataProps[];
    }
);

const dataSetsSlice = createSlice({
    name: "datasets",
    initialState: {
        data: [] as DataProps[],
        coincartshowall: false as boolean,
        type: "coincart" as DataName,
        currentLocation: null as DataProps | null,
        status: "idle",
        error: "" as string,
    },
    reducers: {
        updateCoinCartShowAll: (state, action) => {
            state.coincartshowall = action.payload;
        },
        updateCurrentLocation: (state, action) => {
            state.currentLocation = action.payload;
        },
        changeType: (state, action) => {
            state.type = action.payload;
            state.data = [];
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
                state.error = action.error.message as string;
            });
    },
});

export const { updateCoinCartShowAll, updateCurrentLocation, changeType } = dataSetsSlice.actions;

export default dataSetsSlice.reducer;
