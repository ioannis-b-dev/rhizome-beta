import "./styles.scss";
import { map, scaleLinear } from "d3";
import { useEffect, useState } from "react";
import {
    forceSimulation,
    forceManyBody,
    forceLink,
    forceCenter,
} from "d3-force";
import { useGlobalContext } from "../helpers/context";
import Node from "./Node";
import Spring from "./Spring";
//scale contants
const NODE_SIZE = 12;

const remap = (value, min, max) => {
    const map_to_percent = scaleLinear().domain([0, 100]).range([min, max]);
    return map_to_percent(value);
};

//RE-RENDERS WHEN FORCE PARAMETERS CHANGE
function ForceGraph({ nodes, links, N }) {
    const [animatedNodes, setAnimatedNodes] = useState([]);
    const [animatedLinks, setAnimatedLinks] = useState([]);
    const { forceParameters } = useGlobalContext();
    const { ATTR_STRENGTH, CENTERG_STRENTH, SPRING_DIST } = forceParameters;
    // re-create animation every time nodes change
    useEffect(() => {
        const simulation = forceSimulation(nodes)
            .force(
                "charge",
                forceManyBody().strength(remap(ATTR_STRENGTH, 0, -300))
            )
            .force(
                "center",
                forceCenter().strength(remap(CENTERG_STRENTH, 0, 1))
            )
            .force(
                "link",
                forceLink(links)
                    .id(({ index: i }) => N[i])
                    .distance(remap(SPRING_DIST, 0, 300))
            );

        // update state on every frame
        simulation.on("tick", () => {
            setAnimatedNodes([...simulation.nodes()]);
            const linksXY = links.map((link) => {
                const {
                    source: { x: x1, y: y1 },
                    target: { x: x2, y: y2 },
                } = link;
                return { x1, y1, x2, y2 };
            });
            setAnimatedLinks([...linksXY]);
        });
        // slow down with a small alpha
        simulation.alpha(1).restart();
        // stop simulation on unmount
        return () => simulation.stop();
    }, [nodes, forceParameters]);

    return (
        <>
            {animatedLinks.map((link, index) => (
                <Spring
                    key={index}
                    x1={link.x1}
                    y1={link.y1}
                    x2={link.x2}
                    y2={link.y2}
                />
            ))}
            {animatedNodes.map((node, index) => (
                <Node
                    x={node.x}
                    y={node.y}
                    size={NODE_SIZE}
                    key={node.id + index}
                    title={node.id}
                    isParent={node.isParent}
                />
            ))}
        </>
    );
}
//RE RENDERS WHEN DATA CHANGE
export default function FDgraph({ data, width, height, bgColor }) {
    // create nodes with unique ids
    // radius: 5px
    const centerX = width / 2;
    const centerY = height / 2;

    const N = map(data.nodes, (d) => d.id).map(intern);
    const nodes = data.nodes;
    const links = data.links;

    return (
        <g
            className="forceGraph"
            transform={`translate(${centerX},${centerY})`}
        >
            <ForceGraph nodes={nodes} links={links} N={N} />
        </g>
    );
}

function intern(value) {
    return value !== null && typeof value === "object"
        ? value.valueOf()
        : value;
}
