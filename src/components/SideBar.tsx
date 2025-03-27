"use client";
import { Info } from "@phosphor-icons/react/dist/ssr";
import Locations from "./Locations";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CoinCartLocations from "./CoinCartLocations";
import InfoCard from "./InfoCard";
import { useMemo, useState } from "react";

const SideBar = () => {
    const t = useTranslations("I_SideBar");
    const type = useSelector((state: RootState) => state.dataSets.type);

    const LocationsPicker = useMemo(() => {
        return type === "coincart" ? <CoinCartLocations /> : <Locations />;
    }, [type]);

    // Default values
    const minHeight = 300; // Minimum height of the section
    const maxHeight = window.innerHeight - 250; // Maximum height of the section
    const [height, setHeight] = useState(minHeight); // Initial height
    const [isDragging, setIsDragging] = useState(false); // Drag state

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        setIsDragging(true);
        const startY = "clientY" in e ? e.clientY : e.touches?.[0].clientY; // Capture starting cursor position

        const handleDragMove = (moveEvent: MouseEvent | TouchEvent) => {
            const currentY =
                moveEvent instanceof MouseEvent ? moveEvent.clientY : moveEvent.touches[0].clientY;
            const deltaY = startY - currentY; // Calculate drag direction and amount
            const newHeight = Math.min(
                Math.max(height + deltaY, minHeight), // Ensure height is >= minHeight
                maxHeight // Ensure height is <= maxHeight
            );
            setHeight(newHeight); // Update height dynamically
        };

        const handleDragEnd = () => {
            setIsDragging(false);
            // Clean up event listeners
            document.removeEventListener("mousemove", handleDragMove);
            document.removeEventListener("touchmove", handleDragMove);
            document.removeEventListener("mouseup", handleDragEnd);
            document.removeEventListener("touchend", handleDragEnd);
        };

        // Attach listeners for drag movement and end
        document.addEventListener("mousemove", handleDragMove);
        document.addEventListener("touchmove", handleDragMove);
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("touchend", handleDragEnd);
    };

    return (
        <>
            {/* Mobile Sidebar */}
            <section
                className='lg:hidden fixed left-0 w-full bg-[#17153B] rounded-t-2xl shadow-lg grid grid-cols-2 gap-2 p-2 text-primary overflow-hidden z-20'
                style={{
                    height: `${height}px`, // Dynamically update height
                    bottom: 0, // Fixed to the bottom of the viewport
                    cursor: isDragging ? "grabbing" : "grab", // Change cursor during drag
                    transition: isDragging ? "none" : "height 0.3s ease-out", // Smooth release animation
                }}
                onMouseDown={handleDragStart}
                onTouchStart={handleDragStart} // Enable touch dragging
            >
                <div className='mobileinfo min-h-[350px] max-h-[480px] max-w-full rounded-2xl bg-[#2E236C] shadow-lg flex flex-col overflow-hidden self-start'>
                    <div className='info-title bg-[#433D8B] flexCenter rounded-t-2xl'>
                        <Info weight='fill' color='#ffffff' size={24} />
                        <h1 className='text-xl py-1 mx-2'>{t("info")}</h1>
                    </div>
                    <InfoCard />
                </div>

                <div className='flex flex-col overflow-y-auto'>{LocationsPicker}</div>
            </section>

            {/* Desktop Sidebar */}
            <section className='hidden lg:grid sidebar h-[450px] lg:h-screen max-w-[310px] min-w-[310px] bg-[#17153B] p-2 lg:p-1 grid-cols-2 lg:grid-cols-1 gap-2 place-content-stretch text-primary'>
                <div className='min-h-[420px] max-h-fit rounded-2xl bg-[#2E236C] lg:mx-2 lg:my-1 shadow-lg flex flex-col'>
                    <div className='info flex flex-col flex-grow h-full'>
                        <div className='info-title bg-[#433D8B] flexCenter rounded-t-2xl'>
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
