import type { Metadata } from "next";
import { Geist, Noto_Sans_TC } from "next/font/google";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import useFontFamily from "@/hooks/useFontFamily";

const geistSans = Geist({
    variable: "--font-geist-sans",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

const notoSansTC = Noto_Sans_TC({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-noto-sans-tc",
    display: "swap",
});

export const metadata: Metadata = {
    title: "HK-Map",
    description: "Map for facilities in Hong Kong",
};

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    // if (!routing.locales.includes(locale as any)) {
    //     notFound();
    // }

    const messages = await getMessages();

    // const fontClass = locale === "tc" ? notoSansTC.variable : geistSans.variable;
    const fontClass = useFontFamily(locale);

    return (
        <html lang={locale}>
            <body
                className={`${fontClass} ${locale === "tc" ? "font-sans" : "font-en"} antialiased`}>
                <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
            </body>
        </html>
    );
}
