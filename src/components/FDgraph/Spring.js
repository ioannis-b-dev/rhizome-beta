import React from "react";

const Spring = ({ x1, y1, x2, y2 }) => {
    return <line x1={x1} y1={y1} x2={x2} y2={y2} className="spring" />;
};

export default Spring;

// linkSource = ({source}) => source, // given d in links, returns a node identifier string
//   linkTarget = ({target}) => target, // given d in links, returns a node identifier string
//   linkStroke = "#999", // link stroke color
//   linkStrokeOpacity = 0.6, // link stroke opacity
//   linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
//   linkStrokeLinecap = "round", // link stroke linecap
//   linkStrength
