"use client";
import { Info } from "@phosphor-icons/react/dist/ssr";
import Locations from "./Locations";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CoinCartLocations from "./CoinCartLocations";
import InfoCard from "./InfoCard";
import { useMemo, useState, useRef } from "react";
import PreventRefresh from "./PreventRefresh";

const SideBar = () => {
    const t = useTranslations("I_SideBar");
    const type = useSelector((state: RootState) => state.dataSets.type);

    // Explicitly type the ref for LocationsPicker
    const LocationsPickerRef = useRef<HTMLDivElement>(null);

    const minHeight = window.innerHeight * 0.4; // Minimum height of the section
    const maxHeight = window.innerHeight - 100; // Maximum height of the section
    const [height, setHeight] = useState(minHeight); // Initial height
    const [isDragging, setIsDragging] = useState(false); // Drag state

    const LocationsPicker = useMemo(() => {
        return type === "coincart" ? <CoinCartLocations /> : <Locations />;
    }, [type]);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        // Prevent drag if the event originated within LocationsPicker
        if (LocationsPickerRef.current && LocationsPickerRef.current.contains(e.target as Node)) {
            return; // Ignore drag
        }

        setIsDragging(true);
        const startY = "clientY" in e ? e.clientY : e.touches?.[0].clientY; // Initial cursor position
        let currentHeight = height; // Track the current height without setting state repeatedly

        const handleDragMove = (moveEvent: MouseEvent | TouchEvent) => {
            moveEvent.preventDefault(); // Prevent overscroll or pull-to-refresh

            const currentY =
                moveEvent instanceof MouseEvent ? moveEvent.clientY : moveEvent.touches[0].clientY;
            const deltaY = startY - currentY; // Calculate movement
            currentHeight = Math.min(
                Math.max(height + deltaY, minHeight), // Ensure height >= minHeight
                maxHeight // Ensure height <= maxHeight
            );

            // Throttle updates using requestAnimationFrame
            requestAnimationFrame(() => {
                setHeight(currentHeight); // Update height with throttling
            });
        };

        const handleDragEnd = () => {
            setIsDragging(false);

            // Remove listeners
            document.removeEventListener("mousemove", handleDragMove);
            document.removeEventListener("touchmove", handleDragMove);
            document.removeEventListener("mouseup", handleDragEnd);
            document.removeEventListener("touchend", handleDragEnd);
        };

        // Attach listeners (passive: false for touchmove to prevent default behaviors)
        document.addEventListener("mousemove", handleDragMove);
        document.addEventListener("touchmove", handleDragMove, { passive: false });
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("touchend", handleDragEnd);
    };

    return (
        <>
            {/* Mobile Sidebar */}
            <PreventRefresh exceptref={LocationsPickerRef}>
                <section
                    className='lg:hidden fixed left-0 w-full bg-primary rounded-t-2xl shadow-lg p-2 text-white overflow-hidden z-20'
                    style={{
                        height: `${height}px`, // Dynamically update height
                        bottom: 0, // Fixed to the bottom of the viewport
                        cursor: isDragging ? "grabbing" : "grab", // Change cursor during drag
                        transition: isDragging ? "none" : "height 0.3s ease-out", // Smooth release animation
                    }}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart} // Enable touch dragging
                >
                    <div className='overflow-hidden h-full'>
                        <div className='flexCenter'>
                            <hr className='w-6 h-1 mb-1 bg-gray-400 border-0 rounded-sm dark:bg-gray-700' />
                        </div>
                        <div className='grid grid-cols-2 gap-2 overflow-hidden h-full'>
                            <div className='mobileinfo min-h-[350px] max-h-[480px] max-w-full rounded-2xl bg-secondary shadow-lg flex flex-col overflow-hidden self-start'>
                                <div className='info-title bg-tertiary flexCenter rounded-t-2xl'>
                                    <Info weight='fill' color='#ffffff' size={24} />
                                    <h1 className='text-xl py-1 mx-2'>{t("info")}</h1>
                                </div>
                                <InfoCard />
                            </div>

                            <div
                                ref={LocationsPickerRef} // Attach ref to detect interaction
                                className='flex flex-col overflow-y-auto'>
                                {LocationsPicker}
                            </div>
                        </div>
                    </div>
                </section>
            </PreventRefresh>

            {/* Desktop Sidebar */}
            <section className='hidden lg:grid sidebar h-[450px] lg:h-screen max-w-[310px] min-w-[310px] bg-primary p-2 lg:p-1 grid-cols-2 lg:grid-cols-1 gap-2 place-content-stretch text-white'>
                <div className='min-h-[420px] max-h-fit rounded-2xl bg-secondary lg:mx-2 lg:my-1 shadow-lg flex flex-col'>
                    <div className='info flex flex-col flex-grow h-full'>
                        <div className='info-title bg-tertiary flexCenter rounded-t-2xl'>
                            <Info weight='fill' color='#ffffff' size={24} />
                            <h1 className='text-xl py-1 text-center mx-2'>{t("info")}</h1>
                        </div>

                        <InfoCard />
                    </div>
                </div>
                <div className='flex flex-col flex-grow overflow-y-auto'>{LocationsPicker}</div>
            </section>
        </>
    );
};

export default SideBar;
