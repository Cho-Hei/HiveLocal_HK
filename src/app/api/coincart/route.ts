import { NextResponse, type NextRequest } from "next/server";
import { DataProps } from "@/types";

export async function POST(req: NextRequest) {
    const { lang } = await req.json();

    try {
        const response = await fetch(
            `https://api.hkma.gov.hk/public/coin-cart-schedule?lang=${lang}`
        );
        const data = await response.json();

        const records: any[] = data.result.records;
        let coinCartData: DataProps[] = [];
        coinCartData = records.map((record: any) => ({
            organization: `${lang === "en" ? "Hong Kong Monetary Authority" : "香港金融管理局"}`,
            start_date: record.start_date as string,
            end_date: record.end_date as string,
            open_hours: `10:00 AM - 19:00 PM`,
            district: record.district,
            address: record.address,
            latitude: record.latitude,
            longitude: record.longitude,
            remarks: record.remarks,
        }));

        // Filter out address after ";" and "*"
        coinCartData.forEach((record: DataProps) => {
            const address = record.address.split(/;|\*/)[0];
            record.address = address;
        });

        // Sort by start date
        coinCartData.sort((a: DataProps, b: DataProps) => {
            if (a.start_date && b.start_date) {
                return new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
            }
            return 0;
        });

        return NextResponse.json(coinCartData);
    } catch (err) {
        if (err instanceof Error) {
            return new Response(`Error: ${err.message}`, { status: 500 });
        } else {
            return new Response("An unknown error occurred", { status: 500 });
        }
    }
}
