import React from "react";
import { motion } from "framer-motion";

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
};

export const GuiSlider = ({ label, name, value, range, onChange }) => {
    const style = { border: `2px solid rgb(46, 46, 46)` };
    return (
        <motion.div
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="menu-item"
        >
            <div className="text">{label}</div>
            <input
                className="text-placeholder slider"
                style={style}
                type="range"
                min={range[0]}
                max={range[1]}
                value={value}
                name={name}
                onChange={onChange}
            />
            <div className="value" style={style}>
                {value}
            </div>
        </motion.div>
    );
};
