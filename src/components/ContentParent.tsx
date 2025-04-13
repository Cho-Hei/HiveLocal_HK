"use client";
import { fetchData, updateCurrentLocation } from "@/store/dataSetsSlice";
import { AppDispatch, RootState } from "@/store/store";
import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
} from "@heroui/react";
import { useTranslations } from "next-intl";
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
    const { isOpen, onOpenChange } = useDisclosure({ defaultOpen: true });
    const t = useTranslations("I_StartModal");

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

    useEffect(() => {
        // Remove White Space after scroll in Chrome mobile
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
        document.body.setAttribute("style", `height: calc(var(--vh, 1vh) * 100);`);

        window.addEventListener("resize", () => {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
        });
    }, []);

    if (status === "failed") {
        return (
            <section className='relative overflow-hidden h-screen text-white'>
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
        <section className='relative overflow-hidden h-screen text-white bg-primary special-height'>
            {/* Start Modal */}
            <Modal
                backdrop='blur'
                isOpen={isOpen}
                placement='center'
                onOpenChange={onOpenChange}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                classNames={{
                    base: "bg-[#19172c] text-white",
                }}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='flex flex-col gap-1'>HiveLocal HK</ModalHeader>
                            <ModalBody>
                                <p>{t("line1")}</p>
                                <p>{t("line2")}</p>
                                <p>{t("line3")}</p>
                                <p>Enjoy!</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={onClose} className='bg-[#6254ab] text-base'>
                                    {t("continue")}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className='flex flex-col-reverse lg:flex-row h-full'>{children}</div>
        </section>
    );
};

export default ContentParent;
