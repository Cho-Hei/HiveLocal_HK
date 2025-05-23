import Settings from "./Settings";
import WeatherWarning from "./WeatherWarning";

const Navbar = () => {
    return (
        <nav className='navbar relative px-2 w-full bg-secondary text-white'>
            <div className='flex flex-grow text-center items-center justify-between'>
                <h1>HiveLocal HK</h1>
                <div className='flexCenter'>
                    <WeatherWarning />
                    <Settings />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
