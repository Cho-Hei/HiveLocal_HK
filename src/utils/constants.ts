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
    district: string | null;
    district_tc?: string | null;
    district_decode: boolean;
    open_hours: string | null;
    open_hours_tc: string | null;
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
        open_hours: null,
        open_hours_tc: null,
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
        open_hours: null,
        open_hours_tc: null,
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
        open_hours: null,
        open_hours_tc: null,
    },
    clinic: {
        organization: null,
        organization_tc: null,
        provider: {
            tc: "醫院管理局",
            en: "Hospital Authority",
        },
        address: "Address",
        address_tc: "地址",
        district: null,
        district_tc: null,
        district_decode: false,
        open_hours: "Opening_Hours",
        open_hours_tc: "開放時間",
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
    clinic: {
        id: "clinic",
        name_en: "Clinic",
        name_zh: "普通科門診診所",
        fetchurl:
            "https://api.csdi.gov.hk/apim/dataquery/api/?id=fhb_rcd_1637050485482_89683&layer=clinic&limit=2000",
    },
};

// Colors for different facilities (on dashboard)
export const boxcolors: Record<DataName, string> = {
    coincart: "#6250a0",
    clothesrecycle: "#008B8B",
    studyroom: "#895129",
    postbox: "#0F9D58",
    clinic: "#E4404D",
};

export const MapIcons: Record<DataName, string> = {
    coincart: "/money-transport_1.svg",
    clothesrecycle: "/tshirt.svg",
    studyroom: "/studyroom.svg",
    postbox: "/postbox.svg",
    clinic: "/clinic.svg",
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
    clinic: {
        data_provider: {
            en: "Hospital Authority",
            zh: "醫院管理局",
        },
        en: "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=ENG",
        zh: "https://www.ha.org.hk/visitor/ha_visitor_index.asp?Content_ID=200250&Lang=CHIB5",
    },
};

export const Districts: Record<districtshort, Record<string, string>> = {
    cw: { en: "Central & Western District", zh: "中西區" },
    e: { en: "Eastern District", zh: "東區" },
    s: { en: "Southern District", zh: "南區" },
    wc: { en: "Wan Chai District", zh: "灣仔區" },
    kc: { en: "Kowloon City District", zh: "九龍城區" },
    kto: { en: "Kwun Tong District", zh: "觀塘區" },
    kts: { en: "Kwai Tsing District", zh: "葵青區" },
    ssp: { en: "Sham Shui Po District", zh: "深水埗區" },
    wts: { en: "Wong Tai Sin District", zh: "黃大仙區" },
    ytm: { en: "Yau Tsim Mong District", zh: "油尖旺區" },
    is: { en: "Islands District", zh: "離島區" },
    n: { en: "North District", zh: "北區" },
    sk: { en: "Sai Kung District", zh: "西貢區" },
    st: { en: "Sha Tin District", zh: "沙田區" },
    tp: { en: "Tai Po District", zh: "大埔區" },
    tw: { en: "Tsuen Wan District", zh: "荃灣區" },
    tm: { en: "Tuen Mun District", zh: "屯門區" },
    yl: { en: "Yuen Long District", zh: "元朗區" },
};

export const districtOrder_en = [
    "Central & Western District",
    "Wan Chai District",
    "Eastern District",
    "Southern District",
    "Yau Tsim Mong District",
    "Sham Shui Po District",
    "Kowloon City District",
    "Wong Tai Sin District",
    "Kwun Tong District",
    "Kwai Tsing District",
    "Tsuen Wan District",
    "Tuen Mun District",
    "Yuen Long District",
    "North District",
    "Tai Po District",
    "Sha Tin District",
    "Sai Kung District",
    "Islands District",
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
    "北區",
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
    "Clinic Icon made by logisstudio from www.flaticon.com",
];
