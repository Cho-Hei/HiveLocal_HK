import createMiddleware from "next-intl/middleware";
import { routing } from "./utils/i18n/routing";

export default createMiddleware(routing);

export const config = {
    // Match only internationalized pathnames
    matcher: ["/", "/(tc|en)/:path*"],
};
