import React, { useState } from "react";
import "./loader.scss";
import { arc } from "d3";
import { useEffect, useRef } from "react";
const Loader = ({ x, y }) => {
    const spacing = 10;
    const radius = 40;
    const [offset, setOffset] = useState(0);
    const requestRef = useRef();
    const previousTimeRef = useRef();

    const animate = (time) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;

            // Pass on a function to the setter of the state
            // to make sure we always have the latest state
            setOffset((prevCount) => (prevCount + deltaTime * 0.005) % 100);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once

    const loaderArc = arc()
        .innerRadius(radius - spacing)
        .outerRadius(radius)
        .startAngle(offset)
        .endAngle(offset + Math.PI / 2);

    return (
        <svg className="loader">
            <g transform={`translate(${x},${y})`}>
                <circle stroke="white " r={radius} fill="none"></circle>
                <path d={loaderArc()}></path>
                <g transform={`translate(${0},${0})`}>
                    <text>Loading</text>
                </g>
            </g>
        </svg>
    );
};

export default Loader;
