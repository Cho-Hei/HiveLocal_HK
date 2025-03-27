"use client";
import { Gear } from "@phosphor-icons/react/dist/ssr";
import LocaleSwitch from "./LocaleSwitch";
import { useEffect, useRef, useState } from "react";
import { addToast, cn, Radio, RadioGroup } from "@heroui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { changeType, updateCurrentLocation } from "@/store/dataSetsSlice";
import { DataTypes, MapIcons } from "@/types";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getGPUTier } from "detect-gpu";
import { div } from "framer-motion/client";

const Settings = () => {
    const [slideopen, setSlideopen] = useState(false);
    const type = useSelector((state: RootState) => state.dataSets.type);
    const dispatch: AppDispatch = useDispatch();
    const locale = useLocale();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const localeSwitchRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("I_Settings");

    const handleClickOutside = (event: MouseEvent) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target as Node) && // Click outside sidebar
            localeSwitchRef.current &&
            !localeSwitchRef.current.contains(event.target as Node) // Exclude LocaleSwitch
        ) {
            setSlideopen(false); // Close the sidebar
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Hardware acceleration check
    useEffect(() => {
        const checkGPU = async () => {
            const { tier } = await getGPUTier();
            console.log(`GPU tier: ${tier}`);
            if (tier < 2) {
                addToast({
                    color: "warning",
                    title: t("performance_remind"),
                    timeout: 5000,
                    shouldShowTimeoutProgress: true,
                    classNames: {
                        base: cn(["absolute bottom-0 right-0 z-10"]),
                    },
                });
            }
        };
        checkGPU();
    }, []);

    const handleUpdateType = (value: string) => {
        dispatch(changeType(value));
        dispatch(updateCurrentLocation(null));
    };

    return (
        <div className='relative text-primary'>
            <button
                className='flexCenter m-2'
                onClick={() => setSlideopen(!slideopen)}
                aria-label='Settings'>
                <Gear size={24} />
            </button>
            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full bg-[#17153B] p-2 shadow-lg transform transition-transform duration-300 z-10 ${
                    slideopen ? "translate-x-0" : "translate-x-full"
                } max-lg:w-screen lg:w-[300px]`}
                style={{ maxWidth: "100vw" }}>
                <div className='flex flex-col m-4'>
                    <button
                        className='flex justify-end '
                        onClick={() => setSlideopen(false)}
                        aria-label='Close'>
                        ✕
                    </button>
                    <div className='flex flex-col flex-grow flexCenter items-start h-full'>
                        <div ref={localeSwitchRef} className='flex justify-start w-full m-2'>
                            <LocaleSwitch dropdownref={localeSwitchRef} />
                        </div>

                        <RadioGroup
                            label={t("select_label")}
                            value={type}
                            size='lg'
                            onValueChange={(value) => handleUpdateType(value)}
                            classNames={{ base: "flex w-full m-2", label: "text-primary text-xl" }}>
                            {Object.values(DataTypes).map((cur) => (
                                <Radio
                                    key={locale === "tc" ? cur.name_zh : cur.name_en}
                                    value={cur.id}
                                    classNames={{
                                        base: "flex justify-start w-full",
                                        label: "text-lg",
                                    }}>
                                    <div className='flex flexCenter'>
                                        <Image
                                            src={MapIcons[cur.id]}
                                            width={32}
                                            height={32}
                                            alt={locale === "tc" ? cur.name_zh : cur.name_en}
                                            className='mr-2'
                                        />
                                        <h3 className='text-primary text-left'>
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
    );
};

export default Settings;
