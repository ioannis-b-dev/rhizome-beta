import React, { useEffect } from "react";

import {
    forceSimulation,
    forceManyBody,
    forceLink,
    forceCenter,
} from "d3-force";
import { map } from "d3";
import Node from "./Node";
import Spring from "./Spring";

import "./styles.scss";

function intern(value) {
    return value !== null && typeof value === "object"
        ? value.valueOf()
        : value;
}

const FDgraph = ({ data, width, height, bgColor }) => {
    const centerX = width / 2;
    const centerY = height / 2;

    const N = map(data.nodes, (d) => d.id).map(intern);
    const LS = map(data.links, (d) => d.source).map(intern);
    const LT = map(data.links, (d) => d.target).map(intern);

    const nodes = map(data.nodes, (_, i) => ({ id: N[i] }));
    const links = map(data.links, (_, i) => ({ source: LS[i], target: LT[i] }));

    const repulsionStr = 3;
    const springStr = 1;
    const repulsionForce = forceManyBody().strength(repulsionStr);
    const springForce = forceLink(links)
        .id(({ index: i }) => N[i])
        .strength(springStr);

    const simulation = forceSimulation(nodes)
        .force("charge", repulsionForce)
        .force("link", springForce)
        .force("center", forceCenter());

    useEffect(() => {}, [simulation]);
    return (
        <svg
            className="fdGraph debug"
            width={width}
            height={height}
            fill={bgColor}
        >
            <g transform={`translate(${centerX},${centerY})`}>
                {console.log(data)}
                {/* RENDER THE NODES */}
                {nodes.map((node) => {
                    return (
                        <Node
                            key={node.id}
                            x={node.x}
                            y={node.y}
                            size={10}
                            title={node.id}
                            isParent={node.index === 0}
                        />
                    );
                })}
                {/* RENDER THE SPRINGS */}
                {links.map((link) => {
                    return (
                        <Spring
                            x1={link.source.x}
                            y1={link.source.y}
                            x2={link.target.x}
                            y2={link.target.y}
                        />
                    );
                })}
            </g>
        </svg>
    );
};

export default FDgraph;
