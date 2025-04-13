"use client";
import store from "@/store/store";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";

const LayoutParent = ({ children }: { children: ReactNode }) => {
    useEffect(() => {
        // Remove White Space after scroll in Chrome mobile
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        document.body.setAttribute("style", `height: calc(var(--vh, 1vh) * 100);`);
    }, []);

    return (
        <Provider store={store}>
            <HeroUIProvider>
                <ToastProvider placement='bottom-right' />
                {children}
            </HeroUIProvider>
        </Provider>
    );
};

export default LayoutParent;
