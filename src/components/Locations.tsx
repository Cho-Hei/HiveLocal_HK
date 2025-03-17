import { toggleShowAll } from "@/store/dataSetsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { DataProps, LocationsProps } from "@/types";
import { MapPinLine } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

const Locations = ({ data, setLocation }: LocationsProps) => {
    const t = useTranslations("I_Location");
    const dispatch: AppDispatch = useDispatch();
    const showAll = useSelector((state: RootState) => state.dataSets.showAll);

    const handleToggle = () => {
        dispatch(toggleShowAll());
    };

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
                        <div
                            key={index}
                            className='p-2 cursor-pointer hover:bg-[#433D8B] rounded-lg'
                            onClick={() => setLocation(data)}>
                            <h2 className='text-xl font-bold'>{data.district}</h2>
                            <h4 className='text-base'>{data.address}</h4>
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
