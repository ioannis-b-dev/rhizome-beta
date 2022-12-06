import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.scss";
import App from "./App";
import { AppProvider } from "./helpers/context";
import { ParamsProvider } from "./helpers/useParameters";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AppProvider>
        <ParamsProvider>
            <App />
        </ParamsProvider>
    </AppProvider>
);
