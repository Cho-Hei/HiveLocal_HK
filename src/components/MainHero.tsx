import SideBar from "./SideBar";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import ContentParent from "./ContentParent";

// Next 15 requires !!false to disable SSR
const MapTile = dynamic(() => import("./MapTile"), { ssr: !!false });

const MainHero = () => {
    return (
        <ContentParent>
            <SideBar />
            <div className='flex flex-col flex-grow lg:h-screen'>
                <Navbar />
                <MapTile />
            </div>
        </ContentParent>
    );
};

export default MainHero;
