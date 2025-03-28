"use client";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/styles";
import { DataProps, MapIcons } from "@/types";
import { useEffect, useRef, useMemo } from "react";
import L, { Map } from "leaflet";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLocation } from "@/store/dataSetsSlice";
import MarkerClusterGroup from "react-leaflet-markercluster";

export const ResourceExTLink = {
    coincart: {
        data_provider: {
            en: "Hong Kong Monetary Authority",
            zh: "香港金融管理局",
        },
        en: "https://www.hkma.gov.hk/eng/key-functions/money/hong-kong-currency/coin-collection-programme/",
        zh: "https://www.hkma.gov.hk/chi/key-functions/money/hong-kong-currency/coin-collection-programme/",
    },
    clothesrecycle: {
        data_provider: {
            en: "Home Affairs Department",
            zh: "民政事務總署",
        },
        en: "https://www.had.gov.hk/en/public_services/community_used_clothes_recycling_bank_scheme/",
        zh: "https://www.had.gov.hk/tc/public_services/community_used_clothes_recycling_bank_scheme/",
    },
};

const MapTile = () => {
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
    const MapIcon = useMemo(
        () =>
            L.icon({
                iconUrl: MapIcons[type],
                iconSize: [25, 25],
                iconAnchor: [10, 10],
                popupAnchor: [0, -16],
            }),
        [type]
    );

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
                <TileLayer
                    url='https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/basemap/WGS84/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://api.portal.hkmapservice.gov.hk/disclaimer">Lands Department</a> contributors'
                />
                <TileLayer
                    url={`https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/label/hk/${locale}/WGS84/{z}/{x}/{y}.png`}
                    attribution='&copy; <a href="https://api.portal.hkmapservice.gov.hk/disclaimer">Lands Department</a> contributors'
                />
                <ZoomControl position='bottomright' />
                <MapCenter />
                <MarkerClusterGroup showCoverageOnHover={false}>
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
                                <div className='popup-content w-full text-[#353935]'>
                                    <h2 className='text-lg font-bold'>
                                        {t("district")}: {data.district}
                                    </h2>
                                    <h3 className='text-base/5 my-1 font-semibold'>
                                        {t("address")}: {data.address}
                                    </h3>
                                    {data.start_date && (
                                        <h4 className='text-base font-semibold'>
                                            {t("date")}:{" "}
                                            {`${data.start_date} ${t("to")} ${data.end_date}`}
                                        </h4>
                                    )}

                                    {data.remarks && (
                                        <h4 className='text-sm font-semibold italic my-1'>
                                            {t("remark")}: {data.remarks}
                                        </h4>
                                    )}
                                    <p className='text-justify'>
                                        {t.rich("remarkwarn", {
                                            data_provider: `${
                                                locale === "tc"
                                                    ? ResourceExTLink[type].data_provider.zh
                                                    : ResourceExTLink[type].data_provider.en
                                            }`,
                                            br: () => <br />,
                                            link: () => (
                                                <Link
                                                    href={`${
                                                        locale === "tc"
                                                            ? ResourceExTLink[type].zh
                                                            : ResourceExTLink[type].en
                                                    }`}
                                                    target='_blank'
                                                    className='break-words break-all whitespace-normal'>
                                                    <br />
                                                    {`${
                                                        locale === "tc"
                                                            ? ResourceExTLink[type].zh
                                                            : ResourceExTLink[type].en
                                                    }`}
                                                </Link>
                                            ),
                                        })}
                                    </p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
        </section>
    );
};

export default MapTile;
