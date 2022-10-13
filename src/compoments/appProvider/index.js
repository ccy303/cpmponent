import React from "react";
import { AppContext } from "./appContext";
import zhCN from "antd/lib/locale/zh_CN";
import { ConfigProvider as AntdConfigProvider } from "@compoments/antd";

const antdDefaultConfig = {
    prefixCls: "linkfin",
    locale: zhCN
};

AntdConfigProvider.config({
    prefixCls: "linkfin"
});

export default ({ children, antdConfig, ...other }) => {
    return (
        <AntdConfigProvider {...{ ...antdDefaultConfig, ...antdConfig }}>
            <AppContext.Provider value={{ ...other }}>{children}</AppContext.Provider>
        </AntdConfigProvider>
    );
};
