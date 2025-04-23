/**
 *
 *  This file contains constants used in the application.
 *  Update this when adding new facilities.
 *
 */

// API fetching parameters

type ParamConfig = {
    organization: string;
    organization_tc: string;
    address: string;
    address_tc: string;
    district: string;
    district_tc?: string;
};

export const fieldMappings: Record<string, ParamConfig> = {
    clothesrecycle: {
        organization: "sm_en",
        organization_tc: "sm_tc",
        address: "addr_en",
        address_tc: "addr_tc",
        district: "District",
    },
    studyroom: {
        organization: "NAME_EN",
        organization_tc: "NAME_TC",
        address: "ADDRESS_EN",
        address_tc: "ADDRESS_TC",
        district: "SEARCH02_EN",
        district_tc: "SEARCH02_TC",
    },
    // Add more mappings for other facilitiesType as needed
};

// Colors for different facilities (on dashboard)
export const boxcolors = {
    coincart: "#6250a0",
    clothesrecycle: "#008B8B",
    studyroom: "#895129",
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
};
