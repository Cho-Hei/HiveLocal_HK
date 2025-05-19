"use client";
import { useWeather } from "@/hooks/useWeather";
import { Warning, WeatherIcons } from "@/types/weather";
import { Avatar } from "@heroui/react";

const WeatherWarning = () => {
    const { warnings } = useWeather();

    if (!warnings) {
        return null;
    }

    return (
        <div className='flexCenter'>
            {/* Show warning icons */}
            {warnings.map((warning: Warning) => (
                <div
                    key={warning.code}
                    className='mx-1 border-2 animate-[flashBorder_3s_infinite]'
                    style={{ "--flashing-color": "red" } as React.CSSProperties}>
                    <Avatar src={WeatherIcons[warning.code]} size='sm' className='rounded-none' />
                </div>
            ))}
        </div>
    );
};

export default WeatherWarning;
