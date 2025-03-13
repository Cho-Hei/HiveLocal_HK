import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export const useWeather = () => {
    const { data, isLoading, error } = useSWR(
        `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warningInfo&lang=en`,
        fetcher
    );

    return {
        warnings: data,
        isLoading,
        error,
    };
};
