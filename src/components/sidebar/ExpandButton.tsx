"use client";
import { updateCoinCartShowAll } from "@/store/dataSetsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useTranslations } from "next-intl";
import { useDispatch, useSelector } from "react-redux";

const ExpandButton = () => {
    const t = useTranslations("I_Location");
    const dispatch: AppDispatch = useDispatch();
    const { coincartshowall } = useSelector((state: RootState) => state.dataSets);

    const expanddata = () => {
        dispatch(updateCoinCartShowAll(!coincartshowall));
    };

    return (
        <button className='bg-tertiary w-full m-2 py-2 rounded-xl' onClick={expanddata}>
            {coincartshowall ? t("showLess") : t("showAll")}
        </button>
    );
};

export default ExpandButton;
