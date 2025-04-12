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

export type DataName = "coincart" | "clothesrecycle" | "studyroom";

export const DataTypes: Record<
    DataName,
    { id: DataName; name_en: string; name_zh: string; fetchurl: string }
> = {
    coincart: { id: "coincart", name_en: "Coin Cart", name_zh: "收銀車", fetchurl: "" },
    clothesrecycle: {
        id: "clothesrecycle",
        name_en: "Community Used Clothes Recycling Banks",
        name_zh: "社區舊衣回收箱",
        fetchurl:
            "https://api.csdi.gov.hk/apim/dataquery/api/?id=had_rcd_1665042410524_59761&layer=geotagging&limit=2000",
    },
    studyroom: {
        id: "studyroom",
        name_en: "Study Room",
        name_zh: "自修室",
        fetchurl:
            "https://api.csdi.gov.hk/apim/dataquery/api/?id=edb_rcd_1633320468580_185&layer=edbstrm&limit=2000",
    },
};

export const MapIcons: Record<DataName, string> = {
    coincart: "/money-transport_1.svg",
    clothesrecycle: "/tshirt.svg",
    studyroom: "/studyroom.svg",
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
    | "kto"
    | "kts"
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
    cw: { en: "Central & Western", zh: "中西區" },
    e: { en: "Eastern", zh: "東區" },
    s: { en: "Southern", zh: "南區" },
    wc: { en: "Wan Chai", zh: "灣仔" },
    kc: { en: "Kowloon City", zh: "九龍城" },
    kto: { en: "Kwun Tong", zh: "觀塘" },
    kts: { en: "Kwai Tsing", zh: "葵青" },
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

export const districtOrder_en = [
    "Central & Western",
    "Wan Chai",
    "Eastern",
    "Southern",
    "Yau Tsim Mong",
    "Sham Shui Po",
    "Kowloon City",
    "Wong Tai Sin",
    "Kwun Tong",
    "Kwai Tsing",
    "Tsuen Wan",
    "Tuen Mun",
    "Yuen Long",
    "North",
    "Tai Po",
    "Sha Tin",
    "Sai Kung",
    "Islands",
];

export const districtOrder_zh = [
    "中西區",
    "灣仔",
    "東區",
    "南區",
    "油尖旺",
    "深水埗",
    "九龍城",
    "黃大仙",
    "觀塘",
    "葵青",
    "荃灣",
    "屯門",
    "元朗",
    "北區",
    "大埔",
    "沙田",
    "西貢",
    "離島",
];
