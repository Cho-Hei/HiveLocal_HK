"use client";
import { DataProps } from "@/types";
import { MapPinLine } from "@phosphor-icons/react/dist/ssr";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import ExpandButton from "./ExpandButton";
import LocationCard from "./LocationCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import LoadingSpinner from "./LoadingSpinner";
import { Button } from "@heroui/react";
import { fetchData, updateCoinCartShowAll } from "@/store/dataSetsSlice";

const CoinCartLocations = () => {
    const locale = useLocale();
    const dispatch: AppDispatch = useDispatch();
    const t = useTranslations("I_Location");
    const {
        type,
        data: coinCartData,
        coincartshowall: showallrecord,
        status,
    } = useSelector((state: RootState) => state.dataSets);

    useEffect(() => {
        dispatch(updateCoinCartShowAll(false));
    }, []);

    const groupedData = useMemo(() => {
        const grouped: { [key: string]: DataProps[] } = {};
        let listofData: DataProps[] = coinCartData;

        if (!showallrecord) {
            const currentDate = new Date().setHours(0, 0, 0, 0);
            listofData = coinCartData.filter(
                (record: DataProps) =>
                    record.start_date &&
                    record.end_date &&
                    new Date(record.start_date).setHours(0, 0, 0, 0) <= currentDate &&
                    new Date(record.end_date).setHours(0, 0, 0, 0) >= currentDate
            );
        } else {
            listofData = coinCartData.filter((record: DataProps) => {
                if (record.end_date) {
                    const endDate = new Date(record.end_date);
                    return endDate.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
                }
            });
        }

        listofData.forEach((data) => {
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
    }, [coinCartData, showallrecord]);

    const retryFetch = () => {
        console.log("Retrying fetch...");
        dispatch(fetchData({ type: type as string, lang: locale as string }));
    };

    return (
        <div className='flex flex-col flex-grow location rounded-2xl bg-secondary lg:mx-2 text-white h-full '>
            {/* Fixed info-title */}
            <div className='info-title bg-tertiary flexCenter rounded-t-2xl'>
                <MapPinLine weight='fill' size={24} />
                <h1 className='text-xl py-1 text-center mx-2'>{t("location")}</h1>
            </div>

            {status === "failed" && (
                <div className='flexCenter flex-grow flex-col'>
                    <h1 className='text-white text-center'>{t("error")}</h1>
                    <Button onPress={retryFetch}>Retry</Button>
                </div>
            )}

            {/* Scrollable coinCartData */}
            {status === "loading" ? (
                <div className='flexCenter flex-grow'>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className='flex-grow overflow-y-auto my-2 location_scroll'>
                    {coinCartData && coinCartData.length > 0 ? (
                        <div>
                            {Object.keys(groupedData).map((month) => (
                                <div key={month}>
                                    <h2 className='text-lg lg:text-xl font-bold flexCenter bg-tertiary rounded-lg my-1 mx-2 px-2'>
                                        {month}
                                    </h2>
                                    {groupedData[month].map((data, index) => (
                                        <LocationCard key={index} data={data} display='date' />
                                    ))}
                                </div>
                            ))}
                            <div className='flexCenter flex-grow'>
                                <ExpandButton />
                            </div>
                        </div>
                    ) : (
                        <div className='flexCenter flex-grow'>
                            <h1 className='text-white text-center'>{t("noData")}</h1>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CoinCartLocations;
