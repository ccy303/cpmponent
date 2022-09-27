import React from "react";
import ReactDOM from "react-dom";
import App from "@compoments/app";
import AppConfigProvider from "@compoments/appProvider/index.js";
import appConfig from "@src/appconfig.js";
ReactDOM.render(
    <AppConfigProvider {...appConfig}>
        <App />
    </AppConfigProvider>,
    document.getElementById("root")
);
