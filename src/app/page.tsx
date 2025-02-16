"use client";
import { Provider } from "react-redux";
import store from "@/store/store";
import MainHero from "./components/MainHero";

export default function Home() {
    return (
        <Provider store={store}>
            <MainHero />
        </Provider>
    );
}
