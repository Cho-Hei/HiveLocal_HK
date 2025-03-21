import { DataProps } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { lang } = await req.json();

    try {
        const response = await fetch(
            `https://api.csdi.gov.hk/apim/dataquery/api/?id=had_rcd_1665042410524_59761&layer=geotagging&limit=2000`
        );
        const data: Record<string, string[]> = await response.json();

        const records = data.features;

        let clothesRecycleData: DataProps[] = records.map((record: any) => ({
            organization: `${lang === "en" ? record.properties.sm_en : record.properties.sm_tc}`,
            start_date: null,
            end_date: null,
            open_hours: null,
            address: `${lang === "en" ? record.properties.addr_en : record.properties.addr_tc}`,
            district: record.properties.District,
            latitude: record.geometry.coordinates[1],
            longitude: record.geometry.coordinates[0],
            remarks: null,
        }));

        return NextResponse.json(clothesRecycleData);
    } catch (err) {
        if (err instanceof Error) {
            return new Response(`Error: ${err.message}`, { status: 500 });
        } else {
            return new Response("An unknown error occurred", { status: 500 });
        }
    }
}
