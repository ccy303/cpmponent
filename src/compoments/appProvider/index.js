import React from "react";
import { AppContext } from "./appContext";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider as antdConfigProvider } from "@src/index.js";

const antdDefaultConfig = {
    prefixCls: "linkfin",
    locale: zhCN
};

antdConfigProvider.config({
    prefixCls: "linkfin"
});

export default ({ children, antd, ...other }) => {
    return (
        <antdConfigProvider {...{ ...antdDefaultConfig, ...antd }}>
            <AppContext.Provider value={{ ...other }}>{children}</AppContext.Provider>
        </antdConfigProvider>
    );
};
