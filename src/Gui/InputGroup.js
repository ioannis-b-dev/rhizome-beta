import React, { useState } from "react";

const InputGroup = ({ children, name }) => {
    const [toggleGroup, setToggleGroup] = useState(false);
    return (
        <div className="params-group">
            <div className="header">
                <h4>{name}</h4>
                <svg
                    width={40}
                    height={18}
                    onClick={() => setToggleGroup(!toggleGroup)}
                >
                    <rect width={40} height={20} fill="black"></rect>
                    <rect
                        width={20}
                        height={6}
                        transform={`translate(10,6)`}
                        fill="rgb(104, 177, 20)"
                    ></rect>
                </svg>
            </div>
            {toggleGroup && children}
        </div>
    );
};

export default InputGroup;
