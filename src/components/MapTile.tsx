"use client";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DataName, DataProps, MapIcons } from "@/types";
import { useEffect, useRef } from "react";
import L, { Map } from "leaflet";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { getGPUTier } from "detect-gpu";
import { addToast, cn } from "@heroui/react";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLocation } from "@/store/dataSetsSlice";

interface MapTileProps {
    data: DataProps[];
    location: DataProps | null;
    setLocation: (location: DataProps) => void;
}

// const clothesIcon = L.icon({
//     iconUrl: "/tshirt.svg",
//     iconSize: [25, 25],
//     iconAnchor: [10, 10],
//     popupAnchor: [0, -16],
// });

const MapTile = () => {
    // const selectedLocation = coinCartData[location];
    const t = useTranslations("I_MapNote");
    const dispatch: AppDispatch = useDispatch();
    const {
        type,
        data,
        currentLocation: location,
    } = useSelector((state: RootState) => state.dataSets);
    const locale = useLocale();
    const mapRef = useRef<Map | null>(null);

    // Create a custom icon
    const MapIcon = L.icon({
        iconUrl: MapIcons[type], // Path to your truck icon image in the public directory
        iconSize: [25, 25], // Size of the icon
        iconAnchor: [10, 10], // Anchor point of the icon
        popupAnchor: [0, -16], // Anchor point of the popup relative to the icon
    });

    const checkGPU = async () => {
        const { tier } = await getGPUTier();

        console.log(`GPU tier: ${tier}`);
        if (tier < 2) {
            addToast({
                color: "warning",
                title: t("performance_remind"),
                timeout: 5000,
                shouldShowTimeoutProgress: true,
                classNames: {
                    base: cn(["absolute bottom-0 right-0 z-10"]),
                },
            });
        }
    };

    // Hardware acceleration check
    useEffect(() => {
        checkGPU();
    }, []);

    // Close popup when changing location
    const MapCenter = () => {
        const map = useMap();

        useEffect(() => {
            if (location) {
                map.closePopup();
                map.setView([location.latitude, location.longitude], 18);
            }
        }, [location, map]);
        return null;
    };

    const handleLocation = (location: DataProps) => {
        dispatch(updateCurrentLocation(location));
    };

    return (
        <section className='map-container lg:h-screen'>
            <MapContainer
                center={[22.319158, 114.192923]}
                zoom={13}
                minZoom={10}
                className='map'
                zoomControl={false}
                ref={mapRef}>
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
                {data.map((data, index) => (
                    <Marker
                        key={index}
                        position={[data.latitude, data.longitude]}
                        icon={MapIcon}
                        eventHandlers={{
                            click: () => {
                                handleLocation(data);
                            },
                        }}>
                        <Popup>
                            <div className='popup-content w-full'>
                                <h2 className='text-lg font-bold'>
                                    {t("district")}: {data.district}
                                </h2>
                                <h3 className='text-base/5 my-1 font-semibold'>
                                    {t("address")}: {data.address}
                                </h3>
                                <h4 className='text-base font-semibold'>
                                    {t("date")}: {`${data.start_date} ${t("to")} ${data.end_date}`}
                                </h4>
                                {data.remarks && (
                                    <h4 className='text-sm font-semibold italic my-1'>
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
