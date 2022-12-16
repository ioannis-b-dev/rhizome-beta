import React, { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../helpers/useDimensions";
import { MenuToggle } from "./MenuToggle";
import { Gui } from "./Gui";
import "./styles.scss";
import useScreenSize from "../helpers/useScreenSize";
const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 0% 0%)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
        height: "100%",
    }),
    closed: (height = 1000, width = 350) => ({
        clipPath: `circle(20px at 88.5% 32.5px)`,
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
        height: "60px",
    }),
};
export const Panel = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height, width } = useDimensions(containerRef);
    const { isMobileView } = useScreenSize();
    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={{ height, width }}
            ref={containerRef}
            className={`panel ${isOpen ? "open" : "closed"}`}
        >
            <motion.div className="background" variants={sidebar} />
            <Gui closePanel={() => toggleOpen(false)} />
            <MenuToggle toggle={() => toggleOpen()} />
            {!isMobileView && (
                <h1
                    className={`panel-header ${
                        isOpen ? "text-dark" : "text-white"
                    }`}
                >
                    PARAMETERS
                </h1>
            )}
        </motion.nav>
    );
};
