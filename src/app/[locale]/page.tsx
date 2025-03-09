"use client";
import { Provider } from "react-redux";
import store from "@/store/store";
import MainHero from "@/components/MainHero";
import { HeroUIProvider, ToastProvider } from "@heroui/react";

export default function Home() {
    return (
        <Provider store={store}>
            <HeroUIProvider>
                <ToastProvider placement='bottom-right' />
                <MainHero />
            </HeroUIProvider>
        </Provider>
    );
}
