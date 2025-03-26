"use client";
import { usePathname, useRouter } from "@/utils/i18n/navigation";
import { Locale, routing } from "@/utils/i18n/routing";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";

const LocaleSwitch = ({ dropdownref }: { dropdownref: React.Ref<HTMLElement | null> }) => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    const locale = useLocale();

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
            <div className='flex items-center text-center'>
                <h2 className='text-primary'>Language:</h2>
                <Dropdown backdrop='blur' className='bg-slate-400'>
                    <DropdownTrigger>
                        <Button className='bg-slate-400 min-w-6 h-6 m-2'>
                            {locale === "en" ? "中" : "EN"}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        ref={dropdownref}
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
