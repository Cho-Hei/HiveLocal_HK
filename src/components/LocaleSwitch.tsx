"use client";
import { usePathname, useRouter } from "@/utils/i18n/navigation";
import { Locale, routing } from "@/utils/i18n/routing";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

const LocaleSwitch = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    const locale = useLocale();

    // const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const nextLocale = event.target.value as Locale;
    //     startTransition(() => {
    //         router.replace(
    //             // @ts-expect-error -- TypeScript will validate that only known `params`
    //             // are used in combination with a given `pathname`. Since the two will
    //             // always match for the current route, we can skip runtime checks.
    //             { pathname, params },
    //             { locale: nextLocale }
    //         );
    //     });
    // };

    const onDropdownChange = (key: string) => {
        const nextLocale = key as Locale;
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    };

    return (
        <div className='lng-dropdown'>
            {/* <select
                className='inline-flex appearance-none bg-transparent py-3 pl-2 pr-6'
                defaultValue={locale}
                disabled={isPending}
                onChange={onSelectChange}>
                {routing.locales.map((cur) => (
                    <option key={cur} value={cur}>
                        {cur}
                    </option>
                ))}
            </select> */}
            <div className='flex items-center text-center'>
                <h2 className='text-primary'>Language:</h2>
                <Dropdown backdrop='blur' className='bg-slate-400'>
                    <DropdownTrigger>
                        <Button className='bg-slate-400 min-w-6 h-6 m-2'>
                            {locale === "en" ? "中" : "EN"}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label='Locale'
                        onAction={(key) => onDropdownChange(key as string)}
                        disabledKeys={[locale]}>
                        {routing.locales.map((cur) => (
                            <DropdownItem key={cur} value={cur}>
                                {cur === "en" ? "English" : "中"}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
    );
};

export default LocaleSwitch;
