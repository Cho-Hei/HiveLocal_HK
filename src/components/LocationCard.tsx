"use client";
import { updateCurrentLocation } from "@/store/dataSetsSlice";
import { AppDispatch } from "@/store/store";
import { DataProps } from "@/types";
import { useDispatch } from "react-redux";

type DisplayProps = "date" | "district";
interface LocationCardProps {
    data: DataProps;
    display: DisplayProps;
}

const LocationCard = ({ data, display }: LocationCardProps) => {
    const dispatch: AppDispatch = useDispatch();
    const handleLocation = (location: DataProps) => {
        dispatch(updateCurrentLocation(location));
    };

    return (
        <div
            className='p-2 cursor-pointer hover:bg-tertiary rounded-lg'
            onClick={() => handleLocation(data)}>
            {display === "date" && <h2 className='text-xl font-bold'>{data.district}</h2>}

            <h4 className='text-base'>{data.address}</h4>
            <hr className='border-t-2 border-white/35 my-2' />
        </div>
    );
};

export default LocationCard;
