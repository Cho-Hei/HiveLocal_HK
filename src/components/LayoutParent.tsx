"use client";
import store from "@/store/store";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const LayoutParent = ({ children }: { children: ReactNode }) => {
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
