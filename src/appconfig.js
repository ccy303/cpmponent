import React from "react";
import { NoAuth, Load, CLayout } from "@src/index.js";
export default {
    rootPath: "/home", // 跟路由
    sliderTheme: "dark", // 侧边菜单主题
    // 框架会自动抛出错误信息和message提示，不会处理成功提示，http请求定义时，通过 header 设置 NO-E-MSG：true/false 配置是否由框架提示错误信息
    httpCfg: {
        axiosCfg: {}, // axios 配置
        // http 请求响应拦截
        responseIntercept: response => {
            const { data, headers } = response;
            return response.headers["x-total-count"]
                ? { data: data, total: headers["x-total-count"] }
                : data;
        },
        // http 请求抛出异常之前前执行,不支持异步函数
        httpOnReject: err => {},
        // 设置全局错误提示
        formatErrMsg: err => {
            const { status, data } = err.response;
            if (status == "404") {
                return "接口不存在";
            }
            return data.message;
        }
    },
    // antd 配置
    antdConfig: {},
    // 获取用户信息方式
    getUserFun: async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    userInfo: { phone: "phone****" },
                    auth: ["auth1", "auth2", "auth3"]
                });
                // reject("err");
            }, 1000);
        });
    },
    // 用户信息获取失败回调，配置此函数后将不会执行框架自带错误处理函数，用户需自己处理后续异常，err:错误信息
    // getUserFunErr: err => {},
    // 应用获取过用户信息后，渲染页面前执行，用于设置全局共享数据,全局共享数据会注入到页面组件的props中的gStore.g_customData中，args用户数据 return { ...自定义全局数据 }
    appWillMount: async args => {},
    // App header
    header: {
        logo: require("@assets/logo_dx.png"),
        // logo: (
        //     <a href='/'>
        //         <img src={require("@images/logo_dx.png")} />
        //     </a>
        // ),
        // appTitle: "金服管理后台脚手架3.0",
        appTitle: <span>金服管理后台脚手架3.0</span>,
        userInfoDataIndex: "phone", // 展示数据字段,不存在显示 -
        // userInfoDom: props => {}, // 自定义用户信息渲染，不可和userInfoDataIndex公用，props含全部数据
        logoutFun: props => {} // 登出函数props含全部数据
    },
    // 路由列表
    routes: [
        {
            path: "/login",
            title: "登录",
            menu: false,
            component: Load(() => import("./pages/page1"))
        },
        {
            path: "/home",
            title: "一级路由",
            menu: false,
            component: Load(() => import("./pages/page2"))
        },
        {
            title: "工作台",
            menu: false,
            path: "/admin",
            logined: true,
            layout: CLayout,
            breadcrumb: false,
            children: [
                {
                    path: "/one",
                    title: "一级路由",
                    menu: true,
                    logined: true,
                    component: Load(() => import("./pages/page3")),
                    breadcrumb: [
                        {
                            path: "",
                            title: "空连接"
                        },
                        {
                            path: "http://www.baidu.com",
                            title: "禁用链接"
                        },
                        {
                            path: "http://www.baidu.com",
                            title: "外部链接-百度(新窗口打开)",
                            target: "_block"
                        },
                        {
                            path: "http://www.douyu.com",
                            title: "外部链接-斗鱼"
                        },
                        {
                            path: "/home",
                            title: "内部链接"
                        }
                    ]
                },
                {
                    title: "二级路由集合",
                    menu: true,
                    path: "/singlePage",
                    logined: true,
                    children: [
                        {
                            path: "/page1",
                            title: "form表单",
                            menu: true,
                            component: Load(() => import("./pages/page4"))
                        },
                        {
                            path: "/page2",
                            title: "图片",
                            menu: true,
                            component: Load(() => import("./pages/page1"))
                        }
                    ]
                },
                {
                    path: "/multistage",
                    title: "三级路由集合",
                    menu: true,
                    logined: true,
                    children: [
                        {
                            path: "/page",
                            title: "二级路由",
                            menu: true,
                            children: [
                                {
                                    path: "/page1",
                                    title: "三级路由",
                                    menu: true,
                                    component: Load(() => import("./pages/page2"))
                                }
                            ]
                        }
                    ]
                },
                {
                    title: "非菜单路由",
                    menu: true,
                    path: "/noMenuRoute",
                    breadcrumb: false,
                    logined: true,
                    children: [
                        {
                            path: "/page1",
                            title: "列表",
                            menu: true,
                            component: Load(() => import("./pages/page3"))
                        },
                        {
                            path: "/page1/:id",
                            title: "二级路由1",
                            activePath: "/admin/noMenuRoute/page1",
                            menu: false,
                            component: Load(() => import("./pages/page3"))
                        }
                    ]
                },
                {
                    path: "/auth",
                    title: "权限路由",
                    menu: true,
                    logined: true,
                    auths: ["auth4", "auth2 & auth3"],
                    component: Load(() => import("./pages/page4"))
                }
            ]
        },
        {
            title: "403",
            menu: false,
            path: "/403",
            layout: CLayout,
            component: NoAuth
        }
    ]
};
