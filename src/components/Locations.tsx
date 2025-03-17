"use client";
import { MapPinLine } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import LocationCard from "./LocationCard";
import ExpandButton from "./ExpandButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Locations = () => {
    const t = useTranslations("I_Location");
    const { data } = useSelector((state: RootState) => state.dataSets);

    return (
        <div className='flex flex-col location rounded-2xl bg-[#2E236C] lg:mx-2 text-white'>
            <div className='info-title bg-[#433D8B] flexCenter rounded-t-2xl'>
                <MapPinLine weight='fill' size={24} />
                <h1 className='text-xl py-1 text-center mx-2'>{t("location")}</h1>
            </div>
            {/* List of location */}
            {data && data.length > 0 ? (
                <div className='location_scroll my-2'>
                    {data.map((data, index) => (
                        <LocationCard key={index} data={data} />
                    ))}
                </div>
            ) : (
                <div className='flexCenter flex-grow'>
                    <h1 className='text-white text-center'>{t("noData")}</h1>
                </div>
            )}
            {/* Show all */}
            <ExpandButton />
        </div>
    );
};

export default Locations;
