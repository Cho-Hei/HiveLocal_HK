import { DataProps, Districts, districtshort } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 20;

// Utility function to retry fetch
async function fetchWithRetry(
    url: string,
    options: RequestInit = {},
    retries: number = 3,
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
    const { lang } = await req.json();

    try {
        const response = await fetchWithRetry(
            `https://api.csdi.gov.hk/apim/dataquery/api/?id=had_rcd_1665042410524_59761&layer=geotagging&limit=2000`
        );
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
        let clothesRecycleData: DataProps[] = [];

        if (records) {
            clothesRecycleData = records.map((record: any) => ({
                organization: `${
                    lang === "en" ? record.properties.sm_en : record.properties.sm_tc
                }`,
                start_date: null,
                end_date: null,
                open_hours: null,
                address: `${lang === "en" ? record.properties.addr_en : record.properties.addr_tc}`,
                district: districtCodeToName(record.properties.District, record.properties.Region),
                latitude: record.geometry.coordinates[1],
                longitude: record.geometry.coordinates[0],
                remarks: null,
            }));
        }

        return NextResponse.json(clothesRecycleData);
    } catch (err) {
        if (err instanceof Error) {
            return new Response(`Error: ${err.message}`, { status: 500 });
        } else {
            return new Response("An unknown error occurred", { status: 500 });
        }
    }
}
