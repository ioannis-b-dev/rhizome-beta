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

export const TestInputText = ({ name, value, onChange }) => {
    const style = { border: `2px solid rgb(46, 46, 46)` };
    return (
        <motion.li
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="menu-item"
        >
            <input
                className="inputtext"
                type="text"
                name={name}
                value={value}
                placeholder="Point of origin"
                onChange={onChange}
            />
        </motion.li>
    );
};
