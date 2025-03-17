export interface InfoProps {
    start_date: string;
    end_date: string;
    cart_no: number;
    district: string;
    address: string;
    latitude: number;
    longitude: number;
    remarks: string | null;
}

export interface DataProps {
    organization: string;
    start_date: string | null;
    end_date: string | null;
    open_hours: string | null;
    district: string;
    address: string;
    latitude: number;
    longitude: number;
    remarks: string | null;
}

export type DataName = "coincart" | "clothesrecycle";

export interface LocationsProps {
    data: DataProps[];
    setLocation: (location: DataProps) => void;
}
