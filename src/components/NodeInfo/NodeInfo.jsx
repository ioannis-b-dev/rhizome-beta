import React from "react";
import "./NodeInfo.scss";
const NodeInfo = ({ info, posX, posY }) => {
    return (
        <div className="nodeinfo" style={{ left: posX, top: posY }}>
            <div className="title">Title</div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
                explicabo minima sit, incidunt architecto necessitatibus optio
                fugiat ex molestias eos, minus consectetur voluptatum. A officia
                veritatis earum qui quasi unde?
            </p>
            <a
                href="https://en.wikipedia.org/wiki/Main_Page"
                target="_blank"
                rel="noreferrer"
            >
                {" "}
                read more &#8594;
            </a>
        </div>
    );
};

export default NodeInfo;
