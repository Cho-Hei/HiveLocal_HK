import Settings from "./Settings";
import WeatherWarning from "./WeatherWarning";

const Navbar = () => {
    return (
        <nav className='navbar relative px-2 w-full bg-[#2E236C] text-primary'>
            <div className='flex flex-grow text-center items-center justify-between'>
                <h1>HK Map</h1>
                <div className='flexCenter'>
                    <WeatherWarning />
                    <Settings />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
