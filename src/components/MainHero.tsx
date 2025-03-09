"use client";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store/store";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinCartData } from "@/store/coinCartSlice";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import Navbar from "./Navbar";
import { InfoProps } from "@/types";
import { getGPUTier } from "detect-gpu";
import { addToast, cn } from "@heroui/react";
import { useTranslations } from "next-intl";

const MapTile = dynamic(() => import("./MapTile"), { ssr: false });

const MainHero = () => {
    const dispatch: AppDispatch = useDispatch();
    const coinCartData = useSelector((state: RootState) => state.coinCart.data);
    const status = useSelector((state: RootState) => state.coinCart.status);
    const showAll = useSelector((state: RootState) => state.coinCart.showAll);
    const [location, setLocation] = useState<InfoProps | null>(null);
    const { locale } = useParams<{ locale: string }>();
    const t = useTranslations("I_popup");

    const checkGPU = async () => {
        const { tier } = await getGPUTier();

        console.log(`GPU tier: ${tier}`);
        if (tier < 2) {
            addToast({
                color: "warning",
                title: t("performance_remind"),
                timeout: 5000,
                shouldShowTimeoutProgress: true,
                classNames: {
                    base: cn(["absolute bottom-0 right-0 z-10"]),
                },
            });
        }
    };

    useEffect(() => {
        checkGPU();
    }, []);

    useEffect(() => {
        console.log(`locale: ${locale}`);

        dispatch(fetchCoinCartData({ lang: locale, all: showAll }));
    }, [dispatch, locale, showAll]);

    if (status === "failed") {
        return (
            <section className='relative overflow-hidden h-screen'>
                <div className='flex flex-col-reverse lg:flex-row h-full'>
                    <h1>Error loading data.</h1>
                    <p>Please disable any extension / application that will block trackers.</p>
                </div>
            </section>
        );
    }

    const handleLocation = (location: InfoProps) => {
        setLocation(location);
    };

    return (
        <section className='relative overflow-hidden h-screen'>
            <div className='flex flex-col-reverse lg:flex-row h-full'>
                <SideBar
                    coinCartData={coinCartData}
                    location={location}
                    setLocation={handleLocation}
                    Selectorstatus={status}
                />

                <div className='flex flex-col flex-grow lg:h-screen'>
                    <Navbar />
                    <MapTile
                        coinCartData={coinCartData}
                        location={location}
                        setLocation={handleLocation}
                    />
                </div>
            </div>
        </section>
    );
};

export default MainHero;
