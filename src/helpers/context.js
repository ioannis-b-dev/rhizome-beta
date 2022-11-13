import React, { useState, useContext, useEffect, useCallback } from "react";
import { getParentData, getChildrenData } from "./wikiAPI";
import { dataToVis } from "./dataToVis";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [searchWiki, setSearchWiki] = useState();
    const [renderParameters, setRenderParameters] = useState({
        showAllTitles: false,
    });
    const [forceParameters, setForceParameters] = useState({});
    const [apiParameters, setApiParameters] = useState({});
    const [data, setData] = useState(null);
    const getData = useCallback(async () => {
        setLoading(true);
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

        simulationData = dataToVis({ parentData, childrenData });

        // simulationData = await recursiveData(parentData, 2, simulationData);

        //SECOND ITERATION
        for (let i = 0; i < childrenData.length; i++) {
            parentData = childrenData[i];
            const newChildrenData = await getChildrenData(parentData.id, 2);
            console.log("PARENT:", parentData);
            console.log("CHILDREN:", newChildrenData);
            const { nodes, links } = dataToVis({
                parentData,
                childrenData: newChildrenData,
            });
            simulationData.nodes.push(...nodes);
            simulationData.links.push(...links);
        }

        //SENDING DATA FOR SIMULATION
        setData(simulationData);
        setLoading(false);
    }, [searchWiki]);

    useEffect(() => {
        if (searchWiki) getData();
    }, [searchWiki, getData]);
    return (
        <AppContext.Provider
            value={{
                loading,
                data,
                searchWiki,
                setSearchWiki,
                renderParameters,
                setRenderParameters,
                forceParameters,
                setForceParameters,
                apiParameters,
                setApiParameters,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };
