"use client";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/store/store";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinCartData, updateCurrentLocation } from "@/store/coinCartSlice";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import Navbar from "./Navbar";
import { InfoProps } from "@/types";

const MapTile = dynamic(() => import("./MapTile"), { ssr: false });

const MainHero = () => {
    const dispatch: AppDispatch = useDispatch();
    const {
        data: coinCartData,
        status,
        showAll,
        currentLocation: location,
    } = useSelector((state: RootState) => state.coinCart);
    const { locale } = useParams<{ locale: string }>();

    useEffect(() => {
        console.log(`locale: ${locale}`);
        dispatch(fetchCoinCartData({ lang: locale as string, all: showAll }));
    }, [dispatch, locale, showAll]);

    useEffect(() => {
        dispatch(updateCurrentLocation(null));
    }, [locale]);

    if (status === "failed") {
        return (
            <section className='relative overflow-hidden h-screen'>
                <div className='flex flex-col-reverse lg:flex-row h-full'>
                    <h1>Error loading data. </h1>
                    <p>Please disable any extension / application that will block trackers.</p>
                </div>
            </section>
        );
    }

    const handleLocation = (location: InfoProps) => {
        dispatch(updateCurrentLocation(location));
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
