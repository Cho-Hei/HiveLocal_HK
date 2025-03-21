"use client";
import { toggleShowAll } from "@/store/dataSetsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

const ExpandButton = () => {
    const t = useTranslations("I_Location");
    const dispatch: AppDispatch = useDispatch();
    const showAll = useSelector((state: RootState) => state.dataSets.showAll);

    const handleToggle = () => {
        dispatch(toggleShowAll());
    };

    return (
        <button className='bg-[#433D8B] w-full py-2 rounded-2xl' onClick={handleToggle}>
            {showAll ? t("showLess") : t("showAll")}
        </button>
    );
};

export default ExpandButton;
