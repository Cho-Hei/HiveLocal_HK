"use client";
import { useTranslations } from "next-intl";

interface ExpandButtonProps {
    showall: boolean;
    expanddata: () => void;
}

const ExpandButton = ({ showall, expanddata }: ExpandButtonProps) => {
    const t = useTranslations("I_Location");

    return (
        <button className='bg-tertiary w-full m-2 py-2 rounded-xl' onClick={expanddata}>
            {showall ? t("showLess") : t("showAll")}
        </button>
    );
};

export default ExpandButton;
