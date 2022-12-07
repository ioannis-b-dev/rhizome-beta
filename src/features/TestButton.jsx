import React from "react";
import { motion } from "framer-motion";

const variants = {
    open: {
        y: 0,
        opacity: 1,
        pointerEvents: "auto",
        cursor: "pointer",
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        pointerEvents: "none",
        cursor: "default",
        transition: {
            y: { stiffness: 1000 },
        },
    },
};

export const TestButton = ({ handleSubmit }) => {
    return (
        <motion.li
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="menu-item buttonmenu"
            onClick={handleSubmit}
            style={{ border: "none" }}
        >
            <div className="button-placeholder">Search</div>
        </motion.li>
    );
};
