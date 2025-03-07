"use client";
import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/store/store";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinCartData } from "@/store/coinCartSlice";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import Navbar from "./Navbar";
import { Spinner } from "@heroui/react";

const MapTile = dynamic(() => import("./MapTile"), { ssr: false });

const MainHero = () => {
    const dispatch: AppDispatch = useDispatch();
    const coinCartData = useSelector((state: RootState) => state.coinCart.data);
    const status = useSelector((state: RootState) => state.coinCart.status);
    const [location, setLocation] = useState<number>(0);
    const { locale } = useParams<{ locale: string }>();

    useEffect(() => {
        console.log(`locale: ${locale}`);

        dispatch(fetchCoinCartData(locale));
    }, [dispatch, locale]);

    // if (status === "loading") {
    //     return <div>Loading...</div>;
    // }

    if (status === "failed") {
        return <div>Error loading data</div>;
    }

    const handleLocation = (index: number) => {
        setLocation(index);
    };

    return (
        <section className='relative overflow-hidden'>
            <div className='flex flex-col-reverse lg:flex-row'>
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
