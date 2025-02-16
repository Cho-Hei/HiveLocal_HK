import { InfoProps } from "@/types";
import { MapPinLine } from "@phosphor-icons/react/dist/ssr";

interface LocationsProps {
    coinCartData: InfoProps[];
    setLocation: (index: number) => void;
}

const Locations = ({ coinCartData, setLocation }: LocationsProps) => {
    return (
        <div className='location rounded-2xl bg-[#2E236C] lg:mx-2'>
            <div className='info-title bg-[#433D8B] flexCenter rounded-t-2xl'>
                <MapPinLine weight='fill' size={24} />
                <h1 className='text-white text-xl py-1 text-center mx-2'>Locations</h1>
            </div>
            {/* List of location */}
            <div className='location_scroll h-full my-2'>
                {coinCartData.map((data, index) => (
                    <div
                        key={index}
                        className='p-2 cursor-pointer hover:bg-[#433D8B] rounded-lg'
                        onClick={() => setLocation(index)}>
                        <h2 className='text-xl font-bold'>{data.district}</h2>
                        <h4 className='text-base'>{data.address}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Locations;
