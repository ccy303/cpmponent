import { useContext } from "react";
import { AppContext } from "@compoments/appProvider/appContext";
import { message } from "@compoments/antd";
import axios from "axios";

export const useAxios = cfg => {
    const { httpCfg } = useContext(AppContext);
    const _axios = axios.create(httpCfg?.axiosCfg || {});
    // 请求拦截
    _axios.interceptors.request.use(config => {
        if (config.method.toLocaleLowerCase() === "get") {
            !config.params && (config.params = {});
            config.params._t = new Date().getTime();
        }
        return config;
    });

    // 响应拦截
    _axios.interceptors.response.use(
        response => httpCfg.responseIntercept(response),
        err => {
            const { config } = err.response;
            !config?.headers?.["NO-E-MSG"] && message.error(httpCfg.formatErrMsg(err));
            httpCfg.httpOnReject?.(err);
            return Promise.reject(err);
        }
    );

    return _axios;
};
