import { configureStore } from "@reduxjs/toolkit";
import coinCartReducer from "./coinCartSlice";

const store = configureStore({
    reducer: {
        coinCart: coinCartReducer,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
