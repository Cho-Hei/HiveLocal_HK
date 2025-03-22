export interface InfoProps {
    start_date: string;
    end_date: string;
    cart_no: number;
    district: string;
    address: string;
    latitude: number;
    longitude: number;
    remarks: string | null;
}

export interface DataProps {
    organization: string;
    start_date: string | null;
    end_date: string | null;
    open_hours: string | null;
    district: districtshort;
    address: string;
    latitude: number;
    longitude: number;
    remarks: string | null;
}

export type DataName = "coincart" | "clothesrecycle";

export const DataTypes: Record<DataName, { id: DataName; name_en: string; name_zh: string }> = {
    coincart: { id: "coincart", name_en: "Coin Cart", name_zh: "硬幣車" },
    clothesrecycle: { id: "clothesrecycle", name_en: "Clothes Recycle", name_zh: "衣物回收" },
};

export const MapIcons: Record<DataName, string> = {
    coincart: "/money-transport_1.svg",
    clothesrecycle: "/tshirt.svg",
};

export interface LocationsProps {
    data: DataProps[];
}

export type districtshort =
    | "cw"
    | "e"
    | "s"
    | "wc"
    | "kc"
    | "kt"
    | "ssp"
    | "wts"
    | "ytm"
    | "is"
    | "n"
    | "sk"
    | "st"
    | "tp"
    | "tw"
    | "tm"
    | "yl";
