import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { InfoProps } from "@/types";
import { useEffect } from "react";
import L from "leaflet";

interface MapTileProps {
    coinCartData: InfoProps[];
    location: number;
    setLocation: (index: number) => void;
}

// Create a custom icon
const truckIcon = L.icon({
    iconUrl: "/truck.svg", // Path to your truck icon image in the public directory
    iconSize: [20, 20], // Size of the icon
    iconAnchor: [10, 10], // Anchor point of the icon
    popupAnchor: [0, -16], // Anchor point of the popup relative to the icon
});

const MapTile = ({ coinCartData, location, setLocation }: MapTileProps) => {
    const selectedLocation = coinCartData[location];

    const MapCenter = () => {
        const map = useMap();
        useEffect(() => {
            if (selectedLocation) {
                map.setView([selectedLocation.latitude, selectedLocation.longitude], 18);
            }
        }, [selectedLocation, map]);
        return null;
    };

    return (
        <section className='map-container lg:h-screen'>
            <MapContainer
                center={[22.319158, 114.192923]}
                zoom={13}
                minZoom={10}
                className='map'
                zoomControl={false}>
                {/* Base map */}
                <TileLayer
                    url='https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/basemap/WGS84/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://api.portal.hkmapservice.gov.hk/disclaimer">Lands Department</a> contributors'
                />
                {/* Map Label (buildings, landmarks) */}
                <TileLayer
                    url='https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/label/hk/tc/WGS84/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://api.portal.hkmapservice.gov.hk/disclaimer">Lands Department</a> contributors'
                />
                <ZoomControl position='bottomright' />
                <MapCenter />
                {coinCartData.map((data, index) => (
                    <Marker
                        key={index}
                        position={[data.latitude, data.longitude]}
                        icon={truckIcon}
                        eventHandlers={{
                            click: () => {
                                setLocation(index);
                            },
                        }}>
                        <Popup>
                            <div>
                                <h2>{data.district}</h2>
                                <p>{data.address}</p>
                                <p>{`${data.start_date} - ${data.end_date}`}</p>
                                {data.remarks && <p>{data.remarks}</p>}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </section>
    );
};

export default MapTile;
