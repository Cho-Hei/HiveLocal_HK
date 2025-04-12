import {
    DataName,
    DataProps,
    DataTypes,
    districtOrder_en,
    districtOrder_zh,
    Districts,
    districtshort,
} from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 20;

const fieldMappings: Record<string, Record<string, string>> = {
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

// Utility function to retry fetch
async function fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries: number = 5,
    delay: number = 1000
): Promise<Response> {
    for (let attempt = 0; attempt < retries; attempt++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (err) {
            if (attempt < retries - 1) {
                await new Promise((resolve) => setTimeout(resolve, delay)); // Wait before retrying
            } else {
                throw err; // Throw error if all retries fail
            }
        }
    }
    throw new Error("Failed to fetch after retries");
}

export async function POST(req: NextRequest) {
    const { lang, facilitiesType } = await req.json();

    try {
        const fetchURL = DataTypes[facilitiesType as DataName].fetchurl;

        const response = await fetchWithRetry(fetchURL);
        const data: Record<string, string[]> = await response.json();

        const records = data.features;

        const districtCodeToName = (code: string, region: string): string => {
            if (code === "kt") {
                code = region === "kl" ? "kto" : "kts";
            }
            return lang === "tc"
                ? Districts[code as districtshort]?.zh
                : Districts[code as districtshort]?.en || "unknown";
        };

        let FacilitiesData: DataProps[] = [];

        if (records) {
            const mapping = fieldMappings[facilitiesType]; // Get the mapping for the current type
            FacilitiesData = records.map((record: any) => ({
                organization:
                    lang === "en"
                        ? record.properties[mapping.organization]
                        : record.properties[mapping.organization_tc],
                start_date: null,
                end_date: null,
                open_hours: null,
                address:
                    lang === "en"
                        ? record.properties[mapping.address]
                        : record.properties[mapping.address_tc],
                district: mapping.district.includes("SEARCH02_")
                    ? lang === "en"
                        ? record.properties[mapping.district].toLowerCase()
                        : record.properties[mapping.district_tc]
                    : districtCodeToName(
                          record.properties[mapping.district],
                          record.properties.Region
                      ),
                latitude: record.geometry.coordinates[1],
                longitude: record.geometry.coordinates[0],
                remarks: null,
            }));
        }

        FacilitiesData.sort((a, b) => {
            const indexA =
                lang === "tc"
                    ? districtOrder_zh.indexOf(a.district)
                    : districtOrder_en.findIndex(
                          (district) => district.toLowerCase() === a.district.toLowerCase()
                      );
            const indexB =
                lang === "tc"
                    ? districtOrder_zh.indexOf(b.district)
                    : districtOrder_en.findIndex(
                          (district) => district.toLowerCase() === b.district.toLowerCase()
                      );

            // Handle districts not in districtOrder_en (place them at the end)
            return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
        });

        return NextResponse.json(FacilitiesData);
    } catch (err) {
        if (err instanceof Error) {
            return new Response(`Error: ${err.message}`, { status: 500 });
        } else {
            return new Response("An unknown error occurred", { status: 500 });
        }
    }
}
