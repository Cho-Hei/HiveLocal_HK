import { NextResponse, type NextRequest } from "next/server";
import { InfoProps } from "@/types";

export async function POST(req: NextRequest) {
    // const searchParams = req.nextUrl.searchParams;
    // const lang = searchParams.get("lang");
    // const all = searchParams.get("all");

    const { lang, all } = await req.json();

    try {
        const response = await fetch(
            `https://api.hkma.gov.hk/public/coin-cart-schedule?lang=${lang}`
        );
        const data = await response.json();

        if (!all) {
            const currentDate = new Date().setHours(0, 0, 0, 0);
            data.result.records = data.result.records.filter(
                (record: InfoProps) =>
                    new Date(record.start_date).setHours(0, 0, 0, 0) <= currentDate &&
                    new Date(record.end_date).setHours(0, 0, 0, 0) >= currentDate
            );
        }

        // Filter out address after ";" and "*"
        data.result.records.forEach((record: InfoProps) => {
            const address = record.address.split(/;|\*/)[0];
            record.address = address;
        });

        // Sort by start date
        data.result.records.sort(
            (a: InfoProps, b: InfoProps) =>
                new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );

        return NextResponse.json(data.result.records);
    } catch (err) {
        if (err instanceof Error) {
            return new Response(`Error: ${err.message}`, { status: 500 });
        } else {
            return new Response("An unknown error occurred", { status: 500 });
        }
    }
}
