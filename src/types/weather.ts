export interface Warning {
    name: string;
    code: WeatherCode;
    actionCode: "ISSUE" | "REISSUE" | "CANCEL" | "EXTEND" | "UPDATE";
    issueTime: string;
    expireTime: string | null;
    updateTime: string;
}

export type Weather = {
    WFIRE?: Warning;
    WFROST?: Warning;
    WHOT?: Warning;
    WCOLD?: Warning;
    WMSGNL?: Warning;
    WRAIN?: Warning;
    WFNTSA?: Warning;
    WL?: Warning;
    WTCSGNL?: Warning;
    WTMW?: Warning;
    WTS?: Warning;
};

export type WeatherCode =
    | "TC10"
    | "TC9"
    | "TC8SW"
    | "TC8NW"
    | "TC8SE"
    | "TC8NE"
    | "WRAINB"
    | "WRAINR"
    | "TC3"
    | "TC1"
    | "WRAINA"
    | "WFROST"
    | "WL"
    | "WTMW"
    | "WTS"
    | "WFNTSA"
    | "WFIRER"
    | "WFIREY"
    | "WHOT"
    | "WCOLD"
    | "WMSGNL";

export const WeatherIcons: Partial<Record<WeatherCode, string>> = {
    TC10: "https://upload.wikimedia.org/wikipedia/commons/3/3d/No._10_Hurricane_Signal.png",
    TC9: "https://upload.wikimedia.org/wikipedia/commons/7/7a/No._09_Increasing_Gale_or_Storm_Signal.png",
    TC8SW: "https://en.wikipedia.org/wiki/File:No._8_Southwest_Gale_or_Storm_Signal.png",
    TC8NW: "https://en.wikipedia.org/wiki/File:No._8_Northwest_Gale_or_Storm_Signal.png",
    TC8SE: "https://upload.wikimedia.org/wikipedia/commons/0/04/No._8_Southeast_Gale_or_Storm_Signal.png",
    TC8NE: "https://upload.wikimedia.org/wikipedia/commons/4/49/No._8_Northeast_Gale_or_Storm_Signal.png",
    WRAINB: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Black_Rainstorm_Signal.svg",
    WRAINR: "https://upload.wikimedia.org/wikipedia/commons/9/90/Red_Rainstorm_Signal.svg",
    TC3: "https://upload.wikimedia.org/wikipedia/commons/7/7b/No._03_Strong_Wind_Signal.png",
    TC1: "https://upload.wikimedia.org/wikipedia/commons/a/a9/No._01_Standby_Signal.png",
    WRAINA: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Amber_Rainstorm_Signal.svg",
    WL: "https://upload.wikimedia.org/wikipedia/commons/5/5b/Landslip.gif",
    WTS: "https://upload.wikimedia.org/wikipedia/commons/2/24/Thunderstorm_Warning.png",
    WFNTSA: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Ntfl.gif",
    WHOT: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Very_Hot_Weather_Warning.png",
    WCOLD: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Cold_Weather_Warning.png",
    WMSGNL: "https://upload.wikimedia.org/wikipedia/commons/a/a7/HK_Monsoon_Signal.png",
    // WFROST: "https://www.hko.gov.hk/tc/textonly/img/warn/images/frost.gif",
    // WTMW: "https://www.hko.gov.hk/tc/textonly/img/warn/images/tsunami-warn.gif",
    // WFIRER: "https://www.hko.gov.hk/tc/textonly/img/warn/images/firer.gif",
    // WFIREY: "https://www.hko.gov.hk/tc/textonly/img/warn/images/firey.gif",
};
