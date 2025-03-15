import { Warning } from "@/types/weather";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useWeather = () => {
    // Example
    // {
    //     "WRAIN": {
    //       "name": "Rainstorm Warning Signal",
    //       "code": "WRAINA",
    //       "type": "Amber",
    //       "actionCode": "ISSUE",
    //       "issueTime": "2025-03-15T15:00:00+08:00",
    //       "updateTime": "2025-03-15T15:00:00+08:00"
    //     },
    //     "WTS": {
    //       "name": "Thunderstorm Warning",
    //       "code": "WTS",
    //       "actionCode": "EXTEND",
    //       "issueTime": "2025-03-15T14:30:00+08:00",
    //       "expireTime": "2025-03-15T18:00:00+08:00",
    //       "updateTime": "2025-03-15T16:00:00+08:00"
    //     }
    //}

    const { data, isLoading, error } = useSWR(
        `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en`,
        fetcher,
        { refreshInterval: 150000 }
    );

    // Filter out warnings that are cancelled
    let warnings: Warning[] = [];
    if (data) {
        warnings = Object.values(data as Record<string, Warning>).filter(
            ({ actionCode }) => actionCode !== "CANCEL"
        );
    }

    return {
        warnings,
        isLoading,
        error,
    };
};
