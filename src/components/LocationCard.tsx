"use client";
import { updateCurrentLocation } from "@/store/dataSetsSlice";
import { AppDispatch } from "@/store/store";
import { DataProps } from "@/types";
import { useDispatch } from "react-redux";

interface LocationCardProps {
    data: DataProps;
}

const LocationCard = ({ data }: LocationCardProps) => {
    const dispatch: AppDispatch = useDispatch();
    const handleLocation = (location: DataProps) => {
        dispatch(updateCurrentLocation(location));
    };

    return (
        <div
            className='p-2 cursor-pointer hover:bg-[#433D8B] rounded-lg'
            onClick={() => handleLocation(data)}>
            <h2 className='text-xl font-bold'>{data.district}</h2>
            <h4 className='text-base'>{data.address}</h4>
        </div>
    );
};

export default LocationCard;
