import { configureStore } from "@reduxjs/toolkit";
import dataSetsSlice from "./dataSetsSlice";

const store = configureStore({
    reducer: {
        dataSets: dataSetsSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
