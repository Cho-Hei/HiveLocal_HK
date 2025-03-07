"use client";
import { Provider } from "react-redux";
import store from "@/store/store";
import MainHero from "@/components/MainHero";
import { HeroUIProvider } from "@heroui/react";

export default function Home() {
    return (
        <Provider store={store}>
            <HeroUIProvider>
                <MainHero />
            </HeroUIProvider>
        </Provider>
    );
}
