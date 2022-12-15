import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../helpers/context";
import "./Console.scss";
const Console = () => {
    const [messageList, setMessageList] = useState([]);
    const [showConsole, setShowConsole] = useState(false);
    const { currentMessage } = useGlobalContext();

    useEffect(() => {
        if (currentMessage !== "") {
            setMessageList((prevlist) => [...prevlist, currentMessage]);
        }
    }, [currentMessage]);

    return (
        <div className="console">
            <div className="console-header">
                <button
                    className="btn btn-show"
                    onClick={() => setShowConsole(!showConsole)}
                >
                    {showConsole ? "hide" : "show"}
                </button>
                <h3>Console</h3>

                <button
                    className="btn btn-clear"
                    onClick={() => setMessageList([])}
                >
                    Clear
                </button>
            </div>

            {showConsole && (
                <div className="console-body">
                    {messageList.map((message) => {
                        return <p>{message}</p>;
                    })}
                </div>
            )}
        </div>
    );
};

export default Console;
