import { InfoProps } from "@/types";
import { Info, MapPinLine } from "@phosphor-icons/react/dist/ssr";
import Locations from "./Locations";

interface SideBarProps {
    coinCartData: InfoProps[];
    location: number;
    setLocation: (index: number) => void;
}

const SideBar = ({ coinCartData, location, setLocation }: SideBarProps) => {
    return (
        <section className='sidebar h-screen lg:max-w-[310px] bg-[#17153B] p-2 lg:p-1 overflow-y-auto grid grid-cols-2 lg:grid-cols-1 gap-2 place-content-stretch'>
            <div className='min-h-[420px] max-h-[440px] rounded-2xl bg-[#2E236C] lg:mx-2 lg:my-1 shadow-lg flex flex-col'>
                <div className='info flex flex-col flex-grow'>
                    <div className='info-title bg-[#433D8B] flexCenter rounded-t-2xl'>
                        <Info weight='fill' size={24} />
                        <h1 className='text-white text-xl py-1 text-center mx-2'>Locations</h1>
                    </div>
                    {coinCartData && coinCartData.length > 0 && (
                        <div className='info-content p-2 flex-grow flex flex-col'>
                            <div className='service-provider p-4 rounded-2xl bg-violet-700'>
                                <h2 className='text-xl lg:text-2xl font-bold'>Coin Cart</h2>
                                <p className='text-sm lg:text-base'>Hong Kong Monetary Authority</p>
                            </div>
                            <div className='service-detail flex-grow flex flex-col justify-between'>
                                <div className='flex flex-col'>
                                    <div className='flex items-center rounded-lg m-1'>
                                        <div className='w-full text-center'>
                                            <h4 className='text-xl text-balance whitespace-nowrap'>{`${coinCartData[location].start_date} to ${coinCartData[location].end_date}`}</h4>
                                            <h4 className='text-base mt-2'>6:00 PM - 10:00 PM</h4>
                                        </div>
                                    </div>

                                    <div className='rounded-lg m-1'>
                                        <h4 className='text-base lg:text-lg font-bold'>
                                            {coinCartData[location].district}
                                        </h4>
                                    </div>

                                    <div className='rounded-lg m-1'>
                                        <h4 className='text-sm lg:text-lg'>
                                            {coinCartData[location].address}
                                        </h4>
                                    </div>
                                </div>

                                {coinCartData[location].remarks && (
                                    <div className='flexCenter rounded-lg p-2 min-h-[64px] text-center bg-orange-600/80 w-full'>
                                        <h4 className='text-sm font-bold text-pretty'>
                                            {coinCartData[location].remarks}
                                        </h4>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Locations coinCartData={coinCartData} setLocation={setLocation} />
        </section>
    );
};

export default SideBar;
