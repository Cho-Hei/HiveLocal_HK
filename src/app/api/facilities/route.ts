import { DataName, DataProps, districtshort } from "@/types";
import {
    DataTypes,
    districtOrder_en,
    districtOrder_zh,
    Districts,
    fieldMappings,
} from "@/utils/constants";
import { NextRequest, NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";

export const maxDuration = 20;

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
        const mapping = fieldMappings[facilitiesType];

        const districtCodeToName = (code: string, region: string): string => {
            if (code === "kt") {
                code = region === "kl" ? "kto" : "kts";
            }
            return lang === "tc"
                ? Districts[code as districtshort]?.zh
                : Districts[code as districtshort]?.en || "unknown";
        };

        const districtDistrictFormat = (district: string): string => {
            let d;
            if (lang === "en") {
                d = district.toLowerCase().replace(/\band\b/gi, "&");
            } else {
                d = district.includes("區") ? district : district + "區";
            }
            return d;
        };

        const findDistrict = async (record: any) => {
            let district = "unknown";
            if (!mapping.district) {
                console.log("No district mapping found");
                district = await findDistrictByAddress(record.properties[mapping.address]);
            } else if (!mapping.district_decode) {
                console.log("District decoding not required");
                return lang === "en"
                    ? districtDistrictFormat(record.properties[mapping.district])
                    : districtDistrictFormat(
                          record.properties[mapping.district_tc || mapping.district]
                      );
            } else {
                district = districtCodeToName(
                    record.properties[mapping.district],
                    record.properties.Region
                );
            }

            return district;
        };

        const findDistrictByAddress = async (address: string): Promise<string> => {
            try {
                const lookup = await fetchWithRetry(
                    `https://www.als.gov.hk/lookup?q=${encodeURIComponent(
                        address.replace(/\b\w+\/F,\s*/gi, "").trim()
                    )}`
                );
                const lookuptxt = await lookup.text();

                // Parse the XML response
                const xmlDoc = await parseStringPromise(lookuptxt);
                console.log(
                    xmlDoc.AddressLookupResult.SuggestedAddress?.[0].Address?.[0]
                        .PremisesAddress?.[0].EngPremisesAddress?.[0].EngDistrict?.[0]
                        .DcDistrict?.[0]
                );

                // Extract the DcDistrict value
                let dcDistrict: string | undefined;

                if (lang === "en") {
                    const engPremisesAddress =
                        xmlDoc.AddressLookupResult.SuggestedAddress?.[0].Address?.[0]
                            .PremisesAddress?.[0].EngPremisesAddress?.[0].EngDistrict?.[0];
                    dcDistrict = engPremisesAddress?.DcDistrict?.[0]
                        .toLowerCase()
                        .replace(/\band\b/gi, "&");
                } else {
                    const chiPremisesAddress =
                        xmlDoc.AddressLookupResult.SuggestedAddress?.[0].Address?.[0]
                            .PremisesAddress?.[0].ChiPremisesAddress?.[0].ChiDistrict?.[0];
                    dcDistrict = chiPremisesAddress?.DcDistrict?.[0];
                }

                return dcDistrict ? dcDistrict.trim() : "unknown";
            } catch (error) {
                console.error("Error fetching or parsing address lookup:", error);
                return "unknown";
            }
        };

        const decodeOpenHours = (record: any): string => {
            let encodedString = "";

            if (mapping.open_hours) {
                const openHours = record.properties[mapping.open_hours];
                if (openHours) {
                    encodedString =
                        lang === "en"
                            ? openHours
                            : record.properties[mapping.open_hours_tc || mapping.open_hours];
                }
            }

            return encodedString
                .replace(/\\u003C/g, "<") // Replace \u003C with <
                .replace(/\\u003E/g, ">") // Replace \u003E with >
                .replace(/\\u0026/g, "&") // Replace \u0026 with &
                .replace(/\\u003Cbr\\u003E/g, "<br>") // Replace \u003Cbr\u003E with <br>
                .replace(/\\u003Cbr\\u003E\\u003Cbr\\u003E/g, "<br><br>"); // Handle double <br>
        };

        let FacilitiesData: DataProps[] = [];

        if (records) {
            // Get the mapping for the current type
            FacilitiesData = await Promise.all(
                records.map(async (record: any) => ({
                    organization: `${
                        mapping.organization !== null
                            ? lang === "en"
                                ? record.properties[mapping.organization]
                                : record.properties[mapping.organization_tc || mapping.organization]
                            : lang === "en"
                            ? mapping.provider.en
                            : mapping.provider.tc
                    }`,
                    start_date: null,
                    end_date: null,
                    open_hours: decodeOpenHours(record),
                    address:
                        lang === "en"
                            ? record.properties[mapping.address]
                            : record.properties[mapping.address_tc],
                    district: await findDistrict(record), // Resolves the district asynchronously
                    latitude: record.geometry.coordinates[1],
                    longitude: record.geometry.coordinates[0],
                    remarks: null,
                }))
            );
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
