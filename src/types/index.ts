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

export type DataName = "coincart" | "clothesrecycle" | "studyroom" | "postbox" | "clinic";

export interface LocationsProps {
    data: DataProps[];
}

export type districtshort =
    | "cw"
    | "e"
    | "s"
    | "wc"
    | "kc"
    | "kto"
    | "kts"
    | "ssp"
    | "wts"
    | "ytm"
    | "is"
    | "n"
    | "sk"
    | "st"
    | "tp"
    | "tw"
    | "tm"
    | "yl";
