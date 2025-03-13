import LocaleSwitch from "./LocaleSwitch";
import WeatherWarning from "./WeatherWarning";

const Navbar = () => {
    return (
        <nav className='navbar relative px-2 w-full bg-[#2E236C]'>
            <div className='flex flex-grow text-center items-center justify-between'>
                <h1 className='text-white'>HK Map</h1>
                <div className='flexCenter'>
                    <WeatherWarning />
                    <LocaleSwitch />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
