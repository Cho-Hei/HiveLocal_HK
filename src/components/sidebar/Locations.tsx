/***
 *
 *  Shows the locations of the facilities in the map (except for coin carts)
 *
 */
"use client";
import { MapPinLine } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import LocationCard from "./LocationCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { DataProps, districtshort } from "@/types";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import { fetchData } from "@/store/dataSetsSlice";
import { useParams } from "next/navigation";

const Locations = () => {
    const t = useTranslations("I_Location");
    const dispatch: AppDispatch = useDispatch();
    const { locale } = useParams<{ locale: string }>();
    const { type, data, currentLocation, status } = useSelector(
        (state: RootState) => state.dataSets
    );
    const [currentDistrict, setCurrentDistrict] = useState<string | "">("");

    const groupByDistrict: { [key: string]: DataProps[] } = {};

    data.forEach((data) => {
        if (!groupByDistrict[data.district]) {
            groupByDistrict[data.district] = [];
        }

        groupByDistrict[data.district].push(data);
    });

    useEffect(() => {
        if (currentLocation) setCurrentDistrict(currentLocation?.district);
    }, [currentLocation]);

    const retryFetch = () => {
        console.log("Retrying fetch...");
        dispatch(fetchData({ type: type as string, lang: locale as string }));
    };

    return (
        <div className='flex flex-col location rounded-2xl bg-secondary lg:mx-2 text-white h-full'>
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

            {/* List of location */}
            {status === "loading" ? (
                <div className='flexCenter flex-grow'>
                    <LoadingSpinner />
                </div>
            ) : (
                <div className='flex-grow overflow-y-auto my-2 location_scroll'>
                    {data ? (
                        <Accordion
                            isCompact
                            selectedKeys={[currentDistrict]} // Ensure selectedKeys is an array
                            onSelectionChange={(keys) => {
                                // Convert the Set to an array and extract the key
                                const selectedKey: districtshort | "" =
                                    (Array.from(keys)[0] as districtshort) || "";

                                // Toggle: Collapse if clicked district matches currentDistrict, otherwise expand
                                setCurrentDistrict(
                                    selectedKey === currentDistrict ? "" : selectedKey
                                );
                            }}>
                            {Object.keys(groupByDistrict).map((district) => (
                                <AccordionItem
                                    key={district}
                                    title={district}
                                    classNames={{
                                        heading: "text-white",
                                        title: "text-white capitalize",
                                    }}>
                                    <div>
                                        {groupByDistrict[district].map((location, index) => (
                                            <LocationCard
                                                key={index}
                                                data={location}
                                                display='district'
                                            />
                                        ))}
                                    </div>
                                </AccordionItem>
                            ))}
                        </Accordion>
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

export default Locations;
