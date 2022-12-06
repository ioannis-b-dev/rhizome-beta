import React, { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "../helpers/useDimensions";
import { MenuToggle } from "./MenuToggle";
import { Gui } from "./Gui";
import "./styles.scss";

const sidebar = {
    open: (height = 1000) => ({
        clipPath: `circle(${height * 2 + 200}px at 0% 0%)`,
        transition: {
            type: "spring",
            stiffness: 20,
            restDelta: 2,
        },
    }),
    closed: (height = 1000, width = 350) => ({
        clipPath: `inset(10px 10px ${height * 0.7}px 10px)`,
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    }),
};
export const Example = () => {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height, width } = useDimensions(containerRef);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={{ height, width }}
            ref={containerRef}
            className="panel"
        >
            <motion.div className="background" variants={sidebar} />
            <Gui />
            <MenuToggle toggle={() => toggleOpen()} />
            <h1 className="panel-header">PARAMETERS</h1>
        </motion.nav>
    );
};
