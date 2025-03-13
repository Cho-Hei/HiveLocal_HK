import { toggleShowAll } from "@/store/coinCartSlice";
import { AppDispatch, RootState } from "@/store/store";
import { InfoProps } from "@/types";
import { MapPinLine } from "@phosphor-icons/react/dist/ssr";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";

interface LocationsProps {
    coinCartData: InfoProps[];
    setLocation: (location: InfoProps) => void;
}

const Locations = ({ coinCartData, setLocation }: LocationsProps) => {
    const locale = useLocale();
    const t = useTranslations("I_Location");
    const dispatch: AppDispatch = useDispatch();
    const showAll = useSelector((state: RootState) => state.coinCart.showAll);

    const handleToggle = () => {
        dispatch(toggleShowAll());
    };

    const groupedData = useMemo(() => {
        const grouped: { [key: string]: InfoProps[] } = {};

        coinCartData.forEach((data) => {
            const month = new Date(data.start_date).toLocaleString(
                locale === "tc" ? "zh-HK" : "en-US",
                {
                    month: "long",
                    year: "numeric",
                }
            );

            if (!grouped[month]) {
                grouped[month] = [];
            }

            grouped[month].push(data);
        });

        return grouped;
    }, [coinCartData]);

    return (
        <div className='flex flex-col location rounded-2xl bg-[#2E236C] lg:mx-2 text-white'>
            <div className='info-title bg-[#433D8B] flexCenter rounded-t-2xl'>
                <MapPinLine weight='fill' size={24} />
                <h1 className='text-xl py-1 text-center mx-2'>{t("location")}</h1>
            </div>
            {/* List of location */}
            {coinCartData && coinCartData.length > 0 ? (
                <div className='location_scroll my-2'>
                    {Object.keys(groupedData).map((month) => (
                        <div key={month}>
                            <h2 className='text-xl font-bold flexCenter bg-[#433D8B] rounded-lg m-2 px-2'>
                                {month}
                            </h2>
                            {groupedData[month].map((data, index) => (
                                <div
                                    key={index}
                                    className='p-2 cursor-pointer hover:bg-[#433D8B] rounded-lg'
                                    onClick={() => setLocation(data)}>
                                    <h2 className='text-xl font-bold'>{data.district}</h2>
                                    <h4 className='text-base'>{data.address}</h4>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flexCenter flex-grow'>
                    <h1 className='text-white text-center'>{t("noData")}</h1>
                </div>
            )}
            {/* Show all */}
            <div>
                <button className='bg-[#433D8B] w-full py-2 rounded-2xl' onClick={handleToggle}>
                    {showAll ? t("showLess") : t("showAll")}
                </button>
            </div>
        </div>
    );
};

export default Locations;
