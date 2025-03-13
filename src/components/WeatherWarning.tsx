import { useWeather } from "@/hooks/useWeather";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";

const WeatherWarning = () => {
    const { warnings } = useWeather();

    return (
        <div className='flexCenter'>
            <WarningCircle size={26} color='#aac488' weight='duotone' />
            <WarningCircle size={26} color='#aac488' weight='duotone' />
            <WarningCircle size={26} color='#aac488' weight='duotone' />
        </div>
    );
};

export default WeatherWarning;
