import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../helpers/context";
import InputSlider from "./InputSlider";
import InputText from "./InputText";
import InputGroup from "./InputGroup";
import InputCheckbox from "./InputCheckbox";
import "./styles.scss";
const Gui = () => {
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

    const [guiPos, setGuiPos] = useState({
        x: 0,
        y: 0,
    });
    const [showGui, setShowGui] = useState(false);
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
        <div
            className="gui"
            style={{ transform: `translate(${guiPos.x}px,${guiPos.y}px)` }}
        >
            <div className="gui-toggle">
                <svg
                    width={20}
                    height={40}
                    onClick={() => setShowGui(!showGui)}
                >
                    <rect width={20} height={40} fill="green" />
                </svg>
            </div>
            {showGui && (
                <form className="params">
                    <InputGroup name="DATA">
                        <InputSlider
                            name="iterations"
                            label="ITERATIONS"
                            value={parameters.iterations}
                            min={1}
                            max={2}
                            onChange={handleChange}
                        />
                        <InputSlider
                            name="numLinks"
                            label="LINKS PER ITERATION"
                            value={parameters.numLinks}
                            min={1}
                            max={20}
                            onChange={handleChange}
                        />
                        <InputText
                            label="ORIGIN"
                            name="origin"
                            value={parameters.origin}
                            onChange={handleChange}
                        ></InputText>
                        <button className="button mt-1" onClick={handleSubmit}>
                            SEARCH
                        </button>
                    </InputGroup>
                    <InputGroup name="FORCES">
                        <InputSlider
                            name="gravitation"
                            label="CENTER GRAVITY"
                            value={parameters.gravitation}
                            min={0}
                            max={100}
                            onChange={handleChange}
                        />
                        <InputSlider
                            name="repulsion"
                            label="REPULSION"
                            value={parameters.repulsion}
                            min={0}
                            max={100}
                            onChange={handleChange}
                        />
                        <InputSlider
                            name="spring"
                            label="SPRING"
                            value={parameters.spring}
                            min={0}
                            max={100}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup name="RENDER">
                        <InputCheckbox
                            name="showTitles"
                            label="SHOW TITLES"
                            checked={parameters.showTitles}
                            onChange={handleChange}
                        />
                    </InputGroup>
                </form>
            )}
        </div>
    );
};

export default Gui;
