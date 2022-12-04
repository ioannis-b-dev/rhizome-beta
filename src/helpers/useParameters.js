import React, { useState, useContext } from "react";
const ParamsContext = React.createContext();
const ParamsProvider = () => {
    const [searchParams, setSearchParams] = useState({
        origin: "god",
        numLinks: 5,
        iterations: 1,
    });
    const [physicsParams, setPhysicsParams] = useState({
        gravitation: 100,
        repulsion: 13,
        spring: 20,
    });
    const [renderParams, setRenderParams] = useState({
        showTitles: false,
    });
    return (
        <ParamsContext.Provider
            value={{
                searchParams,
                physicsParams,
                renderParams,
                setSearchParams,
                setPhysicsParams,
                setRenderParams,
            }}
        ></ParamsContext.Provider>
    );
};

export const useParameters = () => {
    return useContext(ParamsContext);
};

export { ParamsContext, ParamsProvider };
