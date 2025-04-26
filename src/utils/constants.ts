/**
 *
 *  This file contains constants used in the application.
 *  Update this when adding new facilities.
 *
 */

import { DataName, districtshort } from "@/types";

// API fetching parameters

type ParamConfig = {
    organization: string | null;
    organization_tc: string | null;
    provider: ProviderProps;
    address: string;
    address_tc: string;
    district: string;
    district_tc?: string;
    district_decode: boolean;
};

type ProviderProps = {
    tc: string;
    en: string;
};

export const fieldMappings: Record<string, ParamConfig> = {
    clothesrecycle: {
        organization: "sm_en",
        organization_tc: "sm_tc",
        provider: {
            tc: "民政事務總署",
            en: "Home Affairs Department",
        },
        address: "addr_en",
        address_tc: "addr_tc",
        district: "District",
        district_decode: true,
    },
    studyroom: {
        organization: "NAME_EN",
        organization_tc: "NAME_TC",
        provider: {
            tc: "教育局",
            en: "Education Bureau",
        },
        address: "ADDRESS_EN",
        address_tc: "ADDRESS_TC",
        district: "SEARCH02_EN",
        district_tc: "SEARCH02_TC",
        district_decode: false,
    },
    postbox: {
        organization: null,
        organization_tc: null,
        provider: {
            tc: "香港郵政",
            en: "HongKong Post",
        },
        address: "Address",
        address_tc: "地址",
        district: "District",
        district_tc: "地區",
        district_decode: false,
    },
    // Add more mappings for other facilitiesType as needed
};

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
    postbox: {
        id: "postbox",
        name_en: "Post Box",
        name_zh: "郵箱",
        fetchurl:
            "https://api.csdi.gov.hk/apim/dataquery/api/?id=hkpo_rcd_1638773801007_13653&layer=spb&limit=2000",
    },
};

// Colors for different facilities (on dashboard)
export const boxcolors = {
    coincart: "#6250a0",
    clothesrecycle: "#008B8B",
    studyroom: "#895129",
    postbox: "#0F9D58",
};

export const MapIcons: Record<DataName, string> = {
    coincart: "/money-transport_1.svg",
    clothesrecycle: "/tshirt.svg",
    studyroom: "/studyroom.svg",
    postbox: "/postbox.svg",
};

export const ResourceExTLink = {
    coincart: {
        data_provider: {
            en: "Hong Kong Monetary Authority",
            zh: "香港金融管理局",
        },
        en: "https://www.hkma.gov.hk/eng/key-functions/money/hong-kong-currency/coin-collection-programme/",
        zh: "https://www.hkma.gov.hk/chi/key-functions/money/hong-kong-currency/coin-collection-programme/",
    },
    clothesrecycle: {
        data_provider: {
            en: "Home Affairs Department",
            zh: "民政事務總署",
        },
        en: "https://www.had.gov.hk/en/public_services/community_used_clothes_recycling_bank_scheme/",
        zh: "https://www.had.gov.hk/tc/public_services/community_used_clothes_recycling_bank_scheme/",
    },
    studyroom: {
        data_provider: {
            en: "Education Bureau",
            zh: "教育局",
        },
        en: "https://www.edb.gov.hk/en/student-parents/parents-related/students-related/study-rooms/index.html",
        zh: "https://www.edb.gov.hk/tc/student-parents/parents-related/students-related/study-rooms/index.html",
    },
    postbox: {
        data_provider: {
            en: "HongKong Post",
            zh: "香港郵政",
        },
        en: "https://webapp.hongkongpost.hk/tc/about_us/network/street_posting_boxes/index.html",
        zh: "https://webapp.hongkongpost.hk/en/about_us/network/street_posting_boxes/index.html",
    },
};

export const Districts: Record<districtshort, Record<string, string>> = {
    cw: { en: "Central & Western", zh: "中西區" },
    e: { en: "Eastern", zh: "東區" },
    s: { en: "Southern", zh: "南區" },
    wc: { en: "Wan Chai", zh: "灣仔區" },
    kc: { en: "Kowloon City", zh: "九龍城區" },
    kto: { en: "Kwun Tong", zh: "觀塘區" },
    kts: { en: "Kwai Tsing", zh: "葵青區" },
    ssp: { en: "Sham Shui Po", zh: "深水埗區" },
    wts: { en: "Wong Tai Sin", zh: "黃大仙區" },
    ytm: { en: "Yau Tsim Mong", zh: "油尖旺區" },
    is: { en: "Islands", zh: "離島區" },
    n: { en: "North", zh: "北區" },
    sk: { en: "Sai Kung", zh: "西貢區" },
    st: { en: "Sha Tin", zh: "沙田區" },
    tp: { en: "Tai Po", zh: "大埔區" },
    tw: { en: "Tsuen Wan", zh: "荃灣區" },
    tm: { en: "Tuen Mun", zh: "屯門區" },
    yl: { en: "Yuen Long", zh: "元朗區" },
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
    "灣仔區",
    "東區",
    "南區",
    "油尖旺區",
    "深水埗區",
    "九龍城區",
    "黃大仙區",
    "觀塘區",
    "葵青區",
    "荃灣區",
    "屯門區",
    "元朗區",
    "北區區",
    "大埔區",
    "沙田區",
    "西貢區",
    "離島區",
];

export const Iconcredits = [
    "Coin Cart Icon made by by Freepik from www.flaticon.com",
    "Clothes Recycle Icon made by muhammad atho' from www.flaticon.com",
    "Study Room Icon made by Haris Masood from www.flaticon.com",
    "Post Box Icon made by Ehtisham Abid from www.flaticon.com",
];
