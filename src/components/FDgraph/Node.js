import React, { useState } from "react";
import { useGlobalContext } from "../../helpers/context";
const Node = ({ x, y, size, title, isParent }) => {
    const { renderParameters: showAllTitles } = useGlobalContext();
    const [showTitle, setshowTitle] = useState(false);
    const parentSize = (nodeSize) => {
        return nodeSize * 1.5;
    };
    return (
        <g
            className={`node ${isParent && "parent"}`}
            transform={`translate(${x},${y})`}
            onMouseEnter={() => setshowTitle(true)}
            onMouseLeave={() => setshowTitle(false)}
        >
            <circle
                cx={0}
                cy={0}
                r={!isParent ? size : parentSize(size)}
                onClick={() => console.log(title)}
            />
            {(showTitle || isParent || showAllTitles) && (
                <text transform={`translate(${size + 5},0)`}>{title}</text>
            )}
        </g>
    );
};

export default Node;
// nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
//   nodeGroup, // given d in nodes, returns an (ordinal) value for color
//   nodeGroups, // an array of ordinal values representing the node groups
//   nodeTitle, // given d in nodes, a title string
//   nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
//   nodeStroke = "#fff", // node stroke color
//   nodeStrokeWidth = 1.5, // node stroke width, in pixels
//   nodeStrokeOpacity = 1, // node stroke opacity
//   nodeRadius = 5, // node radius, in pixels
//   nodeStrength,
