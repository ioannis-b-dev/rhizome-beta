import React, { useState, useContext, useEffect, useCallback } from "react";
import { getParentData, getChildrenData } from "./wikiAPI";
import { dataToVis } from "./dataToVis";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [searchWiki, setSearchWiki] = useState(null);
    const [renderParameters, setRenderParameters] = useState({
        showAllTitles: false,
    });
    const [forceParameters, setForceParameters] = useState({});
    const [apiParameters, setApiParameters] = useState({});
    const [data, setData] = useState(null);
    const [currentMessage, setCurrentMessage] = useState("");

    const getData = useCallback(async () => {
        setLoading(true);
        setData(null);
        setCurrentMessage("began searching the Wikipedia API...");

        try {
            let simulationData = {};
            //FIRST ITERATION
            let parentData;
            let childrenData;
            setCurrentMessage(`fetching data for ${searchWiki.origin}...`);
            parentData = await getParentData(searchWiki.origin);
            parentData = { ...parentData, isParent: true };
            setCurrentMessage(`data received for ${searchWiki.origin}...`);
            setCurrentMessage(
                `fetching data for all children connected to ${searchWiki.origin}...`
            );
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
                    const { nodes, links } = dataToVis({
                        parentData,
                        childrenData: newChildrenData,
                    });
                    simulationData.nodes.push(...nodes);
                    simulationData.links.push(...links);
                }
                console.log(simulationData);
                setData(simulationData);
                setCurrentMessage("found all children");
            } else {
                setData(null);
            }

            setLoading(false);
        } catch (error) {
            setCurrentMessage(
                "there was an error with your request please try again"
            );
            setLoading(false);
        }
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
                currentMessage,
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
