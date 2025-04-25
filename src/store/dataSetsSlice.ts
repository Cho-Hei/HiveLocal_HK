import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { openDB } from "idb";
import { DataName, DataProps } from "@/types";

// Check if IndexedDB is available (browser environment) (Client Side)
const isBrowser = typeof window !== "undefined" && typeof indexedDB !== "undefined";
const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000;
// const CACHE_EXPIRATION_TIME = 60 * 1000;

const dbPromise = isBrowser
    ? openDB("DataCacheDB", 1, {
          upgrade(db) {
              if (!db.objectStoreNames.contains("datasets")) {
                  db.createObjectStore("datasets", { keyPath: "key" });
              }
          },
      })
    : null;

async function getCachedData(key: string): Promise<DataProps[] | null> {
    if (!dbPromise) return null;
    const db = await dbPromise;
    const cached = await db.get("datasets", key);

    if (cached) {
        const now = Date.now();
        if (now - cached.timestamp < CACHE_EXPIRATION_TIME) {
            return cached.data;
        }
    }

    return null;
}

async function cacheData(key: string, data: DataProps[]) {
    if (!dbPromise) return; // Do nothing if not in the browser
    const db = await dbPromise;

    // Store data with a timestamp
    await db.put("datasets", { key, data, timestamp: Date.now() });
}

export const fetchData = createAsyncThunk(
    "datasets/fetchData",
    async ({ type, lang }: { type: string; lang: string }) => {
        const cacheKey = `${type}-${lang}`;

        // Check IndexedDB for cached data
        const cachedData = await getCachedData(cacheKey);
        if (cachedData) {
            // console.log("Using cached data:", cachedData);
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
        await cacheData(cacheKey, data);

        return data as DataProps[];
    }
);

const dataSetsSlice = createSlice({
    name: "datasets",
    initialState: {
        data: [] as DataProps[],
        coincartshowall: false,
        type: "coincart" as DataName,
        currentLocation: null as DataProps | null,
        status: "idle",
        error: null,
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
                state.error = action.error.message as any;
            });
    },
});

export const { updateCoinCartShowAll, updateCurrentLocation, changeType } = dataSetsSlice.actions;

export default dataSetsSlice.reducer;
