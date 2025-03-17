"use client";
import { useEffect } from "react";
import { AppDispatch, RootState } from "@/store/store";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, updateCurrentLocation } from "@/store/dataSetsSlice";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import Navbar from "./Navbar";
import { DataProps } from "@/types";

const MapTile = dynamic(() => import("./MapTile"), { ssr: false });

const MainHero = () => {
    const dispatch: AppDispatch = useDispatch();
    const {
        data,
        type,
        status,
        showAll,
        currentLocation: location,
    } = useSelector((state: RootState) => state.dataSets);
    const { locale } = useParams<{ locale: string }>();

    useEffect(() => {
        console.log(`locale: ${locale}`);
        dispatch(fetchData({ type: type as string, lang: locale as string, all: showAll }));
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

    const handleLocation = (location: DataProps) => {
        dispatch(updateCurrentLocation(location));
    };

    return (
        <section className='relative overflow-hidden h-screen'>
            <div className='flex flex-col-reverse lg:flex-row h-full'>
                <SideBar
                    data={data}
                    location={location}
                    setLocation={handleLocation}
                    Selectorstatus={status}
                />

                <div className='flex flex-col flex-grow lg:h-screen'>
                    <Navbar />
                    <MapTile data={data} location={location} setLocation={handleLocation} />
                </div>
            </div>
        </section>
    );
};

export default MainHero;
