import { Button } from "@nextui-org/react";
import { NextPage } from "next";
import { useEffect } from "react";

const Index: NextPage = () => {
  var info = {
    timeOpened: new Date(),
    timezone: new Date().getTimezoneOffset() / 60,
    previousSites() {
      return history.length;
    },

    browserName() {
      return navigator.appName;
    },
    browserEngine() {
      return navigator.product;
    },
    browserVersion1a() {
      return navigator.appVersion;
    },
    browserVersion1b() {
      return navigator.userAgent;
    },
    browserLanguage() {
      return navigator.language;
    },
    browserOnline() {
      return navigator.onLine;
    },
    browserPlatform() {
      return navigator.platform;
    },
    javaEnabled() {
      return navigator.javaEnabled();
    },
    dataCookiesEnabled() {
      return navigator.cookieEnabled;
    },
    dataCookies1() {
      return document.cookie;
    },
    // dataCookies2() {
    //   return decodeURIComponent(document.cookie.split(";"));
    // },
    dataStorage() {
      return localStorage;
    },

    sizeScreenW() {
      return screen.width;
    },
    sizeScreenH() {
      return screen.height;
    },
    sizeInW() {
      return innerWidth;
    },
    sizeInH() {
      return innerHeight;
    },
    sizeAvailW() {
      return screen.availWidth;
    },
    sizeAvailH() {
      return screen.availHeight;
    },
    scrColorDepth() {
      return screen.colorDepth;
    },
    scrPixelDepth() {
      return screen.pixelDepth;
    },
  };
  useEffect(() => {
    console.log("info.timeOpened => ", info.timeOpened);
    console.log("info.timezone => ", info.timezone);
    console.log("info.previousSites() => ", info.previousSites());
    console.log("info.browserName() => ", info.browserName());
    console.log("info.browserEngine() =>", info.browserEngine());
    console.log("info.browserVersion1a() =>", info.browserVersion1a());
    console.log("info.browserVersion1b() =>", info.browserVersion1b());
    console.log("info.browserLanguage() =>", info.browserLanguage());
    console.log("info.browserOnline() =>", info.browserOnline());
    console.log("info.browserPlatform() =>", info.browserPlatform());
    console.log("info.javaEnabled() =>", info.javaEnabled());
    console.log("info.dataCookiesEnabled() =>", info.dataCookiesEnabled());
    console.log("info.dataCookies1() =>", info.dataCookies1());
    // console.log("info.dataCookies2() =>",);
    console.log("info.dataStorage() =>", info.dataStorage());
    console.log("info.sizeScreenW() =>", info.sizeScreenW());
    console.log("info.sizeScreenH() =>", info.sizeScreenH());
    console.log("info.sizeInW() =>", info.sizeInW());
    console.log("info.sizeInH() =>", info.sizeInH());
    console.log("info.sizeAvailW() =>", info.sizeAvailW());
    console.log("info.sizeAvailH() =>", info.sizeAvailH());
    console.log("info.scrColorDepth() =>", info.scrColorDepth());
    console.log("info.scrPixelDepth() =>", info.scrPixelDepth());
  }, []);

  return (
    <>
      <Button>Click me</Button>
    </>
  );
};

export default Index;
