import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../helpers/context";
import { motion } from "framer-motion";
import { GuiSlider } from "./GuiSlider";
import { TestButton } from "./TestButton";
import { TestInputText } from "./TestInputText";
import { TestCheckbox } from "./TestCheckbox";
const variants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

export const Gui = () => {
    const { setSearchWiki, setRenderParameters, setForceParameters } =
        useGlobalContext();
    const [parameters, setParameters] = useState({
        origin: "god",
        numLinks: 5,
        iterations: 1,
        gravitation: 100,
        repulsion: 13,
        spring: 20,
        showTitles: false,
    });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setParameters((prev) => {
            return { ...prev, [name]: type === "checkbox" ? checked : value };
        });
    };
    const updateParameters = () => {
        const { showTitles, gravitation, repulsion, spring } = parameters;
        setRenderParameters(showTitles);
        setForceParameters({
            ATTR_STRENGTH: repulsion,
            CENTERG_STRENTH: gravitation,
            SPRING_DIST: spring,
        });
    };
    useEffect(() => {
        updateParameters();
    }, [parameters]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { origin, numLinks, iterations } = parameters;
        setSearchWiki({
            origin,
            numLinks,
            iterations,
        });
    };
    return (
        <motion.ul variants={variants} className="menu">
            <h2>Data</h2>
            <GuiSlider
                label="iterations"
                name="iterations"
                value={parameters.iterations}
                range={[1, 2]}
                onChange={handleChange}
            />
            <GuiSlider
                label="numLinks"
                name="numLinks"
                value={parameters.numLinks}
                range={[1, 20]}
                onChange={handleChange}
            />
            <TestInputText
                name="origin"
                value={parameters.origin}
                onChange={handleChange}
            />
            <TestButton handleSubmit={handleSubmit} />
            <h2>Forces</h2>
            <GuiSlider
                label="gravity"
                name="gravitation"
                value={parameters.gravitation}
                range={[0, 100]}
                onChange={handleChange}
            />
            <GuiSlider
                label="repulsion"
                name="repulsion"
                value={parameters.repulsion}
                range={[0, 100]}
                onChange={handleChange}
            />
            <GuiSlider
                label="spring"
                name="spring"
                value={parameters.spring}
                range={[0, 100]}
                onChange={handleChange}
            />
            <h2>Render</h2>
            <TestCheckbox
                label="Show Titles"
                name="showTitles"
                checked={parameters.showTitles}
                onChange={handleChange}
            />
            {console.log(parameters)}
        </motion.ul>
    );
};
