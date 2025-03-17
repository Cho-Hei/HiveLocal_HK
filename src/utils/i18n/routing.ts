import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ["tc", "en"],

    // Used when no locale matches
    defaultLocale: "tc",
});

export type Locale = (typeof routing.locales)[number];
