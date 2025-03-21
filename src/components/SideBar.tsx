"use client";
import { Info } from "@phosphor-icons/react/dist/ssr";
import Locations from "./Locations";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CoinCartLocations from "./CoinCartLocations";
import InfoCard from "./InfoCard";

const SideBar = () => {
    const t = useTranslations("I_SideBar");
    const type = useSelector((state: RootState) => state.dataSets.type);

    return (
        <section className='sidebar h-screen lg:max-w-[310px] min-w-[300px] bg-[#17153B] p-2 lg:p-1 overflow-y-auto grid grid-cols-2 lg:grid-cols-1 gap-2 place-content-stretch'>
            <div className='min-h-[420px] max-h-fit rounded-2xl bg-[#2E236C] lg:mx-2 lg:my-1 shadow-lg flex flex-col'>
                <div className='info flex flex-col flex-grow'>
                    <div className='info-title bg-[#433D8B] flexCenter rounded-t-2xl'>
                        <Info weight='fill' color='#ffffff' size={24} />
                        <h1 className='text-primary text-xl py-1 text-center mx-2'>{t("info")}</h1>
                    </div>

                    <InfoCard />
                </div>
            </div>
            {type === "coincart" ? <CoinCartLocations /> : <Locations />}
        </section>
    );
};

export default SideBar;
