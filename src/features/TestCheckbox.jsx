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

export const TestCheckbox = ({ label, checked, name, onChange }) => {
    const style = {
        border: `2px solid rgb(46, 46, 46)`,
        backgroundColor: "black",
    };
    return (
        <motion.li
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="menu-item  checkbox"
        >
            <div className="text">{label}</div>
            <input
                className="icon-placeholder"
                type="checkbox"
                checked={checked}
                name={name}
                onChange={onChange}
            />
        </motion.li>
    );
};
