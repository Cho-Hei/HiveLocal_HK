import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { InfoProps } from "@/types";
import { useEffect } from "react";
import L from "leaflet";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

interface MapTileProps {
    coinCartData: InfoProps[];
    location: number;
    setLocation: (index: number) => void;
}

// Create a custom icon
const truckIcon = L.icon({
    iconUrl: "/money-transport_1.svg", // Path to your truck icon image in the public directory
    iconSize: [25, 25], // Size of the icon
    iconAnchor: [10, 10], // Anchor point of the icon
    popupAnchor: [0, -16], // Anchor point of the popup relative to the icon
});

const MapTile = ({ coinCartData, location, setLocation }: MapTileProps) => {
    const selectedLocation = coinCartData[location];
    const t = useTranslations("I_MapNote");
    const locale = useLocale();

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
                    url={`https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/label/hk/${locale}/WGS84/{z}/{x}/{y}.png`}
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
                            <div className='popup-content'>
                                <h2 className='text-lg font-bold'>
                                    {t("district")}: {data.district}
                                </h2>
                                <h3 className='text-lg'>
                                    {t("address")}: {data.address}
                                </h3>
                                <h4 className='text-base'>
                                    {t("date")}: {`${data.start_date} ${t("to")} ${data.end_date}`}
                                </h4>
                                {data.remarks && (
                                    <h4 className='text-sm'>
                                        {t("remark")}: {data.remarks}
                                    </h4>
                                )}
                                <p className='text-justify'>
                                    {t.rich("remarkwarn", {
                                        br: () => <br />,
                                        link: (chunks) => (
                                            <Link
                                                href={`${chunks}`}
                                                target='_blank'
                                                className='break-words break-all whitespace-normal'>
                                                <br />
                                                {chunks}
                                            </Link>
                                        ),
                                    })}
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </section>
    );
};

export default MapTile;
