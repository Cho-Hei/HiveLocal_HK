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
    district: string;
    address: string;
    latitude: number;
    longitude: number;
    remarks: string | null;
}

export type DataName = "coincart" | "clothesrecycle";

export const DataTypes: Record<DataName, { id: DataName; name_en: string; name_zh: string }> = {
    coincart: { id: "coincart", name_en: "Coin Cart", name_zh: "收銀車" },
    clothesrecycle: {
        id: "clothesrecycle",
        name_en: "Community Used Clothes Recycling Banks",
        name_zh: "社區舊衣回收箱",
    },
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

export const Districts: Record<districtshort, Record<string, string>> = {
    cw: { en: "Central and Western", zh: "中西區" },
    e: { en: "Eastern", zh: "東區" },
    s: { en: "Southern", zh: "南區" },
    wc: { en: "Wan Chai", zh: "灣仔" },
    kc: { en: "Kowloon City", zh: "九龍城" },
    kt: { en: "Kwun Tong", zh: "觀塘" },
    ssp: { en: "Sham Shui Po", zh: "深水埗" },
    wts: { en: "Wong Tai Sin", zh: "黃大仙" },
    ytm: { en: "Yau Tsim Mong", zh: "油尖旺" },
    is: { en: "Islands", zh: "離島" },
    n: { en: "North", zh: "北區" },
    sk: { en: "Sai Kung", zh: "西貢" },
    st: { en: "Sha Tin", zh: "沙田" },
    tp: { en: "Tai Po", zh: "大埔" },
    tw: { en: "Tsuen Wan", zh: "荃灣" },
    tm: { en: "Tuen Mun", zh: "屯門" },
    yl: { en: "Yuen Long", zh: "元朗" },
};
