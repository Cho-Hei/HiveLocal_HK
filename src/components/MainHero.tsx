import SideBar from "./SideBar";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import ContentParent from "./ContentParent";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";

// Next 15 requires !!false to disable SSR
const MapTile = dynamic(() => import("./MapTile"), { ssr: !!false });

const MainHero = () => {
    return (
        <ContentParent>
            <SideBar />
            <div className='flex flex-col flex-grow lg:h-screen h-full'>
                <div className='z-50'>
                    <Navbar />
                </div>
                <MapTile />
            </div>
        </ContentParent>
    );
};

export default MainHero;
