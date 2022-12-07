import { useState, useEffect } from "react";

const useScreenSize = (navRef) => {
    const MOBILE_BREAKING_POINT = 500;

    const [isMobileView, setIsMobileView] = useState(false);
    const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
    const getScreenSize = () => {
        setIsMobileView(
            window.innerWidth < MOBILE_BREAKING_POINT ? true : false
        );
        setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Viewport
    useEffect(() => {
        getScreenSize();
        window.addEventListener("resize", getScreenSize);
        return () => window.removeEventListener("resize", getScreenSize);
    }, []);

    return {
        isMobileView,
        screenSize,
    };
};

export default useScreenSize;
