import React, { useState, useContext, useEffect, useCallback } from "react";
import { getParentData, getChildrenData } from "./wikiAPI";
import { dataToVis } from "./dataToVis";
const ParamsContext = React.createContext();
const ParamsProvider = ({ children }) => {
    // DATA
    const [searchParameters, setSearchParameters] = useState({
        origin: "god",
        numLinks: 5,
        iterations: 1,
    });
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [searchWiki, setSearchWiki] = useState(null);
    const getData = useCallback(async () => {
        setLoading(true);
        setData(null);
        try {
            let simulationData = {};
            //FIRST ITERATION
            let parentData;
            let childrenData;
            parentData = await getParentData(searchWiki.origin);
            parentData = { ...parentData, isParent: true };

            childrenData = await getChildrenData(
                searchWiki.origin,
                searchWiki.numLinks
            );

            if (childrenData) {
                simulationData = dataToVis({ parentData, childrenData });

                //SECOND ITERATION
                for (let i = 0; i < childrenData.length; i++) {
                    parentData = childrenData[i];
                    const newChildrenData = await getChildrenData(
                        parentData.id,
                        2
                    );
                    // console.log("PARENT:", parentData);
                    // console.log("CHILDREN:", newChildrenData);
                    const { nodes, links } = dataToVis({
                        parentData,
                        childrenData: newChildrenData,
                    });
                    simulationData.nodes.push(...nodes);
                    simulationData.links.push(...links);
                }
                setData(simulationData);
            } else {
                setData(null);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }, [searchWiki]);
    useEffect(() => {
        if (searchWiki) getData();
    }, [searchWiki, getData]);
    //FORCE GRAPH
    const [physicsParameters, setPhysicsParameters] = useState({
        gravitation: 100,
        repulsion: 13,
        spring: 20,
    });
    const [renderParameters, setRenderParameters] = useState({
        showTitles: false,
    });
    return (
        <ParamsContext.Provider
            value={{
                loading,
                data,
                searchWiki,
                setSearchWiki,
                searchParameters,
                physicsParameters,
                renderParameters,
                setSearchParameters,
                setPhysicsParameters,
                setRenderParameters,
            }}
        >
            {children}
        </ParamsContext.Provider>
    );
};

export const useParameters = () => {
    return useContext(ParamsContext);
};

export { ParamsContext, ParamsProvider };
