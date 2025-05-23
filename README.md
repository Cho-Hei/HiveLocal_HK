# HiveLocal HK

This web application serves as an information hub for various facilities in Hong Kong. Initially designed to track the movement of limited coin carts across areas, it features a dashboard that simplifies viewing their schedules. This webapp added a map interface to further enhance usability ([Match Between the System and the Real World](https://www.nngroup.com/articles/ten-usability-heuristics/#toc-2-match-between-the-system-and-the-real-world-2)).

> [!NOTE]
> This application may change or add more facilities as long as APIs are available. However, this application mainly focuses on those that don't show on common map applications.

Deployed link: https://hivelocalhk.choheitoby.com

## Tech Stack

**Client:** NextJS, Typescript, TailwindCSS, Redux, next-intl, react-leaflet

**API:** (Data.gov.hk): https://data.gov.hk/

## Features

-   Map interface to show location of facilities
-   Auto update of locations
-   Fully mobile responsive design
-   i18n Support
-   Data caching

## Future Improvements

-   Add CSV support
-   Add more items
    -   (e.g Electric Vehicle Chargers)
-   Weather Warnings

## Getting Started

### 📦 Install

```
$ git clone https://github.com/Cho-Hei/HiveLocal_HK.git

$ npm install
```

### 🔨 How to use

Runs Next.js in development mode

```bash
$ npm run dev
```

Runs next build which builds the application for production usage

```bash
$ npm run build
```

Runs next start which starts a Next.js production server

```bash
$ npm start
```

The app should be up and running on http://localhost:3000

## Acknowledgement

**Inspiration**

GTAWeb.eu: https://gtaweb.eu/gtao-map/ls/

[獨立巴士預報 HK Bus ETA](https://hkbus.app) : https://github.com/hkbus/hk-independent-bus-eta

**UI Design**

リアルタイム地震ビューアー Scratch Realtime Earthquake Viewer: https://kotoho7.github.io/scratch-realtime-earthquake-viewer-page/

**Map**

Common Spatial Data Infrastructure: https://portal.csdi.gov.hk/csdi-webpage/

Lands Department (HK): https://www.landsd.gov.hk/en/index.html
