import { heroui } from "@heroui/react";
import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#F8F8F8",
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            fontFamily: {
                sans: ["var(--font-noto-sans-tc)"],
                en: ["var(--font-geist-sans)"],
            },
            // animation: {
            //     "flash-border": "flashBorder 1s infinite",
            // },
            // keyframes: {
            //     flashBorder: {
            //         "0%, 100%": { borderColor: "transparent" },
            //         "50%": { borderColor: "red" },
            //     },
            // },
        },
    },
    plugins: [heroui()],
    darkMode: "class",
} satisfies Config;
