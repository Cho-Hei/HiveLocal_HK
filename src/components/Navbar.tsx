import LocaleSwitch from "./LocaleSwitch";

const Navbar = () => {
    return (
        <nav className='navbar relative px-2 w-full bg-[#2E236C]'>
            <div className='flex flex-grow text-center items-center justify-between'>
                <h1>HK Map</h1>
                <LocaleSwitch />
            </div>
        </nav>
    );
};

export default Navbar;
