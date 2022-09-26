import React from "react";
import ReactDOM from "react-dom";
import { ConfigProvider } from "./index.js";
import zhCN from "antd/lib/locale/zh_CN";
import App from "@compoments/app";
import AppConfigProvider from "@compoments/appProvider";
// ConfigProvider.config({
//     prefixCls: "linkfin"
// });

console.log(ConfigProvider);

ReactDOM.render(
    // <AppConfigProvider
    //     antdcdonfig={{
    //         locale: zhCN,
    //         prefixCls: "linkfin"
    //     }}
    // >
    <App />,
    // </AppConfigProvider>
    document.getElementById("root")
);
