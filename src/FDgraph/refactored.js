import React, { useState } from "react";
import { scaleLinear, scaleSqrt, max } from "d3";
import { forceSimulation } from "d3-force";
import Node from "./Node";
import Spring from "./Spring";
import useWiki from "../hooks/useWiki";
import "./styles.scss";
const FDgraph = ({ width, height, bgColor }) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const data = useWiki();

    if (!data) return <div> Loading...</div>;

    //===========================//
    //======FORCE SIMULATION=====//
    //===========================//
    //const simulation = forceSimulation(data);
    //===========================//
    //move them to new file
    const mapTextSize = scaleLinear()
        .domain([0, max(data, (d) => d.length)])
        .range([10, 50]);

    const textSizeToRadius = scaleSqrt()
        .domain([0, max(data, (d) => d.length)])
        .range([50, height / 2]);

    const scaleRadians = scaleLinear()
        .domain([0, data.length])
        .range([0, Math.PI * 2]);
    //===========================//
    return (
        <svg
            className="fdGraph debug"
            width={width}
            height={height}
            fill={bgColor}
        >
            <g transform={`translate(${centerX},${centerY})`}>
                {data.map((node, index) => {
                    return (
                        <>
                            <Spring
                                x1={0}
                                y1={0}
                                x2={
                                    textSizeToRadius(node.length) *
                                    Math.cos(scaleRadians(index))
                                }
                                y2={
                                    textSizeToRadius(node.length) *
                                    Math.sin(scaleRadians(index))
                                }
                            />
                            <Node
                                x={
                                    textSizeToRadius(node.length) *
                                    Math.cos(scaleRadians(index))
                                }
                                y={
                                    textSizeToRadius(node.length) *
                                    Math.sin(scaleRadians(index))
                                }
                                size={mapTextSize(node.length)}
                                title={node.title}
                            />
                        </>
                    );
                })}
                <Node x={0} y={0} size={10} title={"god"} isParent={true} />
            </g>
        </svg>
    );
};

export default FDgraph;

const params = {
    titles: searchWiki.origin,
    generator: "links",
    prop: "info|pageprops|pageterms",
    inprop: "watchers|associatedpage|url",
    wbptterms: "alias|description",
    gpllimit: searchWiki.numLinks,
};

const response = await axios.get(BASE_URL, { params });
const linksData = Object.values(response.data.query.pages);

const parsedLinksData = {
    nodes: [
        { id: searchWiki.origin, pageid: 0, isParent: true },
        ...linksData.map((d) => {
            return {
                id: d.title,
                pageid: d.pageid,
                url: d.fullurl,
                textLength: d.length,
                pageViews: d.watchers,
                alias: d.alias,
                desc: d.description,
                wikiDesc: d.wikiDesc,
                isParent: false,
            };
        }),
    ],
    links: linksData.map((d) => {
        return { source: searchWiki.origin, target: d.title };
    }),
};
console.log("DATA STAGE: 2", parsedLinksData);
