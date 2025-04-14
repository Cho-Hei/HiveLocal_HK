// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    env: {
        RELEASE: process.env.npm_package_version,
    },
};

const withNextIntl = createNextIntlPlugin("./src/utils/i18n/request.ts");
export default withNextIntl(nextConfig);
