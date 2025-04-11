"use client";
import { fetchData, updateCurrentLocation } from "@/store/dataSetsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface ContentParentProps {
    children: ReactNode;
}

const ContentParent = ({ children }: ContentParentProps) => {
    const dispatch: AppDispatch = useDispatch();
    const { type, status, showAll } = useSelector((state: RootState) => state.dataSets);
    const { locale } = useParams<{ locale: string }>();

    useEffect(() => {
        if (type === "coincart") {
            dispatch(fetchData({ type: type as string, lang: locale as string, all: showAll }));
        } else {
            dispatch(fetchData({ type: type as string, lang: locale as string }));
        }
    }, [dispatch, locale, showAll, type]);

    useEffect(() => {
        dispatch(updateCurrentLocation(null));
    }, [locale]);

    if (status === "failed") {
        return (
            <section className='relative overflow-hidden h-screen'>
                <div className='flex flex-col-reverse lg:flex-row h-full'>
                    <ul>
                        <li>Error loading data. </li>
                        <li>
                            Please disable any extension / application that will block trackers.
                        </li>
                        <li>Try again / refresh page</li>
                    </ul>
                </div>
            </section>
        );
    }

    return (
        <section className='relative overflow-hidden h-screen'>
            <div className='flex flex-col-reverse lg:flex-row h-full'>{children}</div>
        </section>
    );
};

export default ContentParent;
