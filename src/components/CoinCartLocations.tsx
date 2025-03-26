"use client";
import { DataProps } from "@/types";
import { MapPinLine } from "@phosphor-icons/react/dist/ssr";
import { useLocale, useTranslations } from "next-intl";
import { useMemo } from "react";
import ExpandButton from "./ExpandButton";
import LocationCard from "./LocationCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CoinCartLocations = () => {
    const locale = useLocale();
    const t = useTranslations("I_Location");
    const { data: coinCartData } = useSelector((state: RootState) => state.dataSets);

    const groupedData = useMemo(() => {
        const grouped: { [key: string]: DataProps[] } = {};

        coinCartData.forEach((data) => {
            const month = data.start_date
                ? new Date(data.start_date).toLocaleString(locale === "tc" ? "zh-HK" : "en-US", {
                      month: "long",
                      year: "numeric",
                  })
                : new Date().toLocaleString(locale === "tc" ? "zh-HK" : "en-US", {
                      month: "long",
                      year: "numeric",
                  });

            if (!grouped[month]) {
                grouped[month] = [];
            }

            grouped[month].push(data);
        });

        return grouped;
    }, [coinCartData]);

    return (
        <div className='flex flex-col flex-grow location rounded-2xl bg-[#2E236C] lg:mx-2 text-primary h-full '>
            {/* Fixed info-title */}
            <div className='info-title bg-[#433D8B] flexCenter rounded-t-2xl'>
                <MapPinLine weight='fill' size={24} />
                <h1 className='text-xl py-1 text-center mx-2'>{t("location")}</h1>
            </div>

            {/* Scrollable coinCartData */}
            <div className='flex-grow overflow-y-auto my-2 location_scroll'>
                {coinCartData && coinCartData.length > 0 ? (
                    <div>
                        {Object.keys(groupedData).map((month) => (
                            <div key={month}>
                                <h2 className='text-xl font-bold flexCenter bg-[#433D8B] rounded-lg m-2 px-2'>
                                    {month}
                                </h2>
                                {groupedData[month].map((data, index) => (
                                    <LocationCard key={index} data={data} />
                                ))}
                            </div>
                        ))}
                        <ExpandButton />
                    </div>
                ) : (
                    <div className='flexCenter flex-grow'>
                        <h1 className='text-primary text-center'>{t("noData")}</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoinCartLocations;
