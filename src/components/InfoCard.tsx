"use client";
import { RootState } from "@/store/store";
import { DataTypes } from "@/types";
import { Skeleton } from "@heroui/react";
import { useLocale, useTranslations } from "next-intl";
import { useSelector } from "react-redux";

const colors = {
    coincart: "#6250a0",
    clothesrecycle: "#008B8B",
};

const InfoCard = () => {
    const t = useTranslations("I_SideBar");
    const locale = useLocale();
    const {
        type,
        status,
        currentLocation: location,
    } = useSelector((state: RootState) => state.dataSets);
    return (
        <>
            {status === "loading" ? (
                <div className='info-content p-2 flex-grow flex flex-col'>
                    <Skeleton className='rounded-lg mb-4 bg-violet-600'>
                        <div className='w-[200px] h-24 rounded-lg' />
                    </Skeleton>
                    <div className='space-y-3'>
                        <Skeleton className='w-[150px] rounded-lg bg-violet-600'>
                            <div className='h-4 w-3/5 rounded-lg' />
                        </Skeleton>
                        <Skeleton className='lg:w-[250px] w-[180px] rounded-lg bg-violet-600'>
                            <div className='h-5 w-4/5 rounded-lg' />
                        </Skeleton>
                        <Skeleton className='w-[170px] rounded-lg bg-violet-600'>
                            <div className='h-3 w-2/5 rounded-lg' />
                        </Skeleton>
                        <Skeleton className='w-[160px] rounded-lg bg-violet-600'>
                            <div className='h-3 w-2/5 rounded-lg' />
                        </Skeleton>
                    </div>
                </div>
            ) : (
                <>
                    {location ? (
                        <div className='info-content p-2 flex-grow flex flex-col'>
                            <div
                                className={`service-provider px-4 py-3 rounded-2xl`}
                                style={{ backgroundColor: colors[type] }}>
                                <h2 className='text-xl lg:text-2xl font-bold'>
                                    {locale === "tc"
                                        ? DataTypes[type].name_zh
                                        : DataTypes[type].name_en}
                                </h2>
                                <p className='text-sm lg:text-base'>{location.organization}</p>
                            </div>
                            <div className='service-detail flex-grow flex flex-col justify-between'>
                                <div className='flex flex-col'>
                                    <div className='flex items-center rounded-lg m-1'>
                                        <div className='w-full text-center'>
                                            {location.start_date && (
                                                <h4 className='text-lg text-balance whitespace-nowrap'>{`${
                                                    location.start_date
                                                } ${t("to")} ${location.end_date}`}</h4>
                                            )}

                                            <h4 className='text-base mt-2'>
                                                {location.open_hours}
                                            </h4>
                                        </div>
                                    </div>

                                    <div className='rounded-lg m-1'>
                                        <h4 className='text-base lg:text-lg font-bold'>
                                            {location.district}
                                        </h4>
                                    </div>

                                    <div className='rounded-lg m-1'>
                                        <h4 className='text-sm lg:text-lg'>{location.address}</h4>
                                    </div>
                                </div>

                                {location.remarks && (
                                    <div className='flexCenter rounded-lg p-2 min-h-[64px] text-center bg-orange-600/80 w-full'>
                                        <h4 className='text-sm font-bold text-pretty'>
                                            {location.remarks}
                                        </h4>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='flexCenter flex-grow'>
                            <h1 className='text-white text-center'>{t("noData")}</h1>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default InfoCard;
