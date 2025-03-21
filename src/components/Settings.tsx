"use client";
import { Gear } from "@phosphor-icons/react/dist/ssr";
import LocaleSwitch from "./LocaleSwitch";
import { useState } from "react";
import { Radio, RadioGroup } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { changeType } from "@/store/dataSetsSlice";
import { DataTypes, MapIcons } from "@/types";
import Image from "next/image";
import { useLocale } from "next-intl";

const Settings = () => {
    const [slideopen, setSlideopen] = useState(false);
    const type = useSelector((state: RootState) => state.dataSets.type);
    const dispatch: AppDispatch = useDispatch();
    const locale = useLocale();

    return (
        <>
            <div className='relative'>
                <button
                    className='flexCenter m-2'
                    onClick={() => setSlideopen(!slideopen)}
                    aria-label='Settings'>
                    <Gear size={24} />
                </button>
                <div
                    className={`fixed top-0 right-0 h-full bg-[#17153B] shadow-lg transform transition-transform duration-300 z-10 ${
                        slideopen ? "translate-x-0" : "translate-x-full"
                    } max-lg:w-screen lg:w-[200px]`}
                    style={{ maxWidth: "100vw" }}>
                    <div className='flex flex-col m-4'>
                        <button
                            className='flex justify-end '
                            onClick={() => setSlideopen(false)}
                            aria-label='Close'>
                            ✕
                        </button>
                        <div className='flex flex-col items-start h-full'>
                            <LocaleSwitch />
                            <RadioGroup
                                label='Select your Label'
                                value={type}
                                onValueChange={(value) => dispatch(changeType(value))}>
                                {Object.values(DataTypes).map((cur) => (
                                    <Radio
                                        key={locale === "tc" ? cur.name_zh : cur.name_en}
                                        value={cur.id}>
                                        <div className='flex items-center'>
                                            <Image
                                                src={MapIcons[cur.id]}
                                                width={24}
                                                height={24}
                                                alt={locale === "tc" ? cur.name_zh : cur.name_en}
                                                className='mr-2'
                                            />
                                            <h3 className='text-primary text-sm'>
                                                {locale === "tc" ? cur.name_zh : cur.name_en}
                                            </h3>
                                        </div>
                                    </Radio>
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
