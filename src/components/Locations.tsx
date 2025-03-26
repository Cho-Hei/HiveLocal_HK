"use client";
import { MapPinLine } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import LocationCard from "./LocationCard";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

import { DataProps, districtshort } from "@/types";
import { Accordion, AccordionItem } from "@heroui/react";
import { useEffect, useState } from "react";

const Locations = () => {
    const t = useTranslations("I_Location");
    const { data, currentLocation } = useSelector((state: RootState) => state.dataSets);
    const [currentDistrict, setCurrentDistrict] = useState<string | "">("");

    const groupByDistrict: { [key: string]: DataProps[] } = {};

    data.forEach((data) => {
        if (!groupByDistrict[data.district]) {
            groupByDistrict[data.district] = [];
        }

        groupByDistrict[data.district].push(data);
    });

    useEffect(() => {
        console.log(currentLocation);
        if (currentLocation) setCurrentDistrict(currentLocation?.district);
    }, [currentLocation]);

    return (
        <div className='flex flex-col location rounded-2xl bg-[#2E236C] lg:mx-2 text-primary h-full'>
            <div className='info-title bg-[#433D8B] flexCenter rounded-t-2xl'>
                <MapPinLine weight='fill' size={24} />
                <h1 className='text-xl py-1 text-center mx-2'>{t("location")}</h1>
            </div>
            {/* List of location */}
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
                            setCurrentDistrict(selectedKey === currentDistrict ? "" : selectedKey);
                        }}>
                        {Object.keys(groupByDistrict).map((district) => (
                            <AccordionItem key={district} title={district}>
                                <div>
                                    {groupByDistrict[district].map((location, index) => (
                                        <LocationCard key={index} data={location} />
                                    ))}
                                </div>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <div className='flexCenter flex-grow'>
                        <h1 className='text-primary text-center'>{t("noData")}</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Locations;
