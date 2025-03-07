# HK Coin Cart Map

This is an information board for Coin Carts in Hong Kong which is part of the coin collection programme started in 2014 ([More on HKMA](https://www.hkma.gov.hk/eng/key-functions/money/hong-kong-currency/coin-collection-programme/)). This webapp added a map interface to further enhance usability ([Match Between the System and the Real World](https://www.nngroup.com/articles/ten-usability-heuristics/#toc-2-match-between-the-system-and-the-real-world-2)).

> This application may change to add more facilities as long as APIs are available (Currently there's only coin cart data in this application). However, this application mainly focuses on those that don't show on commonly used map applications.

Deployed link: https://hkmap.choheitoby.com/

## Tech Stack

**Client:** NextJS, Typescript, TailwindCSS, Redux, next-intl, react-leaflet
**API:** (Data.gov.hk): https://data.gov.hk/tc-data/dataset/hk-hkma-coincart-coin-cart-schedule

## Features

-   Map interface to show location of facilities
-   Auto update of locations
-   Fully mobile responsive design
-   i18n Support

## Future Improvements

-   Add csv support
-   Add more items
    -   (e.g Electric Vehicle Chargers)
-   Weather Warnings

## Acknowledgement

**Inspiration**
GTAWeb.eu: https://gtaweb.eu/gtao-map/ls/
[獨立巴士預報 HK Bus ETA](https://hkbus.app/en) : https://github.com/hkbus/hk-independent-bus-eta
**UI Design**
リアルタイム地震ビューアー Scratch Realtime Earthquake Viewer: https://kotoho7.github.io/scratch-realtime-earthquake-viewer-page/
**Map**
Common Spatial Data Infrastructure: https://portal.csdi.gov.hk/csdi-webpage/
Lands Department (HK): https://www.landsd.gov.hk/en/index.html
