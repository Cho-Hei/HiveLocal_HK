import { Geist, Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

const notoSerifTC = Noto_Serif_TC({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-noto-sans-tc",
    display: "swap",
});

const useFontFamily = (locale: string) => {
    return locale === "tc" ? notoSerifTC.variable : geistSans.variable;
};

export default useFontFamily;
